import React, {useContext, useEffect, useState} from 'react';
import {nanoid} from "nanoid";
import {motion} from "framer-motion"
import SortButtonDefault from "../../components/SortButton/SortButtonDefault";
import Rating from "../../components/Rating/Rating";
import {FormattedMessage} from "react-intl";
import {ShedulRecModal} from "../../components/Modal/ShedulRecModal";
import {AuthContext} from "../../context";

export function ShedulePage() {
  const {
    showModalSheduleRec,
    setShowModalSheduleRec,
  } = useContext(AuthContext)

  const [sheduleIdOneBlock, setSheduleIdOneBlock] = useState('')
  const [staff, setStaff] = useState()

  const [shedule, setShedule] = useState()
  const [doctorId, setDoctorId] = useState()

  useEffect(() => {
    fetch('/main/shedule')
      .then(response => response.json())
      .then(data => setShedule(data.readyDoctorList))
      .catch(err => console.log(err))
  }, [staff])


  const listMotion = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.6,
      }
    }),
    hidden: {opacity: 0}
  };


  function handleClickReg(data, doctor) {
    setSheduleIdOneBlock(data)
    setShowModalSheduleRec(true)
    setDoctorId(doctor)
  }


  return (
    <div className="head">
      <div className="col-span-5 font-semibold text-xl mt-4">
        <FormattedMessage
          id='Free schedule slots today'
          defaultMessage="Default error message"
        />
      </div>

      <div className="flex flex-row items-center grid grid-cols-5 mt-4">
        <div className="bg-gray-200 py-2 px-4 rounded-l">
          <FormattedMessage
            id='Doctor'
            defaultMessage="Default error message"
          />
        </div>
        <div className="flex flex-row items-center bg-gray-200 py-2 px-4">
          <FormattedMessage
            id='Speciality'
            defaultMessage="Default error message"
          />
        </div>
        <div className="flex flex-row items-center bg-gray-200 py-2 px-4">
          <FormattedMessage
            id='Clinic'
            defaultMessage="Default error message"
          />
        </div>
        <div className="flex flex-row items-center bg-gray-200 py-2 px-4">
          <FormattedMessage
            id='Phone number'
            defaultMessage="Default error message"
          />
        </div>
        <div className="flex flex-row bg-gray-200 py-2 px-4 rounded-r items-center">
          <FormattedMessage
            id='Rating'
            defaultMessage="Default error message"
          />
          <SortButtonDefault shedule={shedule} setShedule={setShedule}/>
        </div>
      </div>

      {shedule?.map((doctor, i) => (
        <motion.div key={nanoid()}
                    variants={listMotion}
                    initial='hidden'
                    animate='visible'
                    custom={i}
                    className="grid grid-cols-5 gap-1 bg-white rounded border-lg mt-4 shadow py-2 pb-4 px-2">
          <div className="px-2 py-2 font-semibold">{doctor.doctorName}</div>
          <div className="px-2 py-2"><span className="bg-green-100 px-2 py-1 rounded">{doctor.speciality}</span></div>
          <div className="px-2 py-2">{doctor.clinic}</div>
          <div className="px-2 py-2">{doctor.phone}</div>
          <div className="px-2 py-2"><Rating rat={doctor.doctorRating}/></div>
          <div className="col-span-5 gap-2">
            {doctor.slots.map(date => {
              if (date.status === 'vacant') {
                return <button key={nanoid()}
                               className="bg-blue-300 ml-2 px-2 py-2 rounded-lg border hover:bg-blue-400 shadow"
                               onClick={() => {
                                 handleClickReg(date, doctor.doctorId)
                               }}>{date.timeGap}</button>
                // return <div key={date.slotId}
                //             className="flex flex-row justify-center py-2 px-4 bg-blue-300 rounded hover:cursor-pointer hover:bg-blue-400"
                //             onClick={() => {
                //               handleClick(date)
                //             }}>{date.timeGap}</div>
              }

            })}

          </div>
        </motion.div>
      ))}
      {/*<ShedulRecModal props={{idDoctor: id, sheduleIdOneBlock: sheduleIdOneBlock, setStaff: setStaff}}/>*/}
      <ShedulRecModal props={{
        idDoctor: doctorId, sheduleIdOneBlock: {
          date: '',
          sheduleId: sheduleIdOneBlock.sheduleId,
          status: sheduleIdOneBlock.status,
          time: sheduleIdOneBlock.timeGap,
          userId: '',
        }, setStaff: setStaff
      }}/>

    </div>
  )
    ;
}
