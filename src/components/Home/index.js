import {Component} from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import Banner from '../Banner'
import VideosList from '../VideosList'
import './index.css'

class Home extends Component {
  state = {showBanner: true}

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  render() {
    const {showBanner} = this.state
    return (
      <>
        <Header />
        <div className="listandsidebar">
          <SideBar />
          <div className="banner-list">
            {showBanner && <Banner closeBanner={this.closeBanner} />}
            <VideosList />
          </div>
        </div>
      </>
    )
  }
}

export default Home
