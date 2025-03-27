// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import HotJobCategoryCard from "./HotJobCategoryCard";
import { toast } from "react-toastify";
import axios from "axios";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loadedJobs, setLoadedJobs] = useState([]);
  const [jobs, setJobs] = useState(loadedJobs);
  // unfiltered jobs
  // const [unfilteredJobs, setUnfilteredJobs] = useState([]);
  const [applicantCount, setApplicantCount] = useState([]);
  // need to be array
  const [deleteTriggered, setDeleteTriggered] = useState(false);
  const [jobPostStatus,setJobPostStatus]=useState([])
  // console.log("jobPostStatus=>", jobPostStatus);
  // console.log("JOBS=>", jobs);
  // console.log("applicantCount=>", applicantCount);

  //   console.log("loading && user?.email=>", loading, user?.email);
  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      //   const encodedEmail = encodeURIComponent(user.email);
      //   console.log("IN fetch=>>>loading && user?.email=>", loading, user?.email);
      // find job posts by HR
      fetch(`http://localhost:5000/jobs/postByHr/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setLoadedJobs(data);
          setJobs(data);
          setDeleteTriggered(false);
          //   console.log(data);
        });

      // count applicants for each job post
      // fetch(`http://localhost:5000/appliedJobs`)
      //   .then((res) => res.json())
      //   .then((data) => console.log(data));

      setLoading(false);
    }
  }, [user, deleteTriggered]);


  
  const handleJobDelete = (id) => {
    // fire delete api:jobs
    fetch(`http://localhost:5000/jobs/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // if(data.dele)
        toast("Job post deleted!");
        setDeleteTriggered(true);
        // console.log(data);
      });
  };

// count applicants per job post
  useEffect(() => {
    if (jobs.length > 0) {
      jobs.forEach((job, idx) => {
        // Fetch the number of applicants for each job
        fetch(
          `http://localhost:5000/appliedJobsCount?company_name=${encodeURIComponent(
            job.company
          )}&job_title=${encodeURIComponent(job.title)}&jobType=${encodeURIComponent(
            job.jobType
          )}&company_location=${encodeURIComponent(
            job.company_location
          )}`
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log("SUCCESS",data);
            const updatedApplicantCount=[...applicantCount,data.length]
            // console.log("updatedApplicantCount=>",updatedApplicantCount);
            setApplicantCount(updatedApplicantCount)
            const updatedApplicationStatus=[...jobPostStatus,data.status]
            setJobPostStatus(updatedApplicationStatus)
    

          })
          .catch((error) => {
            console.error("Error fetching applicant count:", error);
          });
      });
    }
  }, [jobs]); 

  const handleChangeJobStatus=(id)=>{
    // fire patch api:jobs
    axios.patch(`http://localhost:5000/jobs?id=${id}`)
    .then(res=>{
      // setJobPostStatus()
      toast('Status changed')
      // console.log("Jobs status patch=>",res.data);
    })
  }
  

  return (
    <div>
      <h2 className="text-center text-teal-500 my-5 text-xl">
        My posted jobs: {jobs.length}
      </h2>
      {loading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-bars loading-xs"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-md"></span>
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        // <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 ">

        <div className="flex justify-end  my-5">
          {jobs.length > 0 && (
            <table className="table zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Company</th>
                  <th>Job Info</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, idx) => (
                  // <HotJobCategoryCard
                  //   key={idx}
                  //   jobsByCategory={job}
                  // ></HotJobCategoryCard>

                  <tr key={idx}>
                    <th>
                      <label>
                        {/* <input type="checkbox" className="checkbox" /> */}
                        <div>{idx + 1}</div>
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={job.company_logo}
                              alt={job.company}
                              className="max-w-16"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{job.company}</div>
                          <div className="text-sm opacity-50">
                            {job.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {job.category}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {job.title}
                      </span>
                    </td>
                    <td>
                      <span className="text-teal-800">{job.status} </span>
                      {/* <span className="text-teal-800">{jobPostStatus[idx]} </span> */}
                      <br /> {applicantCount[idx] ? applicantCount[idx] : "Loading..."} applied
                      {/* *************** */}
                    </td>
                    <th className="flex flex-col gap-y-4">
                      <button className="btn btn-ghost btn-xs bg-blue-400"
                      disabled>
                        Details
                      </button>
                      <button
                        onClick={() => handleChangeJobStatus(job._id)}
                        className="btn btn-warning btn-xs bg-green-400"
                        disabled={job.status!=="active"} 
                      >
                        Change status
                      </button>
                      <button
                        onClick={() => handleJobDelete(job._id)}
                        className="btn btn-warning btn-xs bg-red-400"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPostedJobs;
