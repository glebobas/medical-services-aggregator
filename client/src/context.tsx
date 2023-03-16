import React from 'react'

export interface AuthContextType {
    showModalLogin: boolean;
    setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
    showModalRegister: boolean;
    setShowModalRegister: React.Dispatch<React.SetStateAction<boolean>>;
    showModalMini: boolean;
    setShowModalMini: React.Dispatch<React.SetStateAction<boolean>>;
    showModalMiniText: string;
    setShowModalMiniText: React.Dispatch<React.SetStateAction<string>>
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthContextType>({
    showModalLogin: false,
    setShowModalLogin: () => {
    },
    showModalRegister: false,
    setShowModalRegister: () => {
    },
    showModalMini: false,
    setShowModalMini: () => {
    },
    showModalMiniText: '',
    setShowModalMiniText: () => {

    }
});

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [showModalLogin, setShowModalLogin] = React.useState(false);
    const [showModalRegister, setShowModalRegister] = React.useState(false);
    const [showModalMini, setShowModalMini] = React.useState(false)
    const [showModalMiniText, setShowModalMiniText] = React.useState('')

    return (
        <AuthContext.Provider value={{
            showModalLogin,
            setShowModalLogin,
            showModalRegister,
            setShowModalRegister,
            showModalMini,
            setShowModalMini: setShowModalMini,
            showModalMiniText,
            setShowModalMiniText: setShowModalMiniText
        }}>
            {children}
        </AuthContext.Provider>
    );
};
