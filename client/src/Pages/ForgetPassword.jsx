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
export default function forgetPassword() {
  const paperStyle = {
    width: "30vw",
    height: "30vh",
  };

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/forgetPassword", {
      email
    })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          alert("Check your email for reset password link");
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle} className="p-7 pt-5">
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

          <Grid className="mt-2">
            <Button type="submit" variant="contained" fullWidth>
              Send
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}
