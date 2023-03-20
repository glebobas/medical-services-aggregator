import React, {useState} from 'react'

export interface AuthContextType {
  showModalLogin: boolean;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showModalRegister: boolean;
  setShowModalRegister: React.Dispatch<React.SetStateAction<boolean>>;
  showModalMini: boolean;
  setShowModalMini: React.Dispatch<React.SetStateAction<boolean>>;
  showModalMiniText: string;
  setShowModalMiniText: React.Dispatch<React.SetStateAction<string>>;
  errorAuth: string;
  setErrorAuth: React.Dispatch<React.SetStateAction<string>>
  showModalShedulRec: boolean;
  setShowModalShedulRec: React.Dispatch<React.SetStateAction<boolean>>;
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
  },
  errorAuth: '',
  setErrorAuth: () => {
  },
  showModalShedulRec: false,
  setShowModalShedulRec: () => {
  },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [showModalLogin, setShowModalLogin] = React.useState(false);
  const [showModalRegister, setShowModalRegister] = React.useState(false);
  const [showModalMini, setShowModalMini] = React.useState(false)
  const [showModalMiniText, setShowModalMiniText] = React.useState('')
  const [errorAuth, setErrorAuth] = useState('');
  const [showModalShedulRec, setShowModalShedulRec] = React.useState(false)

  return (
    <AuthContext.Provider value={{
      showModalLogin,
      setShowModalLogin,
      showModalRegister,
      setShowModalRegister,
      showModalMini,
      setShowModalMini,
      showModalMiniText,
      setShowModalMiniText,
      errorAuth, setErrorAuth,
      showModalShedulRec,
      setShowModalShedulRec,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
