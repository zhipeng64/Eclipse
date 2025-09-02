import { AuthContext } from "../Auth";
import { Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth.js";
// Create the authentication Context Provider and set the context value
function AuthProvider() {
  return (
    <AuthContext.Provider value={isAuthenticated}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export { AuthProvider };
