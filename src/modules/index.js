import { combineReducers } from 'redux'
import counter from './counter'
import theme from './theme'
import global from './global'

export default combineReducers({
  counter,
  theme,
  global
})
