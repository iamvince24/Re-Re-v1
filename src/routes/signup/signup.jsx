import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

import { useSelector, useDispatch } from "react-redux";
import { toggleloginstatus } from "../../redux/actions";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const loginstatusState = useSelector((state) => state.loginstatus);
  const dispatch = useDispatch();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      dispatch(toggleloginstatus(true));
      navigate("/application");
    }
  }, [user, loading]);

  return (
    <Fragment>
      <section className="flex justify-center w-screen mt-[50px]">
        <div className="flex justify-start flex-col relative text-center w-[500px] h-auto mt-[7vh] bg-white bg-opacity-50 rounded-xl max-[768px]:w-[375px] max-[450px]:w-auto m-[25px] max-[450px]:h-auto">
          <p className="h3tag font-bold mt-10">Let’s get started!</p>
          <p className="h5tag mt-[10px]">
            Please fill in the following information
          </p>
          <div>
            <input
              type="text"
              className="inputform mt-[35px]"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>

            <input
              type="email"
              className="inputform"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              className="inputform"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button className="btn mt-[10px]" onClick={register}>
              Submit
            </button>
            <p className="h5tag m-[15px]">or</p>
            <button className="btn" onClick={signInWithGoogle}>
              透過 Google 帳戶繼續進行操作
            </button>
            <div className="h5tag mt-[20px] mb-[20px]">
              Already have an account?{" "}
              <Link
                className="active:text-gray font-bold underline"
                to="/login"
              >
                Login
              </Link>{" "}
              now.
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default SignUp;
