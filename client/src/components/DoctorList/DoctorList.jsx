import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Rating from '../Rating/Rating'

export function DoctorList() {

  const [allDoctorsData, setAllDoctorsData] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/main/doctors', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      const data = await response.json();
      setAllDoctorsData(data);
      console.log(data);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)
  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler);
  //   }
  // });

  // const scrollHandler = (e) => {
  //   if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
  //     console.log('scroll');
  //   }
  //   console.log('scrollHeight', e.target.documentElement.scrollHeight);
  //   console.log('scrollHeight');
  //   console.log('scrollHeight', window.innerHeight);

  // }

  const navigate = useNavigate()
  const handleClick = (field) => {
    navigate(`/clinic/${field}`)
  }

  console.log(allDoctorsData);

  return (
    <div className="mt-4 flex flex-col">
      <h3 className="font-semibold text-xl mb-2">List of all the doctors</h3>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Доктор
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Специализация
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Клиника
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Телефон
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Рейтинг
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {allDoctorsData?.map(field => (
              <tr key={field.email} className="hover:bg-gray-100 cursor-pointer" onClick={() => (handleClick(field.doctorId))}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={field.avatar}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {field.name}
                      </div>
                      <div className="text-gray-500">
                        {field.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 pl-4 text-sm">{field.speciality}</td>
                <td className="whitespace-nowrap py-4 px-2 pl-4 text-sm">{field.clinic}</td>
                <td className="whitespace-nowrap py-4 px-2 pl-4 text-sm">{field.phone}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {/* <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                Active
                              </span> */}
                  <Rating rat={4.7} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
