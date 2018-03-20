import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import '../styles/custom.scss'
const AppLayout = ({route}) => {
  return (
    <div>
      <div className="header">
        <NavLink to="/" exact>首页</NavLink>
        <NavLink to="/user">我的</NavLink>
      </div>
      <div className="content">
        {renderRoutes(route.routes)}
      </div>
    </div>
  )
}
AppLayout.propTypes = {
  route: PropTypes.object.isRequired,
}
export default AppLayout