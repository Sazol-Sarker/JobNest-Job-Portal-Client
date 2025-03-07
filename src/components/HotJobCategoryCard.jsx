import React from "react";
import { IoBagOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { BsLightning } from "react-icons/bs";

const HotJobCategoryCard = () => {
  return (
    <div className="card bg-base-100 border-2 border-teal-200  w-96 shadow-xl">
      <p className="flex items-center justify-end w-full mt-5 pr-5 text-teal-500 text-2xl">
        <BsLightning />
      </p>
      <div className="flex items-center ml-5 gap-x-5">
        <figure className="">
          <img
            src="https://i.ibb.co.com/fzrQ3w8x/icons8-it-96.png"
            alt=""
            className="rounded-2xl w-14 h-14"
          />
        </figure>
        <div>
          <h2 className="card-title text-xl">LinkedIn</h2>
          <p className="flex items-center text-[#B0B9C5]">
            <FiMapPin className="mr-2"/> London, US
          </p>
        </div>
      </div>

      <div className="card-body flex flex-col ">
        <div><h2 className="text-xl font-bold text-[#05264E]">UI / UX Designer fulltime</h2></div>
        <div className="flex gap-x-2  text-[#A0ABB8]">
          <p className="flex   ">
            <span className="mr-2">
              <IoBagOutline className="text-lg" />
            </span>
            Full Time
          </p>
          <p className="flex items-center ">
            <span className="mr-2">
              <FaRegClock />
            </span>
            5 min ago
          </p>
        </div>

        <p className="my-5 text-[#4F5E64]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet illo
          molestiae ullam numquam deleniti ad facere quidem quisquam odio odit,
          accusamus nisi debitis optio! Reiciendis placeat quaerat sequi veniam
          nihil.
        </p>

        <div className="text-lg mb-8 *:bg-slate-200 *:mr-4 *:p-4 *:text-[#758188]">
          <h2 className="badge badge-ghost">React</h2>
          <h2 className="badge badge-ghost">NodeJS</h2>
        </div>

        <div className=" flex items-center justify-between w-full">
          <div>
            <p className="flex justify-center items-center text-gray-500">
              <span className="text-[#3C65F5] font-bold text-3xl">$800</span>
              /Hour
            </p>
          </div>
          <button className="btn text-[#3C65F5] font-light bg-[#E0E6F7] hover:bg-[#3C65F5] hover:text-white">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotJobCategoryCard;
