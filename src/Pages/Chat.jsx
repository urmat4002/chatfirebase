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

export const Chat = () => {
  const [chats, setChats] = useState(false)
  const chat = useRef(null)
  const [value, setValue] = useState('')

  const db = getFirestore(app)
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const [messages, loading] = useCollectionData(collection(db, 'cities'))

  messages && messages.sort((a, b) => a.date - b.date)

  ////////////////////////////////////////////
  chat.current && (chat.current.scrollTop = chat.current.scrollHeight)
  /////////////////////////////////////////

  useEffect(() => {
    setTimeout(() => {
      chat.current.scrollTop = chat.current.scrollHeight
    }, 1000)
  }, [chat])

  //////////////////////////////////////////////////

  const modify = async () => {
    messages[0].dialog1.push({
      text: value,
      date: Date.now(),
      avatar: 'hi',
      email: user.email,
      uid: user.uid,
    })
    const temp = messages[0].dialog1
    console.log(temp)
    await setDoc(doc(db, 'cities', 'LA'), {
      dialog1: temp,
    })

    setValue('')
    chat.current && (chat.current.scrollTop = chat.current.scrollHeight)
  }

  ///////////////////////////////////////////////////////////////////

  const writeDatabase = async () => {
    try {
      const docRef = await addDoc(collection(db, 'messages'), {
        text: value,
        date: Date.now(),
        avatar: 'hi',
        email: user.email,
        uid: user.uid,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    setValue('')
    chat.current && (chat.current.scrollTop = chat.current.scrollHeight)
  }

  ///////////////////////////////////////////////////////

  return (
    <Card style={{width: '300px', margin: '20px', padding: '10px'}}>
      <Card.Title>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div onClick={() => setChats(false)}>Chats</div>
          <div>search</div>
        </div>
      </Card.Title>
      <Form>
        <div
          ref={chat}
          style={{
            overflow: 'auto',
            height: '300px',
            border: '1px solid silver',
            borderRadius: '10px',
            marginBottom: '10px',
            padding: '5px',
          }}
        >
          {chats ? <Chats /> : <ChatList setChats={setChats} />}
        </div>
        <Form.Control
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button style={{margin: '10px'}} onClick={modify}>
          Send
        </Button>
      </Form>
    </Card>
  )
}

/*<p
style={{
  border: '1px solid silver',
  borderRadius: '4px',
  padding: '3px',
  width: '170px',
  marginLeft: user.uid === item.uid ? 'auto' : '5px',
}}
key={index}
></p>*/
