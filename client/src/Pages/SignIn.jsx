// import React from 'react'
import React, { useState } from "react";
import Axios from "axios";
import "../Styles/index.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
export default function SignIn() {
  const paperStyle = {
    width: "30vw",
    height: "70vh",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/signInRouter", {
      email,
      password,
    })
      .then((response) => {
        console.log("Response: ", response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
        if (response.data.status) {
          navigate("/");
        }
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
          <h2 className="m-0 font-bold mt-2 text-xl">Sign Up</h2>
          <Typography variant="caption">
            Please fill your details to Login
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid className="mt-1">
            <TextField
              variant="standard"
              label="Email"
              placeholder="Enter your email"
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </Grid>
          <Grid className="mt-1">
            <TextField
              variant="standard"
              label="Password"
              placeholder="Create a password"
              fullWidth
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <Link to="/forgetPassword">
              <Typography variant="caption" color="primary.main">
                Forgot Password?
              </Typography>
            </Link>
          </Grid>
          <FormControlLabel
            control={<Checkbox />}
            label="Remember Me"
            className="mt-7"
          />
          <Grid className="mt-1">
            <Button type="submit" variant="contained" fullWidth>
              Sign In
            </Button>
          </Grid>
        </form>

        <Grid className="mt-1">
          <Typography>
            Don't have account?
            <Link to="/signUp">Sign Up</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}
