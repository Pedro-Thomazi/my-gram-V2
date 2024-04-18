import { Link } from 'react-router-dom'
import styles from './MyFollows.module.scss'

const MyFollows = ({ type, datas }) => {
  return (
    <>

      {type === 'followers' && (
        <section className={styles.container}>
          <h2>Seguidores</h2>
          <div className={styles.containerUsers}>
            {datas.map((user, index) => (
              <Link key={index} className={styles.containerUser} to={`/user/${user.name}/${user._id}`}>
                <img src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
                <span>{user.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {type === 'following' && (
        <section className={styles.container}>
          <h2>Seguindo</h2>
          <div className={styles.containerUsers}>
            {datas.map((user, index) => (
              <Link key={index} className={styles.containerUser} to={`/user/${user.name}/${user._id}`}>
                <img src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
                <span>{user.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </>
  )
}

export default MyFollows
