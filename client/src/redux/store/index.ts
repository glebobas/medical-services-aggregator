import { IGeneralState } from '../types/types';

export const initialState: IGeneralState = {
  user: { id: 0, username: '', firstName: '', lastName: '', email: '', telephone: '', role: '' },
  message: '',
  loading: false,
  error: null,
};
