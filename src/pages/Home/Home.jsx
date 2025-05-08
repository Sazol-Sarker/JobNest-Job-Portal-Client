import { easeOut, motion } from "framer-motion";
import homeTeam1 from "../../assets/homeTeam1.jpg";
import homeTeam2 from "../../assets/homeTeam2.jpg";
// import homeTeam3 from "../../assets/homeTeam3.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { IoBagHandle } from "react-icons/io5";
import { BsFillPinMapFill } from "react-icons/bs";
import BrowseCategoryLayout from "../../layout/BrowseCategoryLayout";
import HotJobsLayout from "../../layout/HotJobsLayout";
import StatisticsBar from "../../components/StatisticsBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full max-w-7xl  mt-5 ">
      {/* BANNER */}
      <div className="hero w-full max-w-7xl bg-base-200 ">
        {/* min-h-screen */}
        <div className="hero-content w-full flex-col ">
          <div className="flex">
            <div>
              <div className="w-full mx-auto">
                {/* <motion.h2
                  animate={{ x: [10, 40, 10] }}
                  transition={{
                    duration: 5,
                    delay: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="text-2xl md:text-3xl font-bold"
                >
                  The
                  <motion.span
                    animate={{ color: ["#106cb3", "#7f28a1", "#eb34e1"] }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="ml-1"
                  >
                    Easiest Way
                  </motion.span>
                  <br></br> to Get Your New Job
                </motion.h2> */}
                <motion.h2
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: 0.5,
                  }}
                  className="text-2xl md:text-3xl font-bold"
                >
                  The{" "}
                  <motion.span
                    animate={{ color: ["#106cb3", "#7f28a1", "#eb34e1"] }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="ml-1"
                  >
                    Easiest Way
                  </motion.span>
                  <br />
                  to Get Your New Job
                </motion.h2>

                <p className="py-6  text-gray-700 w-4/5">
                  Each month, more than 3 million job seekers turn to website in
                  their search for work, making over 140,000 applications every
                  single day
                </p>
              </div>
              {/* search box */}
              {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center join  border-2 bg-white ">
                <div className="flex flex-1 items-center space-x-2  pr-4">
                  <IoBagHandle className="text-teal-500 pl-1  text-2xl" />
                  <select className="text-gray-700  focus:outline-none join-item pr-2 md:pr-5 py-3 md:py-6">
                    <option value="" hidden>
                      Industry
                    </option>
                    <option value="IT">IT</option>

                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className=" flex flex-1 items-center space-x-2  pr-4">
                  <BsFillPinMapFill className="text-teal-500" />

                  <select className="text-gray-700 focus:outline-none ml-2 md:ml-10 join-item py-2 md:py-6">
                    <option value="" hidden>
                      Location
                    </option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Action">Action</option>
                  </select>
                </div>

                <div className="md:ml-5 flex items-center ">
                  <button className="flex justify-center items-center gap-x-2 join-item  bg-blue-600  rounded-xl  px-4 mx-5 py-2 text-white ">
                    <IoSearchOutline className="text-white" />
                    Search
                  </button>
                </div>
              </div> */}
              {/* src */}
              <div className="w-full bg-white rounded-2xl shadow-lg p-4 md:p-6 my-6">
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  {/* Industry Selector */}
                  <div className="flex items-center gap-2 flex-1">
                    <IoBagHandle className="text-teal-500 text-2xl" />
                    <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option value="" hidden>
                        Choose Industry
                      </option>
                      <option value="IT">IT</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>

                  {/* Location Selector */}
                  <div className="flex items-center gap-2 flex-1">
                    <BsFillPinMapFill className="text-teal-500 text-lg" />
                    <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option value="" hidden>
                        Choose Location
                      </option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Delhi">Delhi</option>
                      <option value="London">London</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-center w-5/8">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300">
                      <IoSearchOutline />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="img-container space-y-2 hidden lg:inline">
              <motion.img
                animate={{ y: [0, 50, 0] }}
                transition={{
                  duration: 10,
                  // delay: 1,
                  ease: "easeOut",
                  repeat: Infinity,
                }}
                src={homeTeam1}
                className="max-w-sm rounded-t-[45px] rounded-br-[45px] border-b-8 border-l-8 border-blue-700 shadow-2xl"
              />
              <motion.img
                animate={{ x: [100, 150, 100] }}
                transition={{
                  duration: 10,
                  delay: 2,
                  ease: "easeOut",
                  repeat: Infinity,
                }}
                src={homeTeam2}
                className="max-w-80 rounded-t-[45px] rounded-br-[45px] border-b-8 border-l-8 border-blue-700 shadow-2xl"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <main className="w-full md:w-10/12 mx-auto ">
        <BrowseCategoryLayout></BrowseCategoryLayout>
        {/* <HotJobsLayout></HotJobsLayout> */}
        <Outlet></Outlet>
        <StatisticsBar></StatisticsBar>
        {/* <Outlet></Outlet> */}
      </main>
    </div>
  );
};

export default Home;
