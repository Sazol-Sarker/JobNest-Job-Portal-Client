import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

const PrivateRoutes = ({children}) => {
const {user,loading}=useContext(AuthContext)

if(loading)
{
    return  <div className="flex items-center justify-center">
    <span className="loading loading-bars loading-xs"></span>
    <span className="loading loading-bars loading-sm"></span>
    <span className="loading loading-bars loading-md"></span>
    <span className="loading loading-bars loading-lg"></span>
    </div>
}


if(user)
    return children


    return (
        <div>
            
            <Navigate to="/login"></Navigate>
        </div>
    );
};

export default PrivateRoutes;