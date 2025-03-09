import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import SingleAppliedJob from "../../components/SingleAppliedJob";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const appliedJobs = useLoaderData();
  const myAppliedJobs = appliedJobs.filter(
    (job) => job.applicant_email === user.email
  );
  console.log("APPLY data rcv in profile=>", appliedJobs);
  console.log("appliedMyJobs data rcv in profile=>", myAppliedJobs);

  return (
    <div className="">
      {/* const {company_name,jobType,job_title}=singleAppliedJob */}
      <h2 className="text-center font-bold text-2xl text-blue-500">Applied Jobs</h2>

      {/* head */}
      {
        myAppliedJobs?<div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Job Title</th>
              <th>Job Type</th>
              <th>Company Name</th>
              <th>Company Location</th>
            </tr>
          </thead>
          <tbody>

          {myAppliedJobs.map((job, idx) => (
            <SingleAppliedJob key={idx} index={idx+1} job={job}></SingleAppliedJob>
          ))}


          </tbody>
        </table>
      </div>:<div className="text-center text-red-500">No applied jobs found! Please apply first!</div>
      }
      
    </div>
  );
};

export default UserProfile;
