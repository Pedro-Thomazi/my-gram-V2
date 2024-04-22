import { useContext, useEffect, useState } from 'react'
import styles from './UpdateUser.module.scss'
import { Context } from '../../Context/UserContext'
import { MdOutlineClose } from "react-icons/md";
import axios from 'axios'
import { Link } from 'react-router-dom';

const UpdateUser = () => {
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const { updateUser } = useContext(Context)
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
  }, [token])

  function handleImage(e) {
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  }


  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  function handleSubmit(e) {
    e.preventDefault()
    updateUser(user, token)
  }
  return (
    <section className={styles.updateUserContainer}>
      <div className={styles.container}>
        <Link to='/dashboard' className={styles.closeBtn}>
          <MdOutlineClose />
        </Link>
        <h1>Atualizar</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.userImage}>
            {(user.image || preview) && (
              <img src={preview ? URL.createObjectURL(preview) : `http://localhost:5050/images/users/${user.image}`} alt="" />
            )}
          </div>
          <div>
            <input onChange={handleChange} type="text" name="name" id="name" maxLength={10} required value={user.name || ''} />
            <label className={styles.label}>Nome</label>
          </div>
          <div>
            <input onChange={handleChange} type="email" name="email" id="email" required value={user.email || ''} />
            <label className={styles.label}>E-mail</label>
          </div>
          <div>
            <textarea onChange={handleChange} name="description" id="description" maxLength={100} value={user.description || ''}></textarea>
            <label className={styles.label}>Descrição</label>
          </div>
          <div>
            <input onChange={handleImage} type="file" name="image" id="image" />
            <label className={styles.label}>Foto de Perfil</label>
          </div>
          <div>
            {/* <input onChange={handleChange} type="checkbox" name="darkMode" id="darkMode" />
            <label htmlFor='darkMode' className={styles.inputLabel}>Modo Escuro</label> */}
            {/* <select onChange={handleChange} name="mode" id="mode" value={user.darkMode || ''}>
              <option value="whiteMode">Modo Claro</option>
              <option value="darkMode">Modo Escuro</option>
            </select> */}
          </div>
          <input className='btnForm' type="submit" value="Atualizar" />
        </form>
      </div>
    </section>
  )
}

export default UpdateUser
