import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import AppContext from '../../context/AppContext'
import Header from '../Header'
import SideBar from '../SideBar'
import {CustomDiv, CustomDisLike, CustomLike} from './styledComponents'
import './index.css'

const {formatDistanceToNow} = require('date-fns')

const apiStatusConstaint = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    itemDetails: {},
    apiStatus: apiStatusConstaint.initial,
    isLiked: false,
    isDisliked: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getFormated = data => ({
    videoDetails: {
      id: data.video_details.id,
      title: data.video_details.title,
      videoUrl: data.video_details.video_url,
      thumbNailUrl: data.video_details.thumbnail_url,
      channel: {
        name: data.video_details.channel.name,
        profileImgUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      },
      viewCount: data.video_details.view_count,
      publishedAt: data.video_details.published_at,
      description: data.video_details.description,
    },
  })

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstaint.loading})
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
      const updatedData = this.getFormated(data)
      this.setState({
        itemDetails: updatedData,
        apiStatus: apiStatusConstaint.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstaint.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getVideoDetails()
  }

  renderFailure = isDarkTheme => {
    const imgUrl = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    const paraClass = isDarkTheme ? 'darkPara' : 'lightPara'
    return (
      <div className="failureview">
        <img src={imgUrl} alt="failure view" className="failureimg" />
        <h1 className={paraClass}>Oops! Something Went Wrong</h1>
        <p className="para">
          We are having some trouble to complete your request. Please try again.
        </p>
        <button className="retry" type="button" onClick={this.onRetry}>
          Retry
        </button>
      </div>
    )
  }

  onLiked = () => {
    this.setState(prevState => ({
      isDisliked: false,
      isLiked: !prevState.isLiked,
    }))
  }

  onDisliked = () => {
    this.setState(prevState => ({
      isLiked: false,
      isDisliked: !prevState.isDisliked,
    }))
  }

  renderItemDetails = isDarkTheme => {
    const {itemDetails, isLiked, isDisliked, isSaved} = this.state

    const {videoDetails} = itemDetails
    const {id, title, videoUrl, channel, viewCount, publishedAt, description} =
      videoDetails
    const result = formatDistanceToNow(new Date(publishedAt))
    const listresult = result.split(' ')
    const fromNow = `${listresult[1]} ${listresult[2]}`
    const {name, profileImgUrl, subscriberCount} = channel
    const paraClass = isDarkTheme ? 'darkPara' : 'lightPara'
    const likedClass = isLiked ? 'blueColor' : 'whiteColor'
    const disLikedClass = isDisliked ? 'blueColor' : 'whiteColor'
    return (
      <AppContext.Consumer>
        {value => {
          const {addSavedList, savedList} = value
          const isPresent = savedList.find(each => each.videoDetails.id === id)

          const onSaving = () => {
            addSavedList(itemDetails, id)
            this.setState(prevState => ({
              isSaved: !prevState.isSaved,
            }))
          }

          const saveColor = isPresent !== undefined ? 'blueColor' : 'whiteColor'
          const saveText = isPresent !== undefined ? 'Saved' : 'Save'
          return (
            <div className="itemDetailsView ">
              <ReactPlayer
                url={videoUrl}
                className="player"
                controls
                width="100%"
                height="500px"
              />
              <p className={paraClass}>{title}</p>
              <div className="likedetail">
                <div className="views-div">
                  <p>{viewCount} views .</p>
                  <p className="likes-div">{publishedAt}</p>
                </div>
                <div className="like-div">
                  <CustomLike
                    isLiked={isLiked}
                    type="button"
                    onClick={this.onLiked}
                  >
                    <AiOutlineLike />
                    Like
                  </CustomLike>
                  <CustomDisLike
                    isDisliked={isDisliked}
                    type="button"
                    onClick={this.onDisliked}
                  >
                    <BiDislike />
                    Dislike
                  </CustomDisLike>
                  <button
                    type="button"
                    className={`likes-div ${saveColor}`}
                    onClick={onSaving}
                  >
                    <MdPlaylistAdd />
                    {saveText}
                  </button>
                </div>
              </div>
              <hr />
              <div className="profileanddetail">
                <img
                  src={profileImgUrl}
                  alt="channel logo"
                  className="profilee"
                />
                <div className="nameandsubscriber">
                  <p className={paraClass}>{name}</p>
                  <p className="subs">{subscriberCount} subscribers</p>
                </div>
              </div>
              <p className={`des ${paraClass}`}>{description}</p>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }

  getRenderData = isDarkTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstaint.success:
        return this.renderItemDetails(isDarkTheme)
      case apiStatusConstaint.failure:
        return this.renderFailure(isDarkTheme)
      case apiStatusConstaint.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <Header />
              <div className="listandsidebar">
                <SideBar />
                <CustomDiv
                  isDarkTheme={isDarkTheme}
                  data-testid="videoItemDetails"
                >
                  {this.getRenderData(isDarkTheme)}
                </CustomDiv>
              </div>
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default VideoItemDetails
