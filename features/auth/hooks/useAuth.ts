import { useContext } from "react";

import { AuthContext } from "../contexts";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useVerida must be used within a VeridaProvider");
  }
  return context;
};
