import React from 'react';
import {nanoid} from "nanoid";
import {motion} from "framer-motion"

const data = [
  {
    doctorId: 1, doctorName: 'Иванов', shedules: [
      {date: '09:00', slotId: 1},
      {date: '10:00', slotId: 2},
      {date: '11:00', slotId: 3},
      {date: '14:00', slotId: 4},
    ]
  },
  {
    doctorId: 2, doctorName: 'Петров', shedules: [
      {date: '09:00', slotId: 1},
      {date: '12:00', slotId: 2},
      {date: '13:00', slotId: 3},
    ]
  },
  {
    doctorId: 3, doctorName: 'Сидоров', shedules: [
      {date: '10:00', slotId: 1},
      {date: '11:00', slotId: 2},
      {date: '12:00', slotId: 3},
      {date: '13:00', slotId: 4},
      {date: '15:00', slotId: 4},
      {date: '16:00', slotId: 4},
      {date: '20:00', slotId: 4},
    ]
  },
  {
    doctorId: 2, doctorName: 'Криворучка', shedules: [
      {date: '09:00', slotId: 1},
      {date: '12:00', slotId: 2},
      {date: '13:00', slotId: 3},
    ]
  },
  {
    doctorId: 2, doctorName: 'Иванова', shedules: [
      {date: '09:00', slotId: 1},
      {date: '13:00', slotId: 3},
    ]
  },
  {
    doctorId: 2, doctorName: 'Петров', shedules: [
      {date: '09:00', slotId: 1},
      {date: '12:00', slotId: 2},
      {date: '13:00', slotId: 3},
      {date: '19:00', slotId: 4},
      {date: '20:00', slotId: 5},
    ]
  },
  {
    doctorId: 2, doctorName: 'Петров', shedules: [
      {date: '09:00', slotId: 1},
      {date: '12:00', slotId: 2},
      {date: '13:00', slotId: 3},
    ]
  },
  {
    doctorId: 2, doctorName: 'Петров', shedules: [
      {date: '09:00', slotId: 1},
      {date: '12:00', slotId: 2},
      {date: '13:00', slotId: 3},
    ]
  },
]

export function ShedulePage() {
  const listMotion = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.6,
      }
    }),
    hidden: {opacity: 0}
  };

  return (
    <div className="head">
      <div className="col-span-5 font-semibold text-xl mt-4">Свободные блоки на сегодня</div>
      <div className="grid grid-cols-5 mt-4">
        <div className="bg-gray-200 py-2 px-4 rounded-l">Доктор</div>
        <div className="bg-gray-200 py-2 px-4">Специальность</div>
        <div className="bg-gray-200 py-2 px-4">Клиника</div>
        <div className="bg-gray-200 py-2 px-4">Телефон</div>
        <div className="bg-gray-200 py-2 px-4 rounded-r">Рейтинг</div>
      </div>

      {data.map((doctor, i) => (
        <motion.div key={nanoid()}
                    variants={listMotion}
                    initial='hidden'
                    animate='visible'
                    custom={i}
                    className="grid grid-cols-5 gap-1 bg-white rounded border-lg mt-4 shadow py-2 pb-4 px-2">
          <div className="px-2 py-2 font-semibold">{doctor.doctorName}</div>
          <div className="px-2 py-2"><span className="bg-green-100 px-2 py-1 rounded">Кардиолог</span></div>
          <div className="px-2 py-2">Беркут</div>
          <div className="px-2 py-2">+7 (123) 456-78-90</div>
          <div className="px-2 py-2">5.8</div>
          <div className="flex flex-row gap-2 pl-2">
            {doctor.shedules.map(date => (
              <div key={nanoid()}
                   className="flex flex-row justify-center py-2 px-5 bg-blue-300 rounded hover:cursor-pointer hover:bg-blue-400">{date.date}</div>
            ))}

          </div>
        </motion.div>
      ))}
    </div>
  );
}
