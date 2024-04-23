import {FaFire} from 'react-icons/fa'
import AppContext from '../../context/AppContext'
import SavedListItem from '../SavedListItem'
import {
  CustomHeadingDiv,
  CustomListt,
  CustomFailure,
  SavedContainer,
} from './styledComponents'
import './index.css'

const SavedList = () => {
  const renderList = (savedList, isDarkTheme) => {
    const titleClass = isDarkTheme ? 'darkTitlee' : 'lightTitlee'
    const logoClass = isDarkTheme ? 'darkLogo' : 'lightLogo'
    return (
      <div className='div-fdd'>
        <CustomHeadingDiv isDarkTheme={isDarkTheme}>
          <div className='trending-logo'>
            <p className={logoClass}>
              <FaFire />
            </p>
            <h1 className={titleClass}>Saved Videos</h1>
          </div>
          <div className='total'>
            <p className={`${titleClass} length`}>Total: {savedList.length}</p>
          </div>
        </CustomHeadingDiv>
        <CustomListt isDarkTheme={isDarkTheme}>
          {savedList.map(eachItem => (
            <SavedListItem
              details={eachItem}
              key={eachItem.id}
              isDarkTheme={isDarkTheme}
            />
          ))}
        </CustomListt>
      </div>
    )
  }

  return (
    <AppContext.Consumer>
      {value => {
        const {savedList, isDarkTheme} = value
        const paraClass = isDarkTheme ? 'darkPara' : 'lightpara'
        return (
          <SavedContainer data-testid='savedVideos'>
            {savedList.length === 0 ? (
              <CustomFailure isDarkTheme={isDarkTheme}>
                <img
                  src='https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png'
                  alt='no saved videos'
                  className='failureimg'
                />
                <h1 className={paraClass}>No Saved Videos Found</h1>
                <p className='paraa'>
                  You can save your videos while watching them
                </p>
              </CustomFailure>
            ) : (
              renderList(savedList, isDarkTheme)
            )}
          </SavedContainer>
        )
      }}
    </AppContext.Consumer>
  )
}

export default SavedList
