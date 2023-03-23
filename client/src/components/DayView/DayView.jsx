import React, {useContext, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {useParams} from "react-router-dom";
import {ShedulRecModal} from "../Modal/ShedulRecModal";
import {AuthContext} from "../../context";
import {FormattedMessage} from "react-intl";
// import '../../index.css'; // стили для компонента

// массив возможных часов
const hours = [...Array(12).keys()].map((i) => String(i + 9).padStart(2, '0') + ':00');

// массив возможных минут
const minutes = ['00', '30'];

export function DayView() {
  const {
    showModalSheduleRec,
    setShowModalSheduleRec,
  } = useContext(AuthContext)

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const currentDate = dayjs()

  // const oneMinutesAgo = currentTime.subtract(1, 'minute');
  // console.log("-> oneMinutesAgo", oneMinutesAgo);

  const [selectedMounth, setSelectedMounth] = useState();
  const [selectedHour, setSelectedHour] = useState(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState(minutes[0]);
  const [shedule, setShedule] = useState({})
  console.log("-> shedule", shedule);
  const [staff, setStaff] = useState()
  const [sheduleIdOneBlock, setSheduleIdOneBlock] = useState('')
  const {doctorShedule} = shedule

  const token = localStorage.getItem("jwtToken")
  const {id} = useParams()

  // Функция склонение даты
  function getMonthName(month, caseNum) {
    const months = [
      ['Январь', 'Января'],
      ['Февраль', 'Февраля'],
      ['Март', 'Марта'],
      ['Апрель', 'Апреля'],
      ['Май', 'Мая'],
      ['Июнь', 'Июня'],
      ['Июль', 'Июля'],
      ['Август', 'Августа'],
      ['Сентябрь', 'Сентября'],
      ['Октябрь', 'Октября'],
      ['Ноябрь', 'Ноября'],
      ['Декабрь', 'Декабря'],
    ];

    if (caseNum === 1) {
      return months[month][0]; // именительный падеж
    } else {
      const lastDigit = month % 10;
      const secondToLastDigit = Math.floor(month / 10) % 10;
      const isEnding1 = secondToLastDigit !== 1 && lastDigit === 1;
      const isEnding2to4 = secondToLastDigit !== 1 && lastDigit >= 2 && lastDigit <= 4;
      const suffix = isEnding1 ? 'я' : isEnding2to4 ? 'я' : 'ев';
      return months[month][1].replace('ь', suffix); // другие падежи
    }
  }

  // обработчик выбора даты
  function handleDateChange(event) {
    const newData = dayjs(event.target.value)
    setSelectedDate(newData);
    const Mounth = getMonthName(selectedDate.month(), 2)
    setSelectedMounth(Mounth)
  }


  // обработчик выбора часов
  function handleHourChange(hour) {
    setSelectedHour(hour);
  }

  // обработчик выбора минут
  function handleMinuteChange(minute) {
    setSelectedMinute(minute);
  }

  // function handleEventBron() {
  //   // Оттлавливаем собитие по кнопке забронировать
  //   console.log(`Ваше время записи: ${selectedDate.date()} ${selectedMounth} ${selectedDate.year()} в ${selectedHour.slice(0, 2)}:${selectedMinute}`)
  // }

  // Запрос в БД на запись
  function handleClickReg(block) {
    console.log("-> block", block);
    setSheduleIdOneBlock(block)
    setShowModalSheduleRec(true)
  }

  // TODO: Запрос на блоки расписания
  useEffect(() => {
    const data = {
      year: selectedDate.year(),
      month: selectedDate.month(),
      day: selectedDate.date()
    }
    fetch(`/main/date?day=${data.day}&month=${data.month}&year=${data.year}&doctorId=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      }
    )
      .then(response => response.json())
      // .then(data => console.log('in data server', data))
      .then(data => setShedule(data))
      .catch(error => {
        console.error(error);
      })
  }, [selectedDate, staff])

  // Сортируем doctorSchedule по sheduleId
  doctorShedule?.sort((a, b) => {
    if (a.sheduleId < b.sheduleId) return -1;
    if (a.sheduleId > b.sheduleId) return 1;
    return 0;
  });

  return (
    <div className="mt-4 border-y py-4">
      <div className="flex justify-between">
        <h4 className="font-semibold">
          <FormattedMessage
              id='Shedule'
              defaultMessage="Default error message"
          />
        </h4>
      </div>
      {/* блок выбора даты */}
      <input className="bg-gray-100 w-full rounded border p-2 my-4"
             type="date"
             value={selectedDate.format('YYYY-MM-DD')}
             onChange={handleDateChange}
      />

      {/* блок выбора времени */}
      <div className="flex flex-col w-full">
        {/* блок выбора часов */}
        <div className="w-2/3 flex flex-row flex-wrap my-2 gap-2 mx-auto">
          {doctorShedule?.map((block) => {
            if (block.status === 'pending') {
              return <button key={block.sheduleId} disabled
                             className="bg-red-300 px-2.5 py-2 rounded-lg border">{block.time}</button>
            }
            if (block.status === 'vacant') {
              return <button key={block.sheduleId} className="bg-blue-400 px-2.5 py-2 rounded-lg border" onClick={()=>{handleClickReg(block)}}>{block.time}</button>
            }
            if (block.status === 'done') {
              return <button key={block.sheduleId} className="bg-gray-200 px-2.5 py-2 rounded-lg border cursor-not-allowed">{block.time}</button>
            }
            if (block.status === 'cancelled') {
              return <button key={block.sheduleId} className="bg-gray-200 px-2.5 py-2 rounded-lg border cursor-not-allowed">{block.time}</button>
            }
          })}
          {/*{hours.map((hour) => (*/}
          {/*  <React.Fragment key={hour}>*/}
          {/*    <button*/}
          {/*      className={selectedHour === hour ? 'p-2 border bg-rose-200 hover:bg-rose-500 rounded' : 'rounded p-2' +*/}
          {/*        ' border' +*/}
          {/*        ' bg-emerald-200 hover:bg-green-500'}*/}
          {/*      onClick={() => handleHourChange(hour)}*/}
          {/*    >*/}
          {/*      {hour}*/}
          {/*    </button>*/}
          {/*  </React.Fragment>*/}
          {/*))}*/}
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
        {/*<button*/}
        {/*  className="border py-2 px-5 w-1/2 mx-auto text-sm tracking-wide rounded-lg my-4 bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"*/}
        {/*  onClick={handleEventBron}>ЗАБРОНИРОВАТЬ*/}
        {/*</button>*/}
      </div>
      <ShedulRecModal props={{idDoctor: id, sheduleIdOneBlock: sheduleIdOneBlock, setStaff: setStaff}}/>
    </div>
  );
}
