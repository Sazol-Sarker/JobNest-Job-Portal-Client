import { useLoaderData } from "react-router-dom";
import HotJobCategoryCard from "./HotJobCategoryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllJobs = () => {
  const [sortBySalary, setSortBySalary] = useState(false);
  const loadedJobs = useLoaderData();
  const [jobPosts, setJobPosts] = useState(loadedJobs);
  // console.log(loadedJobs);


  useEffect(()=>{
    axios.get(`http://localhost:5000/jobs?sort=${sortBySalary}`).then((res) => {
        setJobPosts(res.data);
        console.log("hurray! sorted=", res.data);
        toast(`Sorted by salary ${sortBySalary?"Descending":"Ascending"}!`)
      });
  },[sortBySalary])

  const handleSortBySalary = () => {
    setSortBySalary(!sortBySalary);
   
  };
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="text-3xl text-center text-teal-500 m-5 p-5 font-bold">
          All Jobs : {jobPosts.length}
        </h2>
        <button
          onClick={handleSortBySalary}
          className="text-center justify-center border border-teal-400 max-w-lg mx-auto p-3 m-2 hover:bg-pink-300"
        >
          Sort By Salary
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {jobPosts.map((job,idx) => (
          <HotJobCategoryCard key={idx} jobsByCategory={job}></HotJobCategoryCard>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
