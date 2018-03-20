import React from 'react'
import Loadable from 'react-loadable'
import { homeInit } from './actions'

const Loading = () => {
  return <div>Loading...</div>
}

const routesConfig = [{
  path: '/',
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'AppLayout'*/'./pages/AppLayout'),
    loading: Loading,
  }),
  routes: [{
    path: '/',
    exact:true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: 'Home' */'./pages/Home'),
      loading: Loading,
    }),
    init: homeInit,
  }, {
    path: '/user',
    component: Loadable({
      loader: () => import(/* webpackChunkName: 'User'*/'./pages/User'),
      loading: Loading,
    })
  }]
}]

export default routesConfig