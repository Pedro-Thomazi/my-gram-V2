import React, { useContext, useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Context } from '../../Context/UserContext'
import axios from 'axios'


const Like = ({ idPubli, token, likes }) => {
  const [user, setUser] = useState({})
  const [haveLike, setHaveLike] = useState(false)
  const { likeInPublication } = useContext(Context)

  useEffect(() => {
    axios.get('http://localhost:5050/user/getuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUser(res.data)
    })
  }, [token]);

  function addLike() {
    likeInPublication(idPubli, token)
  }


  return (
    <button onClick={addLike}>
      {haveLike ? (
        <FaHeart size={25} color='red' />
      ) : (
        <FaRegHeart size={25} />
      )}
    </button>
  )
}

export default Like
