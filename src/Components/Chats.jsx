import {getAuth} from 'firebase/auth'
import {collection, doc, getFirestore, setDoc} from 'firebase/firestore'
import {useEffect, useRef, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useSelector} from 'react-redux'
import {app} from '../firebase'

export const Chats = () => {
  const chat = useRef(null)
  const [value, setValue] = useState('')
  const currentChat = useSelector((state) => state.chat.currentChat)
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  const [messages, loading] = useCollectionData(collection(db, 'messages'))

  chat.current && (chat.current.scrollTop = chat.current.scrollHeight)
  /////////////////////////////////////////

  useEffect(() => {
    setTimeout(() => {
      chat.current.scrollTop = chat.current.scrollHeight
    }, 1000)
  }, [chat])

  const modify = async () => {
    messages[0][currentChat.chatId].push({
      text: value,
      date: Date.now(),
      avatar: 'hi',
      email: user.email,
      uid: user.uid,
    })

    await setDoc(doc(db, 'messages', 'chat'), messages[0])

    setValue('')
    chat.current && (chat.current.scrollTop = chat.current.scrollHeight)
  }

  return (
    <>
      <div>{currentChat.name}</div>
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
        {messages &&
          messages[0][currentChat.chatId].map((item, index) => (
            <p
              style={{
                borderRadius: '4px',
                padding: '3px',
                width: '170px',
                marginLeft: user.uid === item.uid ? 'auto' : '5px',
                border:
                  user.uid === item.uid ? '1px solid green' : '1px solid red',
              }}
              key={index}
            >
              {item.text}
            </p>
          ))}
      </div>
      <Form.Control value={value} onChange={(e) => setValue(e.target.value)} />

      <Button style={{margin: '10px'}} onClick={modify}>
        Send
      </Button>
    </>
  )
}
