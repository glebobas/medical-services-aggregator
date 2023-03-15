import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { UserActionTypes, Types, IGeneralState, IUser } from '../../../redux/types/types';
import React, {Fragment, useContext, useRef, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {AuthContext, AuthContextType} from "../../../context";




export function MiniModal(): JSX.Element {


    // const open = useContext(contextOnClick)
    // const [open, setOpen] = useState(false)

    const {showModalMini, setShowModalMini, showModalMiniText} = useContext<AuthContextType>(AuthContext)



    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowModalMini(false)
    }

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={showModalMini} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowModalMini}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                    <form onSubmit={onSubmit} className="w-full max-w-lg">
                                        <div className="flex flex-column justify-center align-items-center -mx-3 mb-6">
                                            <div className="flex flex-column justify-center align-items-center w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    {showModalMiniText}
                                                </label>
                                            </div>
                                        </div>



                                        <div className='flex flex-column justify-center align-items-center'>
                                            <button type="submit"
                                                className=' left-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5'>Okay
                                            </button>

                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>

    );
}
