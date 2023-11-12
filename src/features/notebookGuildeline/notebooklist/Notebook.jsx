import React, { Fragment, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import NotebookSubtitle from "./NotebookSubtitle";

import { useSelector, useDispatch } from "react-redux";
import { deleteNotebook } from "../../../redux/actions";
import { setNotebooktitle } from "../../../redux/actions";
import { addSubNotebook } from "../../../redux/actions";
import { displayNumber } from "../../../redux/actions";
import { setNotebookEndTime } from "../../../redux/actions";

function Notebook({ notebookName, notebookListArray, id }) {
  const notebookList = useSelector((state) => state.notebookList);
  const displayNumberList = useSelector((state) => state.notebookDisplaying);
  const dispatch = useDispatch();

  const [openToggle, setOpenToggle] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(notebookName);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  notebookList.map((notebook, index) => {
    notebook.id = index + 1;
    return notebook;
  });

  function changeToggle() {
    setOpenToggle(!openToggle);
  }

  function handleDoubleClick() {
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
    setEditedName(editedName);
  }

  function handleditedName(e) {
    setEditedName(e.target.value);
    dispatch(setNotebooktitle(id + 1, e.target.value));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave();
    }
  }

  const handleDeleteNotebook = (index) => {
    dispatch(deleteNotebook(index));
    let a = displayNumberList.notebookId - 1;
    let b = displayNumberList.subNotebookId - 1;

    if (a < 1) {
      a = 1;
    }
    if (b < 1) {
      b = 1;
    }

    dispatch(displayNumber(a, b));
  };

  const handleAddSubNotebook = () => {
    dispatch(
      addSubNotebook(
        id + 1,
        notebookName,
        notebookList[id].subNotebook.length + 1,
        getCurrentDateTime()
      )
    );

    let notebookTimeArray = [];

    notebookList[id].subNotebook.map((subnotebook) => {
      notebookTimeArray.push(subnotebook.subEnd);
      return subnotebook;
    });

    var maxDateString = notebookTimeArray.reduce(function (max, dateString) {
      return dateString > max ? dateString : max;
    }, "");

    dispatch(setNotebookEndTime(id + 1, maxDateString));
  };

  useEffect(() => {
    let notebookTimeArray = [];
    notebookList[id].subNotebook.map((subnotebook) => {
      notebookTimeArray.push(subnotebook.subEnd);
      return subnotebook;
    });
    var maxDateString = notebookTimeArray.reduce(function (max, dateString) {
      return dateString > max ? dateString : max;
    }, "");
    dispatch(setNotebookEndTime(id + 1, maxDateString));
  }, []);

  return (
    <Fragment>
      <section className="flex justify-between items-center w-full h-10 bg-gray-300 bg-opacity-70 rounded-md ">
        <div className="flex items-center">
          <FontAwesomeIcon
            className={`w-3 h-3 mr-4 ${
              openToggle ? "rotate-90" : ""
            } hover:scale-125`}
            icon={faPlay}
            onClick={changeToggle}
          ></FontAwesomeIcon>
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={handleditedName}
              onBlur={handleSave}
              autoFocus
              className="font-bold border rounded px-3 py-1 focus:outline-none  focus:border-white h-4/5"
              style={{ minWidth: "100px" }}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p
              className="h3tag font-bold whitespace-nowrap md:h4tag"
              onDoubleClick={handleDoubleClick}
            >
              {editedName}
            </p>
          )}
          <button
            className="text-[18px] text-gray-400 font-medium  ml-4 hover:font-black active:text-gray"
            onClick={handleAddSubNotebook}
          >
            ⊕
          </button>
        </div>
        <button
          className="text-[20px] text-gray-500 font-medium mb-[4px] hover:font-black active:text-gray"
          onClick={() => handleDeleteNotebook(id)}
        >
          ×
        </button>
      </section>
      {openToggle && (
        <NotebookSubtitle notebookSubtitleList={notebookList[id]} id={id} />
      )}
    </Fragment>
  );
}

export default Notebook;
