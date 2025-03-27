import React, { useContext } from "react";
import { IoBagOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { BsLightning } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import Marquee from "react-fast-marquee";

const HotJobCategoryCard = ({ jobsByCategory }) => {
  // console.log("jobsByCategory=>",jobsByCategory);
  // context data
  const { user } = useContext(AuthContext);
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
  } = jobsByCategory;

  const salary = `  ${Math.floor(salaryRange.min / 1000)}K-
          ${Math.floor(salaryRange.max / 1000)}K
          ${salaryRange.currency.toUpperCase()}`;

  const handleCardDetailsAccess = (id) => {
    if (!user) {
      toast("Please log in first to see job post details");
      return;
    }
    navigate(`/jobs/${id}`);
  };

  return (
    <div className="card bg-base-100 border-2 border-teal-200 shadow-xl">
      <p className="flex items-center justify-end w-full mt-5 pr-5 text-teal-500 text-2xl">
        <BsLightning />
      </p>
      <div className="flex items-center ml-5 gap-x-5">
        <figure className="">
          <img
            // src="https://i.ibb.co.com/fzrQ3w8x/icons8-it-96.png"
            src={company_logo}
            alt=""
            className="rounded-2xl w-14 h-14"
          />
        </figure>
        <div>
          <h2 className="card-title text-xl">{company}</h2>
          <p className="flex items-center text-[#B0B9C5]">
            <FiMapPin className="mr-2" /> {location}
          </p>
        </div>
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
          <p className="flex items-center ">
            <span className="mr-2">
              <FaRegClock />
            </span>
            5 min ago
          </p>
        </div>

        <p className="my-5 text-[#4F5E64]">{description}</p>

        {/* <div className="grid grid-cols-3 gap-4 text-lg mb-8 "> */}
        <div className="flex flex-wrap gap-2 text-lg mb-8 ">
          {requirements.map((req, idx) => (
            <p
              key={idx}
              className="badge badge-ghost font-light text-[#536268] p-2  bg-slate-200 "
            >
              {/* {req.split(" ")[0]} */}
              {req}
            </p>
          ))}
        </div>
        {/* SALARY */}
        <motion.div
          animate={{
            x: [30, 80, 30],
            color: ["#8442f5", "#ad42f5", "#f542a1"],
          }}
          transition={{
            duration: 5,
            delay: 1,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="badge badge-ghost text-sm  text-gray-500 p-2 font-bold border-2 mb-4 border-teal-500"
        >
          {salary}
        </motion.div>
        <Marquee
          pauseOnHover
          speed={60}
          className="text-sm hover:cursor-pointer  text-gray-500 p-2 font-bold border-2 rounded-lg mb-4 border-teal-500"
        >
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="mx-4">
              {salary}
            </span>
          ))}
        </Marquee>

        <div className=" flex items-center justify-between w-full">
          <div className="flex-col md:flex text-[#05264E]">
            {/* <span className="text-[#3C65F5] font-bold text-3xl">$800</span>
              /Hour */}
            <span className="font-bold pr-2 "> Deadline:</span>
            <p className="flex justify-center items-center ">
              {applicationDeadline}
            </p>
          </div>

          {/* <Link to={`/jobs/${_id}`}> */}
          <button
            disabled={jobsByCategory.status !== "active"}
            onClick={() => handleCardDetailsAccess(_id)}
            className="btn text-[#3C65F5] font-light bg-[#E0E6F7] hover:bg-[#3C65F5] hover:text-white"
          >
            {jobsByCategory.status !== "active"?"Expired":"Apply Now"}
            
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default HotJobCategoryCard;
