import React, { Component } from 'react'
import LandingPopUp from '../../components/LandingPopUp/LandingPopUp'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import JobContext from '../../contexts/JobContext'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  state = {
    formData: {},
    visited: false,
  }

  static contextType = JobContext;

  handleUploadChange = (event) => {
    const resume = event.target.files[0];
    let formData = new FormData();
    formData.append('resumePDF', resume);
    this.setState({ formData });
  }

  handleRegistrationSuccess = async () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  handleClearPopUp = () => {
    this.setState({ visited: true });
  }

  render() {
    const { handleError, getUserResume } = this.context;
    const { formData, visited } = this.state;
    return (
      <section>
        <p>
          Search for local job opportunities or hire local talent
        </p>
        {(!visited) ? <LandingPopUp handleClear={this.handleClearPopUp} /> : null}
        <h2>Sign up</h2>
        <RegistrationForm
          formData={formData}
          handleError={handleError}
          getUserResume={getUserResume}
          handleUploadChange={this.handleUploadChange}
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
