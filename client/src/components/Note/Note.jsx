import React, {useContext, useEffect, useState} from 'react';
import { CalendarIcon } from '@heroicons/react/20/solid';
import {FormattedMessage} from "react-intl";
import {AuthContext} from "../../context";
import {nanoid} from "nanoid";

export function Note() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState(0);
  const [positions, setPositions] = useState([]);
  const [elementId, setElementId] = useState('')

    const {
        showModalSheduleRec,
        setShowModalSheduleRec,
        setShowModalMini,
        setShowModalMiniText,
    } = useContext(AuthContext)


  const token = localStorage.getItem("jwtToken")

  useEffect(() => {
      const fetchData = async () => {
        const response = await  fetch('/user/messages', {
          headers: {
            'authorization': 'Bearer ' + token,
          }
        })
        const data = await response.json();
        if(data.length) {
            setPositions(data);
        }
      };
      fetchData();
    }, []);

const handlerFirstRemove = async (e) => {

    setElementId(e.target.id)
    setSelectedPositionId(Number(e.target.id));
    setShowModal(true)
}
  const handleDelete = async (e) => {

      const token = localStorage.getItem("jwtToken")

      const response = await fetch('/user/messages', {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({messageId: elementId})
      })

      const data = await response.json()

      if (response.status === 200) {
          const updatedPositions = positions.filter((position) => Number(position.id) !== selectedPositionId);
          setPositions(updatedPositions);
          setShowModal(false);
      }
      if (response.status !== 200) {
          setShowModalMini(true)
          setShowModalMiniText(data)
          setShowModalSheduleRec(false)
      }

  };

  return (
    <div className='mt-4'>
      <h3 className='font-sans font-semibold text-lg subpixel-antialiased not-italic pl-4 mt-6'>

        <FormattedMessage
            id="Incoming messages"
            defaultMessage="Default error message"
        />
      </h3>
      <div className=' mt-4 p-2 w-full justify-center aligoverflow-hidden bg-white shadow sm:rounded-md'>
          {positions && <ul role='list' className='divide-y divide-gray-200'>
              {positions && positions.map((position) => (
                  <li key={nanoid()}>
                      <a className='block hover:bg-gray-50'>
                          <div className='flex items-center px-4 py-4 sm:px-6'>
                              <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
                                  <div className='truncate'>
                                      <div className='flex text-sm'>
                                          <p className='text-ellipsis font-medium text-green-600'>{position?.subject}</p>
                                          <p className='ml-1 flex-shrink-0 font-normal text-gray-500'>{position?.textMessage}</p>
                                      </div>
                                      <div className='mt-2 flex'>
                                          <div className='flex items-center text-sm text-gray-500'>
                                              <CalendarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                                                            aria-hidden='true'/>
                                              <p>

                                                  <FormattedMessage
                                                      id="The date of an appointment"
                                                      defaultMessage="Default error message"
                                                  />
                                                {' '}
                                                  <time
                                                    className="font-bold"
                                                      dateTime={position?.dateAppointment}>{position?.dateAppointment} {position?.time}</time>
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className='mt-4 flex-shrink-0 sm:mt-0 sm:ml-5'>
                                      <button
                                          type='button'
                                          id={position?.id}
                                          className='rounded py-2 px-5 justify-around items-center px-2 py-1 border border-transparent text-base font-medium shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                                          onClick={handlerFirstRemove}
                                      >
                                          <FormattedMessage
                                              id="Remove"
                                              defaultMessage="Default error message"
                                          />
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </a>
                  </li>
              ))}
          </ul>}
      </div>
      {showModal && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
              &#8203;
            </span>
            <div
              className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
            >
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <svg
                    className='h-6 w-6 text-red-600'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>

                  <FormattedMessage
                      id="Are you sure?"
                      defaultMessage="Default error message"
                  />
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>

                    <FormattedMessage
                        id="You are about to delete an entry. This action cannot be undone."
                        defaultMessage="Default error message"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              id={elementId || ''}
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={handleDelete}
            >
              <FormattedMessage
                  id="Confirm"
                  defaultMessage="Default error message"
              />
            </button>
            <button
              type='button'
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={() => setShowModal(false)}
            >
              <FormattedMessage
                  id="Cancel"
                  defaultMessage="Default error message"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
); }
