import React, {Fragment, useContext, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {AuthContext} from "../../../context";
import {FormattedMessage} from "react-intl";


export function ShedulRecModal({props}) {
  const {idDoctor, sheduleIdOneBlock, setStaff} = props

  const {
    showModalSheduleRec,
    setShowModalSheduleRec,
  } = useContext(AuthContext)

  const token = localStorage.getItem("jwtToken")

  const cancelButtonRef = useRef(null)

  function handleClickModalShedule() {
    console.log(idDoctor, sheduleIdOneBlock)
    fetch('/user/shedule/visit', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({sheduleId: sheduleIdOneBlock.sheduleId, statusAppointment: 'pending'})
    })
      .then(response => response.json())
      .then(data => setStaff(data))
      .catch(error => console.log(error));
    setShowModalSheduleRec(false)
  }

  return (
    <Transition.Root show={showModalSheduleRec} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowModalSheduleRec}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:justify-center sm:items-center">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        <FormattedMessage
                            id='Would you like to book for the current time?'
                            defaultMessage="Default error message"
                        />

                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 text-center">
                          <FormattedMessage
                              id='Confirm appointment'
                              defaultMessage="Default error message"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:justify-center sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={handleClickModalShedule}
                  >
                    <FormattedMessage
                        id='Make an appointment'
                        defaultMessage="Default error message"
                    />
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowModalSheduleRec(false)}
                    ref={cancelButtonRef}
                  >
                    <FormattedMessage
                        id='Cancel'
                        defaultMessage="Default error message"
                    />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
