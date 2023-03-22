import React, {useContext} from 'react';
import {SearchResultsContext} from "../../context/context";
import {useNavigate} from "react-router-dom";


import {useState} from 'react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {Combobox} from '@headlessui/react'
import {DoctorList} from "../../components/DoctorList";
import {useSelector} from "react-redux";
import {ClinicList} from "../../components/ClinicList";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function SearchPage() {
  const [queryPerson, setPersonQuery] = useState('')
  const [queryLocation, setLocationQuery] = useState('')
  const [selectedSpeciality, setSelectedSpeciality] = useState()
  const [selectedLocation, setSelectedLocation] = useState()
  const [doctors, setDoctors] = useState([])
  const [topDoctorsClinics, setTopDoctorsClinics] = useState([])
  const topDoctors = topDoctorsClinics?.readyDoctorList
  const topClinics = topDoctorsClinics?.readyClinicList

  const speciality = useSelector((state) => [{id: 0, name: ''}, ...state?.speciality?.speciality])
  const getAllAddressArray = useSelector((state) => [{id: 0, name: ''}, ...state?.addresClinics?.addresClinics])
  const location = [...new Set(getAllAddressArray.map(item => item.countryName))]

  // Checked children
  const [isCheckedChildren, setIsCheckedChildren] = useState(false);
  // Checked parent
  const [isCheckedParent, setIsCheckedParent] = useState(false);
  // Checked random
  const [isCheckedRandom, setIsCheckedRandom] = useState(false);
  const handleCheckboxChildrenChange = (event) => {
    setIsCheckedChildren(event.target.checked);
  };
  const handleCheckboxParentChange = (event) => {
    setIsCheckedParent(event.target.checked);
  };

  const handleCheckboxRandomChange = (event) => {
    setIsCheckedRandom(event.target.checked);
  }

  const filteredSpeciality =
    queryPerson === ''
      ? speciality
      : speciality.filter((person) => {
        return person.name.toLowerCase().includes(queryPerson.toLowerCase())
      })

  const filteredLocation =
    queryLocation === ''
      ? location
      : location.filter((place) => {
        return place.countryName.toLowerCase().includes(queryLocation.toLowerCase())
      })


  // TODO: Продолжить логику
  const handleButtonClick = async () => {
    setDoctors([])
    setTopDoctorsClinics([])
    let query = `?adultPatients=${isCheckedParent}&childrenPatients=${isCheckedChildren}`

    if (selectedSpeciality) {
      query += `&specialityName=${selectedSpeciality.name}`;
    }
    if (selectedLocation) {
      query += `&countryName=${selectedLocation}`;
    }
    if (isCheckedRandom) {
      fetch(`/main/random${query}`)
        .then(response => response.json())
        .then(data => setTopDoctorsClinics(data))
        .catch(error => console.log(error))
    } else {
      fetch(`/main/somedoctors${query}`)
        .then(response => response.json())
        .then(data => setDoctors(data))
        .catch(error => console.log(error))
    }
  }


  return (
    <div className="flex flex-col flex-grow mt-4 w-full">
      <div className="title flex flex-row font-semibold text-xl">Расширенный поиск</div>
      <div className="flex flex-row flex-grow justify-start rounded border mt-4">
        <div className="flex-col bg-white w-1/3 px-6 py-6">
          <Combobox as="div" value={selectedSpeciality} onChange={setSelectedSpeciality}>
            <Combobox.Label
              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Специальность</Combobox.Label>
            <div className="relative mt-1">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                onChange={(event) => setPersonQuery(event.target.value)}
                displayValue={(person) => person?.name}
              />
              <Combobox.Button
                className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </Combobox.Button>

              {filteredSpeciality.length > 0 && (
                <Combobox.Options
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredSpeciality.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      value={person}
                      className={({active}) =>
                        classNames(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-green-600 text-white' : 'text-gray-900'
                        )
                      }
                    >
                      {({active, selected}) => (
                        <>
                          <span
                            className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                          {selected && (
                            <span
                              className={classNames(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-white' : 'text-green-600'
                              )}
                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
          <div className="flex flex-row mt-4">
            <div className="flex-col w-1/2">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="children"
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={isCheckedChildren}
                    onChange={handleCheckboxChildrenChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="children" className="font-medium text-gray-700">
                    Детский
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-col w-1/2">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="parent"
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={isCheckedParent}
                    onChange={handleCheckboxParentChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="parent" className="font-medium text-gray-700">
                    Взрослый
                  </label>
                </div>
              </div>
            </div>
          </div>
          <Combobox as="div" className="mt-4" value={selectedLocation} onChange={setSelectedLocation}>
            <Combobox.Label
              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Местоположение</Combobox.Label>
            <div className="relative mt-1">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                onChange={(event) => setLocationQuery(event.target.value)}
                displayValue={(person) => person}
              />
              <Combobox.Button
                className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </Combobox.Button>

              {filteredLocation.length > 0 && (
                <Combobox.Options
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredLocation.map((place) => (
                    <Combobox.Option
                      key={place}
                      value={place}
                      className={({active}) =>
                        classNames(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-green-600 text-white' : 'text-gray-900'
                        )
                      }
                    >
                      {({active, selected}) => (
                        <>
                          <span
                            className={classNames('block truncate', selected && 'font-semibold')}>{place}</span>

                          {selected && (
                            <span
                              className={classNames(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-white' : 'text-green-600'
                              )}
                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
          <div className="flex-row mt-4">
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="candidates"
                  aria-describedby="candidates-description"
                  name="candidates"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={isCheckedRandom}
                  onChange={handleCheckboxRandomChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="candidates" className="font-medium text-gray-700">
                  Случайный поиск среди лучших клиник и врачей
                </label>
              </div>
            </div>
          </div>
          <button className="mt-6 border rounded px-8 py-2 bg-green-700 text-white hover:bg-green-800"
                  onClick={handleButtonClick}>Search
          </button>
        </div>
        <div className="flex-col px-6 py-6">
          {(topDoctorsClinics.length === 0)
            ? (<DoctorList props={doctors}/>)
            : (
              <>
                <DoctorList props={topDoctors}/>
                <ClinicList props={topClinics}/>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

