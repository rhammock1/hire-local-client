import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  state = {
    formData: {}
  }

  handleUploadChange = (event) => {
    const resume = event.target.files[0];
    let formData = new FormData();
    formData.append('resumePDF', resume);
    this.setState({ formData });
    console.log(formData);
  }

  handleRegistrationSuccess = async () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section>
        <p>
          Search for local job opportunities or hire local talent
        </p>
        <h2>Sign up</h2>
        <RegistrationForm
          handleUploadChange={this.handleUploadChange}
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
