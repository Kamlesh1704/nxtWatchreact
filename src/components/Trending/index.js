import Header from '../Header'
import SideBar from '../SideBar'
import TrendingList from '../TrendingList'
import './index.css'

const Trending = () => (
  <>
    <Header />
    <div className="listandsidebar">
      <SideBar />
      <TrendingList />
    </div>
  </>
)

export default Trending
