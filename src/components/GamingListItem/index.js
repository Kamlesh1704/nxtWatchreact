import {Link} from 'react-router-dom'
import './index.css'

const TrendingListItem = props => {
  const {details, isDarkTheme} = props
  const {id, title, thumbnailUrl, viewCount} = details
  const titleClass = isDarkTheme ? 'darkTitle' : 'lightTitle'
  return (
    <Link to={`/videos/${id}`} className="link">
      <li className="list-itemm">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="trending-thumbnailll"
        />
        <div>
          <p className={titleClass}>{title}</p>
          <p className="greyy">{viewCount} Watching Worldwide</p>
        </div>
      </li>
    </Link>
  )
}

export default TrendingListItem
