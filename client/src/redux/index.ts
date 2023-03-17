import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunkMiddleware from 'redux-thunk';
import {loginReducer, registerReducer} from './reducers/authReducers';



const rootReducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

const composeEnhancers =
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(thunkMiddleware)
        : composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducers, composeEnhancers);
