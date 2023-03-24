import { Fragment, useCallback, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  BookmarkSquareIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Rating from "../Rating/Rating";
import AddButton from "../AddButton/AddButton";
import AddReview from "../AddReview/AddReview";
import { ContextReview } from "../../context/context";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ReviewsMenu(props) {
  const {rev} = props
  const [show, setShow] = useState(false)
  const handleClickAdd = useCallback(() => {
    console.log('click')
    setShow(true)
  },[])
  const close = () => {
    setShow(false)
  }
  return (
    <ContextReview.Provider value={{close}}>
    <Popover className="relative z-0 mt-10">
      
      {({ open }) => (
        <>
        <AddReview showed={show}/>
          <div className="relative z-10 bg-white shadow">
            <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Popover.Button
                className={classNames(
                  open ? "text-gray-900" : "text-gray-500",
                  "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500  "
                )}
              >
                <span>Reviews</span>
                <ChevronDownIcon
                  className={classNames(
                    open ? "text-gray-600" : "text-yellow-400",
                    "ml-2 h-5 w-5 group-hover:text-yellow-500"
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className=" inset-x-0 z-10 transform shadow-lg">
              <div className=" inset-0 flex" aria-hidden="true">
                <div className="w-1/2 bg-white" />
                <div className="w-1/2 bg-gray-50" />
              </div>
              
              <div className="relative mx-auto grid max-w-7xl grid-cols-1 ">
                <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                <div className="mt-6 text-sm font-medium">
                    <a
                    
                      className=" flex text-gray-600 transition duration-150 ease-in-out hover:text-gray-500"
                    >
                     Add a review
                     <div onClick={handleClickAdd}>
                      <AddButton />
                      </div>
                    </a>
                  </div>
                  <div>
                  <AddReview showed={show}/>
                    <ul role="list" className="mt-6 space-y-6">
                      {rev?.map((post, index) => (
                        <li key={post.reviewId + index } className="flow-root">
                          <a
                            className="-m-3 flex rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-100"
                          >
                            <div className="min-w-0 flex-1 sm:ml-8">
                              <div className="-m-3 flex rounded-lg p-3 transition duration-150 ease-in-out">
                                <h4 className="truncate text-base font-medium text-gray-900">
                                 {post.reviewerName}
                                </h4>
                                <p className="ml-2 mt-1 text-sm text-gray-500">
                                  {post.date}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-700">
                                {post.reviewText}
                              </p>
                            </div>
                            <Rating rat={post.rating} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                 
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
    </ContextReview.Provider>
  );
}
