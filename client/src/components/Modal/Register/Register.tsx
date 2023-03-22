import {Dispatch} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {UserActionTypes, Types, IGeneralState} from '../../../redux/types/types';
import React, {Fragment, useContext, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {AuthContext, AuthContextType} from "../../../context";
import GoogleAuth from "../Google/Google";
import {FormattedMessage} from "react-intl";

interface RegData {
  username: string;
  password: string;
  telephone: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ResponseData {
  message: string;
  error: string;
  username: string;
}

function Register(): JSX.Element {
  const dispatch = useDispatch<ThunkDispatch<IGeneralState, unknown, UserActionTypes>>()
  // const dispatch = useDispatch()

  const [userData, setUserData] = useState<RegData>({
    username: '',
    password: '',
    telephone: '',
    lastName: '',
    firstName: '',
    email: ''
  });

  const {
    showModalRegister,
    setShowModalRegister,
    setShowModalMiniText,
    setShowModalMini,
    errorAuth, setErrorAuth
  } = useContext<AuthContextType>(AuthContext)

  const signUp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, [event.target.name]: event.target.value});
  }

  const register = (data: RegData): ThunkAction<Promise<ResponseData>, IGeneralState, unknown, UserActionTypes> => async (dispatch: Dispatch<UserActionTypes>): Promise<ResponseData> => {
    const {username, password, telephone, lastName, firstName, email} = data;

    try {

      dispatch({
        type: Types.REGISTER_REQUEST,
      });
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, email, firstName, lastName, telephone}),
      });
      const responseData = await response.json();

      const {message, error} = responseData

      if (responseData.message === 'Registration successful!') {
        dispatch({type: Types.REGISTER_SUCCESS, payload: {message}});
      } else {
        setErrorAuth(error)
        dispatch({type: Types.REGISTER_FAILURE, payload: {error}});
      }
      // responseData.username = ''
      return responseData
    } catch (error: any) {
      const errorMessage = error.response?.responseData?.error || 'An errorAuth occurred';
      setErrorAuth(errorMessage);
      dispatch({type: Types.REGISTER_FAILURE, payload: {error: errorMessage}});
      return Promise.reject(errorMessage);
    }
  };


  const {placeholderText, setPlaceholderText, locale} = useContext(AuthContext);


  useEffect(()=>{
    if (locale === 'ru') {
      setPlaceholderText({
        loginName: 'Пожалуйста, введите логин здесь',
        password: 'Пожалуйста, введите пароль здесь',
        username: 'Пожалуйста, введите логин',
        firstName: 'Пожалуйста, введите своё имя',
        lastName: 'Пожалуйста, введите свою фамилию',
        email: 'Пожалуйста введите свою электронную почту',
        phoneNumber: 'Пожалуйста введите свой номер телефона'
      })
    }
    if (locale === 'en') {
      setPlaceholderText({
        loginName: 'Please enter your login here',
        password: 'Please enter your password here',
        username: 'Please enter your username',
        firstName: 'Please enter your first name',
        lastName: 'Please enter your last name',
        email: 'Please enter your email',
        phoneNumber: 'Please enter your phone number'
      })
    }
  },[locale])



  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (userData.username && userData.password && userData.email && userData.firstName && userData.lastName && userData.telephone) {
        const data = await dispatch(register(userData))
        // console.log("-> data", data);

        // if (data?.message === 'Registration successful!') {
          setShowModalRegister(false)
          setShowModalMiniText(data)
          setShowModalMini(true)
        // }

        // if (data?.message !== 'Registration successful!') {
        //   // setShowModalRegister(false)
        //   setShowModalMiniText(data)
        //   setShowModalMini(true)
        // }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={showModalRegister} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowModalRegister}>
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
                className="w-1/2">
                <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
                  <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-8 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1
                        className="text-xl text-left font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        <FormattedMessage
                            id='Create an account'
                            defaultMessage="Default error message"
                        />
                      </h1>
                      <form onSubmit={onSubmit} className="space-y-2 md:space-y-4">
                        <div>
                          <label
                            className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">

                            <FormattedMessage
                                id='Login '
                                defaultMessage="Default error message"
                            />
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                            name='username'
                            type="text"
                            autoComplete="off"
                            placeholder={placeholderText.username}
                            onChange={signUp}
                            required/>

                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label
                              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">

                              <FormattedMessage
                                  id='First name'
                                  defaultMessage="Default error message"
                              />
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                              name='firstName'
                              type="text"
                              autoComplete="off"
                              placeholder={placeholderText.firstName}
                              onChange={signUp}
                              required/>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label
                              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              <FormattedMessage
                                  id='Last name'
                                  defaultMessage="Default error message"
                              />
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                              name='lastName'
                              type="text"
                              autoComplete="off"
                              placeholder={placeholderText.lastName}
                              onChange={signUp}
                              required/>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label
                              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              <FormattedMessage
                                  id='Email'
                                  defaultMessage="Default error message"
                              />
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                              name='email'
                              type="email"
                              autoComplete="off"
                              placeholder={placeholderText.email}
                              // value={value}
                              onChange={signUp}
                              // onBlur={handleBlur}
                              required/>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label
                              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              <FormattedMessage
                                  id='Phone number'
                                  defaultMessage="Default error message"
                              />
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                              name='telephone'
                              type="text"
                              placeholder={placeholderText.phoneNumber}
                              onChange={signUp}
                              required/>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label
                              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Password
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                              name='password'
                              id="grid-password"
                              type="password"
                              placeholder="••••••••"
                              onChange={signUp}
                              required/>
                            {errorAuth &&
                              <div className='flex flex-column justify-center align-items-center'>
                            <span className="top-0 right-0 py-3 px-4 text-sm text-red-600">
                              {errorAuth}
                            </span>
                              </div>
                            }
                          </div>
                        </div>
                        <div className='google'><GoogleAuth/></div>
                        <div className='flex flex-column justify-center align-items-center'>
                          <button type="submit"
                                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign
                            Up
                          </button>
                        </div>
                      </form>
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

export default React.memo(Register)
