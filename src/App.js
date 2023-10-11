import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Login from "./routes/login/login.component";
import SignUp from "./routes/signup/signup.component";
import Reset from "./routes/reset/reset.component";

import Application from "./routes/application/application";

import { useSelector } from "react-redux";

function App() {
  const loginstatusState = useSelector((state) => state.loginstatus);
  console.log(loginstatusState);

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
