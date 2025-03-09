import React from "react";

const SingleAppliedJob = ({ index, job }) => {
  const { company_location, company_name, jobType, job_title } = job;
  return (
    <tr className="hover:bg-slate-300">
      <th>{index}</th>
      <td>{job_title}</td>
      <td>{jobType}</td>
      <td>{company_name}</td>
      <td>{company_location}</td>
    </tr>
  );
};

export default SingleAppliedJob;
