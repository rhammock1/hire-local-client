import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import SearchRoute from '../../routes/SearchRoute/SearchRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import RestApiService from '../../services/rest-api-service';
import UserContext from '../../contexts/UserContext';
import JobContext from '../../contexts/JobContext';
import './App.css';
import JobRoute from '../../routes/JobRoute/JobRoute';
import AccountRoute from '../../routes/AccountRoute/AccountRoute';

export default class App extends Component {
  state = {
    hasError: false,
    error: null,
    jobs: [],
    userSaves: [],
    duplicate: {},
    resume: null,
    fileURL: null,
  }

  static contextType = UserContext;

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    this.getAllJobs();
    const { user } = this.context;
    if (user.hasOwnProperty('id')) {
      this.getUserSaves();
      this.getUserResume();
    }
  }

  getAllJobs = () => {
    RestApiService.getAllJobs()
      .then((jobs) => {
        return this.setState({ jobs: jobs.notExpired });
      })
      .catch((error) => this.setState({ hasError: true, error }));
  }

  getUserSaves = () => {
    const { user } = this.context;
    RestApiService.getUserSaves(user.id)
      .then((saves) => this.setState({ userSaves: saves.saves }))
      .catch((error) => this.setState({ error, hasError: true }));
  }

  getUserResume = (userId) => {
    const { user } = this.context;
    const id = userId || user.id
    return RestApiService.getResume(id)
      .then((file) => {
        if (!file) {

          this.setState({ resume: null })
          return false
        }
        const fileURL = URL.createObjectURL(file);
        this.setState({ resume: file, fileURL });
        return true
      })
      .catch((error) => {
        if (error.error !== 'No resume found for the selected user') {
          this.setState({ error, hasError: true });
        }
      });
  }

  openResumeInNewPage = () => {
    const { fileURL, resume } = this.state;
    if (!fileURL || !resume) {
      return false;
    }
    window.open(fileURL);
  }

  getSavedJobs = () => {
    const { userSaves, jobs } = this.state;
    const savedJobIds = userSaves.map((save) => save.job_id);
    
    const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id))
    
    return savedJobs;

  }

  checkForDuplicateSaves = (userSaves, job_id) => {
    let duplicate

    userSaves.map((save) => {
      if(save.job_id === job_id) {
        duplicate = true;
        this.setState({ duplicate: save });
      }
      return duplicate;
    })
    return duplicate;
  }

  handleSave = async (job_id) => {
    const { user } = this.context;
    const { userSaves } = this.state;
    if (userSaves.length === 0) {
      await RestApiService.saveJob(user.id, job_id)
        .then(() => {})
        .catch((error) => this.setState({ error, hasError: true }));

      await RestApiService.getUserSaves(user.id)
        .then((saves) => this.setState({ userSaves: saves.saves }))
        .catch((error) => this.setState({ error, hasError: true }));

    } else {
      if(await this.checkForDuplicateSaves(userSaves, job_id)) {
        const { duplicate } = this.state;

        await RestApiService.deleteSave(user.id, duplicate.id)
          .then(() => {})
          .catch((error) => this.setState({ error, hasError: true }));
        
        await RestApiService.getUserSaves(user.id)
          .then((saves) => this.setState({ userSaves: saves.saves }))
          .catch((error) => this.setState({ error, hasError: true }));

        return;
      }

      await RestApiService.saveJob(user.id, job_id)
        .then(() => {})
        .catch((error) => this.setState({ error, hasError: true }));

      await RestApiService.getUserSaves(user.id)
        .then((saves) => this.setState({ userSaves: saves.saves }))
        .catch((error) => this.setState({ error, hasError: true }));
    }
  }

  handleError = (error) => {
    console.error(error);
    this.setState({ error, hasError: true });
  }

  render() {
    const { hasError, jobs, userSaves, error } = this.state
    const value = {
      jobs,
      userSaves,
      handleSave: this.handleSave,
      getUserSaves: this.getUserSaves,
      getSavedJobs: this.getSavedJobs,
      getAllJobs: this.getAllJobs,
      getUserResume: this.getUserResume,
      openResume: this.openResumeInNewPage,
      error: error,
      handleError: this.handleError,
    }
    return (
      <div className='App'>
        <Header />
        <div className='banner-image-container'>
          <img id='banner-image' src='https://williamsburgohio.org/wp-content/uploads/2020/02/local.jpg' alt='support local business banner' />
        </div>
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <JobContext.Provider value={value}>
            <Switch>
              <PrivateRoute
                exact
                path={'/'}
                component={SearchRoute}
              />
              <PrivateRoute
                path={'/jobs/:jobId'}
                component={JobRoute}
              />
              <PrivateRoute
                path={'/user/:userId'}
                component={AccountRoute}
              />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationRoute}
              />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginRoute}
              />
              <Route
                component={NotFoundRoute}
              />
            </Switch>
          </JobContext.Provider>
        </main>
      </div>
    );
  }
}
