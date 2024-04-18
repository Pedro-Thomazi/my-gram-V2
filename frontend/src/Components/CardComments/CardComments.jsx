import { GoDot, GoDotFill } from 'react-icons/go';
import styles from './CardComments.module.scss'
import { MdClose, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from 'react';


const CardComments = ({ open, images, userName, comments }) => {
  const [imageIndex, setImageIndex] = useState(0)
  
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


  console.log(comments)

  return (
    <div className={`${styles.commentsCard} ${open ? styles.open : ''}`}>
    </div>
  )
}

export default CardComments
