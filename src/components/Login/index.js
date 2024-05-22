import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  onSubmitSuccess = data => {
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLogin = async () => {
    const uaserData = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(uaserData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data)
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="home-con">
        <h1> Please Login </h1>
        <button onClick={this.onLogin} type="button">
          {' '}
          Login with sample creds{' '}
        </button>
      </div>
    )
  }
}

export default Login
