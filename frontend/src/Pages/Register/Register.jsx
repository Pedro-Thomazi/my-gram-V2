import styles from './Register.module.scss'
import { Link } from 'react-router-dom'

import img1 from '../../Images/ImgsLogin/img1.jpg'
import img2 from '../../Images/ImgsLogin/img2.jpg'
import img3 from '../../Images/ImgsLogin/img3.jpg'
import img4 from '../../Images/ImgsLogin/img4.jpg'
import img5 from '../../Images/ImgsLogin/img5.jpg'
import img6 from '../../Images/ImgsLogin/img6.jpg'
import { useContext, useState } from 'react'
import { Context } from '../../Context/UserContext'

const images1 = [img1, img2, img3]
const images2 = [img4, img5, img6]

const Login = () => {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)
  const [indexImg, setIndexImg] = useState(Math.floor(Math.random() * 3))

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
  }


  function handleSubmit(e) {
    e.preventDefault()
    console.log(user)
    register(user)
  }


  return (
    <section id={styles.loginContainer}>
      <div className={styles.contextContainer}>
        <div className={styles.text}>
          <div className={styles.images}>
            <img src={images1[indexImg]} alt="Conjunto de fotos 1" />
            <img src={images2[indexImg]} alt="Conjunto de fotos 2" />
          </div>
        </div>
        <div className={styles.container}>
          <h1>Registrar-se</h1>
          <form onSubmit={handleSubmit} className='form'>
            <div>
              <input onChange={handleChange} type="text" name="name" id="name" required />
              <label className={styles.label}>Nome</label>
            </div>
            <div>
              <input onChange={handleChange} type="email" name="email" id="email" required />
              <label className={styles.label}>E-mail</label>
            </div>
            <div>
              <input onChange={handleChange} type="password" name="password" id="password" required />
              <label className={styles.label}>Senha</label>
            </div>
            <div>
              <input onChange={handleChange} type="password" name="confirmpassword" id="confirmpassword" required />
              <label className={styles.label}>Confirmação de Senha</label>
            </div>
            <input className='btnForm' type="submit" value="Entrar" />
          </form>
          <p>Já tem uma conta? <Link to='/login'>Clique Aqui.</Link></p>
        </div>
      </div>
      <footer className={styles.footer}>
        <div>
          <p>MyGram</p>
          <p>Sobre</p>
          <p>Blog</p>
          <p>Carreiras</p>
          <p>Ajuda</p>
          <p>API</p>
          <p>Privacidade</p>
          <p>Termos</p>
          <p>Localizações</p>
          <p>MyGram Lite</p>
          <p>Carregamento de contatos e não usuários</p>
          <p>MyGram Verified</p>
          <p>Português (Brasil)</p>
          <p>Português (Brasil)</p>
          <p>© 2024 MyGram</p>
        </div>

        <p className={styles.site}>www.mygram.com</p>
      </footer>
    </section>
  )
}

export default Login
