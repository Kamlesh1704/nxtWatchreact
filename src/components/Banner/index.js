import {IoCloseOutline} from 'react-icons/io5'
import {CustomDiv} from './styledComponents'
import './index.css'

const Banner = props => {
  const {closeBanner} = props
  const onClosingBanner = () => {
    closeBanner()
  }
  return (
    <CustomDiv data-testid="banner">
      <nav className="banner-nav">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          className="companyy-logo"
          alt="nxt watch logo"
        />
        <button
          type="button"
          className="close-button close"
          onClick={onClosingBanner}
          aria-label="close"
          data-testid="close"
        >
          <IoCloseOutline />
        </button>
      </nav>
      <p className="banner-para">
        Buy Nxt Watch Premium prepaid plans with UPI
      </p>
      <button className="get" type="button">
        GET IT NOW
      </button>
    </CustomDiv>
  )
}
export default Banner
