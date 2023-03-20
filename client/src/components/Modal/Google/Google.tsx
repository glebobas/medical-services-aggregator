import React, {useState} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import googleIcon from './7123025_logo_google_g_icon.png';


function GoogleAuth(): JSX.Element {
    // const [user, setUser] = useState([]);

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





