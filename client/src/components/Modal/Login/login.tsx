import {Dispatch} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {UserActionTypes, Types, IGeneralState, IUser} from '../../../redux/types/types';
import React, {Fragment, useContext, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {AuthContext, AuthContextType} from "../../../context";
import GoogleAuth from "../Google/Google";
import {Route} from "react-router-dom";


interface LoginData {
  username: string;
  password: string;
}

interface ResponseData {
  token: string;
  userReady: IUser;
  message: string;
}

export function Login(): JSX.Element {
  const dispatch = useDispatch<ThunkDispatch<IGeneralState, unknown, UserActionTypes>>()

  const [userData, setUserData] = useState<LoginData>({username: '', password: ''});

  const {
    showModalLogin,
    setShowModalLogin,
    setShowModalMiniText,
    setShowModalMini, errorAuth, setErrorAuth
  } = useContext<AuthContextType>(AuthContext)

  // const [errorAuth, setErrorAuth] = useState('');


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
      const {token, userReady, message} = responseData

      if (responseData.token) {
        localStorage.setItem('jwtToken', responseData.token);
        dispatch({type: Types.LOGIN_SUCCESS, payload: userReady});
      } else {
        setErrorAuth('Invalid username or password')
        dispatch({type: Types.LOGIN_FAILURE, payload: {error: 'Invalid username or password'}});
      }
      return {token, userReady, message};
    } catch (error: any) {
      const errorMessage = error.response?.responseData?.error || 'An errorAuth occurred';
      setErrorAuth(errorMessage);
      dispatch({type: Types.LOGIN_FAILURE, payload: {error: errorMessage}});
      return Promise.reject(errorMessage);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData.username && userData.password) {
      try {
        const response = await dispatch(login(userData))
        if (response?.userReady?.username) {
          setShowModalLogin(false)
          setShowModalMiniText(response?.message)
          setShowModalMini(true)
        }

        if (!response?.userReady?.username) {
          // setShowModalLogin(false)
          setShowModalMiniText(response?.message)
          setShowModalMini(true)
          setErrorAuth(response?.message)
        }


      } catch (e) {
        console.log(e)
      }
    } else setErrorAuth('Fill all fields')

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
              <Dialog.Panel className="w-1/2">
                <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
                  <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-8 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1
                        className="text-xl text-left font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in
                      </h1>
                      <form onSubmit={onSubmit} className="space-y-2 md:space-y-4">
                        <div>
                          <label
                            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            User name
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                            name='username'
                            id="grid_password"
                            type="text"
                            autoComplete="off"
                            placeholder="Please, type your login"
                            onChange={signIn}
                            required/>
                        </div>

                        <div>
                          <label className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                            name='password'
                            id="grid-password"
                            type="password"
                            placeholder="••••••••"
                            onChange={signIn}
                            required/>
                          {errorAuth &&
                            <div className='flex flex-column justify-center align-items-center'>
                              <span className="top-0 right-0 py-3 px-4 text-sm text-red-600">
                                {errorAuth}
                              </span>
                            </div>
                          }
                        </div>

                        <div className='google flex justify-center'><GoogleAuth/></div>
                        <button type="submit"
                                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign
                          In
                        </button>
                      </form>
                      {/*<Route path='/auth/google' element={<GoogleAuth />} />*/}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

  );
}
