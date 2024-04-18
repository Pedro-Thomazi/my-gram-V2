import { useState, useEffect, useContext } from 'react'
import styles from './UserPage.module.scss'
import axios from 'axios'
import { Context } from '../../Context/UserContext'
import { MdOutlineExitToApp } from "react-icons/md";
import { Link, useParams } from 'react-router-dom'
import NavbarMedia from '../../Components/NavbarMedia/NavbarMedia';
import UserPublications from '../../Components/UserPublications/UserPublications';
import Navbar from '../../Components/Navbar/Navbar';

const UserPage = () => {
  const { id } = useParams()
  const [me, setMe] = useState({})
  const [user, setUser] = useState({})
  const [followers, setFollowers] = useState('')
  const [following, setFollowing] = useState('')
  const [followersArray, setFollowersArray] = useState([])
  const [userPublications, setUserPublications] = useState([])
  const [changeBtnFollow, setChangeBtnFollow] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')
  const { authentication, followUser, unFollowUser } = useContext(Context)

  useEffect(() => {
    axios.get('http://localhost:5050/user/getuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setMe(res.data)
    })

    axios.get(`http://localhost:5050/user/get-user-by-id/${id}`).then((res) => {
      setUser(res.data.user)
      setFollowers(user.followers && user.followers.length)
      setFollowing(user.following && user.following.length)
      setFollowersArray(user.followers && user.followers)
      for (let item of followersArray) {
        if (item._id == me._id) {
          setChangeBtnFollow(true)
        }
      }
    })

    axios.get(`http://localhost:5050/publications/user-publications/${id}`).then((res) => {
      setUserPublications(res.data.userPublications)
    })

  }, [user, token])


  // console.log(followersArray)
  // console.log(me._id)

  function follow() {
    followUser(id, token)
  }

  function unFollow() {
    unFollowUser(id, token)
  }

  return (
    authentication && (
      <section className={styles.dashboardContainer}>
        <header className={styles.headerDashboard}>
          <div className={styles.photoUser}>
            <img src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
          </div>

          <div className={styles.configsUser}>
            <div className={styles.editDashboard}>
              <h1>{user.name}</h1>
              {changeBtnFollow ? (
                <button className={styles.btnUnFollow} onClick={unFollow}>Deixar de Seguir</button>
              ) : (
                <button onClick={follow}>Seguir</button>
              )}
            </div>
            <div className={styles.follws}>
              <p><span>{userPublications.length}</span> publicações</p>
              <p><span>{followers}</span> seguidores</p>
              <p><span>{following}</span> seguindo</p>
            </div>
            <div className={styles.description}>
              <p>{user.description}</p>
            </div>
          </div>
        </header>


        <Navbar inDashboard={true} />
        <NavbarMedia inDashboard={false} />
        <UserPublications configs={userPublications} images={userPublications.images} />

      </section>
    )
  )
}

export default UserPage
