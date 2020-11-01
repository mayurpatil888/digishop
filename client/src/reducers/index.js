import { combineReducers } from 'redux';
import alertReducer from 'src/reducers/alerts'
import authReducer from 'src/reducers/auth';

export default combineReducers({alerts: alertReducer, auth: authReducer });