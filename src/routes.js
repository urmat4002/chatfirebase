import {Navigate} from 'react-router-dom'
import {Auth} from './Pages/Auth'
import {Chat} from './Pages/Chat'
import {Registration} from './Pages/Registration'

export const publickRoutes = [
  {path: '/login', element: <Auth />},
  {path: '/registration', element: <Registration />},
  {path: '*', element: <Navigate to="/login" replace />},
]

export const priviteRoutes = [
  {path: '/', element: <Chat />},
  {path: '*', element: <Navigate to="/" replace />},
]
