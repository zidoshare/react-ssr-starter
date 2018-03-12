import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import routesConfig from './routes'
const Routers = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      {
        routesConfig.map(route => (
          <Route key={route.path} exact={route.exact} path={route.path} component={route.component} thunk={route.thunk} />
        ))
      }
    </div>
  </ConnectedRouter>
)

Routers.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Routers
