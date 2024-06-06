import React from "react";
import { useState, useEffect } from "react";
import "../Styles/index.css";
export default function JobDetails() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getJobsData");
        const jobsData = await response.json();
        setJobs(jobsData);
        console.log(jobsData);
      } catch (error) {
        console.log("Error occurred! Cannot fetch jobs data");
      }
    };

    fetchJobs(); // Call the fetchJobs function when the component mounts
  }, []);

  const [knowMore, setKnowMore] = useState(false);
  const toggleKnowMore = () => {
    setKnowMore(!knowMore);
  };
  return (
    <div>
      <div>
        {jobs.map((job, index) => (
          <div
            key={index}
            className="mb-2 mt-2 text-gray-900 rounded-md bg-white shadow-md p-3 font-mdeium"
          >
            <span className="font-bold text-lg">{job.CompName} </span>-{" "}
            <span>{job.JobTitle}</span>
            <div>
              Role - <span className="font-normal text-sm">{job.JobType}</span>
            </div>
            <div className="pb-4">
              Job Requirements -{" "}
              <span className="font-normal">{job.Requirements}</span>
            </div>
            <hr></hr>
            <div className="flex mt-4">
              <div className="font-normal text-base flex-grow">
                Salary - <span className="font-medium">₹{job.Salary}</span>
              </div>
              <div className="w-32">
                <button
                  className="w-32 h-10 bg-gray-400 p-0"
                  onClick={toggleKnowMore}
                >
                  Know More
                </button>
              </div>
              {knowMore && (
                <div className="backgroundJobDesc">
                  <div className="jobDesc relative">
                    <span
                      className="absolute top-0 right-0 text-red-500 p-5 cursor-pointer font-bold text-lg"
                      onClick={toggleKnowMore}
                    >
                      X
                    </span>
                    <div className="mt-6 p-5">
                      <div className="text-3xl font-bold pb-5">
                        {job.CompName}
                      </div>
                      <hr />
                      <div className="text-xl font-semibold pt-5">
                        Role - {job.JobTitle}
                      </div>
                      <div className="mt-3">
                        <span className="font-medium">Job Type - </span>
                        {job.JobType}
                      </div>
                      <div className="mt-2">
                        <span className="font-medium">Salary Offered - ₹</span>
                        {job.Salary}
                      </div>
                      <div className="mt-7 text-lg font-medium">
                        Job Description
                      </div>
                      <div className="mt-2">{job.JobDesc}</div>
                      <div className="mt-5 text-lg font-medium">
                        Job Requirements
                      </div>
                      <div className="mt-2">{job.Requirements}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
