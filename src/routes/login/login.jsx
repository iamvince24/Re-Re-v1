import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toggleloginstatus, fetchNotebookList } from "../../redux/actions";

import { auth, signInWithGoogle, database } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import notebookDataExample from "../../utils/notebookDataExample";

function Login() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user) {
      const UId = user.uid;
      const notebookListRef = ref(database, `${UId}`);

      get(notebookListRef).then((snapshot) => {
        const data = snapshot.val();

        if (data) {
          dispatch(fetchNotebookList(data));
        } else {
          dispatch(fetchNotebookList(notebookDataExample));
        }
      });

      window.localStorage.setItem("uid", user.uid);
      dispatch(toggleloginstatus(true));
      navigate("/application");
    }
  }, [user, loading]);

  // 錯誤處理
  const handleLogin = async () => {
    try {
      if (!email) {
        throw new Error("Please enter email");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least six characters");
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed", error.message);
      alert("The account or password is wrong, please fill it in again.");
    }
  };

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
            <button className="btn mt-[10px]" onClick={handleLogin}>
              Login
            </button>
            <p className="h5tag m-[15px]">or</p>
            <button className="btn" onClick={signInWithGoogle}>
              Continue with Google
            </button>
            <div className="mt-[20px] hidden">
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
