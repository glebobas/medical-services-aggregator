import { Fragment, useCallback, useContext, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Login } from "../Modal/Login/Login";
import { AuthContext } from "../../context";
import { Register } from '../Modal/Register/Register'
import { useSelector, useDispatch } from 'react-redux';
import { Types } from '../../redux/types/types';

const navigationUserTrue = [
  { name: 'Клиенты', href: '#', current: false },
  { name: 'Врачи', href: '#', current: false },
  { name: 'Календарь', href: '#', current: false },
]

const navigationUserFalse = [
  { name: 'Войти', id: 'loginButton', current: false },
  { name: 'Зарегистироваться', id: 'registerButton', current: false }
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function NavBar() {
  // const [user, setUser] = useState(false)
  const user = useSelector((state: any) => state.login?.user);
  const dispatch = useDispatch();
  // Состояние модального окна передается в модальное окно
  // const [open, setOpen] = useState(false)
  const { showModalLogin, setShowModalLogin } = useContext(AuthContext)
  const { showModalRegister, setShowModalRegister } = useContext(AuthContext)

  const handleClick = (event: any) => {
    // TODO: Дописать условия перехода
    console.log(event.target.id)
    setShowModalLogin(true)
  }

  const logOut = () => {
    dispatch({ type: Types.LOGOUT })
  }

  return (
    <>
      <nav className="w-full">
        {!user
          ? (<Disclosure as="nav" className="bg-slate-400">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                      <div className="flex flex-shrink-0 items-center">
                        <img
                          className="block h-8 w-auto lg:hidden"
                          src="https://cdn-icons-png.flaticon.com/64/1052/1052784.png"
                          alt="Your Company"
                        />
                        <img
                          className="hidden h-8 w-auto lg:block"
                          src="https://cdn-icons-png.flaticon.com/64/1052/1052784.png"
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                          {navigationUserFalse.map((item) => (
                            <button
                              id={item.id}
                              onClick={handleClick}
                              key={item.name}
                              className={classNames(
                                item.current ? 'bg-slate-400 text-white' : 'text-gray-700 hover:bg-gray-700' +
                                  ' hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </button>
                            // <a
                            //   key={item.name}
                            //   href={item.href}
                            //   className={classNames(
                            //     item.current ? 'bg-slate-400 text-white' : 'text-gray-700 hover:bg-gray-700' +
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
                          item.current ? 'bg-slate-400 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>)
          : (<Disclosure as="nav" className="bg-slate-400">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex flex-shrink-0 items-center">
                        <img
                          className="block h-8 w-auto lg:hidden"
                          src="https://cdn-icons-png.flaticon.com/64/1052/1052784.png"
                          alt="Medical"
                        />
                        <img
                          className="hidden h-8 w-auto lg:block"
                          src="https://cdn-icons-png.flaticon.com/64/1052/1052784.png"
                          alt="Medical"
                        />
                      </div>
                      <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                          {navigationUserTrue.map((item) => (

                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current ? 'bg-slate-400 text-white' : 'text-gray-700 hover:bg-gray-700' +
                                  ' hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
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
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Профиль
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Редактирование
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={logOut}
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Выход
                                </a>
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
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>)
        }
      </nav>
      <Login />
      {/* <Register/> */}
    </>
  );
}
