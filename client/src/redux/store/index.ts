import { IGeneralState } from '../types/types';
import { IClinicState } from '../types/typesClinic';

export const initialState: IGeneralState = {
  user: { id: 0, username: '', firstName: '', lastName: '', email: '', telephone: '', role: '' },
  message: '',
  loading: false,
  error: null,
};
export const initialClinicState: IClinicState = {
  clinicInfo: { id: 0, name: '', phone: '', email: '', generalInfo: ''},
  addressClinic: {country:'', city:'', street:'' },
};
