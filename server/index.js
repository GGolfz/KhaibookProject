/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
const express = require('express')
const fileupload = require('express-fileupload')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const mongoose = require('mongoose')
const webconfig = require('../config')
const config = require('../nuxt.config.js')
const url = webconfig.mongoURL
const bookController = require('./controllers/book')
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
  // JSON Parser
  app.use(express.json())
  app.use(fileupload())
  // Controller Route
  app.get('/api/book', bookController.get)
  app.post('/api/book', bookController.add)
  app.get('/api/book/:id', bookController.getID)
  app.put('/api/book/:id', bookController.edit)
  app.delete('/api/book/:id', bookController.delete)
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
