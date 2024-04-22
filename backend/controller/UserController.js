const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = class UserController {
  // Para pegar todos os users do Banco
  static async getAllUsers(req, res) {
    const users = await User.find().select('-password')

    res.status(200).json({ message: "All Users", users })
  }

  static async getUserById(req, res) {
    const id = req.params.id
    const user = await User.findOne({ _id: id }).select('-password')

    res.status(200).json({ message: 'User', user })
  }

  // Registrar um user
  static async registerUser(req, res) {
    // {name, email, password, confirmpassword} que virão do front
    const { name, email, password, confirmpassword } = req.body



    // Validations
    if (!name) {
      res.status(422).json({ message: 'O Nome é obrigatório!' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'O E-mail é obrigatório!' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'A Senha é obrigatória!' })
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'A Confirmação de Senha é obrigatória!' })
      return
    }
    if (password !== confirmpassword) {
      res.status(422).json({ message: 'A Confirmação de Senha e a Senha são incompatíveis!' })
      return
    }

    // Vai fazer uma busca no banco
    const userExists = await User.findOne({ email: email })

    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro E-mail!' })
      return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Preenchendo a class de criação de User
    const user = new User({
      name,
      email,
      following: [],
      followers: [],
      notification: [],
      publications: 0,
      darkMode: false,
      password: passwordHash
    })

    try {
      // Criando o user no banco
      const newUser = await user.save()
      // res.status(200).json({ message: "Usuário Cadastrado" })
      // Cria um token para o user
      await createUserToken(newUser, req, res)
    } catch (error) {
      console.log('Erro ao criar user: ', + error)
      res.status(500).json({ message: error })
    }
  }

  // Logar um user existente
  static async loginUser(req, res) {
    // {email, password} que virão do front
    const { email, password } = req.body

    if (!email) {
      res.status(422).json({ message: 'O E-mail é obrigatório!' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'A Senha é obrigatória!' })
      return
    }

    // Existe?
    const user = await User.findOne({ email: email })

    if (!user) {
      res.status(422).json({ message: 'E-mail inexistente!' })
      return
    }

    // Comparar as senhas
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      res.status(422).json({ message: 'Senha inválida!' })
      return
    }

    // logar o user com o token dele
    await createUserToken(user, req, res)
  }

  // Pegar informações do user pelo seu token
  static async getUser(req, res) {
    let currentUser

    // O browser fica com o token guardado.
    // console.log(req.headers.authorization)

    // Se tiver algum token
    if (req.headers.authorization) {
      const token = getToken(req)
      // Com o token guardado busca o dono do token, coletando suas informações
      const decoded = jwt.verify(token, 'nossosecret')

      // Buscando o user pelo seu id
      currentUser = await User.findById(decoded.id).select('-password')
      // Escondendo a senha
      currentUser.password = undefined
    }
    else {
      // Caso não venha um user
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async updateUser(req, res) {
    // console.log(req.headers.authorization)

    const id = req.params.id
    const { name, email, description, darkMode } = req.body
    const user = {}

    if (req.file) {
      user.image = req.file.filename
    }

    // Validations
    if (!name) {
      res.status(422).json({ message: 'O Nome é obrigatório!' })
      return
    }
    user.name = name

    if (!email) {
      res.status(422).json({ message: 'O E-mail é obrigatório!' })
      return
    }
    // const userExists = await User.findOne({ email: email })

    // if (user.email !== email && userExists) {
    //   res.status(422).json({ message: 'Utilize outro E-mail!' })
    //   return
    // }

    user.email = email

    user.description = description

    if (darkMode == 'on') {
      user.darkMode = true
    }
    else {
      user.darkMode = false
    }



    await User.updateOne({ _id: id }, { $set: user }, { new: true })

    res.status(200).json({ message: 'Usuário Atualizado' })

  }

  static async followUserById(req, res) {
    const id = req.params.id

    const token = getToken(req)

    // Me
    const user = await getUserByToken(token)
    // User
    const userFollowers = await User.findById(id)

    if (user._id == id) {
      return res.status(400).json({ message: 'Você não pode se seguir' })
    }

    // Checar se já segui
    const followerIds = userFollowers.followers.map(follower => follower._id)
    for (let i of followerIds) {
      if (user._id.toString() == i.toString()) {
        return res.status(400).json({ message: "Você já está seguindo esse perfil." })
      }
    }

    // Informações do usuário que seguirá outro
    const followerData = {
      _id: user._id,
      name: user.name,
      image: user.image
    }

    // Notificação para o usuário que recebeu uma seguida
    const notificationForUser = {
      by: "MyGram",
      _id: user._id,
      name: user.name,
      text: `${user.name} começou a seguir você`,
      image: user.image
    }

    const useFollower = await User.findOne({ _id: id })

    // Informações do usuário que recebeu uma seguida
    const followingData = {
      _id: useFollower._id,
      name: useFollower.name,
      image: useFollower.image
    }


    try {
      const newUser = await User.updateOne({ _id: id }, { $push: { followers: followerData, notification: notificationForUser } }, { new: true })
      const userFollowing = await User.updateOne({ _id: user._id }, { $push: { following: followingData } }, { new: true })
      return res.status(200).json({ message: 'Seguindo', newUser, otherMessage: 'Seguidor', userFollowing })
    } catch (error) {
      return res.status(400).json({ message: 'Usuário não encontrado' })
    }
  }

  static async unFollowUserById(req, res) {
    const id = req.params.id

    // Me
    const token = getToken(req)
    const user = await getUserByToken(token)

    // User
    const userFollow = await User.findById(id)

    if (user._id == id) {
      return res.status(400).json({ message: 'Você não pode deixar de se seguir' })
    }

    try {
      const newUser = await User.updateOne({ _id: user._id }, { $pullAll: { following: [{_id: userFollow._id, name: userFollow.name, image: userFollow.image}] } })
      // Retirando me do array do usuário
      await User.updateOne({ _id: userFollow._id }, { $pullAll: { followers: [{_id: user._id, name: user.name, image: user.image}] } })
      return res.status(200).json({ message: 'Deixou de seguir', newUser })
    } catch (error) {
      return res.status(400).json({ message: 'Usuário não encontrado' })
    }
  }

  static async deleteNotifications(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    try {
      await User.updateOne({ _id: user.id }, { $set: { notification: [] } })
      return res.status(200).json({ message: "Notificaçãoes limpas." })
    } catch (error) {
      return res.status(400).json({ message: "Error" })
    }
  }
}