import React, {useState} from 'react'

interface IModalText {
    error: string,
    message: string,
    username: string
}

export interface AuthContextType {
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
  showModalMiniText: {error: '', message: '', username: ''},
  setShowModalMiniText: () => {
  },
  errorAuth: '',
  setErrorAuth: () => {
  },
  showModalSheduleRec: false,
  setShowModalSheduleRec: () => {
  },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [showModalLogin, setShowModalLogin] = React.useState(false);
  const [showModalRegister, setShowModalRegister] = React.useState(false);
  const [showModalMini, setShowModalMini] = React.useState(false)
  const [showModalMiniText, setShowModalMiniText] = React.useState({error: '', message: '', username: ''})
  const [errorAuth, setErrorAuth] = useState('');
  const [showModalSheduleRec, setShowModalSheduleRec] = React.useState(false)

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
      showModalSheduleRec,
      setShowModalSheduleRec,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
