import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Fragment } from "react";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
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
              type="text"
              className="inputform mt-[35px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <button
              className="btn mt-[10px]"
              onClick={() => sendPasswordResetEmail(email)}
            >
              Send password reset email
            </button>
            <div className="h5tag mt-[20px] mb-[20px]">
              Don't have an account?&nbsp;
              <Link
                className="active:text-gray font-bold underline"
                to="/register"
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
export default Reset;
