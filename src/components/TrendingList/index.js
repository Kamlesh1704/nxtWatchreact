import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {FaFire} from 'react-icons/fa'
import AppContext from '../../context/AppContext'
import TrendingListItem from '../TrendingListItem'
import {CustomHeadingDiv, CustomList, CustomFailure} from './styledComponents'
import './index.css'

const apiStatusConstaint = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingList extends Component {
  state = {trendingList: [], apiStatus: apiStatusConstaint.initial}

  componentDidMount() {
    this.getTrendingList()
  }

  getFormatedData = listItem => ({
    id: listItem.id,
    title: listItem.title,
    thumbnailUrl: listItem.thumbnail_url,
    channel: {
      name: listItem.channel.name,
      profileImgUrl: listItem.channel.profile_image_url,
    },
    viewCount: listItem.view_count,
    publishedAt: listItem.published_at,
  })

  getTrendingList = async () => {
    this.setState({apiStatus: apiStatusConstaint.loading})
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
        <Link to="/trending">
          <button className="retry" type="button" onClick={this.onRetry}>
            Retry
          </button>
        </Link>
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
              <FaFire />
            </p>
            <h1 className={titleClass}>Trending</h1>
          </div>
          <div className="total">
            <p className={`${titleClass} length`}>
              Total: {trendingList.length}
            </p>
          </div>
        </CustomHeadingDiv>
        <CustomList isDarkTheme={isDarkTheme} data-testid="trending">
          {trendingList.map(eachItem => (
            <TrendingListItem
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
        return this.renderLoading()
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

export default TrendingList
