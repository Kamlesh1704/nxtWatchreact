import {Link} from 'react-router-dom'
import './index.css'

const {formatDistanceToNow} = require('date-fns')

const TrendingListItem = props => {
  const {details, isDarkTheme} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = details
  const result = formatDistanceToNow(new Date(publishedAt))
  const listresult = result.split(' ')
  const fromNow = `${listresult[1]} ${listresult[2]}`
  const titleClass = isDarkTheme ? 'darkTitle' : 'lightTitle'
  const {name} = channel
  return (
    <Link to={`/videos/${id}`} className="link">
      <li className="list-item">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="trending-thumbnail"
        />
        <div>
          <p className={titleClass}>{title}</p>
          <p className="grey">{name}</p>
          <div className="viewanddate">
            <p className="padding">{viewCount} views . </p>
            <p>{publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingListItem
