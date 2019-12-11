  
const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware').default
var sslRedirect = require('heroku-ssl-redirect');

const nextI18next = require('../lib/i18');

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

  if(process.env.NODE_ENV === 'production'){
    server.use(sslRedirect());
  }

  server.use(nextI18NextMiddleware(nextI18next))

  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()