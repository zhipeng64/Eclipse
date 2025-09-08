import { AuthContext } from "../Auth";
import { isAuthenticated } from "../../utils/auth.js";
// Create the authentication Context Provider and set the context value
// A Context Provider's role is to set the context value
// and wrap child components so they can access the context and its value.
function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
