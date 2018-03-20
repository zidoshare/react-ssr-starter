import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router: routerReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}