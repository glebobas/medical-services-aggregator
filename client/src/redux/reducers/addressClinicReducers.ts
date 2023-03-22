import {initialState} from '../store'
import {Types, IAllAddressClinicsAction, IGeneralState} from '../types/types'

export const getAddresClinicReducer = (state: IGeneralState = initialState, action: IAllAddressClinicsAction) => {
  switch (action.type) {
    case Types.GET_ADDRES_CLINICS_SUCCESS:
      return {
        ...state,
        addresClinics: action.payload
      }

    default:
      return state
  }
}
