import React, {useState} from 'react';
import {GoogleLogin, useGoogleLogin} from '@react-oauth/google';
import googleIcon from './7123025_logo_google_g_icon.png';

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID ?? '';

function GoogleAuth(): JSX.Element {
    // const [user, setUser] = useState([]);

    // const handleSuccess = (response: any) => {
    //     // Handle successful authentication
    //     console.log(response);
    // };
    //
    // const handleFailure = () => {
    //     // Handle failed authentication
    //     console.error();
    // };

    const login = useGoogleLogin({
        onSuccess: async (code) => {

            const token = code.access_token
            const exchangeToken = async (code: string) => {
                const response = await fetch(`/auth/google/callback?token=${token}`, {
                    credentials: 'include'
                });
                const data = await response.json();
                return data
            };
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





