import React, { useEffect, useState } from 'react';
import JobsContext from './JobsContext';

const JobsProvider = ({children}) => {
const [jobCategories, setJobCategories] = useState([]);
console.log("jobCategories",jobCategories);

    // fetch jobsCategory
      useEffect(() => {
        fetch("http://localhost:5000/jobCategories")
          .then((res) => res.json())
          .then((data) => {
            setJobCategories(data);
           
            console.log("Category data from DB:=>",data);
          });
      }, []);

    const jobsInfo={
        jobCategories,
        setJobCategories,

    }

    return (
        <JobsContext.Provider value={jobsInfo}>
            {children}
        </JobsContext.Provider>
    );
};

export default JobsProvider;