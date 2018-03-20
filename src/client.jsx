import React from 'react'
import { hydrate, render, unmountComponentAtNode } from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import Loadable from 'react-loadable'
import { renderRoutes } from 'react-router-config'
import Routes from './Routes'
const initialState = window && window.__INITIAL_STATE__
import { Provider } from 'react-redux'
import configuraStore from './store/configureStore'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
let store = configuraStore(initialState)
const Root = document.getElementById('root')
const renderApp = (routes) => {
  const renderMethod = process.env.NODE_ENV === 'development' ? render : hydrate
  renderMethod(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </Provider>, Root)
}

Loadable.preloadReady().then(renderApp.bind(this, Routes))

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./reducers/index.js', () => {
      let newReducer = require('./reducers/index.js').default
      store.replaceReducer(newReducer)
    })
    module.hot.accept('./Routes.jsx', () => {
      unmountComponentAtNode(Root)
      var r = require('./Routes').default
      renderApp(r)
    })
  }
}

