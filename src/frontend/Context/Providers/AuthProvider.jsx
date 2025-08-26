import { AuthContext } from "../Auth";
import { Outlet } from "react-router-dom";
import { isJWTValid } from "../../utils/auth";

// Create the authentication Context Provider and set the context value
function AuthProvider() {
  return (
    <AuthContext.Provider value={isJWTValid}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export { AuthProvider };
