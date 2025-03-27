import { useLoaderData } from "react-router-dom";
import HotJobCategoryCard from "./HotJobCategoryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllJobs = () => {
  const [sortBySalary, setSortBySalary] = useState(false);
  const loadedJobs = useLoaderData();
  const [jobPosts, setJobPosts] = useState(loadedJobs);
  const [searchText, setSearchText] = useState("");
  // console.log(loadedJobs);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/jobs?sort=${sortBySalary}&searchText=${searchText}`
      )
      .then((res) => {
        setJobPosts(res.data);
        // console.log("hurray! sorted=", res.data);
        toast(`Sorted by salary ${sortBySalary ? "Descending" : "Ascending"}!`);
      });
  }, [sortBySalary, searchText]);

  const handleSortBySalary = () => {
    setSortBySalary(!sortBySalary);
  };
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="text-3xl text-center text-teal-500 m-5 p-5 font-bold">
          All Jobs : {jobPosts.length}
        </h2>
        <div className="flex flex-col justify-between md:flex-row items-center py-5 ">
          <button
            onClick={handleSortBySalary}
            className="text-center justify-center border border-teal-400 max-w-lg mx-auto p-3 m-2 hover:bg-pink-300"
          >
            Sort By Salary
          </button>
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              name="searchText"
              className="grow"
              placeholder="Search"
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </div>
      </div>
      {
        jobPosts.length>0?<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {jobPosts.map((job, idx) => (
          <HotJobCategoryCard
            key={idx}
            jobsByCategory={job}
          ></HotJobCategoryCard>
        ))}
      </div>:<div className="text-3xl text-center text-teal-500 m-5 p-5 font-bold">{`No job posts found nearby  ${searchText}`}</div>
      }
    </div>
  );
};

export default AllJobs;
