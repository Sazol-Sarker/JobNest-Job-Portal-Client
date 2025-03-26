import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import SingleAppliedJob from "../../components/SingleAppliedJob";
import Fireworks from "../../components/Fireworks";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const UserProfile = () => {
  const { user } = useContext(AuthContext);
  // const appliedJobs = useLoaderData();
  const [loadedAppliedJobs,setLoadedAppliedJobs]=useState([])
  const [appliedJobs,setAppliedJobs]=useState(loadedAppliedJobs)
  const [deleteJobTriggered,setDeleteJobTriggered]=useState(false)
  // console.log("appliedJobs==>",appliedJobs);

  const axiosSecure=useAxiosSecure()
  const location = useLocation();
  const isProfile = location.pathname === `/userProfile`;
  const [showFireworks, setShowFireworks] = useState(false);
  // console.log("User in profile",user);
  // let name="Unknown"
  // name=name.toLowerCase()
  // const showName=name.charAt(0).toUpperCase()+name.slice(1)
  useEffect(()=>{
    if(isProfile)
      setShowFireworks(true)
  },[isProfile])
  // const myAppliedJobs = appliedJobs?appliedJobs.filter(
  //   (job) => job.applicant_email === user.email
  // ):[];

  useEffect(()=>{
    // console.log(`http://localhost:5000/appliedJobs?email=${user.email}`);
    // fetch(`http://localhost:5000/appliedJobs?email=${user.email}`)
    // .then(res=>res.json())
    // .then(data=>setAppliedJobs(data))

    // beta, lets use axios
    axios.get(`http://localhost:5000/appliedJobs?email=${user.email}`,{withCredentials:true})
    .then(res=>{
      setAppliedJobs(res.data)
      setLoadedAppliedJobs(res.data)
      setDeleteJobTriggered(false)
      // console.log("Axios response:",res.data);
    })

    // lets secure axios api from invalid jwt token
    // axiosSecure.get(`/appliedJobs?email=${user.email}`)
    // .then(res=>{
    //   setAppliedJobs(res.data)
    //  console.log("crooked Axios response:",res.data);
    // })

  },[deleteJobTriggered])



  // console.log("APPLY data rcv in profile=>", appliedJobs);
  // console.log("appliedMyJobs data rcv in profile=>", myAppliedJobs);

  return (
    <div className="flex justify-between gap-4 p-5 items-center">
       {showFireworks && <Fireworks></Fireworks>}
       {/* profile info
        */}
        
        <div className="flex gap-3 border-2 p-5 border-teal-400 rounded-lg">
        <div className="font-bold text-teal-500">
          <h2>Name: </h2>
          <h2>Email: </h2>
          <p>Verified Email: </p>
          <p>Account creationTime: </p>
          <p>Last Sign in Time: </p>
          {/* <p>{user.metadata.}</p> */}
        </div>
        <div>
          <h2>{user?.displayName?user?.displayName:"UNKNOWN"}</h2>
          <h2>{user.email}</h2>
          <p> {user.emailVerified?"Yes":"No"}</p>
          <p>{user.metadata.creationTime}</p>
          <p> {user.metadata.lastSignInTime}</p>
          {/* <p>{user.metadata.}</p> */}
        </div>
        </div>

      {/* head */}
     {/* <div className="  border-2 border-teal-400 rounded-sm"> */}
     <div>
     {appliedJobs?.length ? (
        <div className="overflow-x-auto">
          <h2 className="text-center font-bold text-2xl text-blue-500">
            Applied Jobs
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Job Title</th>
                <th>Job Type</th>
                <th>Company Name</th>
                <th>Company Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.map((job, idx) => (
                <SingleAppliedJob
                  key={idx}
                  index={idx + 1}
                  job={job}
                  setDeleteJobTriggered={setDeleteJobTriggered}
                ></SingleAppliedJob>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-red-500">
          No applied jobs found! Please apply first!
        </div>
      )}
     </div>
    </div>
  );
};

export default UserProfile;
