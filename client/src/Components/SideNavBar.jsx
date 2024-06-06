import { React, useState } from "react";
import { Link } from "react-router-dom";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
export default function SideNavBar() {
  const [clicked, setClicked] = useState(false);
  

  return (
    <div>
      <div>
        <div className="flex flex-col m-2 mt-10">
          <Link
            className= {` ${clicked && bg-gray-700} text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
            onClick={() => {
              setClicked(!clicked);
              setBasicDetails(true);
              setEducationalDetails(false);
              setResumeAndSkills(false);
              setWorkExperience(false);
            }}
          >
            Basic Details
          </Link>
          <Link
            className="text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            onClick={() => {
              setBasicDetails(false);
              setEducationalDetails(true);
              setResumeAndSkills(false);
              setWorkExperience(false);
            }}
          >
            Educational Details
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            onClick={() => {
              setBasicDetails(false);
              setEducationalDetails(false);
              setResumeAndSkills(false);
              setWorkExperience(true);
            }}
          >
            Work Experience
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            onClick={() => {
              setBasicDetails(false);
              setEducationalDetails(false);
              setResumeAndSkills(true);
              setWorkExperience(false);
            }}
          >
            Resume and Skills
          </Link>
        </div>
      </div>
    </div>
  );
}
