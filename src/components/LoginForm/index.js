import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import AppContext from '../../context/AppContext'
import {
  CustomDiv,
  CustomCard,
  CustomPara,
  CustomLogin,
} from './styledComponents'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: 'password',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onToggleShow = () => {
    this.setState(prevState => ({
      showPassword: prevState.showPassword === 'password' ? 'text' : 'password',
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserNameInput = isDarkTheme => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <br />
        <input
          id="username"
          value={username}
          type="text"
          placeholder="rahul"
          className={
            isDarkTheme
              ? 'login-input username-input white-color'
              : 'login-input username-input dark-color'
          }
          onChange={this.onChangeUsername}
        />
        <br />
      </>
    )
  }

  renderPasswordInput = isDarkTheme => {
    const {password, showPassword} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <br />
        <input
          id="password"
          value={password}
          type={showPassword}
          placeholder="rahul@2021"
          className={
            isDarkTheme ? 'login-input white-color' : 'login-input dark-color'
          }
          onChange={this.onChangePassword}
        />
        <br />
      </>
    )
  }

  renderShowPassword = isDarkTheme => (
    <div className="show-check">
      <input
        type="checkbox"
        className="checkbox"
        onChange={this.onToggleShow}
        id="showPassword"
      />
      <CustomPara isDarkTheme={isDarkTheme} htmlFor="showPassword">
        Show Password
      </CustomPara>
    </div>
  )

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <CustomDiv isDarkTheme={isDarkTheme}>
              <CustomCard isDarkTheme={isDarkTheme} className="customCard">
                {isDarkTheme ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="website-logo"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="website-logo"
                  />
                )}
                <form className="form" onSubmit={this.submitForm}>
                  {this.renderUserNameInput(isDarkTheme)}
                  {this.renderPasswordInput(isDarkTheme)}
                  {this.renderShowPassword(isDarkTheme)}
                  <CustomLogin type="submit">
                    Login
                  </CustomLogin>
                  {showSubmitError && (
                    <p className="error-message">*{errorMsg}</p>
                  )}
                </form>
              </CustomCard>
            </CustomDiv>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default LoginForm
