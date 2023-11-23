import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import "./App.css";

import Navigation from "./routes/navigation/Navigation.jsx";
import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import SignUp from "./routes/signup/Signup";
import Application from "./routes/application/Application";

import { useSelector } from "react-redux";

function App() {
  const loginstatusState = useSelector((state) => state.loginstatus); //

  return (
    <Router>
      {loginstatusState ? null : <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/application" element={<Application />} />
      </Routes>
    </Router>
  );
}

export default App;
