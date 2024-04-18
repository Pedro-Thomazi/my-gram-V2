import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import { Context } from '../../Context/UserContext'
import axios from 'axios'
import PhotoAllUsers from '../../Components/PhotoAllUsers/PhotoAllUsers'
import styles from './Home.module.scss'
import NavbarMedia from '../../Components/NavbarMedia/NavbarMedia'
import ProtectRoutes from '../../Hooks/useProtectRoutes'
import Publications from '../../Components/Publications/Publications'

const Home = () => {
  const [user, setUser] = useState({})
  const [publications, setPublications] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    // Pega os dados do user pelo token e coloca em uma variável
    axios.get('http://localhost:5050/user/getuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUser(res.data)
    })

    // Pega os dados do user pelo token e coloca em uma variável
    axios.get('http://localhost:5050/publications').then((res) => {
      setPublications(res.data.publications)
    })
  }, [token])

  return (
    <div>
      <Header />
      <Navbar inDashboard={false} />
      <NavbarMedia inDashboard={false} />
      <main className={styles.container}>
        <PhotoAllUsers />
        {publications.length > 0 && (
          publications.map((publi, index) => (
            <Publications key={publi._id} index={index} idPubli={publi._id} userId={publi.user._id} userName={publi.user.name} userPhoto={publi.user.image} localization={publi.localization} images={publi.images} likes={publi.likes} description={publi.description} comments={publi.comments} />
          ))
        )}
        {publications.length === 0 && (
          <h1>Sem publicações, seja você o primeiro(a)</h1>
        )}
      </main>
    </div>
  )
}

export default Home
