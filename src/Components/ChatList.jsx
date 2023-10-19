import {getAuth} from 'firebase/auth'
import {collection, getFirestore} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useDispatch} from 'react-redux'
import {app} from '../firebase'
import {setCurrentChat, setCurrentComponent} from '../store/slice'

export const ChatList = () => {
  const dispatch = useDispatch()
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)

  let [users, loading] = useCollectionData(collection(db, 'users'))

  if (users) users = users.filter((item) => item.email === user.email)

  const handleClick = (chat) => {
    dispatch(setCurrentChat(chat))
    dispatch(setCurrentComponent('chats'))
  }

  return (
    <>
      <div
        style={{
          overflow: 'auto',
          height: '300px',
          border: '1px solid silver',
          borderRadius: '10px',
          marginBottom: '10px',
          padding: '5px',
        }}
      >
        {users &&
          users[0].chats.map((item, index) => (
            <p
              onClick={() => handleClick(item)}
              style={{
                borderRadius: '4px',
                padding: '3px',
                width: '170px',
              }}
              key={index}
            >
              {item.name}
            </p>
          ))}
      </div>
    </>
  )
}
