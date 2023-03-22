import { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/20/solid';

export function Note() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState(null);
  const [positions, setPositions] = useState([
    {
      id: 1,
      title: 'Запись к хирургу',
      department: 'Клиника Рассвет создана',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
    },
    {
      id: 2,
      title: 'Запись к хирургу',
      department: 'Клиника Рассвет создана',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
    },
    {
      id: 3,
      title: 'Запись к хирургу',
      department: 'Клиника Рассвет создана',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
    },
  ]);


  const handleDelete = () => {
    const updatedPositions = positions.filter((position) => position.id !== selectedPositionId);
    setPositions(updatedPositions);
    setShowModal(false);
  };

  return (
    <div className='ml-1'>
      <h3 className='font-sans text-slate-300 font-semibold text-lg subpixel-antialiased not-italic text-center'>
       Полученные сообщения
      </h3>
      <div className='p-2 w-full justify-center aligoverflow-hidden bg-white shadow sm:rounded-md'>
        <ul role='list' className='divide-y divide-gray-200'>
          {positions.map((position) => (
            <li key={position.id}>
              <a className='block hover:bg-gray-50'>
                <div className='flex items-center px-4 py-4 sm:px-6'>
                  <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
                    <div className='truncate'>
                      <div className='flex text-sm'>
                        <p className='truncate font-medium text-green-600'>{position.title}</p>
                        <p className='ml-1 flex-shrink-0 font-normal text-gray-500'>в {position.department}</p>
                      </div>
                      <div className='mt-2 flex'>
                        <div className='flex items-center text-sm text-gray-500'>
                          <CalendarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                          <p>
                            Дата приема <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='mt-4 flex-shrink-0 sm:mt-0 sm:ml-5'>
                      <button
                        type='button'
                        className='justify-around items-center px-2 py-1 border border-transparent text-base font-medium shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                        onClick={() => setShowModal(true)}
                      >
                      Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
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
                  Вы точно уверены?
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Вы собираетесь удалить запись. Это действие не может быть отменено.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={handleDelete}
            >
              Подтвердить
            </button>
            <button
              type='button'
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={() => setShowModal(false)}
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
); }
