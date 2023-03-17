import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunkMiddleware from 'redux-thunk';
import {loginReducer, registerReducer} from './reducers/authReducers';
import {getDoctorsAndClinicsReducers} from "./reducers/allClinicsAndDoctorsReducers";


const rootReducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
  clinicsAndDoctors: getDoctorsAndClinicsReducers,
});

const composeEnhancers =
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(thunkMiddleware)
        : composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducers, composeEnhancers);
