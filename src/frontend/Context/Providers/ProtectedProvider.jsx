import { Outlet } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import SocketProvider from "./SocketProvider";

const ProtectedProvider = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        {/* Outlet is a placeholder component for a child Route and will be replaced with the matched
      child Route upon navigation to the child Route */}
        <Outlet />
      </SocketProvider>
    </AuthProvider>
  );
};

export default ProtectedProvider;
