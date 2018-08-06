import { combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import comments_list from './comments_list'
import comments_add from './comments_add'
const reducers = combineReducers({
  router: routerReducer,
  comments_list,
  comments_add
})

export default reducers
