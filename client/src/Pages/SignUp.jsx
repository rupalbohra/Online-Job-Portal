import React from "react";
import { useState } from "react";
import Axios from "axios";
import "../Styles/index.css";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Checkbox,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const paperStyle = {
    width: "30vw",
    height: "93vh",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("Female");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gender:", gender);
    Axios.post("http://localhost:5000/api/signUpRouter", {
      name,
      email,
      password,
      contact,
      gender,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          navigate("/signIn");
        }
      })
      .catch((error) => {
        console.log(error);
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
            <ControlPointIcon />
          </Avatar>
          <h2 className="m-0 font-bold mt-2 text-xl">Sign Up</h2>
          <Typography variant="caption">
            Please fill this form to create an account
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid className="mt-0">
            <TextField
              variant="standard"
              label="Full Name"
              placeholder="Enter your full name"
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </Grid>
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
          </Grid>
          <Grid className="mt-1">
            <TextField
              variant="standard"
              label="Contact"
              placeholder="Enter your contact number"
              fullWidth
              required
              onChange={(e) => setContact(e.target.value)}
            ></TextField>
          </Grid>
          <FormControl>
            <FormLabel className="mt-3" id="demo-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
                onChange={(e) => {
                  setGender(e.target.value); // Update the gender state with the selected value
                }}
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
                onChange={(e) => {
                  setGender(e.target.value); // Update the gender state with the selected value
                }}
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
                onChange={(e) => {
                  setGender(e.target.value); // Update the gender state with the selected value
                }}
              />
            </RadioGroup>
          </FormControl>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="I accept the terms and conditions"
            className="mt-3"
          />
          <Grid className="mt-2">
            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
          </Grid>
        </form>

        <Grid className="mt-1">
          <Typography>
            Don't have an account?
            <Link to="/signIn">Sign In</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}
