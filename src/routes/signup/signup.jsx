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

import { ref, get } from "firebase/database";
import { database } from "../../firebase";

import { fetchNotebookList } from "../../redux/actions";

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
      const UId = user.uid;
      const notebookListRef = ref(database, `${UId}`); // 使用 ref 方法

      get(notebookListRef).then((snapshot) => {
        const data = snapshot.val();

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
      });

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
