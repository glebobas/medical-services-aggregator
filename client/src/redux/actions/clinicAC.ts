import { TypesClinic } from "../types/typesClinic";

export interface IClinicAction {
  type: TypesClinic.GET_CLINIC;
  payload: {
    clinicInfo: {
    id: number;
    name: string;
    phone: string;
    email: string;
    generalInfo: string;
  }
  addressClinic: {
    country:string;
    city: string; 
    street: string;
},
};
}

