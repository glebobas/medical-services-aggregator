import React, {useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // импортируем название месяцев на русском языке
// import '../../index.css'; // стили для компонента

// массив возможных часов
const hours = [...Array(12).keys()].map((i) => String(i + 9).padStart(2, '0') + ':00');

// массив возможных минут
const minutes = ['00', '30'];

export function DayView() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedHour, setSelectedHour] = useState(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState(minutes[0]);

  // обработчик выбора даты
  function handleDateChange(event) {
    setSelectedDate(dayjs(event.target.value));
  }

  // обработчик выбора часов
  function handleHourChange(hour) {
    setSelectedHour(hour);
  }

  // обработчик выбора минут
  function handleMinuteChange(minute) {
    setSelectedMinute(minute);
  }

  function handleDateChange() {
    console.log({selectedDate, selectedHour, selectedMinute})
  }

  return (
    <div className="mt-4 rounded border p-4 shadow">
      <div className="flex justify-between">
        <h4>Расписание</h4>
        {/* отображение выбранной даты и времени */}
        <div className="flex justify-center">
          Вы выбрали запись на: {selectedDate.format('DD MMMM YYYY')}, в {selectedHour}
        </div>
      </div>
      {/* блок выбора даты */}
      <input className="rounded p-2 w-full my-4 shadow"
             type="date"
             value={selectedDate.format('YYYY-MM-DD')}
             onChange={handleDateChange}
      />

      {/* блок выбора времени */}
      <div className="flex flex-col w-full">
        {/* блок выбора часов */}
        <div className="w-2/3 flex flex-row flex-wrap my-2 gap-2 mx-auto">
          {hours.map((hour) => (
            <>
              <button
                key={hour}
                className={selectedHour === hour ? 'p-2 border bg-rose-200 hover:bg-rose-500 rounded' : 'rounded p-2' +
                  ' border' +
                  ' bg-emerald-200 hover:bg-green-500'}
                onClick={() => handleHourChange(hour)}
              >
                {hour}
              </button>
            </>
          ))}
        </div>
        {/*/!* блок выбора минут *!/*/}
        {/*<div className="flex flex-row justify-around my-2">*/}
        {/*  {minutes.map((minute) => (*/}
        {/*    <button*/}
        {/*      key={minute}*/}
        {/*      className={selectedMinute === minute ? 'p-2 px-12 border bg-red-100 rounded' : 'rounded p-2 px-12' +*/}
        {/*        ' border' +*/}
        {/*        ' bg-green-100'}*/}
        {/*      onClick={() => handleMinuteChange(minute)}*/}
        {/*    >*/}
        {/*      {minute}*/}
        {/*    </button>*/}
        {/*  ))}*/}
        {/*</div>*/}

      {/* кнопка бронирования записи */}
      <button className="border py-2 px-5 w-1/2 mx-auto text-sm tracking-wide rounded-lg my-4 bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300" onClick={handleDateChange}>ЗАБРОНИРОВАТЬ</button>
      </div>

    </div>
  );
}
