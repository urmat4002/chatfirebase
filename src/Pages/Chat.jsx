import {useEffect, useRef, useState} from 'react'
import {useCollection, useCollectionData} from 'react-firebase-hooks/firestore'
import {Button, Card, Form} from 'react-bootstrap'
import {addDoc, collection, doc, getFirestore, setDoc} from 'firebase/firestore'
import {app} from '../firebase'

import {getAuth} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import {Users} from '../Components/Users'
import {Chats} from '../Components/Chats'
import {ChatList} from '../Components/ChatList'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentComponent} from '../store/slice'

export const Chat = () => {
  const dispatch = useDispatch()
  const currentComponent = useSelector((state) => state.chat.currentComponent)
  const currentChat = useSelector((state) => state.chat.currentChat)

  const db = getFirestore(app)
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const [messages, loading] = useCollectionData(collection(db, 'cities'))

  //messages && messages.sort((a, b) => a.date - b.date)

  ////////////////////////////////////////////

  //////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////

  const writeDatabase = async () => {
    try {
      const docRef = await addDoc(collection(db, 'messages'), {
        date: Date.now(),
        avatar: 'hi',
        email: user.email,
        uid: user.uid,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  ///////////////////////////////////////////////////////

  return (
    <Card style={{width: '300px', margin: '20px', padding: '10px'}}>
      <Card.Title>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div onClick={() => dispatch(setCurrentComponent('chatList'))}>
            Chats
          </div>

          <div onClick={() => dispatch(setCurrentComponent('usersList'))}>
            search
          </div>
        </div>
      </Card.Title>
      <Form>
        {
          {chats: <Chats />, chatList: <ChatList />, usersList: <Users />}[
            currentComponent
          ]
        }
      </Form>
    </Card>
  )
}
