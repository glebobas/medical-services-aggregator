import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
//import FormAddReview from "./FormAddReview";

import { Listbox } from "@headlessui/react";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import ActiveRating from "../ActiveRating/ActiveRating";
import { ContextReview } from "../../context/context";
import { ContextAddReview } from "../../context/context";
import styles from "../ActiveRating/activeRating.module.css";
import { useSelector } from "react-redux";
const assignees = [
  { name: "Unassigned", value: null },
  {
    name: "Wade Cooper",
    value: "wade-cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More items...
];
const labels = [
  { name: "Annonimus", value: null },
  
];
const dueDates = [
  { name: "Today", value: "today" },
  // More items...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AddReview(props) {
  const { id } = useParams();
  const { showed } = props;
  const { close } = useContext(ContextReview);
  const { setClinic } = useContext(ContextAddReview);
  const cancelButtonRef = useRef(null);
  const [assigned, setAssigned] = useState(assignees[0]);
  const [dated, setDated] = useState(dueDates[0]);
  const dataNow = "21.03.2023";
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const user = useSelector((state) => state.login.user)
  console.log(user)
  today = yyyy + "-" + mm + "-" + dd;
  const [dataForm, setDataForm] = useState({
    date: today,
    rating: null,
    reviewId: 56,
    reviewText: "",
    clinicId: id,
    reviewerName: "Aaliyah Schaden",
  });
  const token = localStorage.getItem("jwtToken")


  const handleChange = (event) => {
    setDataForm({ ...dataForm, [event.target.name]: event.target.value, reviewerName: `${user.firstName} ${user.lastName}`});
  };
  const handleClickStar = (event) => {
    console.log(event.target.value);
    setDataForm({ ...dataForm, rating: event.target.value  })
  };
  const send = () => {
    close();
    setClinic((prevState) => ({
      ...prevState,
      reviewsReady: [dataForm, ...prevState.reviewsReady],
    }));
    (async () => {
      const responseOne = await fetch('/user/review/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({clinicId: id, reviewText: dataForm.reviewText}),
    });
    responseOne.json().then((r) => console.log('responseOne==========>',r))
    const responseTwo = await fetch('/user/rating/new', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({clinicRating: dataForm.rating, clinicId: id}),
  });
  responseTwo.json().then((r) => console.log('responseTwo==========>',r))
    })()

  };

  return (
    <Transition.Root show={showed} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full ">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjI8TgjasvTLISaSex172l_satnuaM43G6yg&usqp=CAU"
                      alt=""
                    />
                  </div>
                  {/* <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h4"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add a review
                    </Dialog.Title>
                  </div> */}
                </div>
                <div>
                  <form className="relative">
                    <div className="overflow-hidden rounded-lg  border-none shadow-sm ">
                      <label htmlFor="description" className="sr-only">
                        Description
                      </label>
                      <textarea
                        onChange={handleChange}
                        rows={2}
                        name="reviewText"
                        id="description"
                        className="block w-full resize-none border-0 py-0 placeholder-gray-500  sm:text-sm"
                        placeholder="Write a review..."
                        value={dataForm.text}
                      />

                      {/* Spacer element to match the height of the toolbar */}
                      <div aria-hidden="true">
                        <div className="py-2">
                          <div className="h-9" />
                        </div>
                        <div className="h-px" />
                        <div className="py-2">
                          <div className="py-px">
                            <div className="h-9" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-x-px bottom-0">
                      {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                      <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">
                        <div className={styles["rating-area"]}>
                          <input
                            onClick={handleClickStar}
                            type="radio"
                            id="star-5"
                            name="rating"
                            value="5"
                          />
                          <label htmlFor="star-5" title="Оценка «5»"></label>
                          <input
                            onClick={handleClickStar}
                            type="radio"
                            id="star-4"
                            name="rating"
                            value="4"
                          />
                          <label htmlFor="star-4" title="Оценка «4»"></label>
                          <input
                            onClick={handleClickStar}
                            type="radio"
                            id="star-3"
                            name="rating"
                            value="3"
                          />
                          <label htmlFor="star-3" title="Оценка «3»"></label>
                          <input
                            onClick={handleClickStar}
                            type="radio"
                            id="star-2"
                            name="rating"
                            value="2"
                          />
                          <label htmlFor="star-2" title="Оценка «2»"></label>
                          <input
                            onClick={handleClickStar}
                            type="radio"
                            id="star-1"
                            name="rating"
                            value="1"
                          />
                          <label htmlFor="star-1" title="Оценка «1»"></label>
                        </div>
                        <Listbox
                          as="div"
                          value={assigned}
                          onChange={setAssigned}
                          className="flex-shrink-0"
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="sr-only">
                                {" "}
                                Assign{" "}
                              </Listbox.Label>
                              <div className="relative">
                                <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                  {assigned.value === null ? (
                                    <UserCircleIcon
                                      className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <img
                                      src={assigned.avatar}
                                      alt=""
                                      className="h-5 w-5 flex-shrink-0 rounded-full"
                                    />
                                  )}

                                  <span
                                    className={classNames(
                                      assigned.value === null
                                        ? ""
                                        : "text-gray-900",
                                      "hidden truncate sm:ml-2 sm:block"
                                    )}
                                  >
                                    {assigned.value === null
                                      ? `${user.firstName} ${user.lastName}`
                                      : assigned.name}
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {assignees.map((assignee) => (
                                      <Listbox.Option
                                        key={assignee.value}
                                        className={({ active }) =>
                                          classNames(
                                            active ? "bg-gray-100" : "bg-white",
                                            "relative cursor-default select-none py-2 px-3"
                                          )
                                        }
                                        value={assignee}
                                      >
                                        <div className="flex items-center">
                                          {assignee.avatar ? (
                                            <img
                                              src={assignee.avatar}
                                              alt=""
                                              className="h-5 w-5 flex-shrink-0 rounded-full"
                                            />
                                          ) : (
                                            <UserCircleIcon
                                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                                              aria-hidden="true"
                                            />
                                          )}

                                          <span className="ml-3 block truncate font-medium">
                                            {assignee.name}
                                          </span>
                                        </div>
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>

                        <Listbox
                          as="div"
                          value={dated}
                          onChange={setDated}
                          className="flex-shrink-0"
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="sr-only">
                                {" "}
                                Add a due date{" "}
                              </Listbox.Label>
                              <div className="relative">
                                <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                  <CalendarIcon
                                    className={classNames(
                                      dated.value === null
                                        ? "text-gray-300"
                                        : "text-gray-500",
                                      "h-5 w-5 flex-shrink-0 sm:-ml-1"
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span
                                    className={classNames(
                                      dated.value === null
                                        ? ""
                                        : "text-gray-900",
                                      "hidden truncate sm:ml-2 sm:block"
                                    )}
                                  >
                                    {dated.value === null
                                      ? "Due date"
                                      : dated.name}
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {dueDates.map((dueDate) => (
                                      <Listbox.Option
                                        key={dueDate.value}
                                        className={({ active }) =>
                                          classNames(
                                            active ? "bg-gray-100" : "bg-white",
                                            "relative cursor-default select-none py-2 px-3"
                                          )
                                        }
                                        value={dueDate}
                                      >
                                        <div className="flex items-center">
                                          <span className="block truncate font-medium">
                                            {today}
                                          </span>
                                        </div>
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
                  </form>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={() => {
                      send();
                    }}
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => close()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default React.memo(AddReview);
