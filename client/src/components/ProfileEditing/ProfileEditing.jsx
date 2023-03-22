import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Types} from '../../redux/types/types';
import {AuthContext} from "../../context";


export function ProfileEditing() {
    const dispatch = useDispatch();
    const currentData = useSelector(state => state.login.user);

    const loading = useSelector(state => state);
    console.log(loading);

    const token = localStorage.getItem("jwtToken");
    const [error, setError] = useState('');

    const [userData, setUserData] = useState({
        ...currentData,
        newPassword: '',
        oldPassword: '',
    });

    useEffect(() => {
        setUserData({
            ...currentData,
            newPassword: '',
            oldPassword: '',
        });
    }, [currentData, token, dispatch])

    const getUserData = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }
    const {
        setShowModalMiniText,
        setShowModalMini
    } = useContext(AuthContext)

    const updateData = async (event) => {
        event.preventDefault();

        // if (loading) return;

        try {
            dispatch({
                type: Types.UPDATE_USERDATA_REQUEST,
            });

            const response = await fetch('/profile/profileEditing', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({...userData, currentData}),
            })

            const responseData = await response.json();

            if (response.status === 200) {
                dispatch({type: Types.UPDATE_USERDATA_SUCCESS, payload: responseData.user});
                setShowModalMiniText(responseData?.message)
                setShowModalMini(true)
            }
            if (response.status !== 200) {
                dispatch({type: Types.UPDATE_USERDATA_FAILURE, payload: {error: responseData}});
                setShowModalMiniText(responseData?.message)
                setShowModalMini(true)
                setError(responseData.message)
            }

        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.responseData?.error || 'An error occurred';
            setError(errorMessage);
        }
    }

    return (
        <>
            {Number(userData.username) ? (
                    <>
                        <div className='flex item-center justify-center'>
                            <h1> Информация о профиле Google-аккаунта </h1>
                        </div>
                        <div className=" min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Имя
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name='firstName'
                                        type="text"
                                        disabled
                                        onChange={getUserData}
                                        value={userData.firstName || ''}
                                    />
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
                                        disabled
                                        onChange={getUserData}
                                        value={userData.lastName || ''}
                                    />
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
                                        disabled
                                        onChange={getUserData}
                                        value={userData.email || ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )
                :
                (
                    <>
                        <div className='flex item-center justify-center'>
                            <h1> Изменить личную информацию </h1>
                        </div>
                        <div className=" min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                                        onChange={getUserData}
                                        value={userData.firstName || ''}
                                    />
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
                                        onChange={getUserData}
                                        value={userData.lastName || ''}
                                    />
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
                                        onChange={getUserData}
                                        value={userData.email || ''}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Изменить номер телефонa
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name='telephone'
                                        type="text"
                                        placeholder="Please, type your Phone number"
                                        onChange={getUserData}
                                        value={userData.telephone || ''}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Новый пароль
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name='newPassword'
                                        type="password"
                                        value={userData.newPassword || ''}
                                        onChange={getUserData}
                                    />
                                </div>
                            </div>
                            <div/>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Введите ваш текущий пароль для вступления изменений в силу
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name='oldPassword'
                                        type="password"
                                        value={userData.oldPassword || ''}
                                        onChange={getUserData}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-column justify-center align-items-center'>
                                <button
                                    type="submit"
                                    className=' left-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5'
                                    onClick={updateData}
                                >
                                    Изменить
                                </button>
                            </div>
                            {error &&
                                <div className='flex flex-column justify-center align-items-center'>
                <span className="top-0 right-0 py-3 px-4 text-sm text-red-600">
            {error}
                </span>
                                </div>
                            }
                        </div>
                    </>
                )
            }

        </>
    )
}

