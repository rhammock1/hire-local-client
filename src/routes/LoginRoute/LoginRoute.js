import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import JobContext from '../../contexts/JobContext'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  static contextType = JobContext;

  handleLoginSuccess = async () => {
    await this.context.getUserSaves();
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginRoute
