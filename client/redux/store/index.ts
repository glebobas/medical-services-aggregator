import { IGeneralState } from '../types/types';

export const initialState: IGeneralState = {
  user: { id: 3, username: 'dima', firstName: 'dima', lastName: 'viaznikov', email: '123@123.ry', telephone: '123123', role: 'user' },
  message: '',
  loading: false,
  error: null,
};
