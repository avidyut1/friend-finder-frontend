import {combineReducers} from 'redux';
import user from './userInfo';

const allReducer = combineReducers({
    user
});

export default allReducer;