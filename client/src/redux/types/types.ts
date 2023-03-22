export enum Types {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',

  LOGOUT = 'LOGOUT',

  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILURE = 'REGISTER_FAILURE',

  UPDATE_USERDATA_REQUEST = 'UPDATE_USERDATA_REQUEST',
  UPDATE_USERDATA_SUCCESS = 'UPDATE_USERDATA_SUCCESS',
  UPDATE_USERDATA_FAILURE = 'UPDATE_USERDATA_FAILURE',

  ADD_CLINICS_AND_DOCTORS_REQUEST = 'ADD_CLINICS_AND_DOCTORS_REQUEST',
  ADD_CLINICS_AND_DOCTORS_SUCCESS = 'ADD_CLINICS_AND_DOCTORS_SUCCESS',
  ADD_CLINICS_AND_DOCTORS_FAILURE = 'ADD_CLINICS_AND_DOCTORS_FAILURE',

  GET_DOCTORS_SPECIALITY_SUCCESS = 'GET_DOCTORS_SPECIALITY_SUCCESS',

  GET_ADDRES_CLINICS_SUCCESS = 'GET_ADDRES_CLINICS_SUCCESS'

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
  user: IUser | null;
  message: string;
  loading: boolean;
  error: null | string;
}

// export interface IGeneralStateLogin {
//     user:  | null;
//
//     message: string;
//     loading: boolean;
//     error: null | string;
// }

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
  type: Types;
  payload?: { username?: string; token?: string; userReady?: object; error?: string, message?: string };

}

export interface IUserAction {
  type: string;
  payload: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
    role: string;
    error: string;
  };
}

// Интерфейс из общего массива для строки поиска
export interface IAllClinicAndDoctor {
  doctorId?: number;
  clinicId?: number;
  avatar?: string,
  alreadyScoredPoints?: number
  name: string,
  phone?: string,
  address: string,
  email: string,
  clinic?: string,
  speciality?: string,
  generalInfo: string,
  doctorRating?: number,
  clinicRating?: number,
  generalTiming?: string,
  adultPatients?: string,
  childrenPatients?: string,
}

export interface IAllClinicAndDoctorAction {
  type: Types.ADD_CLINICS_AND_DOCTORS_SUCCESS
  payload: IAllClinicAndDoctor[]
}

export interface IAllSpeciality {
  id: number,
  name: string,

}

export interface IAllSpecialityAction {
  type: Types.GET_DOCTORS_SPECIALITY_SUCCESS
  payload: IAllSpeciality[]
}

export interface IAllAddressClinics {
  id: number,
  cityName: string,
  countryName: string,
  streetName: string
}

export interface IAllAddressClinicsAction {
  type: Types.GET_ADDRES_CLINICS_SUCCESS
  payload: IAllAddressClinics[]
}
