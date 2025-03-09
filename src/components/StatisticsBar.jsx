import React from "react";

const StatisticsBar = () => {
  const statDescStyle = {
    whiteSpace: "normal", // Allows text to wrap
    overflowWrap: "break-word", // Breaks long words
  };
  return (
    <div className="w-full stats stats-vertical my-10 lg:stats-horizontal shadow flex flex-wrap justify-between">
      <div className="stat w-1/4 p-4 text-center *:mb-3">
        <div className="stat-value text-[#3C65F5] text-2xl">25K +</div>
        <div className="stat-title text-[#05264E] text-xl font-bold">Completed Cases</div>
        <div className="stat-desc" style={statDescStyle}>
          We always provide people a complete solution upon focused of any
          business
        </div>
      </div>

      <div className="stat  w-1/4 text-center *:mb-3">
        <div className="stat-value text-[#3C65F5] text-2xl">17 +</div>
        <div className="stat-title text-[#05264E] text-xl font-bold">Our Office</div>
        <div className="stat-desc " style={statDescStyle}>
          We always provide people a complete solution upon focused of any
          business
        </div>
      </div>

      <div className="stat  w-1/4 text-center *:mb-3">
        <div className="stat-value text-[#3C65F5] text-2xl">86 +</div>
        <div className="stat-title text-[#05264E] text-xl font-bold">Skilled People</div>
        <div className="stat-desc  " style={statDescStyle}>
          {/* break-words */}
          We always provide people a complete solution upon focused of any
          business
        </div>
      </div>
      <div className="stat w-1/4 text-center *:mb-3">
        <div className="stat-value  text-[#3C65F5] text-2xl">28 +</div>
        <div className="stat-title text-[#05264E] text-xl font-bold">Happy Clients</div>
        <div className="stat-desc " style={statDescStyle}>
          We always provide people a complete solution upon focused of any
          business
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;
