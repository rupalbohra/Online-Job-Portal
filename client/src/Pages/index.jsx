import React from "react";
import { useState } from "react";
import "../Styles/index.css";
import JobDetails from "./JobDetails";
import Navbar from "./Navbar";
export default function index() {
  const [showJobsToggle, setShowJobsToggle] = useState(false);
  const showJobs = () => {
    setShowJobsToggle(!showJobsToggle);
  };
  return (
    <div>
      <Navbar/>
      <h1>Jobs Available</h1>
      <button onClick={showJobs}>Show Jobs</button>
      {showJobsToggle && <JobDetails />}
    </div>
  );
}
