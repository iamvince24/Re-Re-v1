import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
// import { Provider } from "react-redux";
// import store from "./page/store";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Login from "./routes/login/login.component";
import SignUp from "./routes/signup/signup.component";
import Reset from "./routes/reset/reset.component";

import Application from "./page/application";

import { useSelector } from "react-redux";

function App() {
  // const aa = true;
  // const { token, setToken } = useToken();
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  const loginstatusState = useSelector((state) => state.loginstatus);
  console.log(loginstatusState);

  // useEffect(() => {
  //   // console.log("notebookList");
  //   setLoginStatus(!loginstatusState);
  // }, [loginstatusState]);

  // return (
  //   <Router>
  //     <Provider store={store}>
  //       {user ? null : <Navigation />}
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/register" element={<SignUp />} />
  //         <Route path="/application" element={<Application />} />
  //       </Routes>
  //     </Provider>
  //   </Router>
  // );

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

// function App() {
//   return (
//     <Router>
//       <Fragment>
//         <Provider store={store}>
//           <Application />
//         </Provider>
//       </Fragment>
//     </Router>
//   );
// }

export default App;
