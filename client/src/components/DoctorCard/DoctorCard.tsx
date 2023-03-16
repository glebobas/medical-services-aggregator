import React from 'react';
import {DayView} from "../DayView/DayView";


export const DoctorCard = () => {
  return (
    <div className="doctor__cad flex flex-col w-1/2 mx-auto border rounded py-4 px-6 mt-4 shadow">
      <div className="doctor__card-row-1 flex flex-row justify-between">
        <div className="row-1__column-left flex flex-col justify-between">
          <div className="doctor__card-title text-xl font-semibold">Иванов Иван Иванович</div>
          <div className="params gap-2">
            <div className="doctor__card-special text-sm text-gray-500">врач-терапевт</div>
            <div className="doctor__card-experience text-sm text-gray-500">стаж: <span
              className="font-semibold">5 лет</span></div>
            <div className="doctor__card-rate text-sm text-gray-500">рейтинг: <span className="font-semibold">4.8 / 5</span></div>
            <div className="doctor__card-row-2-clinic text-sm text-gray-500">Клиника: <span className="font-semibold">Беркут</span></div>
            <div className="doctor__card-row-2-clinic-address text-sm text-gray-500">Адрес: <span className="font-semibold">г.СПБ, Выборгское ш., 17 </span></div>
          </div>
        </div>
        <div className="row-1__column-right flex border w-[150px] h-[150px] rounded bg-blue-200 items-center justify-center shadow">foto</div>
      </div>
      <div className="doctor__card-row-2 mt-6">

        <div className="doctor__card-row-2-doctor-params text-sm text-gray-500 mt-4">О враче: <span className="font-semibold">выполняет все виды помощи по специальности “Терапия”. Имеет соответствующие сертификаты </span></div>
      </div>
     <DayView />
    </div>
  );
};
