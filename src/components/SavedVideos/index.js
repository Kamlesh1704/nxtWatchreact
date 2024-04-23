import Header from '../Header'
import SideBar from '../SideBar'
import SavedList from '../SavedList'
import './index.css'

const SavedVideos = () => (
  <>
    <Header />
    <div className="listandsidebar">
      <SideBar />
      <SavedList />
    </div>
  </>
)

export default SavedVideos
