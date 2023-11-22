import React, { Fragment, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toggleloginstatus, fetchNotebookList } from "../../redux/actions";

import { auth, signInWithGoogle } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

import { ref, get } from "firebase/database";
import { database } from "../../firebase";

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
          dispatch(
            fetchNotebookList([
              {
                id: 1,
                title: "Data Structure",
                start: "2023-09-21",
                end: "2023-10-25",
                subNotebook: [
                  {
                    subId: 1,
                    subtitle: "Ch5 Tree",
                    subStart: "2023-09-10",
                    subEnd: "2023-10-29",
                    content: `A tree is a non-linear abstract data type with a hierarchy-based structure. It consists of nodes (where the data is stored) that are connected via links. The tree data structure stems from a single node called a root node and has subtrees connected to the root.`,
                  },
                  {
                    subId: 2,
                    subtitle: "Ch6 Graph",
                    subStart: "2023-09-01",
                    subEnd: "2023-09-22",
                    content:
                      "A graph is an abstract data type (ADT) that consists of a set of objects that are connected to each other via links. These objects are called vertices and the links are called edges.",
                  },
                ],
              },
              {
                id: 2,
                title: "Algorithms",
                start: "2023-07-05",
                end: "2023-09-20",
                subNotebook: [
                  {
                    subId: 1,
                    subtitle: "Dynamic Programming",
                    subStart: "2023-07-21",
                    subEnd: "2023-09-30",
                    content: `Dynamic programming approach is similar to divide and conquer in breaking down the problem into smaller and yet smaller possible sub-problems. But unlike, divide and conquer, these sub-problems are not solved independently. Rather, results of these smaller sub-problems are remembered and used for similar or overlapping sub-problems.`,
                  },
                ],
              },
            ])
          );
        }
      });

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
