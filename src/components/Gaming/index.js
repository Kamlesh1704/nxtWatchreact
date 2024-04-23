import Header from '../Header'
import SideBar from '../SideBar'
import GamingList from '../GamingList'
import './index.css'

const Gaming = () => (
  <>
    <Header />
    <div className="listandsidebarr">
      <SideBar />
      <GamingList />
    </div>
  </>
)

export default Gaming
