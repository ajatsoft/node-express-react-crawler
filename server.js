const express = require('express')
const next = require('next')
const api = require('./src/scraper.js')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/', async (req, res) => {
      const URL = 'https://gizmodo.uol.com.br'
      const news = await api.getNews(URL)
      app.render(req, res, '/index', { news })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Server ready at http://localhost:3000')
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })