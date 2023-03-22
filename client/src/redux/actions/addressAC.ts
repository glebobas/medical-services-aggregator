import {Types, IAllAddressClinics, IAllAddressClinicsAction} from './../types/types'

export const ISPecialityAction = (array: IAllAddressClinics[]) => ({
  type: Types.GET_ADDRES_CLINICS_SUCCESS,
  payload: array,
})
