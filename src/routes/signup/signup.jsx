import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toggleloginstatus, fetchNotebookList } from "../../redux/actions";
import { useDispatch } from "react-redux";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import notebookDataExample from "../../utils/notebookDataExample";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async () => {
    try {
      if (!name) {
        throw new Error("Please enter name");
      }

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

      await registerWithEmailAndPassword(name, email, password);
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchNotebookList(notebookDataExample));
    if (loading) return;
    if (user) {
      window.localStorage.setItem("uid", user.uid);
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
              Continue with Google
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
