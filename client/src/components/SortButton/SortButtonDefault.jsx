import React from 'react'
import {Menu} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

let counter = 0
export default function SortButtonDefault({allClinicsData, setAllClinicsData, allDoctorsData, setAllDoctorsData, shedule, setShedule}) {
    const handleSortByRating = () => {
        counter += 1

        if (counter % 2 !== 0) {
            if (allClinicsData?.length) {
                const sorted = [...allClinicsData].sort((a, b) => Number(b.clinicRating) - Number(a.clinicRating));
                setAllClinicsData(sorted);
            }
            if (allDoctorsData?.length) {
                const sorted = [...allDoctorsData].sort((a, b) => Number(b.doctorRating) - Number(a.doctorRating));
                setAllDoctorsData(sorted);
            }
            if (shedule?.length) {
                const sorted = [...shedule].sort((a, b) => Number(b.doctorRating) - Number(a.doctorRating));
                setShedule(sorted);
            }


        }
        if (counter % 2 === 0) {
            if (allClinicsData?.length) {
                const sorted = [...allClinicsData].sort((a, b) => Number(a.clinicRating) - Number(b.clinicRating));
                setAllClinicsData(sorted);
            }
            if (allDoctorsData?.length) {
                const sorted = [...allDoctorsData].sort((a, b) => Number(a.doctorRating) - Number(b.doctorRating));
                setAllDoctorsData(sorted);
            }

            if (shedule?.length) {
                const sorted = [...shedule].sort((a, b) => Number(a.doctorRating) - Number(b.doctorRating));
                setShedule(sorted);
            }

        }

    };
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 ring-gray-300">
                    {/*<FormattedMessage*/}
                    {/*    id='Sort'*/}
                    {/*    defaultMessage="Default error message"*/}
                    {/*/>*/}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" onClick={handleSortByRating} />
                </Menu.Button>
            </div>
        </Menu>
    )
}
