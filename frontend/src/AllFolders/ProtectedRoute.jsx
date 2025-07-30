import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "./context/LoginContent";

const ProtectedRoute = () => {
  const { isLoggedin } = useContext(AppContent); // Use context state for authentication

  return isLoggedin ? <Outlet /> : <Navigate to="/access" />;
};

export default ProtectedRoute;
