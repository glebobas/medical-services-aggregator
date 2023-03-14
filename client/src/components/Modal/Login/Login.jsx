import React, { useState } from 'react';

export function Login(props) {

  const [userData, setUserData] = useState({});

  const signUp = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  console.log(userData)

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                User name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name='userName'
                id="grid_password"
                type="text"
                placeholder="Please, type your login"
                onChange={signUp}
                required />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Password
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name='password'
                id="grid-password"
                type="password"
                placeholder="Please, type your login"
                onChange={signUp}
                required />
            </div>
          </div>

          <div className='flex flex-column justify-center align-items-center'>
            <button type="submit" className=' left-20 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}