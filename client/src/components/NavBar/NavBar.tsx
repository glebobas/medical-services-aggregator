import React, {Fragment, useContext, useEffect, useState} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {Login} from "../Modal/Login/login";
import {AuthContext, AuthContextType} from "../../context";
import {Register} from "../Modal/Register/Register";
import {MiniModal} from "../Modal/Confirm/MiniModal";
import {useDispatch, useSelector} from "react-redux";
import {Types} from "../../redux/types/types";
import {Link, useNavigate} from 'react-router-dom';
import {FormattedMessage} from "react-intl";


const navigationUserTrue = [
  { name: 'Clinics', path: '/clinics', current: false },
  { name: 'Doctors', path: '/doctors', current: false },
  { name: 'Schedule', path: '/schedule', current: false },
]

const navigationUserFalse = [
  {name: 'Login', id: 'loginButton', current: false},
  {name: 'Register', id: 'registerButton', current: false}
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function NavBar() {
  const getUser = useSelector((store: any) => store?.login?.user?.username)
  const token = localStorage.getItem("jwtToken")
  const dispatch = useDispatch()
  const [user, setUser] = useState<string | undefined>('')
  const navigate = useNavigate();
  const {locale, setLocale} = useContext<AuthContextType>(AuthContext)

  useEffect(() => {
    // Обновляет информацию в хранилище после того как юзер залогинился

    if (!getUser && token) {
      (async () => {
        const response = await fetch('/auth/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const user = await response.json()
        dispatch({type: Types.LOGIN_SUCCESS, payload: user});
      })()
    }
    setUser(getUser)
  }, [token, getUser, dispatch])

  const redir =(to: any) => {
    navigate(to);
  }


  //* Состояние модального окна передается в модальное окно


  const {errorAuth, setErrorAuth, setShowModalRegister, setShowModalLogin} = useContext<AuthContextType>(AuthContext)

  const handleClick = (event: any) => {
    if (event.target.id === 'loginButton') {
      setErrorAuth('')
      setShowModalLogin(true)
    }
    if (event.target.id === 'registerButton') {
      setErrorAuth('')
      setShowModalRegister(true)
    }

  }

  const logOut = () => {
    dispatch({type: Types.LOGOUT});
    localStorage.clear();
    navigate('/')
  }

  const nav = (event: any) => {
    event.preventDefault();
    // console.log('>>>>>>>>>>>>>>>>>>>>>')
    navigate('/');
  }

  return (
    <>
      {!user
        ? (
            <Disclosure as="nav" className="bg-gray-500">

              {({open}) => (
                  <>
                    <div className="container mx-auto w-full">
                      <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                          {/* Mobile menu button*/}

                          <Disclosure.Button
                              className="bg-gray-600 inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                            )}
                          </Disclosure.Button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                          <div
                              className="flex flex-shrink-0 items-center"
                          >
                            <img
                                className="block h-8 w-auto lg:hidden cursor-pointer"
                                src="https://cdn-icons-png.flaticon.com/64/1052/1052784.png"
                                alt="Your Company"
                                onClick={nav}
                            />
                            <img
                                className="hidden h-8 w-auto lg:block cursor-pointer"
                                src="https://cdn-icons-png.flaticon.com/64/1052/1052784.png"
                                alt="Your Company"
                                onClick={nav}
                            />
                          </div>
                          <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                              <div>
                                <button onClick={() => setLocale('en')} disabled={locale === 'en'}>
                                  English
                                </button>
                                <button onClick={() => setLocale('ru')} disabled={locale === 'ru'}>
                                  Русский
                                </button>
                              </div>
                              {navigationUserFalse.map((item) => (
                                  <button
                                      id={item.id}
                                      onClick={handleClick}
                                      key={item.name}
                                      className={classNames(
                                          item.current ? 'bg-gray-200 text-white' : 'text-gray-700 hover:bg-gray-700' +
                                              ' hover:text-white',
                                          'rounded-md px-3 py-2 text-sm font-medium'
                                      )}
                                      aria-current={item.current ? 'page' : undefined}
                                  >
                                    <FormattedMessage
                                        id={item.name}
                                        defaultMessage="Default error message"
                                    />
                                  </button>
                                  // <a
                                  //   key={item.name}
                                  //   href={item.href}
                                  //   className={classNames(
                                  //     item.current ? 'bg-gray-200 text-white' : 'text-gray-700 hover:bg-gray-700' +
                                  //       ' hover:text-white',
                                  //     'rounded-md px-3 py-2 text-sm font-medium'
                                  //   )}
                                  //   aria-current={item.current ? 'page' : undefined}
                                  // >
                                  //   {item.name}
                                  // </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">

                      <div className="space-y-1 px-2 pt-2 pb-3">

                        {navigationUserFalse.map((item) => (

                            <Disclosure.Button
                                key={item.name}
                                as="a"

                      className={classNames(
                        item.current ? 'bg-gray-200 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <FormattedMessage
                          id={item.name}
                          defaultMessage="Default error message"
                      />
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>)

        :
            (<Disclosure as="nav" className="bg-gray-200">
          {({open}) => (
            <>
              <div className="container mx-auto w-full">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button
                      className="bg-gray-600 inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="cursor-pointer block h-8 w-auto lg:hidden "
                        src="https://cdn-icons-png.flaticon.com/64/1052/1052784.png"
                        alt="Medical"
                        onClick={nav}

                            />
                            <img
                                className="cursor-pointer hidden h-8 w-auto lg:block"
                                src="https://cdn-icons-png.flaticon.com/64/1052/1052784.png"
                                alt="Medical"
                                onClick={nav}
                            />
                          </div>
                          <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                              <div>
                                <button onClick={() => setLocale('en')} disabled={locale === 'en'}>
                                  English
                                </button>
                                <button onClick={() => setLocale('ru')} disabled={locale === 'ru'}>
                                  Русский
                                </button>
                              </div>
                              {navigationUserTrue.map((item) => (
                                  <div
                                      key={item.name}
                                      onClick={() => redir(item.path)}
                                      className={classNames(
                                          item.current ? 'bg-gray-200 text-white' : 'text-gray-700 hover:bg-gray-700' +
                                              ' cursor-pointer' +
                                              ' hover:text-white',
                                          'rounded-md px-3 py-2 text-sm font-medium'
                                      )}
                                      aria-current={item.current ? 'page' : undefined}
                                  >
                                    <FormattedMessage
                                        id={item.name}
                                        defaultMessage="Default error message"
                                    />
                                  </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                          <button
                              onClick={() => redir('/notepage')}
                              type="button"
                              className="rounded-full bg-gray-800 p-1 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true"/>
                          </button>

                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button
                                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
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
                              <Menu.Items
                                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                  {({active}) => (
                                      <div
                                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                      >

                                        <FormattedMessage
                                            id="Profile"
                                            defaultMessage="Default error message"
                                        />
                                      </div>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({active}) => (
                                      <Link to='/profileEditing'>
                                        <div
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                        >
                                          <FormattedMessage
                                              id="Edit Profile Info"
                                              defaultMessage="Default error message"
                                          />
                                        </div>
                                      </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({active}) => (
                                      <div
                                          onClick={logOut}
                                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                      >
                                        <FormattedMessage
                                            id="Logout"
                                            defaultMessage="Default error message"
                                        />
                                      </div>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                      <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigationUserTrue.map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as="a"
                                // href={item.href}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                              <FormattedMessage
                                  id={item.name}
                                  defaultMessage="Default error message"
                              />
                            </Disclosure.Button>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
              )}
            </Disclosure>
            )
      }
      <Register/>
      <Login/>
      <MiniModal/>
    </>
  );
}

