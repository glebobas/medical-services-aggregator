import React, {useContext, useState} from "react";
import Rating from "../Rating/Rating";
import {SearchResultsContext} from '../../context/context'


const people = [
  {
    name: "Insta Samka",
    title: "Хирург",
    department: "Optimization",
    email: "instasamka@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Korol Shut",
    title: "Терапевт",
    department: "Optimization",
    email: "kish@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  }
];

export function ClinicsAndDoctorsTable() {
  const [doc, setDoc] = useState(people)
  const {data} = useContext(SearchResultsContext)
  console.log("-> data", data);


  return (
    <div className="mt-4 flex flex-col">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Имя
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Рейтинг
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Role
            </th>
            <th
              scope="col"
              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
            >
              <span className="sr-only">Выбрать</span>
            </th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
          {people.map((person) => (
            <tr key={person.email}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://cdn-icons-png.flaticon.com/512/194/194915.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {person.name}
                    </div>
                    <div className="text-gray-500">
                      {person.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray-900">{person.title}</div>
                <div className="text-gray-500">
                  {person.department}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {/* <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Active
                          </span> */}
                <Rating rat={4.7}/>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {person.role}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Выбрать
                  <span className="sr-only">, {person.name}</span>
                </a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
