import React, {useContext, useState} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import googleIcon from './7123025_logo_google_g_icon.png';
import {IGeneralState, Types, UserActionTypes} from "../../../redux/types/types";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AuthContext, AuthContextType} from "../../../context";


function GoogleAuth(): JSX.Element {

    const dispatch = useDispatch<ThunkDispatch<IGeneralState, unknown, UserActionTypes>>()


    const {setErrorAuth,  setShowModalLogin, setShowModalRegister, setAvatarGoogle} = useContext<AuthContextType>(AuthContext)

    const login = useGoogleLogin({
        onSuccess: async (code) => {

            const tokenGoogle = code.access_token

            const exchangeToken = async (token: string) => {
                const response = await fetch('/auth/google/callback', {
                    headers: {
                        'authorization': 'Bearer ' + token,
                    }
                });
                return await response.json()
            };
            const result = await exchangeToken(tokenGoogle)
            console.log("-> result", result);
            const {token, userReady} = result


            if (token) {
                localStorage.setItem('jwtToken', token);
                setShowModalLogin(false);
                setShowModalRegister(false);
                setAvatarGoogle(userReady.avatarGoogle)
                dispatch({type: Types.LOGIN_SUCCESS, payload: userReady});
            } else {
                setErrorAuth('Invalid username or password')
                dispatch({type: Types.LOGIN_FAILURE, payload: {error: 'Invalid username or password'}});
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });



    return (
        <div>
            {/*<GoogleLogin responseType="code" accessType="offline" onSuccess={handleSuccess} onError={handleFailure}/>*/}
            <button className="google-btn" onClick={() => login()}>
                <img src={googleIcon} alt="Google icon"/>
            </button>
        </div>
    );
};

export default GoogleAuth;





