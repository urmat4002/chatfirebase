import {getAuth} from 'firebase/auth'
import {collection, getFirestore} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {app} from '../firebase'

export const ChatList = ({setChats}) => {
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)

  let [users, loading] = useCollectionData(collection(db, 'users'))
  console.log(users)
  if (users) users = users.filter((item) => item.email != user.email)

  const handleClick = () => {
    setChats(true)
  }

  return (
    <>
      {users &&
        users[0].chats.map((item, index) => (
          <p
            onClick={() => handleClick(item.name)}
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
    </>
  )
}
