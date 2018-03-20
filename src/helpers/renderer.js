import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { Helmet } from 'react-helmet'

import { getBundles } from 'react-loadable/webpack'
import Loadable from 'react-loadable'

const createTags = (modules, stats) => {
  let bundles = getBundles(stats, modules)
  let scriptfiles = bundles.filter(bundle => bundle.file.endsWith('.js'))
  let stylefiles = bundles.filter(bundle => bundle.file.endsWith('.css'))
  let scripts = scriptfiles.map(script => `<script src="/${script.file}"></script>`).join('\n')
  let styles = stylefiles.map(style => `<link href="/${style.file}" rel="stylesheet"/>`).join('\n')
  return { scripts, styles }
}

const prepHtml = (data, { html, head, rootString, scripts, styles, initState }) => {
  data = data.replace('<html', `<html ${html}`)
  data = data.replace('</head>', `${head} \n ${styles}</head>`)
  data = data.replace('<div id="root"></div>', `<div id="root">${rootString}</div>`)
  data = data.replace('<body>', `<body> \n <script>window.__INITIAL_STATE__ =${JSON.stringify(initState)}</script>`)
  data = data.replace('</body>', `${scripts}</body>`)
  return data
}
export const make = ({ ctx, store, context, template, Routes, stats }) => {
  let modules = []

  const rootString = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={ctx.req.url} context={context}>
          {renderRoutes(Routes)}
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  )
  const initState = store.getState()
  const { scripts, styles } = createTags(modules, stats)

  const helmet = Helmet.renderStatic()
  return prepHtml(template, {
    html: helmet.htmlAttributes.toString(),
    head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
    rootString,
    scripts,
    styles,
    initState
  })
}

export const getMatch = (routesArray, url) => {
  return routesArray.some(router => matchPath(url, {
    path: router.path,
    exact: router.exact,
  }))
}