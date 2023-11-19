import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Navigation from "./routes/navigation/navigation";
import Home from "./routes/home/home";
import Login from "./routes/login/login";
import SignUp from "./routes/signup/signup";
import Reset from "./routes/reset/reset";

import Application from "./routes/application/application";

import { useSelector } from "react-redux";

function App() {
  const loginstatusState = useSelector((state) => state.loginstatus);
  // console.log(loginstatusState);

  return (
    <Router>
      {loginstatusState ? null : <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/application" element={<Application />} />
      </Routes>
    </Router>
  );
}

export default App;
