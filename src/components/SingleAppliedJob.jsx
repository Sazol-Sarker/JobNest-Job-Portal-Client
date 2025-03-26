const SingleAppliedJob = ({ index, job, setDeleteJobTriggered }) => {
  const { _id, company_location, company_name, jobType, job_title } = job;
  // console.log("JOB=>", job);

  const handleDeleteAppliedJob = (id) => {
    // DELETE API->appliedJobs
    fetch(`http://localhost:5000/appliedJob/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount === 1) setDeleteJobTriggered(true);
      });
  };
  return (
    <tr className="hover:bg-teal-300 group">
      <th>{index}</th>
      <td>{job_title}</td>
      <td>{jobType}</td>
      <td>{company_name}</td>
      <td>{company_location}</td>

      <td>
        {/* DELETE API trigger */}
        <button
          onClick={() => handleDeleteAppliedJob(_id)}
          className="group-hover:bg-teal-500 group-hover:hover:bg-pink-500 py-3 px-5 rounded-md"
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default SingleAppliedJob;
