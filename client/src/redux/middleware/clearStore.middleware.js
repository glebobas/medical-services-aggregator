import jwt_decode from 'jwt-decode';
import { Types } from '../types/types';
import {useSelector} from "react-redux";

const checkTokenExpiration = store => next => action => {
    const token = localStorage.getItem('jwtToken');
    // const currentData = useSelector(state => state.login.user);
    if (token) {
        const { exp } = jwt_decode(token);
        console.log("-> exp", exp);
        const currentTime = Date.now() / 1000;
        console.log("-> currentTime", currentTime);


        if (exp < currentTime && token && store.getState()?.login?.user?.id) {
            try {
                console.log("-> try");
                // store.dispatch({ type: Types.LOGOUT });
                // localStorage.clear();
            } catch (error) {
                console.error('Error clearing localStorage:', error);
            }
        }
    }
    return next(action);
}

export default checkTokenExpiration;
