import { useContext, useEffect, useState } from "react";
import JobsContext from "../context/JobsContext/JobsContext";

const JobCategory1 = () => {
  const { jobCategories } = useContext(JobsContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(jobCategories);
    
  }, [jobCategories]);
  const visibleCount = 5;
  const [startIndex, setStartIndex] = useState(0);

  // console.log("in jobcat1=>", jobCategories);
  // console.log("in  items=>", items);

  const itemWidth = 100;
  const gap = 8;
  const shiftAmount = itemWidth + gap;

  const handleNext = () => {
    if (startIndex + visibleCount < items.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // useEffect(() => {
  //   fetch("http://localhost:5000/jobCategories")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setJobCategories(data);
  //       setItems(data);
  //       console.log("Category data from DB:=>");
  //     });
  // }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* <h2>Job Categories: {jobCategories.length}</h2> */}
      <div className="flex flex-col items-center w-full p-4">
        {/* Carousel Container */}
        <div className="relative w-[800px] flex items-center gap-2">
          {/* Prev Button */}
          <button
            className="btn btn-primary"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            ❮
          </button>

          {/* Visible Items Wrapper */}
          <div className="overflow-hidden w-[700px] border rounded-lg">
            <div
              className="flex gap-2 transition-transform duration-300"
              style={{
                transform: `translateX(-${startIndex * shiftAmount}px)`,
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="hover:cursor-pointer w-[400px] border-2 bg-white h-[150px] flex items-center flex-col text-center rounded-lg shadow-md mx-2 px-2"
                >
                  <div>
                    <img
                      src={item.logo}
                      alt={item.job_category}
                      className="w-20 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-md font-semibold mt-2">
                      {item.job_category}
                    </h3>
                    <p className="text-gray-600">
                      {item.no_of_jobs_available} Jobs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={startIndex + visibleCount >= items.length}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCategory1;
