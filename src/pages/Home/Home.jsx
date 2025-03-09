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
    <div>
      {/* BANNER */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col ">
          <div className="flex">
            <div>
              <div>
                <motion.h2
                  animate={{ x: [0, 50, 0] }}
                  transition={{
                    duration: 5,
                    delay: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="text-5xl font-bold"
                >
                  The
                  <motion.span
                    animate={{ color: ["#106cb3", "#7f28a1", "#eb34e1"] }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    Easiest Way
                  </motion.span>{" "}
                  <br></br> to Get Your New Job
                </motion.h2>

                <p className="py-6 w-4/5 text-gray-700">
                  Each month, more than 3 million job seekers turn to website in
                  their search for work, making over 140,000 applications every
                  single day
                </p>
              </div>
              <div className="flex justify-between items-center join  border-2 bg-white w-4/5">
                <div className="flex items-center space-x-2  pr-4">
                  {/* <FaBriefcase className="text-gray-500" /> */}
                  <IoBagHandle className="text-teal-500 pl-1  text-2xl" />
                  <select className="text-gray-700  focus:outline-none join-item pr-5 py-6">
                    <option value="" hidden>
                      Industry
                    </option>
                    <option value="IT">IT</option>

                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                {/* <div className="flex items-center">
                <select className="text-gray-700 focus:outline-none">
                  <option value="" hidden>
                    Industry
                  </option>
                  <option>Sci-fi</option>
                  <option>Drama</option>
                  <option>Action</option>
                </select>
              </div> */}

                <div className="flex items-center space-x-2  pr-4">
                  <BsFillPinMapFill className="text-teal-500" />

                  <select className="text-gray-700 focus:outline-none ml-10 join-item py-6">
                    <option value="" hidden>
                      Location
                    </option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Action">Action</option>
                  </select>
                </div>

                <div className="ml-5 flex items-center ">
                  {/* border-4 border-teal-500 */}
                  <button className="flex justify-center items-center gap-x-2 join-item  bg-blue-600  rounded-xl  px-4 mx-5 py-2 text-white ">
                    <IoSearchOutline className="text-white" />
                    Search
                  </button>
                </div>
                {/* </div> */}
              </div>
            </div>

            <div className="img-container space-y-2">
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

            {/* search box */}

            {/* <div className="images flex gap-5 m-5">
              <img src={homeTeam2} className="w-60" alt="" />
              <img src={homeTeam3} className="w-60" alt="" />
            </div> */}
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>

      <main className="w-10/12 mx-auto ">
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
