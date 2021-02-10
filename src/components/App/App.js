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

export default class App extends Component {
  state = {
    hasError: false,
    error: null,
    jobs: [],
    userSaves: [],
    duplicate: {},
  }

  static contextType = UserContext;

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    RestApiService.getAllJobs()
      .then((jobs) => {
        return this.setState({ jobs: jobs.notExpired });
      })
      .catch((error) => this.setState({ hasError: true, error }));
  }

  getUserSaves = () => {
    console.log('here i am');
    const { user } = this.context;

    RestApiService.getUserSaves(user.id)
      .then((saves) => this.setState({ userSaves: saves.saves }))
      .catch((error) => this.setState({ error, hasError: true }));
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

  render() {
    const { hasError, jobs, userSaves } = this.state
    const value = {
      jobs,
      userSaves,
      handleSave: this.handleSave,
      getUserSaves: this.getUserSaves,
    }
    return (
      <div className='App'>
        <Header />
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
              {/* <PrivateRoute
                path={'/learn'}
                component={LearningRoute}
              /> */}
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
