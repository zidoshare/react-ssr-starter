import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createMemoryHistory'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

const routerReducers = routerMiddleware(createHistory())
const composeEnhancers = process.env.NODE_ENV == 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
const middleware = [thunkMiddleware, routerReducers]
let configureStore = (initialState) => createStore(rootReducer, initialState, composeEnhancers?composeEnhancers(applyMiddleware(...middleware)):applyMiddleware(...middleware))
export default configureStore
