import React, { useContext, useEffect } from "react";
import HotJobCategoryCard from "../components/HotJobCategoryCard";
import { BsListNested } from "react-icons/bs";
import JobsContext from "../context/JobsContext/JobsContext";
import { Link, NavLink, useLoaderData, useParams } from "react-router-dom";

const HotJobsLayout = () => {
  const hotJobsByCategory = useLoaderData();
  const id = useParams();
  // console.log("ID=>", id);
  const { jobCategories } = useContext(JobsContext);

  // console.log("hotJobsByCategory DATA:", hotJobsByCategory);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-4xl mb-2 font-bold text-[#05264E]">
        Jobs of the day
      </h1>
      <p>Search and connect with the right candidates faster.</p>

      {/* <HotJobCategoryCard></HotJobCategoryCard> */}
      <div className="grid grid-cols-5 gap-4 mt-10">
        {
          jobCategories.map((jobCat, idx) => (
            <NavLink key={idx} to={`/hotJob/${jobCat.job_category}`}>
              <button className="btn p-10 border-1 border-blue-500 rounded-lg m-4 ">
                {jobCat.job_category}
              </button>
            </NavLink>
          ))
          // onClick={()=>hotJobCategoryHandler(jobCat.job_category)}
        }
      </div>

      <div>{/* <h2>No of news: {hotJobsByCategory.length}</h2> */}</div>

      {hotJobsByCategory ? (
        <div className="grid grid-cols-2 gap-4 mt-10">
          {hotJobsByCategory.map((jobsByCategory) => (
            <HotJobCategoryCard
              key={jobsByCategory._id}
              jobsByCategory={jobsByCategory}
            ></HotJobCategoryCard>
          ))}
        </div>
      ) : (
        <div className="text-red-500 text-2xl text-center">{!hotJobsByCategory
          && `No job posts available in ${id.category} category!`}</div>
      )}

      {/* <HotJobCategoryCard></HotJobCategoryCard> */}
    </div>
  );
};

export default HotJobsLayout;
