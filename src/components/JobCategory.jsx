import { useContext, useEffect, useState } from "react";
import JobsContext from "../context/JobsContext/JobsContext";

const JobCategory = () => {
  const { jobCategories } = useContext(JobsContext);
  const [items, setItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setItems(jobCategories);
  }, [jobCategories]);

  const visibleCount = 3;
    const itemWidth = 200;

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

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        Explore Job Categories
      </h2>

      <div className="flex items-center w-full gap-4 md:px-4">
        {/* Prev Button */}
        <button
          className="btn btn-circle btn-outline text-lg"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          ❮
        </button>

        {/* Scrollable Container */}
        <div className="overflow-hidden flex-1">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${startIndex * itemWidth}px)`,
              width: `${items.length * itemWidth}px`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[100px] md:w-[250px]  h-[160px] bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out p-4 text-center"
              >
                <img
                  src={item.logo}
                  alt={item.job_category}
                  className="h-10 w-auto mx-auto object-contain"
                />
                <h3 className="mt-3 text-sm md:text-md font-semibold">{item.job_category}</h3>
                <p className="text-gray-500 text-sm">
                  {item.no_of_jobs_available} Jobs
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          className="btn btn-circle btn-outline text-lg"
          onClick={handleNext}
          disabled={startIndex + visibleCount >= items.length}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default JobCategory;
