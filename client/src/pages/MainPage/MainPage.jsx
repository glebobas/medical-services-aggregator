import React from 'react'
import { CommonInput } from '../../components/CommonInput/CommonInput'
import { SelectLocation } from '../../components/SelectLocation/SelectLocation'
import { CheckBoxes } from '../../components/CheckBoxes/CheckBoxes'
import { SelectSpecialization } from '../../components/SelectSpecialization/SelectSpecialization'
import {MainImage} from '../../components/MainImage/MainImage'
import RandomSearch from "../../components/RandomSearch/RandomSearch";

export function MainPage() {
  return (
    <div className="flex flex-col w-full h-[780px]" >
      <div className="flex flex-row h-3/5 mt-8 bg-[url('https://source.unsplash.com/random/?hospitals')]">
        <div className="main-col-left flex flex-col w-2/5 px-8 pt-4 bg-white">
          <SelectSpecialization />
          <div className="flex flex-row justify-around">
            <div className="flex flex-col w-full"><CheckBoxes label={"Детский"}/></div>
            <div className="flex flex-col w-full"><CheckBoxes label={"Взрослый"} /></div>
          </div>
          <br />
          <SelectLocation />
          <RandomSearch />
        </div>
        {/*<div className="main-col-right w-full h-full"><MainImage /></div>*/}
      </div>

    </div>

  )
}


