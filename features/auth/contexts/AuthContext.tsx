// context/AuthContext.js
import { PropsWithChildren, createContext, useState } from "react";

type AuthContextType = {
  redirectPath: string;
  setRedirectPath: (redirectPath: string) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [redirectPath, setRedirectPath] = useState("/");

  return (
    <AuthContext.Provider value={{ setRedirectPath, redirectPath }}>
      {children}
    </AuthContext.Provider>
  );
};
