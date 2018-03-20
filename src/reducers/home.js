import { HOME_CALC_ADD, GET_HOME_INFO } from '../constants'

export const counter = (state = { count: 20 }, action) => {
  switch (action.type) {
    case HOME_CALC_ADD:
      return {
        ...state,
        count: action.count,
      }
    default:
      return state
  }
}

export const homeInfo = (state = { name: '', age: 0 }, action) => {
  switch (action.type) {
    case GET_HOME_INFO:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}