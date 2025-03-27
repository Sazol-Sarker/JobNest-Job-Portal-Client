import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

import { IoBagOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { BsLightning } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { differenceInDays } from "date-fns";
const JobDetails = () => {
  //   const { id } = useParams();
  //   const [jobPost, setJobPost] = useState({});
  const jobPost = useLoaderData();
  // console.log("jobPost",jobPost);
  const { loading, setLoading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    _id,
    company_logo,
    company,
    location,
    title,
    jobType,
    description,
    requirements,
    applicationDeadline,
    salaryRange,
    hr_email,
    postedAt
  } = jobPost;

  // use this to wrap card with HOT! NEW! tags if  diffInDays=0
  const diffInDays=differenceInDays(new Date(),postedAt||'2025-03-27')
  // console.log(diffInDays);

  // console.log(jobPost);
  // console.log(company, location);

  //   useEffect(() => {
  //     setLoading(true);
  //     fetch(`http://localhost:5000/jobs/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setJobPost(data);
  //         setLoading(false);
  //       });
  //   }, [id]);

  // if (loading) {
  //   return (
  //     <div>
  //       <span className="loading loading-ring loading-xs"></span>
  //       <span className="loading loading-ring loading-sm"></span>
  //       <span className="loading loading-ring loading-md"></span>
  //       <span className="loading loading-ring loading-lg"></span>
  //     </div>
  //   );
  // }

  
  const handleApplyJob = (user) => {
    const { email } = user;
    const appliedJob = {
      applicant_email: email,
      company_name: company,
      company_location: location,
      job_title: title,
      jobType,
      applicationDeadline,
      hr_email
    };

    // send to mongoDB: POST API appliedJobs
    // Duplicate data entry into DB-> thus avoiding
    // fetch('http://localhost:5000/appliedJob',{
    //   method:'POST',
    //   headers:{'content-type':'application/json'},
    //   body:JSON.stringify(appliedJob)
    // })
    // .then(res=>res.json())
    // .then(data=>{
    //   console.log("AppliedJob DB response=>",data);
    // })

    // send to mongoDB: POST API appliedJobs
    fetch("http://localhost:5000/appliedJob", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(appliedJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.upsertedCount) toast("Cheers! Job application successfull!");
        if (data.matchedCount) toast("Relax! You already applied for the Job!");
        // console.log("AppliedJob DB response=>", data)
        // redirecting back to category
        navigate(-1)
      
      });
  };

  return (
    <div className="w-8/12 mx-auto">
      <h2 className="text-center text-2xl font-bold text-teal-500">
        Job details
      </h2>
      <div className="card bg-base-100 border-2 border-teal-200 shadow-xl">
        <p className="flex items-center ml-auto mt-5 pr-5 text-teal-500 text-2xl">
          <BsLightning />
        </p>
        <div className="flex items-center ml-5 gap-x-5">
          <figure className="">
            <img
              // src="https://i.ibb.co.com/fzrQ3w8x/icons8-it-96.png"
              src={company_logo}
              alt={company}
              className="rounded-2xl w-14 h-14"
            />
          </figure>
          <div>
            <h2 className="card-title text-xl">{company}</h2>
            <p className="flex items-center text-[#B0B9C5]">
              <FiMapPin className="mr-2" /> {location}
            </p>
          </div>
          {/* SALARY */}
          <motion.div
            animate={{
              y: [-5, 5, -5],
              color: ["#8442f5", "#ad42f5", "#f542a1"],
            }}
            transition={{
              duration: 5,
              delay: 1,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="badge badge-ghost text-sm  text-gray-500 ml-auto mr-4 mt-4 p-2 font-bold border-2 mb-4 border-teal-500"
          >
            {Math.floor(salaryRange.min / 1000)}K-
            {Math.floor(salaryRange.max / 1000)}K
            {salaryRange.currency.toUpperCase()}
          </motion.div>
        </div>

        <div className="card-body flex flex-col ">
          <div>
            <h2 className=" card-title text-xl font-bold text-[#05264E]">
              {title}
            </h2>
          </div>
          <div className="flex gap-x-2  text-[#A0ABB8]">
            <p className="flex   ">
              <span className="mr-2">
                <IoBagOutline className="text-lg" />
              </span>
              {jobType}
            </p>
            <p className="flex items-center text-teal-700 ">
              <span className="mr-2">
                <FaRegClock />
              </span>
              {diffInDays?`${diffInDays} days ago`:"Today"}
            </p>
          </div>

          <p className="my-5 text-[#4F5E64]">{description}</p>

          {/* <div className="grid grid-cols-3 gap-4 text-lg mb-8 "> */}
          <div className="flex flex-wrap gap-2 text-lg mb-8 ">
            {requirements.map((req, idx) => (
              <div
                key={idx}
                className="badge badge-ghost font-light text-[#536268] p-2  bg-slate-200 "
              >
                {/* {req.split(" ")[0]} */}
                {req}
              </div>
            ))}
          </div>

          <div className=" flex items-center justify-between w-full">
            <div className="md:flex text-[#05264E]">
              {/* <span className="text-[#3C65F5] font-bold text-3xl">$800</span>
                   /Hour */}
              <span className="font-bold pr-2 "> Deadline:</span>
              <p className="flex justify-center items-center ">
                {applicationDeadline}
              </p>
            </div>

            {/* <Link to={`/jobs/${_id}`}> */}
            <button
              onClick={() => handleApplyJob(user)}
              className="btn text-[#3C65F5] font-light bg-[#E0E6F7] hover:bg-[#3C65F5] hover:text-white"
            >
              Apply Now
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
