import {Types} from "../types/types";

export const loginRequest = () => ({
    type: Types.LOGIN_REQUEST,
});

export const loginSuccess = (user: object): { payload: object; type: Types } => ({
    type: Types.LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error: string): { payload: { error: string }; type: Types } => ({
    type: Types.LOGIN_FAILURE,
    payload: { error },
});
