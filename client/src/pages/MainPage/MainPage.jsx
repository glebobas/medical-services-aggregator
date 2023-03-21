import React from 'react'
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
    <div className="flex flex-col flex-grow mt-4 w-full bg-[url('https://source.unsplash.com/random/?hospitals')] bg-cover">
      <div className="flex flex-row flex-grow my-auto justify-between">
        <div className="flex-col my-auto bg-white w-2/6 px-8 py-28 shadow-lg">
          <div className="title flex-row font-semibold text-2xl">Ищите лучших докторов по всему миру?</div>
          <div className="title flex-row font-normal mt-6">Мы поможем найти доктора с лучшей квалификацией для Вас и Ваших близких</div>
          <button
            className="border rounded mt-6 px-8 py-2 bg-green-700 text-white hover:bg-green-800"
            onClick={handleButtonClick}>
            Extended Search
          </button>
        </div>
        <div className="flex-col"></div>
      </div>
      {/*<div className="flex flex-row h-3/5 mt-8 ">*/}

      {/*  /!*<div className="main-col-right w-full h-full"><MainImage /></div>*!/*/}
      {/*</div>*/}
    </div>

  )
}


