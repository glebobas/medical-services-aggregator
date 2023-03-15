import React from 'react'

export interface AuthContextType {
  showModalLogin: boolean;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showModalRegister: boolean;
  setShowModalRegister: React.Dispatch<React.SetStateAction<boolean>>;
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
});

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [showModalLogin, setShowModalLogin] = React.useState(false);
  const [showModalRegister, setShowModalRegister] = React.useState(false);

  return (
    <AuthContext.Provider value={{showModalLogin, setShowModalLogin, showModalRegister, setShowModalRegister}}>
      {children}
    </AuthContext.Provider>
  );
};
