import React from 'react'
import { CommonInput } from '../../components/CommonInput/CommonInput'
import { SelectLocation } from '../../components/SelectLocation/SelectLocation'
import { CheckBoxes } from '../../components/CheckBoxes/CheckBoxes'
import { SelectSpecialization } from '../../components/SelectSpecialization/SelectSpecialization'
import {MainImage} from '../../components/MainImage/MainImage'
import RandomSearch from "../../components/RandomSearch/RandomSearch";
import {useNavigate} from "react-router-dom";

export function MainPage() {
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    // console.log(searchTerm)
    try {
      // const response =  await fetch(`/main/alldata/${searchTerm}`)
      // const results = await response.json();
      // // console.log("-> results", results);
      // // const getClinicsAndDoctors = [...results.readyClinicList, ...results.readyDoctorList]
      // // console.log("-> getClinicsAndDoctors", getClinicsAndDoctors);
      // setData(results)
      navigate("/search")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col w-full h-[780px]" >
      <div className="flex flex-row h-3/5 mt-8 bg-[url('https://source.unsplash.com/random/?hospitals')]">

        {/*<div className="main-col-right w-full h-full"><MainImage /></div>*/}
      </div>
      <button
          className="border rounded ml-2 px-8 py-2 bg-green-700 text-white hover:bg-green-800"
          onClick={handleButtonClick}>
        Extended Search
      </button>
    </div>

  )
}


