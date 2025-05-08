import axios from "axios";
import { useContext, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import AuthContext from "../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";

const NewJob = () => {
  // auth  context- access the user data
  const { user, loading } = useContext(AuthContext);
  // location hook
  const location = useLocation();
  const navigate=useNavigate()
  console.log("location in newjob=>", location);
  // setter of the update fields by past value
  const updateForm = location.pathname.includes("/edit");
  console.log(updateForm);
  const formData = useLoaderData();
  console.log("formData=>>", formData);
  const [jobType, setJobType] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [currencyType, setCurrencyType] = useState("");
  const [jobRequirements, setJobRequirements] = useState([]);
  //   const { displayName="John", email } = user;

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  const { displayName, email } = user;
  //   const displayName = email.split("@")[0];

  const handleNewJobData = (e) => {
    // stop reloading
    e.preventDefault();
    const form = e.target;
    const CompanyLogo = form.CompanyLogo.value;
    const CompanyName = form.CompanyName.value;
    const CompanyLocation = form.CompanyLocation.value;
    const JobTitle = form.JobTitle.value;
    const JobType = form.JobType.value;
    const JobCategory = form.JobCategory.value;
    const HR_Name = form.HR_Name.value;
    const HR_Email = form.HR_Email.value;
    const JobDescription = form.JobDescription.value;
    const JobRequirements = form.JobRequirements.value;
    const JobApplicationDeadline = form.JobApplicationDeadline.value;
    const MinimumSalary = form.MinimumSalary.value;
    const MaximumSalary = form.MaximumSalary.value;
    const Currency = form.Currency.value;
    // date of posting
    const JobPostedAt = new Date();
    // format(JobPostedAt, "yyyy-MM-dd-HHmmss");
    console.log(JobPostedAt);

    // create the NEWJOB object to fire into DB
    const newJobData = {
      title: JobTitle, // "Job Title"
      location: CompanyLocation, // "Location" from CompanyLocation
      jobType: JobType, // "Job Type"
      category: JobCategory, // Assuming category is static or can be set to a default
      applicationDeadline: JobApplicationDeadline,
      //   applicationDeadline: {
      //     deadlineDate:JobApplicationDeadline.split('T')[0],
      //     deadlineTime:JobApplicationDeadline.split('T')[1]
      //   }, // "Job Application Deadline"
      salaryRange: {
        min: MinimumSalary, // "Minimum Salary"
        max: MaximumSalary, // "Maximum Salary"
        currency: Currency, // "Currency"
      },
      description: JobDescription, // "Job Description"
      company: CompanyName, // "Company Name"
      requirements: JobRequirements.split(",").map((req) => req.trim()), // Assuming requirements are comma separated
      responsibilities: [], // You can add a similar split if responsibilities are provided
      status: "active", // Assuming the job is active by default
      hr_email: HR_Email, // "HR Email"
      hr_name: HR_Name, // "HR Name"
      company_logo: CompanyLogo, // Static company logo link
      postedAt: JobPostedAt,
    };
    // console.log("newJobData=>>", newJobData);

    if (updateForm) {
      // fire put api
      axios.put(`http://localhost:5000/jobs/${formData._id}`, newJobData).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          form.reset();
          toast(`Recruitment circular for ${JobTitle} updated!`);
        }
      });
    } else {
      // fire post api
      axios.post(`http://localhost:5000/jobs/new`, newJobData).then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          form.reset();
          toast(`New recruitment circular for ${JobTitle} posted!`);
        }
      });
    }
  };

  return (
    <div className="hero md:bg-base-200  min-h-screen">
      <div className="hero-content  flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-teal-800">
            {updateForm ? (
              <span>Update posted job</span>
            ) : (
              <span>Post a new job</span>
            )}
          </h1>
        </div>
        <div className="card bg-base-100  max-w-2xl   shrink-0 shadow-2xl">
          <form onSubmit={handleNewJobData} className="card-body ">
            {/* company_logo */}
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Company logo</span>
              </label>
              <input
                type="url"
                name="CompanyLogo"
                defaultValue={updateForm ? formData?.company_logo : ""}
                placeholder="Company_logo url"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              {/* Company Name */}
              <input
                type="text"
                name="CompanyName"
                defaultValue={updateForm ? formData?.company : ""}
                placeholder="Alpha Inc."
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              {/* Company Location */}
              <input
                type="text"
                name="CompanyLocation"
                defaultValue={updateForm ? formData?.location : ""}
                placeholder="Dhaka, Bangladesh"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Job Title</span>
              </label>
              {/* Job Title */}
              <input
                type="text"
                name="JobTitle"
                defaultValue={updateForm ? formData?.title : ""}
                placeholder="Software Engineer"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Job Type</span>
              </label>
              {/* Job Type */}
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                name="JobType"
                id=""
                className="px-3 py-2 border border-gray-400 rounded-md"
                required
              >
                {/* className="input input-bordered" */}
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {/* <input
                type="text"
                name="JobType"
                placeholder="Onsite/Remote"
                className="input input-bordered"
                required
              /> */}
            </div>
            {/* HR Name */}
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">HR Name</span>
              </label>
              {/* Job Title */}
              <input
                type="text"
                name="HR_Name"
                defaultValue={updateForm ? formData?.hr_name : displayName}
                // placeholder="John doe"
                className="input input-bordered w-full"
                // readonly
                required
              />
            </div>
            {/* HR email */}
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">HR Email</span>
              </label>

              <input
                type="email"
                name="HR_Email"
                defaultValue={email}
                // placeholder="john@doe.gmail.com"
                className="input input-bordered w-full"
                // readonly
                // required
                disabled
              />
            </div>

            {/* Job Category */}
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Job Category</span>
              </label>
              {/* Job Type */}
              <select
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
                name="JobCategory"
                id=""
                className="relative z-10 px-3 py-2 border border-gray-400 rounded-md"
                required
              >
                <option value="Engineering">Engineering</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Research & Development">
                  Research & Development
                </option>

                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>

                <option value="Finance">Finance</option>
                <option value="Legal">Legal</option>

                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>

                <option value="Customer Service">Customer Service</option>
                <option value="Human Resources">Human Resources</option>

                <option value="Creative">Creative</option>
                <option value="Logistics">Logistics</option>
              </select>
              {/* <input
                type="text"
                name="JobType"
                placeholder="Onsite/Remote"
                className="input input-bordered"
                required
              /> */}
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Job Description</span>
              </label>
              {/* Job Description */}
              {/* <input
                //   make it text area
                type="text"
                name="JobDescription"
                placeholder="Description of job role"
                className="input input-bordered"
                required
              /> */}
              <textarea
                name="JobDescription"
                defaultValue={updateForm ? formData?.description : ""}
                id=""
                cols="30"
                rows="10"
                className="border border-gray-400"
              ></textarea>
            </div>
            {/* Job Requirements */}
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Job Requirements</span>
              </label>
              {/* Job Requirements */}
              <div className="flex items-center">
                <input
                  type="text"
                  name="JobRequirements"
                  defaultValue={
                    updateForm ? formData?.requirements?.join(", ") : ""
                  }
                  placeholder="Requirements (separated by comma)"
                  className="input input-bordered w-full"
                  required
                />
                {/* <button onClick={handleJobRequirements}><CiSquarePlus className="relative text-4xl hover:text-teal-500"/></button> */}
              </div>
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Job Application Deadline</span>
              </label>
              {/* JobApplicationDeadline */}
              <input
                type="datetime-local"
                name="JobApplicationDeadline"
                defaultValue={
                  updateForm ? formData?.applicationDeadline?.slice(0, 16) : ""
                }
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex flex-col gap-y-2">
              <label className="label">
                <span className="label-text">Job Salary Range</span>
              </label>
              <div className="flex justify-between gap-x-2 *:text-xs">
                {/* Minimum Salary */}
                <input
                  type="number"
                  name="MinimumSalary"
                  defaultValue={updateForm ? formData?.salaryRange?.min : ""}
                  placeholder="Minimum Salary"
                  className="input input-bordered"
                  required
                />
                {/* Maximum salary */}
                <input
                  type="number"
                  name="MaximumSalary"
                  defaultValue={updateForm ? formData?.salaryRange?.max : ""}
                  placeholder="Maximum Salary"
                  className="input input-bordered"
                  required
                />
                {/* Currency */}
                <select
                  value={`updateForm ? formData?.salaryRange?.currency : "currencyType"`}
                  onChange={(e) => setCurrencyType(e.target.value)}
                  name="Currency"
                  id=""
                  className="px-3 py-2 border border-gray-400 rounded-md"
                  required
                >
                  <option value="BDT">BDT</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="INR">INR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            <div className="form-control mt-6 flex gap-2 items-center justify-center">
              <button className="btn btn-primary">
                {updateForm ? "Update" : "Create"}
              </button>
              <button onClick={()=>navigate(-1)} type="button" className="btn btn-primary bg-blue-500">
              Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewJob;
