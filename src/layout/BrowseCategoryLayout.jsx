import { useContext } from "react";

import JobCategory from "../components/JobCategory";
import JobCategory1 from "./JobCategory1";
import JobsContext from "../context/JobsContext/JobsContext";

const BrowseCategoryLayout = () => {
  const {jobCategories} = useContext(JobsContext);
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#05264E]">Browse by category</h1>
      <p> Find the job that’s perfect for you. about 800+ new jobs everyday</p>
      <h2>Job Categories: {jobCategories.length}</h2>

      {/* <JobCategory></JobCategory> */}
      <JobCategory1></JobCategory1>

    
     </div>
  );
};

export default BrowseCategoryLayout;
