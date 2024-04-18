// Puxa o token do user guardado no browser
function getToken(req) {
  // Pegou o token
  const authHeader = req.headers.authorization
  // Pegou só o token, sem o 'Bearer'
  const token = authHeader.split(' ')[1] 

  return token
}

module.exports = getToken