import {IAllClinicAndDoctor, IGeneralState, Types} from "../types/types";

export const addClinicsAndDoctorsRequest = (array: IAllClinicAndDoctor[]) => ({
  type: Types.ADD_CLINICS_AND_DOCTORS_SUCCESS,
  payload: array,
});

// export const loginSuccess = (user: object): { payload: object; type: Types } => ({
//   type: Types.LOGIN_SUCCESS,
//   payload: user,
// });
//
// export const loginFailure = (error: string): { payload: { error: string }; type: Types } => ({
//   type: Types.LOGIN_FAILURE,
//   payload: { error },
// });
