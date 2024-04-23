import {Link} from 'react-router-dom'
import './index.css'

const {formatDistanceToNow} = require('date-fns')

const VideoListItem = props => {
  const {details, isDarkTheme} = props
  const {id, title, thumbnailUrl, viewCount, publishedAt, channel} = details
  const result = formatDistanceToNow(new Date(publishedAt))
  const listresult = result.split(' ')
  const fromNow = `${listresult[1]} ${listresult[2]}`
  const {name, profileImgUrl} = channel
  const titleClass = isDarkTheme ? 'darkTitle' : 'lightTitle'
  return (
    <li className="item">
      <Link to={`/videos/${id}`} className="link">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnailll" />
        <div className="detail-div">
          <img src={profileImgUrl} alt="channel logo" className="profile-img" />
          <div className="titl-div">
            <p className={titleClass}>{title}</p>
            <p className="name padding">{name}</p>
            <div className="countdiv padding">
              <p className="padding">{viewCount} views . </p>
              <p className="padding">{publishedAt}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoListItem
