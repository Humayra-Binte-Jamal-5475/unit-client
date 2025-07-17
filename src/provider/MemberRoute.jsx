import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../pages/Loading";

const MemberRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) return <Loading/>;

  if (!user || user.role !== "member") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
export default MemberRoute;
