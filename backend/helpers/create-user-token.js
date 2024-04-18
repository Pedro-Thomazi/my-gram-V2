const jwt = require('jsonwebtoken')

// Recebe os dados da criação do User
async function createUserToken(user, req, res) {
  // Cria o token do user
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, 'nossosecret')

  res.status(200).json({ message: 'Autenticado', token})
}

module.exports = createUserToken