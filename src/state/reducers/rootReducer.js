import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import messageReducer from './messageReducer';
import locationReducer from './locationReducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  messages: messageReducer,
  location: locationReducer
})

export default rootReducer;
