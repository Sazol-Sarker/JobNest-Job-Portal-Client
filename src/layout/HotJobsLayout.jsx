import React, { useContext } from "react";
import HotJobCategoryCard from "../components/HotJobCategoryCard";
import { useLoaderData, useParams, NavLink, useNavigate } from "react-router-dom";
import JobsContext from "../context/JobsContext/JobsContext";

const HotJobsLayout = () => {
  const hotJobsByCategory = useLoaderData();
  const { category } = useParams();
  const { jobCategories } = useContext(JobsContext);
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory !== "") {
      navigate(`/hotJob/${selectedCategory}`);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 px-4">
      <h1 className="text-2xl md:text-4xl mb-2 font-bold text-[#05264E] text-center">
        Jobs of the Day
      </h1>
      <p className="text-md pt-3 text-center text-gray-600">
        Search and connect with the right candidates faster.
      </p>

      {/* Dropdown for small screens */}
      <div className="w-full mt-6 md:hidden flex justify-center">
        <select
          className="select select-bordered w-full max-w-xs"
          value={category || ""}
          onChange={handleSelectChange}
        >
          <option value="">Select a category</option>
          {jobCategories.map((jobCat, idx) => (
            <option key={idx} value={jobCat.job_category}>
              {jobCat.job_category}
            </option>
          ))}
        </select>
      </div>

      {/* Category buttons for md+ screens */}
      <div className="w-full max-w-5xl mt-6 hidden md:flex flex-wrap justify-center md:justify-start gap-3 px-2">
        {jobCategories.map((jobCat, idx) => (
          <NavLink
            key={idx}
            to={`/hotJob/${jobCat.job_category}`}
            className={({ isActive }) =>
              `px-4 py-2 border rounded-full transition-all duration-200 text-sm md:text-base ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100"
              }`
            }
          >
            {jobCat.job_category}
          </NavLink>
        ))}
      </div>

      {/* Job Cards */}
      <div className="w-full max-w-6xl mt-10">
        {hotJobsByCategory?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-6 ">
            {hotJobsByCategory.map((job) => (
              <HotJobCategoryCard key={job._id} jobsByCategory={job} />
            ))}
          </div>
        ) : (
          <div className="text-red-500 text-xl text-center my-10">
            No job posts available in <strong>{category}</strong> category!
          </div>
        )}
      </div>
    </div>
  );
};

export default HotJobsLayout;
