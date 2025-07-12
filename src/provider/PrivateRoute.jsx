import { use } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../pages/Loading";

const PrivateRoute = ({children}) => {
    const { user, isLoading } = use(AuthContext);
    const location= useLocation();

    if(isLoading) {
        return <Loading></Loading>
    }

    if(!user) {
        return <Navigate state={location.pathname} to="/auth/login"></Navigate>
    }
    
    return children
};

export default PrivateRoute;