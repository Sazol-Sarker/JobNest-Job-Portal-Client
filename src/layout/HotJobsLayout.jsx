import React, { useContext } from "react";
import HotJobCategoryCard from "../components/HotJobCategoryCard";
import { BsListNested } from "react-icons/bs";
import JobsContext from "../context/JobsContext/JobsContext";

const HotJobsLayout = () => {
    const {jobCategories}=useContext(JobsContext)
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-4xl mb-2 font-bold text-[#05264E]">Jobs of the day</h1>
      <p>Search and connect with the right candidates faster.</p>

      {/* <HotJobCategoryCard></HotJobCategoryCard> */}
      <div className="grid grid-cols-5 gap-4">
      {
        jobCategories.map(jobCat=><button key={jobCat._id} className="btn p-10 border-1 border-blue-500 rounded-lg m-4 ">{jobCat.job_category}</button>)
      }

      </div>
      <HotJobCategoryCard></HotJobCategoryCard>
    </div>
  );
};

export default HotJobsLayout;
