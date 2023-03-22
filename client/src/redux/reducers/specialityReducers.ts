import {initialState} from '../store'
import {Types, IAllSpecialityAction, IGeneralState} from '../types/types'

export const getSpecialityReducer = (state: IGeneralState = initialState, action: IAllSpecialityAction) => {
  switch (action.type) {
    case Types.GET_DOCTORS_SPECIALITY_SUCCESS:
      return {
        ...state,
        speciality: action.payload
      }

    default:
      return state
  }
}

