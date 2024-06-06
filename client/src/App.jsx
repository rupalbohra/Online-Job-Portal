import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Pages/index";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import UserProfile from "./Pages/UserProfile";
export default function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
            <Route
              path="/resetPassword/:token"
              element={<ResetPassword />}
            ></Route>
            <Route path="/userProfile" element={<UserProfile />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
