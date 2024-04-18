import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../Hooks/useFlashMessage'
import axios from 'axios'
import useScrollToTop from './useScrollToTop'

export default function useAuth() {
  const [authentication, setAuthentication] = useState(false)
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const { goTop } = useScrollToTop()


  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      axios.defaults.headers.Authentication = `Bearer ${JSON.stringify(token)}`
      setAuthentication(true)
    }
  }, []);

  async function authUser(data) {
    setAuthentication(true)

    localStorage.setItem('token', JSON.stringify(data.token))

    navigate('/')
  }

  async function login(user) {
    // Mensagens
    let msg = 'Login realizado!'
    let type = 'success'

    try {
      const data = await axios.post('http://localhost:5050/user/login', user).then((res) => {
        return res.data
      })
      authUser(data)
    } catch (error) {
      msg = error.response.data.message
      type = 'error'
    }

    setFlashMessage(msg, type)
  }

  async function register(user) {
    // Mensagens
    let msg = 'Bem Vindo ao MyGram!'
    let type = 'success'

    try {
      const data = await axios.post('http://localhost:5050/user/register', user).then((res) => {
        return res.data
      })
      authUser(data)
    } catch (error) {
      msg = error.response.data.message
      type = 'error'
    }

    setFlashMessage(msg, type)
  }

  async function logout() {
    let msg = 'Saiu!'
    let type = 'success'

    setAuthentication(false)
    localStorage.removeItem('token')
    axios.defaults.headers.Authorization = undefined

    navigate('/login')
    setFlashMessage(msg, type)
    goTop()
  }

  async function updateUser(user, token) {
    let msg = 'Atualizado!'
    let type = 'success'

    const formData = new FormData()

    await Object.keys(user).forEach((key) => {
      formData.append(key, user[key])
    })

    try {
      await axios.patch(`http://localhost:5050/user/update-user/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          // Já que haverá imagem, usar assim, para o jsx entender que é um formulário de imagens
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        return res.data
      })
      navigate('/dashboard')

    } catch (error) {
      msg = error.response.data.message
      type = 'error'
    }

    setFlashMessage(msg, type)
  }


  // Publicações
  async function publish(publication, token) {
    // Mensagens
    let msg = 'Publicado'
    let type = 'success'

    const formData = new FormData()

    await Object.keys(publication).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < publication[key].length; i++) {
          formData.append('images', publication[key][i])
        }
      }
      else {
        formData.append(key, publication[key])
      }
    })


    try {
      await axios.post('http://localhost:5050/publications/create-publi', formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        }
      }).then((res) => {
        return res.data
      })
    } catch (error) {
      msg = error.response.data.message
      type = 'error'
      return err.response.data
    }

    setFlashMessage(msg, type)

    if (type !== 'error') {
      navigate('/')
    }
  }

  async function followUser(idUser, token) {
    // Mensagens
    let msg = 'Seguindo'
    let type = 'success'

    console.log(token)


    await axios.patch(`http://localhost:5050/user/follow-user/${idUser}`, null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msg = err.response.data.message
      type = 'error'
    })

    setFlashMessage(msg, type)

    if (type !== 'error') {
      window.location.reload()
    }
  }

  async function unFollowUser(idUser, token) {
    // Mensagens
    let msg = 'Deixou de seguir'
    let type = 'success'

    console.log(token)


    await axios.patch(`http://localhost:5050/user/un-follow-user/${idUser}`, null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msg = err.response.data.message
      type = 'error'
    })

    setFlashMessage(msg, type)

    if (type !== 'error') {
      window.location.reload()
    }
  }

  async function comment(idPubli, description, token) {
    // Mensagens
    let msg = 'Comentado'
    let type = 'success'

    console.log(description)

    await axios.patch(`http://localhost:5050/publications/comments/${idPubli}`, description, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msg = 'Erro ao comentar!'
      type = 'error'
    })

    setFlashMessage(msg, type)

    if (type !== 'error') {
      window.location.reload()
    }
  }

  async function denouncePubli(idPubli, denounceData, token) {
    // Mensagens
    let msg = 'Denunciado'
    let type = 'success'

    await axios.patch(`http://localhost:5050/publications/denounce-publication/${idPubli}`, denounceData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msg = 'Erro ao denúnciar!'
      type = 'error'
    })

    setFlashMessage(msg, type)

    if (type !== 'error') {
      navigate('/')
    }
  }

  async function removeNotifications(token) {
    // Mensagens
    let msg = 'Notificações Limpas'
    let type = 'success'

    await axios.patch(`http://localhost:5050/user/remove-notifications`, null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msg = 'Erro ao denúnciar!'
      type = 'error'
    })

    setFlashMessage(msg, type)

    if (type !== 'error') {
      window.location.reload()
    }
  }

  async function deletePublication(id, token) {
    // Mensagens
    let msg = 'Publicação Deletada'
    let type = 'success'

    await axios.delete(`http://localhost:5050/publications/remove-publication/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msg = err.response.data.message
      type = 'error'
    })

    setFlashMessage(msg, type)

    if (type !== 'error') {
      window.location.reload()
    }
  }


  return { 
    authentication, 
    login, 
    register, 
    logout, 
    updateUser, 
    publish, 
    followUser,
    unFollowUser,
    comment, 
    denouncePubli, 
    removeNotifications,
    deletePublication }

}