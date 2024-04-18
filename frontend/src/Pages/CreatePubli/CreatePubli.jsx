import { useContext, useState } from 'react'
import styles from './CreatePubli.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../Context/UserContext'
import axios from 'axios'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { GoDot, GoDotFill } from 'react-icons/go'
import useFlashMessage from '../../Hooks/useFlashMessage'

const CreatePubli = () => {
  const [publication, setPublication] = useState({})
  const [preview, setPreview] = useState([])
  const [imageIndex, setImageIndex] = useState(0)
  const [token] = useState(localStorage.getItem('token') || '')
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage()
  const { goTop, publish } = useContext(Context)

  function nextImage() {
    setImageIndex(index => {
      if (index === images.length) return 0
      return index + 1
    })
  }

  function prevImage() {
    setImageIndex(index => {
      if (index === 0) return images.length - 1
      return index - 1
    })
  }

  function handleImage(e) {
    console.log(e.target.files)
    setPreview(Array.from(e.target.files))
    setPublication({ ...publication, images: [...e.target.files] })
  }


  function handleChange(e) {
    setPublication({ ...publication, [e.target.name]: e.target.value })
  }

  

  function handleSubmit(e) {
    e.preventDefault()
    publish(publication, token)
    console.log(publication)
  }

  return (
    <main className={styles.containerCreatePubli}>
      <Link onClick={goTop} to='/' className={styles.title}>MyGram</Link>
      <h1>Publicar</h1>
      {preview.length !== 0 && (
        <div className={styles.previewImgs}>
          {preview.length !== 1 && (
            <>
              <div className={styles.btns}>
                {imageIndex !== 0 ?
                  (
                    <button onClick={prevImage}><MdOutlineKeyboardArrowLeft size={45} /></button>
                  ) : (
                    <button style={{ pointerEvents: 'none', opacity: 0 }}><MdOutlineKeyboardArrowLeft size={45} /></button>
                  )}
                {(imageIndex >= 0 && imageIndex < preview.length - 1) ?
                  (
                    <button onClick={nextImage}><MdOutlineKeyboardArrowRight size={45} /></button>
                  ) : (
                    <button style={{ pointerEvents: 'none', opacity: 0 }} onClick={nextImage}><MdOutlineKeyboardArrowRight size={45} /></button>
                  )}
              </div>
              <div style={{ position: 'absolute', bottom: '.5rem', left: '50%', translate: '-50%', display: 'flex', gap: ".25rem" }} className={styles.dots}>
                {preview.map((_, index) => (
                  <button key={index}>{index === imageIndex ? <GoDotFill /> : <GoDot />}</button>
                ))}
              </div>
            </>
          )}
          {preview.map((image, index) => (
            <img src={URL.createObjectURL(image)} style={{ translate: `${-100 * imageIndex}%` }} alt={`Minha foto ${index + 1}`} key={index} />
          ))}
        </div>
      )}

      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label>Images <span>(Adicione de 1 a 10 fotos)</span></label>
          <input onChange={handleImage} multiple type="file" name="images" id="images" required />
        </div>
        <div>
          <label>Descrição <span>(Até 1000 caracteres)</span></label>
          <textarea onChange={handleChange} placeholder='Adicione uma descrição' name="description" id="description" cols="30" rows="10"></textarea>
        </div>
        <div>
          <label>Localização</label>
          <input onChange={handleChange} type="text" name="localization" id="localization" />
        </div>
        <input className='btnForm' type="submit" value='Publicar' />
      </form>
    </main>
  )
}

export default CreatePubli
