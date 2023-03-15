import React from 'react'
import { CommonInput } from '../../components/CommonInput/CommonInput'
import { SelectLocation } from '../../components/SelectLocation/SelectLocation'
import { CheckBoxes } from '../../components/CheckBoxes/CheckBoxes'
import { CheckBoxes2 } from '../../components/CheckBoxes/CheckBoxes2'
import { SelectSpecialization } from '../../components/SelectSpecialization/SelectSpecialization'
// import {MainImage} from '../../components/MainImage/MainImage'

export function MainPage() {
  return (

    <div >
      <CommonInput />
      <SelectSpecialization />
      <CheckBoxes />
      <br />
      <CheckBoxes2 />
      <br />
      <SelectLocation />
    </div>

  )
}


