import React from "react";
import Navbar from "../Pages/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import UserBasicDetails from "../Components/UserBasicDetails";
import UserEducationDetails from "../Components/UserEducationDetails";
import UserWorkDetails from "../Components/UserWorkDetails";
import UserResumeDetails from "../Components/UserResumeDetails";
import ScatterPlot from "@mui/icons-material/ScatterPlot";

export default function () {
  const [basicDetails, setBasicDetails] = useState(true);
  const [educationalDetails, setEducationalDetails] = useState(false);
  const [workExperience, setWorkExperience] = useState(false);
  const [resumeAndSkills, setResumeAndSkills] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [clickedBasic, setClickedBasic] = useState(true);
  const [clickedEdu, setClickedEdu] = useState(false);
  const [clickedWork, setClickedWork] = useState(false);
  const [clickedResume, setClickedResume] = useState(false);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex relative mt-16">
        <div className="flex-1 h-screen m-5 ">
          {basicDetails && <UserBasicDetails />}
          {educationalDetails && <UserEducationDetails />}
          {workExperience && <UserWorkDetails />}
          {resumeAndSkills && <UserResumeDetails />}
        </div>

        <div className="w-1/6 bg-gray-100 h-screen hidden lg:block">
          <div>
            <div className="flex flex-col m-2 mt-10">
              <button
                className="text-left m-3 p-2 text-gray-700  bg-gray-100 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium focus:outline-none"
                onClick={() => {
                  setBasicDetails(true);
                  setEducationalDetails(false);
                  setResumeAndSkills(false);
                  setWorkExperience(false);
                  setClickedBasic(true);
                  setClickedEdu(false);
                  setClickedResume(false);
                  setClickedWork(false);
                }}
              >
                Basic Details
                {clickedBasic && <ScatterPlot className="ml-1" />}
              </button>
              <button
                className="text-left m-3 p-2 text-gray-700 bg-gray-100 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium focus:outline-none"
                onClick={() => {
                  setBasicDetails(false);
                  setEducationalDetails(true);
                  setResumeAndSkills(false);
                  setWorkExperience(false);
                  setClickedBasic(false);
                  setClickedEdu(true);
                  setClickedResume(false);
                  setClickedWork(false);
                }}
              >
                Educational Details
                {clickedEdu && <ScatterPlot />}
              </button>
              <button
                className="text-left m-3 p-2 text-gray-700  bg-gray-100 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium focus:outline-none"
                onClick={() => {
                  setBasicDetails(false);
                  setEducationalDetails(false);
                  setResumeAndSkills(false);
                  setWorkExperience(true);
                  setClickedBasic(false);
                  setClickedEdu(false);
                  setClickedWork(true);
                  setClickedResume(false);
                }}
              >
                Work Experience
                {clickedWork && <ScatterPlot className="ml-1" />}
              </button>
              <button
                className="text-left m-3 p-2 text-gray-700 bg-gray-100 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium focus:outline-none"
                onClick={() => {
                  setBasicDetails(false);
                  setEducationalDetails(false);
                  setResumeAndSkills(true);
                  setWorkExperience(false);
                  setClickedBasic(false);
                  setClickedEdu(false);
                  setClickedResume(true);
                  setClickedWork(false);
                }}
              >
                Resume and Skills
                {clickedResume && <ScatterPlot className="ml-1" />}
              </button>
            </div>
          </div>
        </div>
        <div className="visible lg:invisible md-invisible">
          <div className="mr-3 absolute top-0 right-0">
            <div
              className="container flex justify-end cursor-pointer"
              onClick={() => setSideMenuVisible(!sideMenuVisible)}
            >
              <MenuIcon />
            </div>
          </div>
        </div>
        <div className="visible lg:invisible md-invisible">
          {sideMenuVisible && (
            <div>
              <div>
                <div className="flex flex-col m-2 mt-10">
                  <Link
                    className=" text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
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
          )}
        </div>
      </div>
    </div>
  );
}
