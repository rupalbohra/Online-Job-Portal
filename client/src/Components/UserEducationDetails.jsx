import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SchoolIcon from "@mui/icons-material/School";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import edu_icon from "../assets/education_icon.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import CancelIcon from "@mui/icons-material/Cancel";
export default function UserEducationDetails() {
  const [email, setEmail] = useState("");
  const [SchoolName, setSchoolName] = useState("");
  const [EduLevel, setEduLevel] = useState("");
  const [ProgramName, setProgramName] = useState("");
  const [CurrentStatus, setCurrentStatus] = useState("");
  const [StartingDate, setStartingDate] = useState(new Date());
  const [EndingDate, setEndingDate] = useState(new Date());
  const [Grade, setGrade] = useState("");
  const authToken = localStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState("");
  const [userEduDetails, setUserEduDetails] = useState([]);
  const [editEduDetails, setEditEduDetails] = useState(false);

  const [addDetails, setAddDetails] = useState(false);
  const getEmail = () => {
    axios
      .get("http://localhost:5000/api/userDetails/getEmail", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEmail();
    if (email) {
      showEduDetails();
    }
    // showEduDetails();
  }, [email]);

  const addEducationDetails = () => {
    if (
      !SchoolName ||
      !EduLevel ||
      !ProgramName ||
      !CurrentStatus ||
      !StartingDate ||
      !EndingDate ||
      !Grade
    ) {
      setErrorMessage("All Fields Are Required!");
    }
    axios
      .post("http://localhost:5000/api/userDetails/eduDetailsPost", {
        email,
        SchoolName,
        EduLevel,
        ProgramName,
        CurrentStatus,
        StartingDate,
        EndingDate,
        Grade,
      })
      .then((response) => {
        if (response.status) {
          setAddDetails(false);
          console.log(response.data);
          setSchoolName("");
          setEduLevel("");
          setProgramName("");
          setCurrentStatus("");
          setStartingDate(new Date());
          setEndingDate(new Date());
          setGrade("");
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showEduDetails = () => {
    axios
      .get("http://localhost:5000/api/userDetails/getEduDetails", {
        params: {
          email: email,
        },
      })
      .then((response) => {
        setUserEduDetails(response.data.userEduDetails);
        console.log(response.data.userEduDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editEduDetailsFux = () => {
    axios
      .post("http://localhost:5000/api/userDetails/editEduDetails", {
        email,
        SchoolName,
        EduLevel,
        ProgramName,
        CurrentStatus,
        StartingDate,
        EndingDate,
        Grade,
      })
      .then((response) => {
        console.log(response.data);
        setSchoolName("");
        setEduLevel("");
        setProgramName("");
        setCurrentStatus("");
        setStartingDate(new Date());
        setEndingDate(new Date());
        setGrade("");
        setErrorMessage("");
        setEditEduDetails(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeEduDetails = () => {
    axios
      .delete("http://localhost:5000/api/userDetails/deleteEduDetails", {
        data: { email, SchoolName, ProgramName },
      })
      .then((response) => {
        alert("Record deleted successfully");
        console.log(response.data);
        setEditEduDetails(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row">
        <Grid className="flex">
          <Paper elevation={4} className="p-5 flex-1 sm:w-4/5">
            <div className="flex items-center justify-center">
              <img src={edu_icon} style={{ height: "25vh" }}></img>
            </div>
            <div className="mt-3">
              <div className="flex">
                <p className="text-2xl font-semibold">Your Education Details</p>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setAddDetails(true)}
                >
                  <AddCircleIcon className="ml-2" color={"success"} />
                </div>
              </div>
              <div>
                {userEduDetails.length !== 0 ? (
                  <p className="text-center">"Click On The Icon To Add More"</p>
                ) : (
                  <p className="text-center">"No Education Details Added"</p>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
        {userEduDetails.length !== 0 && (
          <div className="flex-1 mt-10 sm:mt-0 ml-5 ">
            <Grid>
              <Paper className="p-5" elevation={3}>
                {userEduDetails.map((item, index) => (
                  <Paper className="m-4 p-3">
                    <div key={index}>
                      <p className="m-2 font-semibold text-xl">
                        <SchoolIcon className="mr-2" />
                        {item.SchoolName}{" "}
                        <span className="text-gray-500 text-base">
                          ({new Date(item.StartingDate).getFullYear()} to{" "}
                          {new Date(item.EndingDate).getFullYear()})
                        </span>
                        <ModeEditIcon
                          className="ml-2 cursor-pointer"
                          onClick={() => {
                            setEditEduDetails(true);
                            setSchoolName(item.SchoolName);
                            setEduLevel(item.EduLevel);
                            setProgramName(item.ProgramName);
                            setCurrentStatus(item.CurrentStatus);
                            setStartingDate(item.StartingDate);
                            setEndingDate(item.EndingDate);
                            setGrade(item.Grade);
                          }}
                        />
                      </p>
                      <hr />

                      <div className="flex">
                        <div className="text-gray-400 text-sm">
                          <p className="m-2">Level of Education:</p>
                          <p className="m-2">Program Name</p>
                          <p className="m-2">Current Status:</p>
                          <p className="m-2">Overall Grade:</p>
                        </div>
                        <div className="text-sm ml-5">
                          <p className="m-2">{item.EduLevel}</p>
                          <p className="m-2">{item.ProgramName}</p>
                          <p className="m-2">{item.CurrentStatus}</p>
                          <p className="m-2">{item.Grade}</p>
                        </div>
                      </div>
                    </div>
                  </Paper>
                ))}
              </Paper>
            </Grid>
          </div>
        )}
      </div>

      {addDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 relative">
            <div
              className="absolute top-1 right-1 cursor-pointer"
              onClick={() => {
                setAddDetails(false);
                setSchoolName("");
                setEduLevel("");
                setProgramName("");
                setCurrentStatus("");
                setStartingDate(new Date());
                setEndingDate(new Date());
                setGrade("");
              }}
            >
              <CancelIcon className="text-red-500" />
            </div>
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <SchoolIcon fontSize="large" />
              </div>
              <div className="flex items-center justify-center">
                <div className="flex-col text-center">
                  <p className="text-xl font-semibold">
                    Enter Educational Details
                  </p>
                  <div>
                    {errorMessage && (
                      <div className="text-red-500">{errorMessage}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="m-2 mt-10">
              <input
                type="text"
                className="bg-white p-2 border border-gray-500 rounded w-full"
                placeholder="Enter Institute Name"
                value={SchoolName}
                onChange={(e) => {
                  setSchoolName(e.target.value);
                }}
              />
            </div>
            <div className="my-2 flex">
              <input
                type="text"
                className="bg-white p-2 border border-gray-500 rounded m-2"
                placeholder="Enter Level of Education"
                value={EduLevel}
                onChange={(e) => setEduLevel(e.target.value)}
              />
              <input
                type="text"
                className="bg-white p-2 border border-gray-500 rounded m-2"
                placeholder="Enter Program Name"
                value={ProgramName}
                onChange={(e) => setProgramName(e.target.value)}
              />
              <select
                className="bg-white border border-gray-500 rounded px-4 py-2.5 m-2 flex-1"
                value={CurrentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
              >
                <option value="">Current Status</option>
                <option value="Persuing">Persuing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex m-2">
              <div className="flex items-center">
                <p className="text-gray-400 mr-2">Starting Date</p>
                <DatePicker
                  showIcon
                  selected={StartingDate}
                  onChange={(date) => setStartingDate(date)}
                  label="Starting Date"
                  className="bg-white border border-gray-500 rounded"
                />
              </div>
              <div className="flex items-center">
                <p className="text-gray-400 mx-2">Ending Date</p>
                <DatePicker
                  showIcon
                  selected={EndingDate}
                  onChange={(date) => setEndingDate(date)}
                  label="Starting Date"
                  className="bg-white border border-gray-500 rounded"
                />
              </div>
            </div>
            <div className="flex m-2">
              <input
                type="text"
                className="bg-white p-2 border border-gray-500 rounded"
                placeholder="Enter Your Overall Grade"
                value={Grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
            <div className="mx-2 my-4">
              <button className="bg-green-700" onClick={addEducationDetails}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      {editEduDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 relative">
            <div
              className="absolute top-1 right-1 cursor-pointer"
              onClick={() => {
                setSchoolName("");
                setEduLevel("");
                setProgramName("");
                setCurrentStatus("");
                setStartingDate(new Date());
                setEndingDate(new Date());
                setGrade("");
                setEditEduDetails(false);
              }}
            >
              <CancelIcon className="text-red-500" />
            </div>
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <SchoolIcon fontSize="large" />
              </div>
              <div className="flex items-center justify-center">
                <div className="flex-col text-center">
                  <p className="text-xl font-semibold">
                    Edit Educational Details
                  </p>
                  <div>
                    {errorMessage && (
                      <div className="text-red-500">{errorMessage}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="m-2 mt-10">
              <input
                type="text"
                className="bg-white p-2 border border-gray-500 rounded w-full"
                placeholder="Edit Institute Name"
                value={SchoolName}
                onChange={(e) => {
                  setSchoolName(e.target.value);
                }}
              />
            </div>
            <div className="my-2 flex">
              <input
                type="text"
                className="bg-white p-2 border border-gray-500 rounded m-2"
                placeholder="Edit Level of Education"
                value={EduLevel}
                onChange={(e) => setEduLevel(e.target.value)}
              />
              <input
                type="text"
                className="bg-white p-2 border border-gray-500 rounded m-2"
                placeholder="Edit Program Name"
                value={ProgramName}
                onChange={(e) => setProgramName(e.target.value)}
              />
              <select
                className="bg-white border border-gray-500 rounded px-4 py-2.5 m-2 flex-1"
                value={CurrentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
              >
                <option value="">Edit Current Status</option>
                <option value="Persuing">Persuing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex m-2">
              <div className="flex items-center">
                <p className="text-gray-400 mr-2">Starting Date</p>
                <DatePicker
                  showIcon
                  selected={StartingDate}
                  onChange={(date) => setStartingDate(date)}
                  label="Starting Date"
                  className="bg-white border border-gray-500 rounded"
                />
              </div>
              <div className="flex items-center">
                <p className="text-gray-400 mx-2">Ending Date</p>
                <DatePicker
                  showIcon
                  selected={EndingDate}
                  onChange={(date) => setEndingDate(date)}
                  label="Starting Date"
                  className="bg-white border border-gray-500 rounded"
                />
              </div>
            </div>
            <div className="flex m-2">
              <input
                type="text"
                className="bg-white p-2 border border-gray-500 rounded"
                placeholder="Edit Your Overall Grade"
                value={Grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
            <div className="mx-2 my-4">
              <button className="bg-green-700" onClick={editEduDetailsFux}>
                Done
              </button>
              <button className="bg-red-700 ml-5" onClick={removeEduDetails}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
