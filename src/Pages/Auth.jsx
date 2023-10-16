import {useState} from 'react'
import {Button, Card, Form} from 'react-bootstrap'
import {useContext} from 'react'
import {Context} from '../App'

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {NavLink} from 'react-router-dom'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (email, password) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
      })
  }
  return (
    <Card style={{width: '400px', padding: '20px', margin: '10px'}}>
      <Card.Title>Login</Card.Title>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Button
            variant="primary"
            onClick={() => handleLogin(email, password)}
          >
            Login
          </Button>
          <NavLink to="/registration">Registration</NavLink>
        </div>
      </Form>
    </Card>
  )
}
