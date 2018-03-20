import { combineReducers } from 'redux'
import * as home from './home'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  router: routerReducer,
  ...home,
})