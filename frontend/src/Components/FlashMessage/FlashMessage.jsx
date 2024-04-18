import { useEffect, useState } from 'react'
import styles from './FlashMessage.module.scss'
// bus = Evento de mensagem
import bus from '../../Utils/bus'

const FlashMessage = () => {
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    // Add evento de flash
    bus.addListener('flash', ({message, type}) => {
      setVisibility(true)
      setMessage(message)
      setType(type)

      setTimeout(() => {
        setVisibility(false)
      }, 5000)
    })
  }, []);

  return (
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>
        {/* message recebida do bach-end */}
        {message}
        <span></span>
      </div>
    )
  )
}

export default FlashMessage
