import React, { Fragment, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Notebook from "../notebooklist/Notebook";
import ToogleButton from "../../../component/button/ToogleButton";

import { getCurrentDateTime } from "../../../utils/getCurrentDateTime";

import { addNotebook, toggleloginstatus } from "../../../redux/actions";

import { logout, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function NotebookGuildeline(props) {
  const notebookList = useSelector((state) => state.notebookList);

  const dispatch = useDispatch();

  const notebooklist = useMemo(() => {
    return notebookList.map((notebook, index) => {
      notebook.id = index + 1;
      return notebook;
    });
  }, [notebookList]);

  const handleAddNotebook = () => {
    dispatch(
      addNotebook(
        "Default Notebook",
        notebookList.length + 1,
        getCurrentDateTime()
      )
    );
  };

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleToggleLoginStatus = () => {
    logout();
    dispatch(toggleloginstatus(false));
  };

  useEffect(() => {
    if (loading) {
      dispatch(toggleloginstatus(true));
    } else if (!user) {
      navigate("/");
    }
  }, [loading, user]);

  return (
    <Fragment>
      <section className="h-[1000px] w-full flex flex-col flex-1 justify-between items-center p-4 mb-2 md:col-span-3 lg:col-span-2 bg-bgGray bg-opacity-20 rounded-xl border-gray border-[1px] md:border-0 overflow-y-auto">
        <div className="w-full flex flex-col justify-start items-center">
          <div className="w-full flex justify-between items-center">
            {props.toggle ? (
              <ToogleButton
                onClick={() => props.setToggle(false)}
                label="To Notebook Mode"
              />
            ) : (
              <ToogleButton
                onClick={() => props.setToggle(true)}
                label="To Timeline Mode"
              />
            )}
          </div>

          <div className="flex justify-between items-center w-full my-[20px] px-1 md:my-[30px] lg:my-[40px]">
            <p className="h3tag md:h4tag font-medium">Adding Notebook</p>
            <button
              className="h2tag md:h4tag  hover:font-bold"
              id="addnotebookButton"
              onClick={handleAddNotebook}
            >
              +
            </button>
          </div>
          <div
            className="flex flex-col justify-start items-center w-full px-1"
            id="notebookList"
          >
            {notebooklist.map((notebook, index) => {
              return (
                <Notebook
                  notebookName={notebook.title}
                  key={notebook.id}
                  index={index}
                  noetebookid={index + 1}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-full mt-8">
          <ToogleButton
            className=""
            onClick={handleToggleLoginStatus}
            label="Log out"
          />
        </div>
      </section>
    </Fragment>
  );
}

export default NotebookGuildeline;
