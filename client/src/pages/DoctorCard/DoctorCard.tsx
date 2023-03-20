import React, {useEffect, useState} from 'react';
import {DayView} from "../../components/DayView/DayView";
import {useLocation, useParams} from "react-router-dom";


export const DoctorCard = () => {
  const [doctor, setDoctor] = useState('')
  const location = useLocation()
  const {id} = location.state
  console.log("-> doctorId", id);

  useEffect(() => {
    fetch(`/main/doctor/${id}`)
      .then(response => response.json())
      .then(response => setDoctor(response.readyDocOne))
      .catch(err => console.error(err))
  }, [])

  // TODO: Доделать адрес клиники чтоб брал по id клиники из БД
  return (
    <div className="doctor__cad flex flex-col bg-white w-full mx-auto border rounded py-6 px-6 mt-4">
      <div className="doctor__card-row-1 flex flex-row justify-between">
        <div className="row-1__column-left flex flex-col w-2/5 justify-between">
          <div className="doctor__card-title text-3xl font-semibold">{doctor.name}</div>
          <table className="mt-4 w-full">
            <tr className="border-b">
              <td className="text-gray-500">Специализация</td>
              <td className="pl-4 font-semibold">{doctor.speciality}</td>
            </tr>
            <tr className="border-b">
              <td className="text-gray-500 pt-2">Стаж</td>
              <td className="pl-4 font-semibold pt-2">-</td>
            </tr>
            <tr className="border-b">
              <td className="text-gray-500 pt-2">Рейтинг</td>
              <td className="pl-4 font-semibold pt-2">{doctor.averageDocRating}</td>
            </tr>
            <tr className="border-b">
              <td className="text-gray-500 pt-2">Клиника</td>
              <td className="pl-4 font-semibold pt-2">{doctor.clinic}</td>
            </tr>
            <tr className="border-b">
              <td className="text-gray-500 pt-2">Адрес</td>
              <td className="pl-4 font-semibold pt-2">г.СПБ, Выборгское ш., 17</td>
            </tr>
          </table>
        </div>
        <div
          className="row-1__column-right flex border w-[150px] h-[150px] rounded bg-blue-200 items-center justify-center">
          <img src={doctor.avatar}/></div>
      </div>
      <div className="doctor__card-row-2 mt-4">
        <div className="text-gray-500">О враче:</div>
        <div className="doctor__card-row-2-doctor-params text-sm tracking-wide mt-2">
          {doctor.generalInfo}
        </div>
      </div>
      <DayView/>
    </div>
  );
};
