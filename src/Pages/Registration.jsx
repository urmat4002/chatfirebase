import {useState} from 'react'
import {Button, Card, Form} from 'react-bootstrap'
import {app, firebaseConfig} from '../firebase'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import {NavLink} from 'react-router-dom'
import {doc, getFirestore, setDoc} from 'firebase/firestore'

export const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const db = getFirestore(app)

  const handleRegistration = (email, password) => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user.email)
        addUserToDatabase(user)

        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
      })
  }

  const addUserToDatabase = async (user) => {
    await setDoc(doc(db, 'users', user.email), {
      date: Date.now(),
      avatar: 'hi',
      email: user.email,
      uid: user.uid,
      chats: [],
    })
  }

  return (
    <Card style={{width: '400px', padding: '20px', margin: '10px'}}>
      <Card.Title>Registration</Card.Title>
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
            onClick={() => handleRegistration(email, password)}
          >
            Registration
          </Button>
          <NavLink to="/login">Login</NavLink>
        </div>
      </Form>
    </Card>
  )
}
