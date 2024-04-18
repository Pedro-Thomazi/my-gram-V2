import { FaArrowRight } from 'react-icons/fa'
import styles from './DenouncePage.module.scss'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../../Context/UserContext'

const DenouncePage = () => {
  const { id } = useParams()
  const { denouncePubli } = useContext(Context)
  const [denounceData, setDenounceData] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')

  
  function handleChange(e) {
    setDenounceData({ ...denounceData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    denouncePubli(id, denounceData, token)
    console.log(denounceData)
  }

  return (
    <main className={styles.containerDenouncePage}>
      <Link className='title' to={'/'}>MyGram</Link>
      <section className={styles.content}>
        <h1>Denúnciar publicação de user.name</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.description}>
            <label>Descrição</label>
            <textarea onChange={handleChange} placeholder='Adicione ou não uma descrição detalhando o motivo da denúncia' name="description" id="description" cols="30" rows="10"></textarea>
          </div>
          <div>
            <input onChange={handleChange} type="checkbox" name="spam" id="spam" />
            <label htmlFor='spam'>É spam <FaArrowRight /></label>
          </div>
          <div>
            <input onChange={handleChange} type="checkbox" name="nudez" id="nudez" />
            <label htmlFor='nudez'>Nudez ou atividade sexual <FaArrowRight /></label>
          </div>
          <div>
            <input onChange={handleChange} type="checkbox" name="hate" id="hate" />
            <label htmlFor='hate'>Discurso ou símbolos de incentivo ao ódio <FaArrowRight /></label>
          </div>
          <div>
            <input onChange={handleChange} type="checkbox" name="crime" id="crime" />
            <label htmlFor='crime'>Violência ou organizações perigosas <FaArrowRight /></label>
          </div>
          <input id={styles.btnDenun} type="submit" className='btnForm' value='Denunciar' />
        </form>
      </section>
    </main>
  )
}

export default DenouncePage
