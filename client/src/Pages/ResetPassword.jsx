// import React from 'react'
import React, { useState } from "react";
import Axios from "axios";
import "../Styles/index.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
export default function ResetPassword() {
  const paperStyle = {
    width: "30vw",
    height: "45vh",
  };
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/resetPassword/" + token, {
      password,
    })
      .then((response) => {
        console.log("Response: ", response.data);
        if (response.data.status) {
          navigate("/signIn");
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle} className="p-7 pt-5">
        <Grid align="center">
          <Avatar
            style={{
              backgroundColor: "#1bbd7e",
              height: "50px",
              width: "50px",
            }}
          >
            <LockIcon />
          </Avatar>
          <h2 className="m-0 font-bold mt-2 text-xl">Reset Password</h2>
          <Typography variant="caption">Enter new password</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid className="mt-3">
            <TextField
              variant="standard"
              label=" New Password"
              placeholder="Create a password"
              fullWidth
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Grid>
          <Grid className="mt-5">
            <Button type="submit" variant="contained" fullWidth>
              Reset
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}
