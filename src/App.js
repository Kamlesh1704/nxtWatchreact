import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import AppContext from './context/AppContext'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'

class App extends Component {
  state = {isDarkTheme: false, savedList: []}

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  addSavedList = (itemDetails, id) => {
    const {savedList} = this.state
    const isPresent = savedList.some(each => each.videoDetails.id === id)
    if (isPresent) {
      this.setState(prevState => ({
        savedList: prevState.savedList.filter(
          each => each.videoDetails.id !== id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        savedList: [...prevState.savedList, itemDetails],
      }))
    }
  }

  render() {
    const {isDarkTheme, savedList} = this.state
    return (
      <>
        <AppContext.Provider
          value={{
            isDarkTheme,
            savedList,
            toggleTheme: this.toggleTheme,
            addSavedList: this.addSavedList,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route component={NotFound} />
          </Switch>
        </AppContext.Provider>
      </>
    )
  }
}

export default App
