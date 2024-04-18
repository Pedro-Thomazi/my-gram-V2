import { useContext, useEffect, useState } from 'react'
import styles from './MyPubli.module.scss'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { GoDot, GoDotFill, GoHeart, GoHeartFill } from 'react-icons/go'
import { Context } from '../../Context/UserContext'

const MyPubli = () => {
  const { id } = useParams()
  const [publication, setPublication] = useState([])
  const [user, setUser] = useState({})
  const [comments, setComments] = useState([])
  const [images, setImages] = useState([])
  const [imageIndex, setImageIndex] = useState(0)
  const [likes, setLikes] = useState(0)
  const [textComment, setTextComment] = useState('')
  const [token] = useState(localStorage.getItem('token') || '')
  const { deletePublication, comment } = useContext(Context)

  useEffect(() => {
    // Pega apenas as publicações do usuário pelo seu token
    axios.get(`http://localhost:5050/publications/publication/${id}`).then((res) => {
      setPublication(res.data.publication)
      if (res.data.publication && res.data.publication.images) {
        setImages(res.data.publication.images)
      }
      if (res.data.publication && res.data.publication.comments) {
        setComments(res.data.publication.comments)
      }
      if (res.data.publication && res.data.publication.user) {
        setUser(res.data.publication.user)
      }
      if (res.data.publication && res.data.publication.likes) {
        setLikes(res.data.publication.likes.length)
      }
    })

  }, [id])

  console.log(images)

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
  
  function handleChange(e) {
    setTextComment({ ...textComment, [e.target.name]: e.target.value })
  }

  function addMessage(e) {
    e.preventDefault()
    comment(id, textComment, token)
    console.log(textComment)
  }

  function funcDeletePublication() {
    deletePublication(id, token)
  }

  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.images}>
          {images.length !== 1 && (
            <>
              <div className={styles.btns}>
                {imageIndex !== 0 ?
                  (
                    <button onClick={prevImage}><MdOutlineKeyboardArrowLeft size={45} /></button>
                  ) : (
                    <button style={{ pointerEvents: 'none', opacity: 0 }}><MdOutlineKeyboardArrowLeft size={45} /></button>
                  )}
                {(imageIndex >= 0 && imageIndex < images.length - 1) ?
                  (
                    <button onClick={nextImage}><MdOutlineKeyboardArrowRight size={45} /></button>
                  ) : (
                    <button style={{ pointerEvents: 'none', opacity: 0 }} onClick={nextImage}><MdOutlineKeyboardArrowRight size={45} /></button>
                  )}
              </div>
              <div className={styles.dots} style={{ position: 'absolute', bottom: '.5rem', left: '50%', translate: '-50%', display: 'flex', gap: ".25rem" }} >
                {images.map((_, index) => (
                  <button key={index}>{index === imageIndex ? <GoDotFill /> : <GoDot />}</button>
                ))}
              </div>
            </>
          )}
          {images.map((image, index) => (
            <img key={index} style={{ translate: `${-100 * imageIndex}%` }} src={`http://localhost:5050/images/publications/${image}`} alt={`Foto ${index + 1}`} />
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={funcDeletePublication}>Excluir</button>
          <Link to='/dashboard'>Voltar</Link>
        </div>
      </div>
      <div className={styles.commentsContainer}>
        <div className={styles.myName}>
          <img src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
          <p>{user.name}</p>
        </div>
        <div className={styles.comments}>
          {publication.description && (
            <div className={styles.comment}>
              <img src={`http://localhost:5050/images/users/${user.image}`} alt={user.name} />
              <p><span>{user.name}</span> {publication.description}</p>
            </div>
          )}
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <img src={`http://localhost:5050/images/users/${comment.photo}`} alt={comment.name} />
              <p><span>{comment.name}</span> {comment.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.likes}>
          <GoHeartFill size={30} color='#fff' />
          <p>{likes}</p>
        </div>
        <form className={styles.form} onSubmit={addMessage}>
          <textarea onChange={handleChange} placeholder='Comentar' name="description" maxLength={250} id="description" cols="30" rows="10"></textarea>
          <input type="submit" value="Comentar" />
        </form>
      </div>
    </section>
  )
}

export default MyPubli
