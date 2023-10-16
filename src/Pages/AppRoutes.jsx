import {getAuth} from 'firebase/auth'
import {Navigate, Route, Routes} from 'react-router-dom'
import {priviteRoutes, publickRoutes} from '../routes'
import {useAuthState} from 'react-firebase-hooks/auth'

export const AppRoutes = () => {
  const auth = getAuth()
  const [user] = useAuthState(auth)

  return (
    <Routes>
      {user
        ? priviteRoutes.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))
        : publickRoutes.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
    </Routes>
  )
}
