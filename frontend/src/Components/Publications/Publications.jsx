import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Publications.module.scss'
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { MdClose, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GoDotFill, GoDot } from "react-icons/go";
import axios from 'axios';
import ConfigsPubli from '../ConfigsPubli/ConfigsPubli';
import CardComments from '../CardComments/CardComments';
import { Context } from '../../Context/UserContext';


const Publications = ({ idPubli, index, userId, userName, userPhoto, localization, images, likes, description, comments }) => {
  const [liked, setLiked] = useState(false)
  const [user, setUser] = useState({})
  const [publication, setPublication] = useState({})
  const [isMyPubli, setIsMyPubli] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')
  const [imageIndex, setImageIndex] = useState(0)
  const [textComment, setTextComment] = useState('')
  const { comment } = useContext(Context)

  useEffect(() => {
    // Pega os dados do user pelo token e coloca em uma variável
    axios.get('http://localhost:5050/user/getuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUser(res.data)
    })

    axios.get(`http://localhost:5050/publications/publication/${idPubli}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setPublication(res.data)
    })
  }, [token])

  function changeHeart() {
    setLiked(!liked)
  }

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

  function funcOpenMenu() {
    setOpenMenu(!openMenu)
  }

  function funcCloseMenu() {
    setOpenMenu(false)
  }

  function funcOpenComments() {
    setOpenComments(!openComments)
  }


  function handleChange(e) {
    setTextComment({ ...textComment, [e.target.name]: e.target.value })
  }

  function addMessage(e) {
    e.preventDefault()
    comment(idPubli, textComment, token)
    console.log(textComment)
  }

  return (
    <div id={`publi${idPubli}`} className={styles.containerPublication}>
      <ConfigsPubli openMenu={openMenu} idPubli={idPubli} btnCancel={funcCloseMenu} />
      <header className={styles.headerPublication}>
        {userId === user._id ? (
          <div className={styles.imgName}>
            <Link to={`/dashboard`}><img src={`http://localhost:5050/images/users/${userPhoto}`} alt={userName} /></Link>
            <div className={styles.nameAndLocation}>
              <Link to={`/dashboard`}>{userName}</Link>
              <p>{localization}</p>
            </div>
          </div>
        ) : (
          <div className={styles.imgName}>
            <Link to={`user/${userName}/${userId}`}><img src={`http://localhost:5050/images/users/${userPhoto}`} alt={userName} /></Link>
            <div className={styles.nameAndLocation}>
              <Link to={`user/${userName}/${userId}`}>{userName}</Link>
              <p>{localization}</p>
            </div>
          </div>
        )}

        <button onClick={funcOpenMenu}>
          <BsThreeDots size={25} />
        </button>
      </header>
      <div className={styles.imagesContainer}>
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
          <img key={index} style={{ translate: `${-100 * imageIndex}%` }} className={styles.publication} src={`http://localhost:5050/images/publications/${image}`} alt={`Publicação de ${userName}`} />
        ))}
      </div>
      <div className={styles.likeComment}>
        <button onClick={changeHeart}>
          {liked ? (
            <FaHeart size={25} color='red' />
          ) : (
            <FaRegHeart size={25} />
          )}
        </button>
        <button onChange={funcOpenComments}>
          <FaRegComment size={25} />
        </button>
      </div>
      <p className={styles.qtdLikes}><span>{likes.length}</span> likes</p>
      <div className={styles.description}>
        <p><span>{userName}</span> {description}</p>
      </div>
      <button onClick={funcOpenComments} className={styles.qtdComments}>Ver todos os <span>{comments.length}</span> comentários</button>
      <div className={`${styles.commentsCard} ${openComments ? styles.openComment : ''}`}>
        <div className={styles.comments}>
          {comments.map((commentData, index) => (
            <div key={index} className={styles.comment}>
              <div className={styles.photoName}>
                <img src={`http://localhost:5050/images/users/${commentData.photo}`} alt={commentData.name} />
                <p>{commentData.name}</p>
              </div>
              <p>{commentData.description}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={addMessage}>
        <textarea onChange={handleChange} maxLength={250} placeholder='Comentar' name="description" id="description" cols="30" rows="10"></textarea>
        <input type="submit" value="Comentar" />
      </form>
    </div>
  )
}

export default Publications
