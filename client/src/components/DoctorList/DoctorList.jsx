import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import usePagination from '../../hooks/usePagination';
import Rating from '../Rating/Rating'
import {FormattedMessage} from "react-intl";

export function DoctorList({props}) {
  const [allDoctorsData, setAllDoctorsData] = useState([]);


  useEffect(() => {
    if (props === undefined) {
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
    }
    if (props !== undefined) {
      setAllDoctorsData(props)
    }
  }, [props]);


  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/doctor/${id}`, {state: {id}})
  }

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 5,
    count: allDoctorsData?.length,
  });

  return (
    <>
    {(allDoctorsData?.length > 0)
      ? (<div className="mt-4 flex flex-col">
        <h3 className="font-semibold text-xl mb-2">
          <FormattedMessage
              id='List of all the doctors'
              defaultMessage="Default error message"
          /></h3>
        <div className="overflow-auto rounded-lg shadow hidden lg:block">
          <table className="w-full divide-y divide-gray-300">
            <thead className="bg-gray-200 border-b-2 border-gray-200">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold tracking-wide text-gray-900 sm:pl-6"
              >
                <FormattedMessage
                    id='Doctor'
                    defaultMessage="Default error message"
                />
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold tracking-wide text-gray-900"
              >
                <FormattedMessage
                    id='Speciality'
                    defaultMessage="Default error message"
                />
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold tracking-wide text-gray-900"
              >
                <FormattedMessage
                    id='Clinic'
                    defaultMessage="Default error message"
                />
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold tracking-wide text-gray-900"
              >
                <FormattedMessage
                    id='Phone number'
                    defaultMessage="Default error message"
                />
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold tracking-wide text-gray-900"
              >
                <FormattedMessage
                    id='Rating'
                    defaultMessage="Default error message"
                />
              </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {allDoctorsData?.slice(firstContentIndex, lastContentIndex).map(field => (
              <tr key={field.email} className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => (handleClick(field.doctorId))}>
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
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
                <td className="py-4 px-2 pl-4 text-sm">{field.speciality}</td>
                <td className="py-4 px-2 pl-4 text-sm">{field.clinic}</td>
                <td className="py-4 px-2 pl-4 text-sm">{field.phone}</td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {/* <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                Active
                              </span> */}
                  <Rating rat={field.doctorRating}/>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/*Mobile responce*/}
        {allDoctorsData?.slice(firstContentIndex, lastContentIndex).map(field => (
          <div key={field.email} className="grid space-y-3 grid-cols-1 gap-4 lg:hidden">
            <div className="space-y-2 py-2">
              <div className="bg-white space-y-3 p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer" onClick={() => (handleClick(field.doctorId))}>
                <div className="flex justify-between space-x-2 text-sm">
                  <div className="flex-col w-1/2 space-y-3">
                    <div className="font-semibold">{field.name}</div>
                    <div className="py-2">
                      <FormattedMessage
                        id={field.speciality}
                        defaultMessage="Default error message"
                    />
                    </div>
                    <div>{field.clinic}</div>
                  </div>
                  <div className="flex-col space-y-3">
                    <div>{field.phone}</div>
                    <div><Rating rat={field.doctorRating}/></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-4 space-x-1">
          <p className="text p-2">
            {page} / {totalPages}
          </p>
          <button onClick={prevPage} className="page bg-white py-2 px-4 rounded-lg border">
            &larr;
          </button>
          {[...Array(totalPages)?.keys()].map((el) => (
            <button
              onClick={() => setPage(el + 1)}
              key={el}
              className={`page ${page === el + 1 ? "active bg-green-600 py-2 px-4 border rounded-lg text-white" : "bg-white py-2 px-4 border rounded-lg"}`}
            >
              {el + 1}
            </button>
          ))}
          <button onClick={nextPage} className="page bg-white py-2 px-4 rounded-lg border">
            &rarr;
          </button>
        </div>
      </div>)
      : (<div className="mt-4 flex flex-col font-semibold text-2xl"><FormattedMessage
            id='Records not found'
            defaultMessage="Default error message"
        /></div>)
    }
    </>
  )
}
