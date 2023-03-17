import { IClinicState, TypesClinic } from "../types/typesClinic";
import { initialClinicState } from "../store";
import { IClinicAction } from "../actions/clinicAC";

export const getClinicReducer = (state: IClinicState = initialClinicState, action: IClinicAction): IClinicState => {
    switch (action.type) {
        case TypesClinic.GET_CLINIC:
            // console.log(action.payload)
            return {
                clinicInfo: { id: action.payload.clinicInfo.id, name: action.payload.clinicInfo.name, phone: action.payload.clinicInfo.phone, email: action.payload.clinicInfo.email, generalInfo: action.payload.clinicInfo.generalInfo},
                addressClinic: { country:'', city:'', street:'' }, 
            };
        
        default:
            return state;
    }
};