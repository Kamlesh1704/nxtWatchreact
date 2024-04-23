import AppContext from '../../context/AppContext'
import {CustomFailure} from './styledComponents'
import './index.css'

const NotFoundPage = () => (
  <AppContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const themeImg = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      const paraClass = isDarkTheme ? 'darkPara' : 'lightPara'
      return (
        <CustomFailure isDarkTheme={isDarkTheme}>
          <img src={themeImg} alt="not found" className="failureimggg" />
          <h1 className={paraClass}>Page Not Found</h1>
          <p className="para">
            we are sorry, the page you requested could not be found.
          </p>
        </CustomFailure>
      )
    }}
  </AppContext.Consumer>
)

export default NotFoundPage
