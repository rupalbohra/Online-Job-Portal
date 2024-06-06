import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import profile_icon from "../assets/profile_icon.png";
export default function UserBasicDetails() {
  const authToken = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const handlegetData = () => {
    axios
      .get("http://localhost:5000/api/userDetails/basicUserData", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        console.log("user:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    handlegetData();
  }, []);

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const addSocialMedia = () => {
    axios
      .post("http://localhost:5000/api/userDetails/addSocialMedia", {
        email,
        selectedPlatform,
        profileLink,
      })
      .then((response) => {
        console.log(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [selectedEdit, setSelectedEdit] = useState("");
  const [profileEdits, setProfileEdits] = useState("");
  const edittingDone = () => {
    axios
      .post("http://localhost:5000/api/userDetails/edit", {
        email,
        profileEdits,
        selectedEdit,
      })
      .then((response) => {
        console.log(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        <div className="flex m-3">
          <Paper className="w-1/5 justify-center flex items-center mr-3">
            <Grid className="m-3">
              <img src={profile_icon}></img>
            </Grid>
          </Paper>
          <Paper className="flex-grow flex-col p-3 text-sm">
            <p className="font-bold text-3xl">Basic Details</p>
            <p className="mt-3">
              <span className="font-semibold">Full Name: </span>
              {user.name}
            </p>
            <p className="mt-3">
              <span className="font-semibold">Email: </span>
              {user.email}
            </p>
            <p className="mt-3">
              <span className="font-semibold">Contact Number: </span>
              {user.contact}
            </p>
            <p className="mt-3">
              <span className="font-semibold">Gender: </span>
              {user.gender}
            </p>

            <div className="flex mt-3">
              <div className="flex items-center">
                <p className=" flex font-semibold">
                  Current/Last College:
                  {user.College !== "" ? (
                    <p className="font-normal ml-2">{user.College}</p>
                  ) : (
                    <Typography variant="caption">
                      "Add Your Current/Last College"
                    </Typography>
                  )}
                </p>
              </div>
              <div className="ml-3 cursor-pointer">
                <ModeEditIcon
                  onClick={() => {
                    setIsEditMode(true);
                    setSelectedEdit("College");
                  }}
                />
              </div>
            </div>
          </Paper>
        </div>

        <Paper elevation={3} className="flex-col h-screen flex m-3 p-5">
          <div>
            <div className="flex">
              <p className="font-bold text-xl items-center">Summary</p>
              <ModeEditIcon
                className="ml-3 cursor-pointer"
                onClick={() => {
                  setIsEditMode(true);
                  setSelectedEdit("Summary");
                }}
              />
            </div>
            <div className="mt-1 text-sm">
              {user.Summary !== "" ? (
                <p>{user.Summary}</p>
              ) : (
                <Typography variant="caption">
                  "Add Your Profile Summary"
                </Typography>
              )}
            </div>
          </div>
          <div>
            <div className="flex mt-10">
              <p className="font-bold text-xl items-center">Address</p>
              <ModeEditIcon
                className="ml-3 cursor-pointer"
                onClick={() => {
                  setIsEditMode(true);
                  setSelectedEdit("Address");
                }}
              />
            </div>
            <div className="mt-1 text-sm">
              {user.Address ? (
                <p>{user.Address}</p>
              ) : (
                <Typography variant="caption">"Add Your Address"</Typography>
              )}
            </div>
          </div>
          <div>
            <div className="flex mt-10">
              <p className="font-bold text-xl items-center">
                Social Media Profiles
              </p>
              <div>
                <ModeEditIcon
                  className="ml-3 cursor-pointer items-center m-0 p-0"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                />
              </div>
            </div>
            {isOpenDropdown && (
              <div>
                <form onSubmit={addSocialMedia} className="flex  mt-5">
                  <div>
                    <select
                      id="platform"
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      className="block bg-white border rounded px-4 py-2 w-full"
                    >
                      <option value="">Select Profile</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="GitHub">GitHub</option>
                      <option value="Twitter">Twitter</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="link"
                      value={profileLink}
                      onChange={(e) => setProfileLink(e.target.value)}
                      placeholder="Enter Profile Link"
                      className="block bg-white border rounded px-4 py-2 w-full ml-3"
                    />
                  </div>
                  <button
                    type="submit"
                    className="ml-10 text-xs bg-green-500 rounded-full"
                    onClick={() => {
                      setEmail(user.email);
                    }}
                  >
                    <CheckCircleIcon />
                  </button>
                </form>
              </div>
            )}
            <div className="mt-1">
              {/* Iterate over the social media profiles and display them */}
              {user.socialMediaProfile && (
                <ul>
                  {Object.entries(user.socialMediaProfile).map(
                    ([platform, profileLink]) => (
                      <li key={platform}>
                        <Paper className="m-3 p-3">
                          <div className="flex">
                            <div className="flex items-center mr-2">
                              {platform === "LinkedIn" && (
                                <LinkedInIcon
                                  color="primary"
                                  fontSize="large"
                                />
                              )}
                              {platform === "GitHub" && (
                                <GitHubIcon fontSize="large" />
                              )}
                              {platform === "Twitter" && (
                                <XIcon fontSize="large" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{platform}:</div>{" "}
                              {profileLink ? (
                                <Link
                                  to={profileLink}
                                  className="text-gray-800 text-sm"
                                >
                                  {profileLink}
                                </Link>
                              ) : (
                                <p className="text-sm">Not provided</p>
                              )}
                            </div>
                          </div>
                        </Paper>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </Paper>
      </div>
      {isEditMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 relative">
            <div
              className="absolute top-1 right-1 cursor-pointer"
              onClick={() => setIsEditMode(false)}
            >
              <CancelIcon />
            </div>
            <div className="mb-5 text-2xl font-semibold">
              <p>Enter Your {selectedEdit}</p>
            </div>
            <textarea
              type="text"
              value={profileEdits}
              className="bg-white p-2"
              rows={5}
              cols={50}
              placeholder={"Start Typing"}
              onChange={(e) => {
                setProfileEdits(e.target.value);
                setEmail(user.email);
              }}
            />

            <div>
              <button
                className="bg-green-700 mt-2"
                onClick={() => {
                  setIsEditMode(false);
                  edittingDone();
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
