const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config()
const mongo = require("./mongo");
mongo();

// Insert Data once
// const jobsData = require("./jobs.json");
// const jobs = require("./Models/jobs");
// jobs.insertMany(jobsData);

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(cookieParser());

// Routes
const jobsRouter = require("./Routes/jobsRouter");
const signUpRouter = require("./Routes/signUpRouter");
const signInRouter = require("./Routes/signInRouter");
const forgotPassword = require("./Routes/forgotPassword");
const resetPassword = require("./Routes/resetPassword");
const userDetails = require("./Routes/UserDetails");
app.use("/api", jobsRouter);
app.use("/api", signUpRouter);
app.use("/api", signInRouter);
app.use("/api", forgotPassword);
app.use("/api", resetPassword);
app.use("/api/userDetails", userDetails);
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
