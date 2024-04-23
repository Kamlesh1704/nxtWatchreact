import Header from '../Header'
import SideBar from '../SideBar'
import NotFoundPage from '../NotFoundPage'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="listandsidebarr">
      <SideBar />
      <NotFoundPage />
    </div>
  </>
)

export default NotFound
