// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import HotJobCategoryCard from "./HotJobCategoryCard";
import { toast } from "react-toastify";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loadedJobs, setLoadedJobs] = useState([]);
  const [jobs, setJobs] = useState(loadedJobs);
  const [deleteTriggered, setDeleteTriggered] = useState(false);
  //   console.log(jobs);

  //   console.log("loading && user?.email=>", loading, user?.email);
  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      //   const encodedEmail = encodeURIComponent(user.email);
      //   console.log("IN fetch=>>>loading && user?.email=>", loading, user?.email);
      fetch(`http://localhost:5000/jobs/postByHr/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setLoadedJobs(data);
          setJobs(data);
          setDeleteTriggered(false);
          //   console.log(data);
        });
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
        console.log(data);
      });
  };

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
          {jobs.length>0 && (
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
                      <br /> x applied
                    </td>
                    <th className="flex flex-col gap-y-4">
                      <button className="btn btn-ghost btn-xs">details</button>
                      <button
                        onClick={() => handleJobDelete(job._id)}
                        className="btn btn-warning btn-xs"
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
