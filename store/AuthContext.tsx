import { createContext, useContext } from "react";
import { useFirebaseAuth } from "../services/firebase";

// Define the structure of AuthContext
const AuthContext = createContext({
  authUser: null,
  loading: true,
  Logout: async () => {},
});

export function AuthContextProvider({ children }) {
  // Define the context value to return
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);
