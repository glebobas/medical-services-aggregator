import { IGeneralState, IGeneralStateRegister, IUserAction, Types } from '../types/types';
import { initialState } from '../store';

export const loginReducer = (state: IGeneralState = initialState, action: IUserAction): IGeneralState => {
    console.log(action);
    switch (action.type) {
        case Types.LOGIN_REQUEST:
        case Types.UPDATE_USERDATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case Types.LOGIN_SUCCESS:
        case Types.UPDATE_USERDATA_SUCCESS:
            return {
                ...state,
                user: {
                    id: action.payload.id,
                    username: action.payload.username,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    role: action.payload.role,
                    telephone: action.payload.telephone
                },
                loading: false,
                error: null,
            };
        case Types.LOGIN_FAILURE:
        case Types.UPDATE_USERDATA_FAILURE:
            return {
                ...state,
                user: null,
                loading: false,
                error: action.payload.error,
            };
        case Types.LOGOUT:
            return {
                ...state,
                user: null,
            };
        case Types.CLEAR_STORE_ACTION:
            return initialState;
        default:
            return state;
    }
};

export const registerReducer = (state: IGeneralState = initialState, action: IUserAction): IGeneralStateRegister => {
    switch (action.type) {
        case Types.REGISTER_REQUEST:
            return {
                ...state,
                error: null,
            };
        case Types.REGISTER_SUCCESS:
            return {
                ...state,
                message: 'Вы успешно зарегистрированны',
                error: null,
            };
        case Types.REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
};



