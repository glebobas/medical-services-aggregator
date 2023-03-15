export enum Types {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',

    REGISTER_REQUEST = 'REGISTER_REQUEST',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILURE = 'REGISTER_FAILURE',

}
export interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
    role: string;
}
export interface IGeneralState {
    user: IUser;
    message: string;
    loading: boolean;
    error: null | string;
}

export interface IGeneralStateRegister {
    message: string;
    loading: boolean;
    error: null | string;
}
export interface LoginRequestAction {
  type: Types.LOGIN_REQUEST;
}
export interface LoginSuccessAction {
  type: Types.LOGIN_SUCCESS;
  payload: {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      telephone: string;
      role: string;

  };
}
export interface LoginFailureAction {
  type: Types.LOGIN_FAILURE;
  payload: {
    error: string;
  };

}

export interface RegisterRequestAction {
    type: Types.REGISTER_REQUEST;
}
export interface RegisterSuccessAction {
    type: Types.REGISTER_SUCCESS;
    payload: {
        message: string
    };
}
export interface RegisterFailureAction {
    type: Types.LOGIN_FAILURE;
    payload: {
        error: string;
    };

}
export interface UserActionTypes {
    type: LoginRequestAction | LoginSuccessAction | LoginFailureAction;

}

export interface IUserAction {
    type: string;
    payload: {
        userid: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        telephone: string;
        role: string;
        error: string;
    };
}
