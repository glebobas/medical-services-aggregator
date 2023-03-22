import React, { useState } from "react";
import { useSelector } from "react-redux";
import SelectMenus from "../SelectMenus/SelectMenus";
import Rating from "../Rating/Rating";
import { useNavigate } from "react-router-dom";
import {FormattedMessage} from "react-intl";

export function DoctorsTable({ data }) {
  console.log("-> data", data);

  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log("click doctor table->", id);
    navigate(`/doctor/${id}`, { state: { id } });
  };

  return (
    <>

      {!data?.length > 0 ? (
        <h3 className="font-semibold text-xl mt-4">

          <FormattedMessage
              id='No doctors found in clinic matching your request'
              defaultMessage="Default error message"
          />
        </h3>
      ) : (
        <div className="tableDoctors">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    <FormattedMessage
                        id='Doctor'
                        defaultMessage="Default error message"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >

                    <FormattedMessage
                        id='Speciality'
                        defaultMessage="Default error message"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <FormattedMessage
                        id='Clinic'
                        defaultMessage="Default error message"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <FormattedMessage
                        id='Phone number'
                        defaultMessage="Default error message"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <FormattedMessage
                        id='Rating'
                        defaultMessage="Default error message"
                    />
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {data?.map((field) => (
                  <tr
                    key={field.email}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleClick(field.doctorId)}
                  >
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
                          <div className="text-gray-500">{field.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 pl-4 text-sm">

                      <FormattedMessage
                          id={field.speciality}
                          defaultMessage="Default error message"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 pl-4 text-sm">
                      {field.clinic}
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 pl-4 text-sm">
                      {field.phone}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                Active
                              </span> */}
                      <Rating rat={field.doctorRating} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

// <tbody className="divide-y divide-gray-200 bg-white">
// {people.map((person) => (
//   <tr key={person.email}>
//     <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
//       <div className="flex items-center">
//         <div className="h-10 w-10 flex-shrink-0">
//           <img
//             className="h-10 w-10 rounded-full"
//             src="https://cdn-icons-png.flaticon.com/512/194/194915.png"
//             alt=""
//           />
//         </div>
//         <div className="ml-4">
//           <div className="font-medium text-gray-900">
//             {person.name}
//           </div>
//           <div className="text-gray-500">
//             {person.email}
//           </div>
//         </div>
//       </div>
//     </td>
//     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//       <div className="text-gray-900">{person.title}</div>
//       <div className="text-gray-500">
//         {person.department}
//       </div>
//     </td>
//     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//       {/* <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
//                             Active
//                           </span> */}
//       <Rating rat={4.7}/>
//     </td>
//     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//       {person.role}
//     </td>
//     <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
//       <a
//         href="#"
//         className="text-indigo-600 hover:text-indigo-900"
//       >
//         Выбрать
//         <span className="sr-only">, {person.name}</span>
//       </a>
//     </td>
//   </tr>
// ))}
// </tbody>
