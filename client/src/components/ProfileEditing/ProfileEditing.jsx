import React, { useState } from 'react';
import { useSelector } from 'react-redux';



export function ProfileEditing() {

  const [userData, setUserData] = useState({});
  const [disabled, setDisabled] = useState(true);

  // console.log(disabled);

  const getUserData = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  const activeInput = (event) => {
    setDisabled(!disabled)
  }
  const x = useSelector(state => state.login.user)
  console.log(x);
  console.log(disabled)
  return (
    <>
      <div className='flex item-center justify-center'>
        <h1> Изменить личную информацию </h1>
      </div>
      <div className=" min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mx-3 mb-6">
          <form>
            {/* <div className="w-full px-3"> */}
              {disabled 
              ? 
              <div className="w-full px-3">
              <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              onClick={activeInput}>
              Ваш логин 
            </label>
            <p>{x.username}</p>
            </div>
            : 
            <div className="w-full px-3">
            <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            onClick={activeInput}>
            Изменить логин
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name='username'
            type="text"
            placeholder="Please, type your login"
            onChange={getUserData}
            disabled={disabled}
          />
          <p>изменить</p>
          </div>
            }

            
          </form>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Изменить имя
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name='firstName'
              type="text"
              placeholder="Please, type your first name"
              onChange={getUserData} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Изменить фамилию
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name='lastName'
              type="text"
              placeholder="Please, type your  Last name"
              onChange={getUserData} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Изменить email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name='email'
              type="email"
              placeholder="Please, type your email"
              onChange={getUserData} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Изменить номер телефон
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name='telephone'
              type="text"
              placeholder="Please, type your Phone number"
              onChange={getUserData} />
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
              onChange={getUserData} />
          </div>
        </div>
        <div className='flex flex-column justify-center align-items-center'>
          <button type="submit"
            className=' left-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5'>
            Изменить
          </button>
        </div>
      </div>
    </>
  )
}
