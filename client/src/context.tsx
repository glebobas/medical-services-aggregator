import React, {useState} from 'react'

interface IModalText {
    error: string,
    message: string,
    username: string
}

interface IPlaceholderText {
    loginName: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    search: string
}

export interface AuthContextType {
    locale: string;
    setLocale: React.Dispatch<React.SetStateAction<string>>;
    showModalLogin: boolean;
    setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
    showModalRegister: boolean;
    setShowModalRegister: React.Dispatch<React.SetStateAction<boolean>>;
    showModalMini: boolean;
    setShowModalMini: React.Dispatch<React.SetStateAction<boolean>>;
    showModalMiniText: IModalText;
    setShowModalMiniText: React.Dispatch<React.SetStateAction<IModalText>>;
    errorAuth: string;
    setErrorAuth: React.Dispatch<React.SetStateAction<string>>
    showModalSheduleRec: boolean;
    setShowModalSheduleRec: React.Dispatch<React.SetStateAction<boolean>>;
    placeholderText: IPlaceholderText;
    setPlaceholderText: React.Dispatch<React.SetStateAction<IPlaceholderText>>
}

interface AuthProviderProps {
    children: React.ReactNode;
    locale: string;
    setLocale: React.Dispatch<React.SetStateAction<string>>
}

export const AuthContext = React.createContext<AuthContextType>({
    locale: 'en',
    setLocale: () => {},
    showModalLogin: false,
    setShowModalLogin: () => {
    },
    showModalRegister: false,
    setShowModalRegister: () => {
    },
    showModalMini: false,
    setShowModalMini: () => {
    },
    showModalMiniText: {error: '', message: '', username: ''},
    setShowModalMiniText: () => {
    },
    errorAuth: '',
    setErrorAuth: () => {
    },
    showModalSheduleRec: false,
    setShowModalSheduleRec: () => {
    },
    placeholderText: {
        loginName: '',
        password: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        search: ''
    },
    setPlaceholderText: () => {
    },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({children, locale, setLocale}) => {
    const [showModalLogin, setShowModalLogin] = React.useState(false);
    const [showModalRegister, setShowModalRegister] = React.useState(false);
    const [showModalMini, setShowModalMini] = React.useState(false)
    const [showModalMiniText, setShowModalMiniText] = React.useState({error: '', message: '', username: ''})
    const [errorAuth, setErrorAuth] = useState('');
    const [showModalSheduleRec, setShowModalSheduleRec] = React.useState(false);
    const [placeholderText, setPlaceholderText] = React.useState({
        loginName: '',
        password: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        search: ''
    });

    return (
        <AuthContext.Provider value={{
            locale,
            setLocale,
            showModalLogin,
            setShowModalLogin,
            showModalRegister,
            setShowModalRegister,
            showModalMini,
            setShowModalMini,
            showModalMiniText,
            setShowModalMiniText,
            errorAuth, setErrorAuth,
            showModalSheduleRec,
            setShowModalSheduleRec, placeholderText, setPlaceholderText
        }}>
            {children}
        </AuthContext.Provider>
    );
};
