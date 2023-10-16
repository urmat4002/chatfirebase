import {getAuth} from 'firebase/auth'
import {collection, getFirestore} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useSelector} from 'react-redux'
import {app} from '../firebase'

export const Chats = () => {
  const chatId = useSelector((state) => state.chat.chatId)

  const auth = getAuth()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  const [messages1, loading] = useCollectionData(collection(db, 'messages'))
  console.log(messages1 && messages1[0]['1'])

  const messages = 0
  return (
    <>
      {messages1 &&
        messages1[0]['1'].map((item, index) => (
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
    </>
  )
}
