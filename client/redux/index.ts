import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import {loginReducer, registerReducer} from './reducers/authReducers';

const middleware = [thunk];


const rootReducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export const store = createStore(loginReducer, composeWithDevTools(applyMiddleware(...middleware)));
