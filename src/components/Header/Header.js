import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  state = {
    greeting: '',
  }

  componentDidMount() {
    const date = new Date();
    const hr = date.getHours();
    let greeting = '';
    if (hr < 12) {
      greeting = 'Good morning, ';
    } else if (hr < 16) {
      greeting = 'Good afternoon, ';
    } else {
      greeting = 'Good evening, ';
    }
    this.setState({ greeting });
  }

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    const { greeting } = this.state;

    return (
      <div>
        <span>
          {greeting}{this.context.user.name}
        </span>
        <nav>
          <Link
            to={`/user/${this.context.user.id}`}>
              My Account
            </Link>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        
        <h1>
          <Link to='/'>
            Hire Local
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
        
      </header>
    );
  }
}

export default Header
