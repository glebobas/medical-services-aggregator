import {Dispatch} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {UserActionTypes, Types, IGeneralState} from '../../../redux/types/types';
import React, {Fragment, useContext, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {AuthContext, AuthContextType} from "../../../context";

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
}

export function Register(): JSX.Element {
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

  // const [open, setOpen] = useState(true)

  const [error, setError] = useState('');


  const {
    showModalRegister,
    setShowModalRegister,
    setShowModalMiniText,
    setShowModalMini
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
      console.log(responseData);
      const {message} = responseData

      if (responseData.message === 'User registered successfully') {
        dispatch({type: Types.REGISTER_SUCCESS, payload: {message}});
      } else {
        setError('Invalid input data')
        dispatch({type: Types.REGISTER_FAILURE, payload: {error: 'Invalid input data'}});
      }
      return message
    } catch (error: any) {
      const errorMessage = error.response?.responseData?.error || 'An error occurred';
      setError(errorMessage);
      dispatch({type: Types.REGISTER_FAILURE, payload: {error: errorMessage}});
      return Promise.reject(errorMessage);
    }
  };

  // const checkIsUser = useSelector((state: any) => state.login?.user);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (userData.username && userData.password && userData.email && userData.firstName && userData.lastName && userData.telephone) {
        const response = await dispatch(register(userData))
        setShowModalRegister(false)
        setShowModalMiniText('Registration successful!')
        setShowModalMini(true)
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
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <form onSubmit={onSubmit} className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Login
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          name='username'
                          type="text"
                          placeholder="Please, type your login"
                          onChange={signUp}
                          required/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          First name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          name='firstName'
                          type="text"
                          placeholder="Please, type your first name"
                          onChange={signUp}
                          required/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Last name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          name='lastName'
                          type="text"
                          placeholder="Please, type your  Last name"
                          onChange={signUp}
                          required/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          email
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          name='email'
                          type="email"
                          placeholder="Please, type your email"
                          // value={value}
                          onChange={signUp}
                          // onBlur={handleBlur}
                          required/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Phone number
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          name='telephone'
                          type="text"
                          placeholder="Please, type your Phone number"
                          onChange={signUp}
                          required/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Password
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          name='password'
                          id="grid-password"
                          type="password"
                          placeholder="Please, type your login"
                          onChange={signUp}
                          required/>
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
                              className=' left-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5'>Sign
                        Up
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
