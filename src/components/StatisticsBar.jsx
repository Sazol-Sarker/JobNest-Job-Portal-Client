import React from "react";

const StatisticsBar = () => {
  return (
    <div className="w-full px-4 py-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 shadow-md rounded-xl bg-white p-6">
        {/* Card 1 */}
        <div className="text-center space-y-2">
          <div className="text-[#3C65F5] text-3xl font-bold">25K +</div>
          <h3 className="text-[#05264E] text-xl font-bold">Completed Cases</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We always provide people a complete solution upon focused of any business
          </p>
        </div>

        {/* Card 2 */}
        <div className="text-center space-y-2">
          <div className="text-[#3C65F5] text-3xl font-bold">17 +</div>
          <h3 className="text-[#05264E] text-xl font-bold">Our Office</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We always provide people a complete solution upon focused of any business
          </p>
        </div>

        {/* Card 3 */}
        <div className="text-center space-y-2">
          <div className="text-[#3C65F5] text-3xl font-bold">86 +</div>
          <h3 className="text-[#05264E] text-xl font-bold">Skilled People</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We always provide people a complete solution upon focused of any business
          </p>
        </div>

        {/* Card 4 */}
        <div className="text-center space-y-2">
          <div className="text-[#3C65F5] text-3xl font-bold">28 +</div>
          <h3 className="text-[#05264E] text-xl font-bold">Happy Clients</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We always provide people a complete solution upon focused of any business
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;
