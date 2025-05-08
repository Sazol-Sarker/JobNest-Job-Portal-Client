import { useContext } from "react";

import JobCategory from "../components/JobCategory";
import JobCategory1 from "./JobCategory1";
import JobsContext from "../context/JobsContext/JobsContext";

const BrowseCategoryLayout = () => {
  const { jobCategories } = useContext(JobsContext);

  return (
    <div className="w-full flex flex-col items-center my-16 ">
      <h1 className="flex flex-col items-center text-2xl md:text-4xl font-bold text-[#05264E]">Browse by category</h1>
      <p className="text-md text-center mt-3"> Find the job that’s perfect for you. about 800+ new jobs everyday</p>
      <h2 className="mt-3">Job Categories: <b>{jobCategories.length}</b></h2>

      <JobCategory></JobCategory>
      {/* <JobCategory1></JobCategory1> */}
    </div>
  );
};

export default BrowseCategoryLayout;
