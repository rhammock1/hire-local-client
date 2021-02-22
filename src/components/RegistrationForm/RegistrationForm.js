import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'
import UserContext from '../../contexts/UserContext'
import RestApiService from '../../services/rest-api-service'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  static contextType = UserContext;

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = async (ev) => {
    ev.preventDefault()
    const { name, username, password } = ev.target;
    const { handleError, getUserResume, formData } = this.props;
    let userId;

    await AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        userId = res.id;
      })
      .catch(res => {
        this.setState({ error: res.error })
      })

    if(formData) {
      await RestApiService.postResume(formData, userId)
      .then(() => {
        this.props.onRegistrationSuccess()
      })
      .catch((error) => {
        handleError(error);
      })
    }
    await AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        name.value = '';
        username.value = '';
        password.value = '';
        if(formData) {
          getUserResume();
        }
        this.context.processLogin(res.authToken);
      })
      .catch((res) => {
        handleError(res);
      })

      
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state;
    const { handleUploadChange } = this.props;
    return (
      <form id='registration'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label htmlFor='registration-name-input'>
            Enter your name<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div>
          <Label htmlFor='registration-username-input'>
            Choose a username<Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div>
          <Label htmlFor='registration-password-input'>
            Choose a password<Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <div>
          <Label htmlFor='resumePDF'>Upload a resume(.pdf): </Label>
          <Input onChange={handleUploadChange} id='resumePDF' name='resumePDF' type='file' />
        </div>
        <footer>
          <Button type='submit'>
            Sign up
          </Button>
          {' '}
          <Link to='/login'>Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
