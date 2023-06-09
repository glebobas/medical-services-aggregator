import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import styles from "./select.module.css";
import {FormattedMessage} from "react-intl";

const people = [
  { id: 7, name: "Select profile" },
  { id: 6, name: "All doctors" },
  { id: 1, name: "Dentist" },
  { id: 2, name: "Cardiologist" },
  { id: 3, name: "Dermatologist" },
  { id: 4, name: "Surgeon" },
  { id: 5, name: "Therapist" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SelectMenus() {

  const [selected, setSelected] = useState(people[0]);

  return (
    <div className={styles.container}>
    <div className={styles.select }>
      <Listbox value={selected} onChange={setSelected} >
        {({ open }) => (
          <>
            {/*<Listbox.Label className="block text-sm font-medium text-gray-700">*/}
            {/*  <FormattedMessage*/}
            {/*      id='Choose speciality'*/}
            {/*      defaultMessage="Default error message"*/}
            {/*  />*/}
            {/*</Listbox.Label>*/}
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="block truncate">
                  <FormattedMessage
                      id={selected.name}
                      defaultMessage="Default error message"
                  />

                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-green-600" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            <FormattedMessage
                                id={person.name}
                                defaultMessage="Default error message"
                            />
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-gray-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
    </div>
  );
}
export default React.memo(SelectMenus)
