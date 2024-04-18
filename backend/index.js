const express = require('express')
// Conexão com o Front-end
const cors = require('cors')
const port = 5050

const app = express()

app.use(express.json())

// Conexão a url do Front-end
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

// Para colocar imagens
app.use(express.static('public'))

// Rota dos usuários
const UserRouter = require('./router/UserRoutes')
app.use('/user', UserRouter)


// Rota das publicações
const PublicationsRouter = require('./router/PublicationsRouter')
app.use('/publications', PublicationsRouter)


app.listen(port, () => console.log('Rodando na Porta: ' + port))