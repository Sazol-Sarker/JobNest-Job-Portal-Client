import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log("Error caught in interceptor =>", error);

                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    logOutUser()
                        .then(() => {
                            console.log("Tata byby ! Logged out!");
                            navigate("/login");
                        })
                        .catch((err) => console.log("Logout Error =>", err));
                }
                
                return Promise.reject(error);
            }
        );

        // Cleanup to remove the interceptor when component unmounts
        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [logOutUser, navigate]); // Dependencies added to avoid stale closures

    return axiosInstance;
};

export default useAxiosSecure;
