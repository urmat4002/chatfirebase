import {getAuth, signOut} from 'firebase/auth'
import {Button, ButtonGroup, Container, Nav, Navbar} from 'react-bootstrap'
import {useAuthState} from 'react-firebase-hooks/auth'
import {NavLink} from 'react-router-dom'

export const NavBar = () => {
  const auth = getAuth()
  const [user] = useAuthState(auth)

  const exit = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {})
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Chat</Navbar.Brand>

        {user ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',

              width: '200px',
            }}
          >
            <div style={{color: 'white'}}>{user.email}</div>
            <Button onClick={exit}>Exit</Button>
          </div>
        ) : (
          <div>
            <NavLink to="/login">
              <Button>Sign In</Button>
            </NavLink>
            <NavLink style={{marginLeft: '10px'}} to="/registration">
              <Button>Sign Up</Button>
            </NavLink>
          </div>
        )}
      </Container>
    </Navbar>
  )
}
