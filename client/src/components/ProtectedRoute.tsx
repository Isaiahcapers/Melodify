import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token"); // Check if token exists in localStorage
  return token ? children : <Navigate to="/login" />; // If no token, redirect to login
};

export default ProtectedRoute;
