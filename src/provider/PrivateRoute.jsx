import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext); // ✅ FIXED
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
