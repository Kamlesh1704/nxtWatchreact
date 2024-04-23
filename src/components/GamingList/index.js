import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import AppContext from '../../context/AppContext'
import GamingListItem from '../GamingListItem'
import {CustomHeadingDiv, CustomList, CustomFailure} from './styledComponents'
import './index.css'

const apiStatusConstaint = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingList extends Component {
  state = {trendingList: [], apiStatus: apiStatusConstaint.initial}

  componentDidMount() {
    this.getTrendingList()
  }

  getFormatedData = listItem => ({
    id: listItem.id,
    title: listItem.title,
    thumbnailUrl: listItem.thumbnail_url,
    viewCount: listItem.view_count,
  })

  getTrendingList = async () => {
    this.setState({apiStatus: apiStatusConstaint.loading})
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachList =>
        this.getFormatedData(eachList),
      )
      this.setState({
        trendingList: updatedData,
        apiStatus: apiStatusConstaint.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstaint.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container loader div-fd" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getTrendingList()
  }

  renderFailure = isDarkTheme => {
    const imgUrl = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    const paraClass = isDarkTheme ? 'darkPara' : 'lightPara'
    return (
      <CustomFailure isDarkTheme={isDarkTheme} className="div-fdd">
        <img src={imgUrl} alt="failure view" className="failureimggg" />
        <h1 className={paraClass}>Oops! Something Went Wrong</h1>
        <p className="para">We are having some trouble</p>
        <button className="retry" type="button" onClick={this.onRetry}>
          Retry
        </button>
      </CustomFailure>
    )
  }

  renderList = isDarkTheme => {
    const {trendingList} = this.state
    const titleClass = isDarkTheme ? 'darkTitlee' : 'lightTitlee'
    const logoClass = isDarkTheme ? 'darkLogo' : 'lightLogo'
    return (
      <div className="div-fdd">
        <CustomHeadingDiv isDarkTheme={isDarkTheme}>
          <div className="trending-logo">
            <p className={logoClass}>
              <SiYoutubegaming />
            </p>
            <h1 className={titleClass}>Gaming</h1>
          </div>
          <div className="total">
            <p className={`${titleClass} length`}>Total: {trendingList.length}</p>
          </div>
        </CustomHeadingDiv>
        <CustomList isDarkTheme={isDarkTheme} data-testid="gaming">
          {trendingList.map(eachItem => (
            <GamingListItem
              details={eachItem}
              key={eachItem.id}
              isDarkTheme={isDarkTheme}
            />
          ))}
        </CustomList>
      </div>
    )
  }

  renderWithStatus = isDarkTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstaint.success:
        return this.renderList(isDarkTheme)
      case apiStatusConstaint.loading:
        return this.renderLoading(isDarkTheme)
      case apiStatusConstaint.failure:
        return this.renderFailure(isDarkTheme)
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return <>{this.renderWithStatus(isDarkTheme)}</>
        }}
      </AppContext.Consumer>
    )
  }
}

export default GamingList
