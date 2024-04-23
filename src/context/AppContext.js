import React from 'react'

const AppContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedList: [],
  addSavedList: () => {},
})

export default AppContext
