import {getAuth} from 'firebase/auth'
import {collection, getFirestore} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {app} from '../firebase'

export const Users = () => {
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  let [users, loading] = useCollectionData(collection(db, 'users'))
  console.log(users)
  if (users) users = users.filter((item) => item.email != user.email)
  return (
    <>
      {users &&
        users.map((item, index) => (
          <p onClick={() => console.log('hi')} key={index}>
            {item.email}
          </p>
        ))}
    </>
  )
}
