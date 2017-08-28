import {combineReducers} from 'redux';
import user from './userInfo';
import matches from './matches'

const allReducer = combineReducers({
    user,
    matches
});

export default allReducer;