import {Dispatch} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch, useSelector} from 'react-redux';
import {UserActionTypes, Types, IGeneralState, IUser} from '../../../redux/types/types';
import React, {Fragment, useContext, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {AuthContext, AuthContextType} from "../../../context";


interface LoginData {
  username: string;
  password: string;
}

interface ResponseData {
  token: string;
  userReady: IUser;
}

export function Login(): JSX.Element {
    const dispatch = useDispatch<ThunkDispatch<IGeneralState, unknown, UserActionTypes>>()

    const [userData, setUserData] = useState<LoginData>({username: '', password: ''});

    const {
        showModalLogin,
        setShowModalLogin,
        setShowModalMiniText,
        setShowModalMini
    } = useContext<AuthContextType>(AuthContext)

  const [error, setError] = useState('');

    const signIn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    const login = (data: LoginData): ThunkAction<Promise<ResponseData>, IGeneralState, unknown, UserActionTypes> => async (dispatch: Dispatch<UserActionTypes>): Promise<ResponseData> => {
        const {username, password} = data;

    try {

            dispatch({
                type: Types.LOGIN_REQUEST,
            });
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            const responseData = await response.json();
            const {token, userReady} = responseData

            if (responseData.token) {
                localStorage.setItem('jwtToken', responseData.token);
                dispatch({type: Types.LOGIN_SUCCESS, payload: userReady});
            } else {
                setError('Invalid username or password')
                dispatch({type: Types.LOGIN_FAILURE, payload: {error: 'Invalid username or password'}});
            }
            return {token, userReady};
        } catch (error: any) {
            const errorMessage = error.response?.responseData?.error || 'An error occurred';
            setError(errorMessage);
            dispatch({type: Types.LOGIN_FAILURE, payload: {error: errorMessage}});
            return Promise.reject(errorMessage);
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userData.username && userData.password) {
            try {
                const response = await dispatch(login(userData))
                if (response.userReady.username) {
                    setShowModalLogin(false)
                    setShowModalMiniText('Login successful!')
                    setShowModalMini(true)
                } else setError("Couldn't enter on site")


            } catch (e) {
                console.log(e)
            }
        } else setError('Fill all fields')

  }

  const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={showModalLogin} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowModalLogin}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
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
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                    <form onSubmit={onSubmit} className="w-full max-w-lg">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    User name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    name='username'
                                                    id="grid_password"
                                                    type="text"
                                                    placeholder="Please, type your login"
                                                    onChange={signIn}
                                                    required/>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    Password
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    name='password'
                                                    id="grid-password"
                                                    type="password"
                                                    placeholder="Please, type your login"
                                                    onChange={signIn}
                                                    required />
                                                    {error &&
                                                <div className='flex flex-column justify-center align-items-center'>
                                                    <span className="top-0 right-0 py-3 px-4 text-sm text-red-600">
                                                        {error}
                                                    </span>
                                                </div>
                                                    }
                                            </div>

                                        </div>

                                        <div className='flex flex-column justify-center align-items-center'>
                                            <button type="submit"
                                                className=' left-20 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5'>Sign
                                                In
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
