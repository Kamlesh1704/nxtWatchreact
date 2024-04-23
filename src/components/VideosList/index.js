import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosSearch} from 'react-icons/io'
import {CustomDiv} from './styledComponents'
import VideoListItem from '../VideoListItem'
import AppContext from '../../context/AppContext'
import './index.css'

const apiStatusConstaint = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideosList extends Component {
  state = {videosList: [], apiStatus: apiStatusConstaint.initial, search: ''}

  componentDidMount() {
    this.getVideosList()
  }

  getFormatedData = eachVideo => ({
    id: eachVideo.id,
    title: eachVideo.title,
    thumbnailUrl: eachVideo.thumbnail_url,
    viewCount: eachVideo.view_count,
    publishedAt: eachVideo.published_at,
    channel: {
      name: eachVideo.channel.name,
      profileImgUrl: eachVideo.channel.profile_image_url,
    },
  })

  getVideosList = async () => {
    this.setState({apiStatus: apiStatusConstaint.loading})
    const {search} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${search}`
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
      const videoList = data.videos
      const updatedList = videoList.map(eachVideo =>
        this.getFormatedData(eachVideo),
      )
      this.setState({
        videosList: updatedList,
        apiStatus: apiStatusConstaint.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstaint.failure})
    }
  }

  renderLoading = isDarkTheme => {
    const loaderColor = isDarkTheme ? '#ffffff' : '#000000'
    return (
      <div className="loader-container loader" data-testid="loader">
        <Loader type="ThreeDots" color={loaderColor} height="50" width="50" />
      </div>
    )
  }

  onRetry = () => {
    this.getVideosList()
  }

  renderFailure = isDarkTheme => {
    const imgUrl = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    const paraClass = isDarkTheme ? 'darkPara' : 'lightPara'
    return (
      <div className="failureview">
        <img src={imgUrl} alt="failure view" className="failureimggg" />
        <h1 className={paraClass}>Oops! Something Went Wrong</h1>
        <p className="para">We are having some trouble</p>
        <Link to="/">
          <button className="retry" type="button" onClick={this.onRetry}>
            Retry
          </button>
        </Link>
      </div>
    )
  }

  noVideosView = isDarkTheme => {
    const noClass = isDarkTheme ? 'darkPara' : 'lightPara'
    return (
      <div className="failureview">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="failureimggg"
        />
        <h1 className={noClass}>No Search results found</h1>
        <p className="para">Try different key words or remove search filter</p>
        <button className="retry" type="button" onClick={this.onRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderList = isDarkTheme => {
    const {videosList} = this.state
    if (videosList.length <= 0) {
      return this.noVideosView(isDarkTheme)
    }
    return (
      <ul className="listt ">
        {videosList.map(eachList => (
          <VideoListItem
            details={eachList}
            key={eachList.id}
            isDarkTheme={isDarkTheme}
          />
        ))}
      </ul>
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

  onSearch = event => {
    this.setState({search: event.target.value})
  }

  onSearching = () => {
    this.getVideosList()
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <CustomDiv isDarkTheme={isDarkTheme} data-testid="home">
              <div className="input-div">
                <input
                  type="search"
                  className="input"
                  placeholder="Search..."
                  onChange={this.onSearch}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onSearching}
                  data-testid="searchButton"
                >
                  {' '}
                  <IoIosSearch />{' '}
                </button>
              </div>
              {this.renderWithStatus(isDarkTheme)}
            </CustomDiv>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default VideosList
