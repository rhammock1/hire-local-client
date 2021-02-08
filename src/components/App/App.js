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
import JobContext from '../../contexts/JobContext';
import './App.css';

export default class App extends Component {
  state = {
    hasError: false,
    error: null,
    jobs: [],
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    RestApiService.getAllJobs()
      .then((jobs) => {
        return this.setState({ jobs });
      })
      .catch((error) => this.setState({ hasError: true, error }));
  }

  render() {
    const { hasError, jobs } = this.state
    const value = {
      jobs,
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
