import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import SingleAppliedJob from "../../components/SingleAppliedJob";
import Fireworks from "../../components/Fireworks";
import axios from "axios";
import useAdmin from "../../hooks/useAdmin";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { isAdmin } = useAdmin();

  const [loadedAppliedJobs, setLoadedAppliedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [deleteJobTriggered, setDeleteJobTriggered] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const location = useLocation();
  const isProfile = location.pathname === "/userProfile";

  useEffect(() => {
    if (isProfile) setShowFireworks(true);
  }, [isProfile]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/appliedJobs?email=${user.email}`, {
          withCredentials: true,
        })
        .then((res) => {
          setAppliedJobs(res.data);
          setLoadedAppliedJobs(res.data);
          setDeleteJobTriggered(false);
        });
    }
  }, [user, deleteJobTriggered]);

  return (
    <div className="p-4 space-y-6">
      {showFireworks && <Fireworks />}

      {/* Profile Info Section */}
      <div className="flex flex-col md:flex-row items-start gap-4 border border-teal-300 p-4 rounded-lg bg-white shadow-sm">
        <div className="font-semibold text-teal-600 space-y-1 text-sm md:text-base hidden md:inline">
          <p>Name:</p>
          <p>Email:</p>
          <p>Verified Email:</p>
          <p>Account Creation Time:</p>
          <p>Last Sign In Time:</p>
          <p>Role:</p>
        </div>
        <div className="text-sm md:text-base space-y-1">
          <p>{user?.displayName || "UNKNOWN"}</p>
          <p>{user?.email}</p>
          <p>
           
            <span className="inline md:hidden">Verified:</span>
            <span className="font-bold">
              
            {user?.emailVerified ? "Yes" : "No"}
            </span>
          </p>
          <p className="hidden md:inline">{user?.metadata?.creationTime}</p>
          <p className="hidden md:inline">{user?.metadata?.lastSignInTime}</p>
          <p>
            <span className="inline md:hidden">Role:</span>
            <span className="font-bold text-green-500">
              
              {isAdmin ? "admin" : "user"}
            </span>
          </p>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="space-y-4">
        {appliedJobs?.length ? (
          <>
            <h2 className="text-center font-bold text-xl text-blue-600">
              Applied Jobs
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full min-w-max text-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      Job Title
                      <span className="md:hidden block text-xs text-gray-400">
                        / Type
                      </span>
                    </th>
                    <th className="hidden md:table-cell">Job Type</th>
                    <th>
                      Company
                      <span className="md:hidden block text-xs text-gray-400">
                        / Location
                      </span>
                    </th>
                    <th className="hidden md:table-cell">Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map((job, idx) => (
                    <SingleAppliedJob
                      key={job._id || idx}
                      index={idx + 1}
                      job={job}
                      setDeleteJobTriggered={setDeleteJobTriggered}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center text-red-500 text-sm">
            No applied jobs found. Please apply first.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
