import { Link } from 'react-router-dom'
import logo from '../../../public/logo.png'

import styles from './NavbarMedia.module.scss'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/UserContext'
import axios from 'axios'
import { MdOutlineExitToApp, MdOutlineAddCircle, MdHome, MdNotifications } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const NavbarMedia = ({ inDashboard }) => {
  const [user, setUser] = useState({})
  const [notification, setNotifications] = useState([])
  // const [inDashboard, setInDashboard] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')
  const { authentication, logout } = useContext(Context)
  const { goTop } = useContext(Context)


  useEffect(() => {
    // Pega os dados do user pelo token e coloca em uma variável
    axios.get('http://localhost:5050/user/getuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUser(res.data)
      setNotifications(user.notification ? user.notification.length : 0)
    })
  }, [user, token])


  return (
    authentication && (
      <nav id={styles.navMedia}>
        <ul>
          <li>
            <a className={`title ${styles.title}`} href="/">
              <img className='hide' src={logo} alt="Logo" />
            </a>
          </li>
          {inDashboard === false ? (
            <li>
              <Link onClick={goTop} to='/dashboard'>
                {user.image ? (
                  <img className={styles.userImg} src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
                ) : (
                  <FaRegUserCircle />
                )}
              </Link>
            </li>
          ) : (
            <li>
              <Link onClick={goTop} to='/'>
                <MdHome />
              </Link>
            </li>
          )}
          <li><Link onClick={goTop} to={'/my-publication'}><MdOutlineAddCircle /></Link></li>
          <li>
              <Link to={'/my-notifications'}>
                <MdNotifications />
                {notification != 0 && <span>{notification}</span>}
              </Link>
            </li>
          <li><button className={styles.logout} onClick={logout}><MdOutlineExitToApp /> </button></li>
        </ul>
      </nav>
    )
  )
}

export default NavbarMedia
