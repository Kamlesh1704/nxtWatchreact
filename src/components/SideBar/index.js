import {FaFire} from 'react-icons/fa'
import {IoMdHome} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import SideBarItem from '../SideBarItem'
import AppContext from '../../context/AppContext'
import {CustomSideBar} from './styledComponents'
import './index.css'

const sideBarList = [
  {
    itemLogo: <IoMdHome />,
    itemContent: 'Home',
    id: 0,
    pageRoute: '/',
  },
  {
    itemLogo: <FaFire />,
    itemContent: 'Trending',
    id: 1,
    pageRoute: '/trending',
  },
  {
    itemLogo: <SiYoutubegaming />,
    itemContent: 'Gaming',
    id: 2,
    pageRoute: '/gaming',
  },
  {
    itemLogo: <MdPlaylistAdd />,
    itemContent: 'Saved videos',
    id: 3,
    pageRoute: '/saved-videos',
  },
]

const SideBar = () => (
  <AppContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const classDiv = isDarkTheme ? 'darkDiv' : 'lightDiv'
      return (
        <CustomSideBar isDarkTheme={isDarkTheme}>
          <ul className="">
            {sideBarList.map(eachList => (
              <SideBarItem
                details={eachList}
                key={eachList.id}
                isDarkTheme={isDarkTheme}
              />
            ))}
          </ul>
          <div className={classDiv}>
            <p>Contact us</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              className="logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              className="logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              className="logo"
            />
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </CustomSideBar>
      )
    }}
  </AppContext.Consumer>
)

export default SideBar
