import {getAuth} from 'firebase/auth'
import {collection, doc, getFirestore, setDoc} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useDispatch} from 'react-redux'
import {app} from '../firebase'
import {setCurrentChat, setCurrentComponent} from '../store/slice'

export const Users = () => {
  const dispatch = useDispatch()
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const db = getFirestore(app)
  let [users, loading] = useCollectionData(collection(db, 'users'))
  let [messages] = useCollectionData(collection(db, 'messages'))

  let usersList = []
  if (users) {
    usersList = users.filter((item) => item.email != user.email)
  }

  const addChat = async (currentUser) => {
    const chatId = Date.now()
    let temp = []

    const [authorizedUser] = users.filter((item) => item.email === user.email)
    const [isChatExist] = authorizedUser.chats.filter(
      (item) => item.name === currentUser.email,
    )

    if (isChatExist) {
      dispatch(setCurrentChat(isChatExist))
      dispatch(setCurrentComponent('chats'))
      return
    }

    temp = authorizedUser.chats
    temp.push({chatId, name: currentUser.email})

    await setDoc(doc(db, 'users', authorizedUser.email), {
      date: authorizedUser.date,
      avatar: authorizedUser.avatar,
      email: authorizedUser.email,
      uid: authorizedUser.uid,
      chats: temp,
    })
    ////////////////////////////////

    temp = currentUser.chats
    temp.push({chatId, name: authorizedUser.email})
    console.log(currentUser)
    await setDoc(doc(db, 'users', currentUser.email), {
      date: currentUser.date,
      avatar: currentUser.avatar,
      email: currentUser.email,
      uid: currentUser.uid,
      chats: temp,
    })

    //////////////////////////////////

    await setDoc(doc(db, 'messages', 'chat'), {...messages[0], [chatId]: []})

    dispatch(setCurrentChat({chatId, name: currentUser.email}))
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
          usersList.map((item, index) => (
            <p onClick={() => addChat(item)} key={index}>
              {item.email}
            </p>
          ))}
      </div>
    </>
  )
}
