// context/AuthContext.js
import { createContext, PropsWithChildren, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [redirectPath, setRedirectPath] = useState("/");

  return (
    <AuthContext.Provider value={{ setRedirectPath, redirectPath }}>
      {children}
    </AuthContext.Provider>
  );
};
