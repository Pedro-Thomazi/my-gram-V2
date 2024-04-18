const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const Publications = require('../models/Publication')
const User = require('../models/User')

module.exports = class PublicationsController {
  static async getAllPublis(req, res) {
    const publications = await Publications.find({}).sort('-createdAt')

    res.status(200).json({ message: 'Todas Publicações', publications })
  }
  static async getMyPublications(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const userId = user._id


    const myPublications = await Publications.find({ 'user._id': userId }).sort('-createdAt')

    res.status(200).json({ message: 'Minhas Publicações', myPublications })
  }

  static async getPublicationsById(req, res) {
    const id = req.params.id

    const user = await User.findOne({ _id: id })
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const userId = user._id

    const userPublications = await Publications.find({ 'user._id': userId }).sort('-createdAt')
    res.status(200).json({ message: `Publicações de ${user.name}`, userPublications })
  }

  static async getPublicationById(req, res) {
    const id = req.params.id

    const notificationData = {
      name: 'MyGram',
      text: 'Uma de suas publicações recebeu muitas denúncias ultimamente. A mesma acabou sendo deletada por precaução.'
    }

    try {
      const publication = await Publications.findOne({ _id: id })
      const userId = publication.user._id
      if (publication.denounces.length == 10) {
        await Publications.deleteOne({ _id: id })
        await User.updateOne({ _id: userId }, { $push: { notification: notificationData } })
        return res.status(200).json({ message: 'Publicação deletada por excesso de denúncias.', publication })
      }
      res.status(200).json({ message: 'Publicação', publication })
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao encontrar a publicação' })
    }
  }

  static async getPublicationByIdAndAddDenounce(req, res) {
    const id = req.params.id
    const token = getToken(req)
    const user = await getUserByToken(token)

    let { description, spam, nudez, hate, crime } = req.body

    if (!description && !spam && !nudez && !hate && !crime) {
      return res.status(400).json({ message: 'Adicione pelo menos um tópico da denúncia!' })
    }

    if (spam === 'on') {
      spam = true
    }
    else {
      spam = false
    }

    if (nudez === 'on') {
      nudez = true
    }
    else {
      nudez = false
    }

    if (hate === 'on') {
      hate = true
    }
    else {
      hate = false
    }

    if (crime === 'on') {
      crime = true
    }
    else {
      crime = false
    }

    const denounceData = {
      description,
      spam,
      nudez,
      hate,
      crime,
      user: {
        id: user.id,
        name: user.name
      }
    }

    try {
      await Publications.findOneAndUpdate({ _id: id }, { $push: { denounces: denounceData } })
      res.status(200).json({ message: 'Publicação denunciada', denounceData })
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao denunciar' })
    }
  }

  static async createPubli(req, res) {
    const { localization, description } = req.body
    const images = req.files

    if (!images) {
      res.status(422).json({ message: 'Coloque pelo menos uma foto' })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    const publication = new Publications({
      localization,
      description,
      likes: [],
      images: [],
      comments: [],
      denounces: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image
      }
    })

    images.map((image) => {
      publication.images.push(image.filename)
    })

    try {
      const newPubli = await publication.save()
      res.status(201).json({ message: 'Publicado', newPubli })
    } catch (error) {
      console.log('Erro ao publicar: ' + error)
      res.status(500).json({ message: error })
    }
  }

  static async addComment(req, res) {
    const idPubli = req.params.id
    const { description } = req.body

    if (!description) return res.status(400).json({ message: 'Sem comentário' })

    const token = getToken(req)
    const user = await getUserByToken(token)

    const descriptionData = {
      id: user._id,
      name: user.name,
      photo: user.image,
      description: description
    }

    await Publications.findByIdAndUpdate({ _id: idPubli }, { $push: { comments: descriptionData } }).sort('-createdAt')
    res.status(200).json({ message: `Comentado por ${user.name}`, descriptionData })
  }

  static async removePublication(req, res) {
    const id = req.params.id

    const token = getToken(req)
    const user = await getUserByToken(token)
    const publication = await Publications.findOne({ _id: id })

    // console.log(user._id.toString())
    // console.log(publication.user._id.toString())
    // console.log(publication.user._id.toString() == user._id.toString())

    if (publication.user._id.toString() !== user._id.toString()) {
      return res.status(400).json({ message: ' Você está tentando deletar uma publicação que não é sua. BAN' })
    }


    try {
      await Publications.deleteOne({ _id: id })
      return res.status(200).json({ message: 'Publicação deletada' })
    } catch (error) {
      return res.status(400).json({ message: 'Publicação não encontrada' })
    }
  }
}