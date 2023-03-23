import React, {Fragment, useState} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {FormattedMessage} from "react-intl";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
let counter = 0
export default function SortButton({allDoctorsData, setAllDoctorsData}) {

    const handleSortByRating = () => {
        counter += 1
        if (counter % 2 !== 0) {
            const sorted = [...allDoctorsData].sort((a, b) => Number(b.clinicRating) - Number(a.clinicRating));
            setAllDoctorsData(sorted);
        }
        if (counter % 2 === 0) {
            const sorted = [...allDoctorsData].sort((a, b) => Number(a.clinicRating) - Number(b.clinicRating));
            setAllDoctorsData(sorted);
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <FormattedMessage
                        id='Sort'
                        defaultMessage="Default error message"
                    />
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({active}) => (
                                <div
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                    onClick={handleSortByRating}
                                >
                                    <FormattedMessage
                                        id="Sort by rating"
                                        defaultMessage="Default error message"
                                    />
                                </div>
                            )}
                        </Menu.Item>
                       <Menu.Item>
                            {({active}) => (
                                <div
                                    // onClick={logOut}
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                >
                                    <FormattedMessage
                                        id="Sort by free time slots"
                                        defaultMessage="Default error message"
                                    />
                                </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu.Items>
            </Transition>
        </Menu>
)
}
