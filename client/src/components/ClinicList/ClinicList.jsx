import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '../Rating/Rating';

export default function ClinicList() {

  const [allClinicsData, setAllClinicsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/main/alldataquery', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      const data = await response.json();
      setAllClinicsData(data);
    };
    fetchData();
  }, [])

  const navigate = useNavigate()
  const handleClick = (field) => {
    navigate(`/clinic/${field}`)
  }

  return (
    <div className="mt-4 flex flex-col">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                Клиника
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Адрес
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Телефон
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Рейтинг
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {allClinicsData?.readyClinicList.map(field => {
              return (
                <tr key={field.email} name={`clinic ${field.id}`} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleClick(field.clinicId)}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://cdn-icons-png.flaticon.com/512/3799/3799073.png"
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
                  <td className="whitespace-nowrap py-4 px-2 pl-4 text-sm">{field.address}</td>
                  <td className="whitespace-nowrap py-4 px-2 pl-4 text-sm">{field.phone}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {/* <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                Active
                              </span> */}
                    <Rating rat={4.7} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
