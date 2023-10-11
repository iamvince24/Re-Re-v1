import React, { Fragment, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toggleloginstatus } from "../../redux/actions";
import { auth, signInWithGoogle } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector, useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const loginstatusState = useSelector((state) => state.loginstatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

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
            Please confirm your email to continue
          </p>
          <div id="formSS">
            <input
              type="email"
              className="inputform mt-[35px]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="emailSS"
              autoComplete="email"
            ></input>
            <input
              type="password"
              className="inputform"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="passwordSS"
            ></input>
            <button
              className="btn mt-[10px]"
              onClick={() => signInWithEmailAndPassword(auth, email, password)}
            >
              Login
            </button>
            <p className="h5tag m-[15px]">or</p>
            <button className="btn" onClick={signInWithGoogle}>
              透過 Google 帳戶繼續進行操作
            </button>
            <div className="mt-[20px]">
              <Link className="h5tag underline font-bold" to="/reset">
                Forgot Password
              </Link>
            </div>
            <div className="h5tag mt-[10px] mb-[20px]">
              Don't have an account?&nbsp;
              <Link
                to="/register"
                className="active:text-gray font-bold underline"
              >
                Register
              </Link>
              &nbsp;now.
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Login;
