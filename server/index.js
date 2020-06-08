/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
const express = require('express')
const fileupload = require('express-fileupload')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const webconfig = require('../config/config')
const config = require('../nuxt.config.js')
const url = webconfig.mongoURL
const bookController = require('./controllers/book')
const userController = require('./controllers/user')
const requestController = require('./controllers/request')
const connect = mongoose.connect(url)
connect
  .then(() => {
    consola.ready({ message: 'Connection to Mongo Database', badge: true })
  })
  .catch((error) => consola.error(error))
// Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(
    session({
      name: 'session-id',
      secret: 'thisisgolfsecret',
      saveUninitialized: false,
      resave: false,
      store: new FileStore(),
      maxAge: 3600
    })
  )
  // JSON Parser
  app.use(express.json())
  app.use(fileupload())
  require('../config/passport')(passport)
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())
  // Controller Route
  app.get('/api/auth', (req, res) => {
    if (req.session) {
      if (req.session._id) {
        const uid = req.session._id
        res.json({ uid })
      }
    }
  })
  app.post('/api/buy', requestController.buy)
  app.get('/api/requests', requestController.getAll)
  app.get('/api/requests/order', requestController.getOrder)
  app.get('/api/requests/send', requestController.getSend)
  app.get('/api/request/waiting', requestController.getID)
  app.get('/api/request/ordering', requestController.getIDOrder)
  app.get('/api/request/sending', requestController.getIDSend)
  app.get('/api/request/finishing', requestController.getIDFin)
  app.put('/api/request/recieve/:id', requestController.recieve)
  app.put('/api/request/update/:id', requestController.update)
  app.put('/api/request/approve/:id', requestController.approve)
  app.get('/api/user/name/:id', userController.getName)
  app.get('/api/book', bookController.get)
  app.post('/api/book', bookController.add)
  app.get('/api/book/:id', bookController.getID)
  app.put('/api/book/:id', bookController.edit)
  app.delete('/api/book/:id', bookController.delete)
  app.post('/signup', userController.signup)
  app.post('/login', userController.login)
  app.get('/logout', (req, res) => {
    if (req.session) {
      res.clearCookie('session-id')
      req.session.destroy()
      res.status(200).redirect('/')
    } else {
      res.status(403).json({ message: 'You are not logged in!' })
    }
  })
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
