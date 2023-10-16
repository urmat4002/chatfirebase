import './App.css'
import {Auth} from './Pages/Auth'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Registration} from './Pages/Registration'
import {AppRoutes} from './Pages/AppRoutes'
import {NavBar} from './Components/NavBar'
import {createContext, useState} from 'react'

export const Context = createContext()

function App() {
  const [user, setUser] = useState(null)
  return (
    <>
      <Context.Provider value={[user, setUser]}>
        <NavBar />
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <AppRoutes />
        </div>
      </Context.Provider>
    </>
  )
}

export default App
