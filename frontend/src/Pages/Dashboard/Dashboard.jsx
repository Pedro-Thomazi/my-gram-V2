import { useState, useEffect, useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './Dashboard.module.scss'
import axios from 'axios'
import { Context } from '../../Context/UserContext'
import { MdOutlineExitToApp, MdClose } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom'
import NavbarMedia from '../../Components/NavbarMedia/NavbarMedia';
import UserPublications from '../../Components/UserPublications/UserPublications';
import MyFollows from '../../Components/MyFollows/MyFollows'

const Dashboard = () => {
  const [user, setUser] = useState({})
  const [followers, setFollowers] = useState('')
  const [following, setFollowing] = useState('')
  const [myPublications, setMyPublications] = useState([])
  const [showFollows, setShowFollows] = useState('')
  const [datasFollows, setDatasFollows] = useState([])
  const [datasFollowings, setDatasFollowings] = useState([])
  const [openMenuFollow, setOpenMenuFollow] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')
  const { authentication } = useContext(Context)

  useEffect(() => {
    // Pega os dados do user pelo token e coloca em uma variável
    axios.get('http://localhost:5050/user/getuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUser(res.data)
      setFollowers(user.followers && user.followers.length)
      setFollowing(user.following && user.following.length)
      setDatasFollowings(user && user.followings)
      
    })

    // Pega apenas as publicações do usuário pelo seu token
    axios.get('http://localhost:5050/publications/my-publications', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setMyPublications(res.data.myPublications)
    })

  }, [user, token])

  // console.log(datasFollows)

  function openFollowerMenu() {
    setDatasFollows(user && user.followers)
    setShowFollows('followers')
    setOpenMenuFollow(true)
  }

  function openFollowingMenu() {
    setDatasFollows(user.following)
    setShowFollows('following')
    setOpenMenuFollow(true)

  }
  
  function closeFollowMenu() {
    setOpenMenuFollow(false)
  }



  return (
    authentication && (
      <section className={styles.dashboardContainer}>
        <Navbar inDashboard={true} />
        <div className={`${styles.myFollowsContainer} ${openMenuFollow ? styles.openFollow : ''}`}>
          <div>
            <button onClick={closeFollowMenu} ><MdClose size={40} /></button>
            {datasFollows && <MyFollows type={showFollows} datas={datasFollows} />}
          </div>
        </div>
        <header className={styles.headerDashboard}>
          <div className={styles.photoUser}>
            <img src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
          </div>

          <div className={styles.configsUser}>
            <div className={styles.editDashboard}>
              <h1>{user.name}</h1>
              <Link to={`/update-perfil/${user._id}`}>Editar perfil</Link>
              {/* <button className={styles.btnLogout} onClick={logout}><MdOutlineExitToApp /><p>Sair</p></button> */}
            </div>
            <div className={styles.follws}>
              <p><span>{myPublications.length}</span> publicações</p>
              <p onClick={openFollowerMenu}><span>{followers}</span> seguidores</p>
              <p onClick={openFollowingMenu}><span>{following}</span> seguindo</p>
            </div>
            <div className={styles.description}>
              <p>{user.description}</p>
            </div>
          </div>
        </header>

        {/* Barras de navegação */}
        <NavbarMedia inDashboard={true} />

        {/* Publicações do Usuário */}
        <UserPublications configs={myPublications} images={myPublications.images} />
      </section>
    )
  )
}

export default Dashboard
