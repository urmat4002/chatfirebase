import {useEffect, useRef, useState} from 'react'
import {useCollection, useCollectionData} from 'react-firebase-hooks/firestore'
import {Button, ButtonGroup, Card, Form} from 'react-bootstrap'
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

  return (
    <Card style={{width: '300px', margin: '20px', padding: '10px'}}>
      <Card.Title>
        <ButtonGroup className="mb-2">
          <Button
            active={currentComponent === 'chatList'}
            onClick={() => dispatch(setCurrentComponent('chatList'))}
          >
            Chats
          </Button>
          <Button
            active={currentComponent === 'usersList'}
            onClick={() => dispatch(setCurrentComponent('usersList'))}
          >
            Search
          </Button>
        </ButtonGroup>
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
