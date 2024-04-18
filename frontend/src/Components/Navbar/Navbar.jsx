import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'

import logo from '../../../public/logo.png'

import { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/UserContext'
import { MdOutlineExitToApp, MdOutlineAddCircle, MdNotifications } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';

const Navbar = ({ inDashboard }) => {
  const [user, setUser] = useState({})
  const [notification, setNotifications] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const [openMenu, setOpenMenu] = useState(false)
  const [openLinks, setOpenLinks] = useState(false)
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
      setNotifications(user.notification ? user.notification.length : [])
    })
  }, [user, token])

  function changeBtn() {
    setOpenMenu(!openMenu)
    setOpenLinks(!openLinks)
    goTop()
  }


  return (
    authentication && (
      <nav id={styles.navbar} className={`${openLinks ? styles.open : ''}`}>
        {inDashboard ? (
          <Link className={`title ${styles.title}`} to={'/'}>
            <p>MyGram</p>
            <img className='hide' src={logo} alt="Logo" />
          </Link>
        ) : (
          <a className={`title ${styles.title}`} href="#top">
            <p>MyGram</p>
            <img className='hide' src={logo} alt="Logo" />
          </a>
        )}
        <div className={`${styles.links} ${openLinks ? styles.open : ''}`}>
          <ul>
            <li>
              <Link onClick={changeBtn} to='/dashboard'>
                {user.image ? (
                  <img className={styles.userImg} src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
                ) : (
                  <FaRegUserCircle />
                )}
                <p>{user.name}</p>
              </Link>
            </li>
            <li><Link onClick={changeBtn} to={'/my-publication'}><MdOutlineAddCircle /><p>Criar</p></Link></li>
            <li>
              <Link onClick={changeBtn} to={'/my-notifications'}>
                <MdNotifications />
                <p>Notificações</p>
                {notification != 0 && <span>{notification}</span>}
                </Link>
                </li>
            <li><button className={styles.logout} onClick={logout}><MdOutlineExitToApp /> <p>Sair</p></button></li>
          </ul>
        </div>
      </nav >
    )
  )
}

export default Navbar
