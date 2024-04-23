import {Link, useLocation} from 'react-router-dom'
import './index.css'

const SideBarItem = props => {
  const {details, isDarkTheme} = props
  const {itemLogo, itemContent, pageRoute} = details
  const classItem = isDarkTheme ? 'classDark' : 'classLight'
  const location = useLocation()
  const activeClasss = location.pathname === pageRoute ? 'activeClass' : ''
  const activeLogo = location.pathname === pageRoute ? 'activeLogo' : ''

  return (
    <li className={`listItem ${activeClasss}`}>
      <Link to={pageRoute} className={classItem}>
        <p className={`${activeLogo}`}> {itemLogo} </p>
        <p className="content">{itemContent}</p>
      </Link>
    </li>
  )
}

export default SideBarItem
