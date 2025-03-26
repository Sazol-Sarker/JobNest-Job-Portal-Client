import React, { useContext, useEffect, useState } from "react";
import JobsContext from "./JobsContext";
import AuthContext from "../AuthContext/AuthContext";

const JobsProvider = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const [jobCategories, setJobCategories] = useState([]);
  // console.log("jobCategories",jobCategories);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <span className="loading loading-bars loading-xs"></span>
  //       <span className="loading loading-bars loading-sm"></span>
  //       <span className="loading loading-bars loading-md"></span>
  //       <span className="loading loading-bars loading-lg"></span>
  //     </div>
  //   );
  // }

  // fetch jobsCategory
  useEffect(() => {
    fetch("http://localhost:5000/jobCategories")
      .then((res) => res.json())
      .then((data) => {
        setJobCategories(data);

        // console.log("Category data from DB:=>",data);
      });
  }, []);

  const jobsInfo = {
    jobCategories,
    setJobCategories,
  };

  return (
    <JobsContext.Provider value={jobsInfo}>{children}</JobsContext.Provider>
  );
};

export default JobsProvider;
