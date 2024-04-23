import {withRouter, Link, useLocation} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {FaFire, FaMoon} from 'react-icons/fa'
import {IoMdHome} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {
  IoSunnyOutline,
  IoReorderThreeOutline,
  IoCloseOutline,
} from 'react-icons/io5'
import AppContext from '../../context/AppContext'
import {
  CustomButton,
  CustomHeader,
  CustomPopup,
  CustomLine,
  CustomLogOut,
  CustomPopupSm,
  CustomSmLink,
} from './styledComponents'
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

const Header = props => {
  const location = useLocation()
  const onClickConfirm = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <AppContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value

        const onClickTheme = () => {
          toggleTheme()
        }

        const companyLogoUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const sureClass = isDarkTheme ? 'white' : 'sure'
        return (
          <CustomHeader isDarkTheme={isDarkTheme}>
            <Link to='/'>
              <img
                src={companyLogoUrl}
                alt='website logo'
                className='company-logo'
              />
            </Link>
            <div className='logout-div'>
              {isDarkTheme ? (
                <button
                  type='button'
                  data-testid='theme'
                  aria-label='close'
                  onClick={onClickTheme}
                  className='themeButton whitee'
                >
                  <IoSunnyOutline />
                </button>
              ) : (
                <button
                  type='button'
                  data-testid='theme'
                  onClick={onClickTheme}
                  className='themeButton'
                  aria-label='Close'
                >
                  <FaMoon />
                </button>
              )}
              <img
                src='https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'
                alt='profile'
                className='profile'
              />
              <div className='popupdiv-sm'>
                <Popup
                  trigger={
                    <CustomLine isDarkTheme={isDarkTheme}>
                      <IoReorderThreeOutline />{' '}
                    </CustomLine>
                  }
                  modal
                >
                  {close => (
                    <CustomPopupSm isDarkTheme={isDarkTheme}>
                      <button
                        aria-label='outline'
                        className='cancel-buttonn'
                        onClick={close}
                        type='button'
                      >
                        <IoCloseOutline />
                      </button>
                      {sideBarList.map(each =>
                        location.pathname === each.pageRoute ? (
                          <Link
                            to={each.pageRoute}
                            className='linkk'
                            key={each.pageRoute}
                          >
                            <CustomSmLink isDarkTheme={isDarkTheme}>
                              <p> {each.itemLogo} </p>
                              <p className='content'>{each.itemContent}</p>
                            </CustomSmLink>
                          </Link>
                        ) : (
                          <Link
                            to={each.pageRoute}
                            className='link'
                            key={each.pageRoute}
                          >
                            <CustomSmLink isDarkTheme={isDarkTheme}>
                              <p> {each.itemLogo} </p>
                              <p className='content'>{each.itemContent}</p>
                            </CustomSmLink>
                          </Link>
                        ),
                      )}
                    </CustomPopupSm>
                  )}
                </Popup>
              </div>
              <div className='popupdiv'>
                <Popup
                  trigger={
                    <CustomButton type='button' isDarkTheme={isDarkTheme}>
                      Logout
                    </CustomButton>
                  }
                  modal
                >
                  {close => (
                    <CustomPopup isDarkTheme={isDarkTheme}>
                      <p className={sureClass}>
                        Are you sure, you want to logout
                      </p>
                      <div className='button-div'>
                        <button
                          className='cancel-button'
                          onClick={close}
                          type='button'
                        >
                          <p>Cancel</p>
                        </button>
                        <button
                          type='button'
                          className='confirm-button'
                          onClick={onClickConfirm}
                        >
                          Confirm
                        </button>
                      </div>
                    </CustomPopup>
                  )}
                </Popup>
              </div>
              <div className='popupdiv-sm'>
                <Popup
                  trigger={
                    <CustomLogOut type='button' isDarkTheme={isDarkTheme}>
                      <FiLogOut />{' '}
                    </CustomLogOut>
                  }
                  modal
                >
                  {close => (
                    <CustomPopup isDarkTheme={isDarkTheme}>
                      <p className={sureClass}>
                        Are you sure, you want to logout
                      </p>
                      <div className='button-div'>
                        <button
                          className='cancel-button'
                          onClick={close}
                          type='button'
                        >
                          <p>Cancel</p>
                        </button>
                        <button
                          type='button'
                          className='confirm-button'
                          onClick={onClickConfirm}
                        >
                          Confirm
                        </button>
                      </div>
                    </CustomPopup>
                  )}
                </Popup>
              </div>
            </div>
          </CustomHeader>
        )
      }}
    </AppContext.Consumer>
  )
}

export default withRouter(Header)
