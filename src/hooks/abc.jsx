import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosInstance=axios.create({
    baseURL:'http://localhost:5000',
    // baseURL:'http://localhost:5000',
    withCredentials:true
})
const useAxiosSecure = () => {
    const {logOutUser}=useContext(AuthContext)
    const navigate=useNavigate()

    useEffect(()=>{
    axiosInstance.interceptors.response.use(response=>{return response},error=>{
        console.log("error caught in interceptor=>",error);

        if(error.status===401||error.status===403)
        {
            logOutUser()
            .then(()=>{
                console.log("Logged out!");
                navigate('/login')

            })
            .catch(error=>console.log("Error=>",error))

        }
        return Promise.reject(error)
    })
    },[])


    return axiosInstance
};

export default useAxiosSecure;