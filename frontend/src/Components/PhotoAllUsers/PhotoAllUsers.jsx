import { useEffect, useState } from 'react'
import styles from './PhotoAllUsers.module.scss'
import axios from 'axios'
import userNotImg from '../../Images/ImgsLogin/userNotImg.png'
import { Link } from 'react-router-dom'

const PhotoAllUsers = () => {
  const [me, setMe] = useState([])
  const [users, setUsers] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    axios.get('http://localhost:5050/user/getuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setMe(res.data)
    })

    // Pega os dados do user pelo token e coloca em uma variável
    axios.get('http://localhost:5050/user/allusers', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUsers(res.data.users)
    })

  }, [token])

  return (
    <section className={styles.containerUsers}>
      {users.map((user) => (
        user._id === me._id ? (
          <Link key={user._id} to={`/dashboard`} className={styles.user}>
            {user.image ? (
              <img src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
            ) : (
              <img src={userNotImg} alt={user.name} />
            )}
            <p>{user.name}</p>
          </Link>
        ) : (
          <Link key={user._id} to={`user/${user.name}/${user._id}`} className={styles.user}>
            {user.image ? (
              <img src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
            ) : (
              <img src={userNotImg} alt={user.name} />
            )}
            <p>{user.name}</p>
          </Link>
        )
      ))}
    </section>
  )
}

export default PhotoAllUsers
