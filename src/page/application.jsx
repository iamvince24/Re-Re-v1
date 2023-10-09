import React from "react";
import { Fragment } from "react";

import Guild from "./guild.component";
import NotebookEditer from "../notebookEditing/notebookEditing.component";
import TimelineDisplay from "../timeline/timeline.gird";
import GanttChart from "../timeline/GanttChart";

// import { Provider } from "react-redux";
// import store from "./store";
// import { useSelector } from "react-redux";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// import { auth, db, logout } from "../firebase";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Application() {
  const toggleNoteTimeline = useSelector((state) => state.toggleNoteTimeline);
  const [toggle, setToggle] = useState(toggleNoteTimeline);
  useEffect(() => {
    setToggle(toggleNoteTimeline);
  }, [toggleNoteTimeline]);

  // const [user, loading, error] = useAuthState(auth);
  // const [name, setName] = useState("");
  // const navigate = useNavigate();
  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [user, loading]);

  return (
    <Fragment>
      <section className="grid grid-cols-10 gap-4 m-5 h-full">
        <Guild />

        {toggle ? <GanttChart /> : <NotebookEditer />}
      </section>
    </Fragment>
  );
}

export default Application;
