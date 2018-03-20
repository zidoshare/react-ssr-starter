import Routes from './Routes'
import Loadable from 'react-loadable'
import configureStore from './store/configureStore'
import { matchRoutes } from 'react-router-config'
import { getMatch, make } from './helpers/renderer'
import stats from '../dist/react-loadable.json'
import Koa from 'koa'
const server = new Koa()
const port = process.env.port || 3000,
  staticCache = require('koa-static-cache'),
  cors = require('koa2-cors')

var fs = require('fs')
var path = require('path')

server.use(cors())

const clientRouter = async (ctx, next) => {
  let html = fs.readFileSync(path.join(path.resolve(process.cwd(), 'dist'), 'index.html'), 'utf-8')
  let store = configureStore()

  let branch = matchRoutes(Routes, ctx.req.url)
  let promises = branch.map(({ route }) => {
    return route.init ? (route.init(store)) : Promise.resolve(null)
  }).map(promise => {
    if (promise) {
      return new Promise((resolve) => {
        promise.then(resolve).catch(resolve)
      })
    }
  })
  await Promise.all(promises).catch(err => console.error(err))

  let isMatch = getMatch(Routes, ctx.req.url)
  const context = {}
  if (isMatch) {
    let renderedHtml = await make({
      ctx,
      store,
      context,
      template: html,
      Routes,
      stats,
    })
    if (context.url) {
      ctx.status = 301
      ctx.redirect(context.url)
    } else {
      ctx.body = renderedHtml
    }
  } else {
    ctx.status = 404
    ctx.body = '未找到该页面'
  }
  await next()
}

server.use(clientRouter)
server.use(staticCache(path.resolve(process.cwd(), 'dist'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
}))

console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)

Loadable.preloadAll().then(() => {
  server.listen(port)
})