import React from 'react';

export const DoctorCard = () => {
  return (
    <div className="flex flex-col w-1/2 mx-auto border shadow rounded py-2 px-5 mt-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="title font-semibold">Иванов Иван Иванович</div>
          <div className="special mt-2">врач-терапевт</div>
          <div className="experience">стаж: <span className="font-semibold">5 лет</span></div>
          <div className="rate">рейтинг <span className="font-semibold">4.8 / 5</span></div>
        </div>
        <div className="flex border w-[100px] h-[100px] rounded bg-blue-200 items-center justify-center shadow">foto</div>
      </div>
    </div>
  );
};
