import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import Notebook from "./Notebook";
import ToogleButton from "../../../components/button/ToogleButton";

import { getCurrentDateTime } from "../../../utils/utilities";

import {
  addNotebook,
  toggleloginstatus,
  updateNotebookList,
  fetchNotebookList,
} from "../../../redux/actions";

import { logout, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { database } from "../../../firebase";
import { ref, get, set } from "firebase/database";

function NotebookGuildeline(props) {
  const notebookList = useSelector((state) => state.notebookList);
  const [user, loading] = useAuthState(auth);
  const [Uid, setUid] = useState(window.localStorage.getItem("uid"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddNotebook = useCallback(() => {
    dispatch(
      addNotebook(
        "Default Notebook",
        notebookList.length + 1,
        getCurrentDateTime()
      )
    );
  }, [dispatch, notebookList.length]);

  const notebookListIndex = useMemo(() => {
    return notebookList?.map((notebook, index) => ({
      ...notebook,
      id: index + 1,
    }));
  }, [notebookList]);

  const handleLocalEdit = useCallback(
    (updatedNotebook) => {
      const action = updateNotebookList(updatedNotebook);
      dispatch(action);

      // Update Firebase database
      const notebookListRef = ref(database, Uid);

      get(notebookListRef).then((snapshot) => {
        const notebookExists = snapshot.exists();

        if (notebookExists) {
          set(notebookListRef, notebookListIndex);
        } else {
          set(notebookListRef, notebookListIndex);
        }
      });
    },
    [dispatch, Uid, notebookListIndex]
  );

  const handleToggleLoginStatus = useCallback(() => {
    handleLocalEdit();
    logout();
    dispatch(toggleloginstatus(false));
    window.localStorage.removeItem("uid");
  }, [dispatch, handleLocalEdit, logout]);

  useEffect(() => {
    const notebookListRef = ref(database, Uid);

    if (notebookListRef) {
      get(notebookListRef).then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          dispatch(fetchNotebookList(data));
        }
      });
    }

    if (loading) {
      dispatch(toggleloginstatus(true));
    } else if (!user) {
      navigate("/");
    }
  }, [dispatch, Uid, loading, user, navigate]);

  window.addEventListener("beforeunload", function (event) {
    var confirmationMessage = "確定要離開嗎？";
    // Standard for most browsers
    event.returnValue = confirmationMessage;
    handleLocalEdit();
    // For some older browsers
    return confirmationMessage;
  });

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
            {notebookListIndex
              ? notebookListIndex.map((notebook, index) => {
                  return (
                    <Notebook
                      notebookName={notebook.title}
                      key={notebook.id}
                      index={index}
                      noetebookid={index + 1}
                    />
                  );
                })
              : null}
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
