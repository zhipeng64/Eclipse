import { createContext } from "react";

// Create the authentication context that performs authentication checks
// for protected routes
const AuthContext = createContext(null);

export { AuthContext };
