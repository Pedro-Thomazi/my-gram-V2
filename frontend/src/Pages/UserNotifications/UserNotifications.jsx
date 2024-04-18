import { useContext, useEffect, useState } from 'react'
import styles from './UserNotifications.module.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/UserContext'

const UserNotifications = () => {
  const [user, setUser] = useState({})
  const [userNotifications, setUserNotifications] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { removeNotifications } = useContext(Context)

  useEffect(() => {
    // Pega os dados do user pelo token e coloca em uma variável
    axios.get('http://localhost:5050/user/getuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUser(res.data)
      setUserNotifications(user.notification ? user.notification : '')
    })

  }, [userNotifications, token])

  function deleteNotif() {
    removeNotifications(token)
  }

  return (
    <main className={styles.containerNotifications}>
      <Link className={`title ${styles.title}`} to={'/'}>
        <p>MyGram</p>
      </Link>
      <h2>Minhas notificações</h2>

      {userNotifications.length != 0 ? (
        <section className={styles.myNotifications}>
          <div className={styles.actions}>
            <button onClick={deleteNotif} className={styles.btnDelete}>Excluir Notificações</button>
          </div>
          {userNotifications.map((item, index) => (
            <div key={index} className={styles.message}>
              <div className={styles.notif}>
                <p>De: <span>{item.name}</span></p>
                <Link className={styles.itemImgAndName} to={`/user/${item.name}/${item._id}`}>
                  {item.image && (
                    <img className={styles.itemImg} src={`http://localhost:5050/images/users/${item.image}`} alt={item.name} />
                  )}
                  <p className={styles.text}>{item.text}</p>
                </Link>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <p className={styles.notNotif}>Você não tem notificação.</p>
      )}
    </main>
  )
}

export default UserNotifications
