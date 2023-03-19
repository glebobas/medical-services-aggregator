import { initialState } from '../store';
import {IAllClinicAndDoctor, IGeneralState, IAllClinicAndDoctorAction, Types} from "../types/types";


export const getDoctorsAndClinicsReducers = (state: IGeneralState = initialState, action: IAllClinicAndDoctorAction) => {
  switch (action.type) {

    case Types.ADD_CLINICS_AND_DOCTORS_SUCCESS:
      return {
        ...state,
        clinicsAndDoctors: action.payload
      }

    default:
      return state
  }
}
