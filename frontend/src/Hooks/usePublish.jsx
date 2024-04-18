import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../Hooks/useFlashMessage'
import axios from 'axios'


export default function usePublish() {
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()


  async function publish(publication) {
    // Mensagens
    let msg = 'Publicado'
    let type = 'success'

    try {
      const data = await axios.post('http://localhost:5050/publications/create-publi', publication).then((res) => {
        return res.data
      })
      authUser(data)
    } catch (error) {
      msg = error.response.data.message
      type = 'error'
    }

    setFlashMessage(msg, type)
  }

  return {publish}

}