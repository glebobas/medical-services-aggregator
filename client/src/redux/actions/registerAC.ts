import {Types} from "../types/types";

export const registerRequest = () => ({
    type: Types.REGISTER_REQUEST,
});

export const registerSuccess = (message: string): { payload: object; type: Types } => ({
    type: Types.REGISTER_SUCCESS,
    payload: {message},
});

export const registerFailure = (error: string): { payload: { error: string }; type: Types } => ({
    type: Types.REGISTER_FAILURE,
    payload: {error},
});
