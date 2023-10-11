import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Notebook from "../notebooklist/Notebook";

import { addNotebook } from "../../../redux/actions";
import { toggleNoteTimelineAction } from "../../../redux/actions";

import { logout } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { toggleloginstatus } from "../../../redux/actions";

function NotebookGuildeline() {
  const notebookList = useSelector((state) => state.notebookList);
  const toggleNoteTimelineMode = useSelector(
    (state) => state.toggleNoteTimeline
  );
  const dispatch = useDispatch();

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleAddNotebook = () => {
    dispatch(
      addNotebook(
        "Default Notebook",
        notebookList.length + 1,
        getCurrentDateTime()
      )
    );
  };

  function handleToTimelineMode() {
    dispatch(toggleNoteTimelineAction(true));
  }

  function handleToNotebookMode() {
    dispatch(toggleNoteTimelineAction(false));
  }

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  function handleToggleLoginStatus() {
    logout();
    dispatch(toggleloginstatus(false));
  }

  useEffect(() => {
    if (loading) {
      dispatch(toggleloginstatus(true));
      return;
    }
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <Fragment>
      <section className="col-span-2 bg-gray bg-opacity-20 rounded-xl flex flex-col justify-between items-center h-[1000px] w-full p-4 overflow-y-auto flex-1">
        <div className="w-full flex flex-col justify-start items-center">
          <div className="w-full flex justify-between items-center">
            {toggleNoteTimelineMode ? (
              <button
                className="w-full h-[35px] h4tag font-bold  rounded placeholder:text-sm border border-gray  hover:border-colorText active:bg-colorText active:bg-opacity-10"
                onClick={handleToNotebookMode}
              >
                To Notebook Mode
              </button>
            ) : (
              <button
                className="w-full h-[35px] h4tag font-bold  rounded placeholder:text-sm border border-gray  hover:border-colorText active:bg-colorText active:bg-opacity-10"
                onClick={handleToTimelineMode}
              >
                To Timeline Mode
              </button>
            )}
          </div>

          <div className="flex justify-between items-center w-full mt-[40px] px-1">
            <p className="h4tag font-medium">Notebook</p>
            <button
              className="h4tag mb-[5px] hover:font-bold"
              id="addnotebookButton"
              onClick={handleAddNotebook}
            >
              +
            </button>
          </div>
          <div
            className="flex flex-col justify-start items-center w-full mt-[20px] px-1"
            id="notebookList"
          >
            {notebookList.map((notebook, index) => {
              return (
                <Notebook
                  notebookName={notebook.title}
                  notebookListArray={notebookList}
                  key={notebook.id}
                  id={index}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-full mt-8">
          <button
            className="h5tag font-medium tracking-wide h-[35px] w-full rounded placeholder:text-sm border border-gray hover:border-colorText active:bg-colorText active:bg-opacity-10"
            onClick={handleToggleLoginStatus}
          >
            Log out
          </button>
        </div>
      </section>
    </Fragment>
  );
}

export default NotebookGuildeline;
