import {Types, IAllSpeciality, IAllSpecialityAction} from './../types/types'

export const ISPecialityAction = (array: IAllSpeciality[]) => ({
  type: Types.GET_DOCTORS_SPECIALITY_SUCCESS,
  payload: array,
})
