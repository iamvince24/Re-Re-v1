import React, { Fragment, useState, useCallback } from "react";

import SubNotebook from "./SubtitleNotebook.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { getCurrentDateTime } from "../../../utils/getCurrentDateTime.js";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteNotebook,
  setNotebooktitle,
  addSubNotebook,
  displayNumber,
  setNotebookEndTime,
} from "../../../redux/actions";

function Notebook({ notebookName, index, noetebookid }) {
  const notebookList = useSelector((state) => state.notebookList);
  const displayNumberList = useSelector((state) => state.notebookDisplaying);
  const dispatch = useDispatch();

  const [openToggle, setOpenToggle] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(notebookName);

  // console.log(notebookName);

  function handleSave() {
    setIsEditing(false);
    setEditedName(editedName);
  }

  function handleditedName(e) {
    setEditedName(e.target.value);
    dispatch(setNotebooktitle(index + 1, e.target.value));
  }

  const handleDeleteNotebook = (index) => {
    dispatch(deleteNotebook(index));
    // console.log(index);
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

  const findMaxDateString = useCallback((subNotebooks) => {
    const notebookTimeArray = subNotebooks.map(
      (subnotebook) => subnotebook.subEnd
    );
    return notebookTimeArray.reduce(
      (max, dateString) => (dateString > max ? dateString : max),
      ""
    );
  }, []);

  const handleAddSubNotebook = () => {
    dispatch(
      addSubNotebook(
        index + 1,
        notebookName,
        notebookList[index].subNotebook.length + 1,
        getCurrentDateTime()
      )
    );

    const maxDateString = findMaxDateString(notebookList[index].subNotebook);
    dispatch(setNotebookEndTime(index + 1, maxDateString));
  };

  // useEffect(() => {
  //   const maxDateString = findMaxDateString(notebookList[id].subNotebook);
  //   dispatch(setNotebookEndTime(id + 1, maxDateString));
  // }, [notebookList[id].subNotebook]);

  // useEffect(() => {
  //   notebookList[id].subNotebook.map((subnotebook, index) => {
  //     subnotebook.subId = index + 1;
  //     return subnotebook;
  //   });
  // });

  return (
    <Fragment>
      <section className="flex justify-between items-center w-full h-10 bg-gray-300 bg-opacity-70 rounded-md">
        <div className="flex justify-between items-center w-full mr-4 md:mr-2">
          <div className="flex justify-start items-center">
            <FontAwesomeIcon
              className={`w-3 h-3 md:w-2 md:h-2 lg:w-3 lg:h-3 mr-4 md:mr-2 lg:mr-4 ${
                openToggle ? "rotate-90" : ""
              } hover:scale-125`}
              icon={faPlay}
              onClick={() => {
                setOpenToggle(!openToggle);
              }}
            ></FontAwesomeIcon>
            {isEditing ? (
              <input
                type="text"
                value={notebookName}
                onChange={handleditedName}
                onBlur={handleSave}
                autoFocus
                className="w-full font-bold border rounded px-3 py-1 focus:outline-none focus:border-white"
                // style={{ minWidth: "100px" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave();
                  }
                }}
              />
            ) : (
              <p
                className="h3tag md:text-[16px] lg:h4tag font-bold leading-5"
                onDoubleClick={() => {
                  setIsEditing(true);
                }}
              >
                {notebookName}
              </p>
            )}
          </div>
          <button
            className="text-[18px] text-gray-400 font-medium ml-4 md:ml-2 lg:ml-2 hover:font-black active:text-gray"
            onClick={handleAddSubNotebook}
          >
            ⊕
          </button>
        </div>
        <button
          className="text-[20px] text-gray-500 font-medium mb-[4px] hover:font-black active:text-gray"
          onClick={() => handleDeleteNotebook(index)}
        >
          ×
        </button>
      </section>
      {openToggle && (
        <div className="flex flex-col justify-between w-full mb-4">
          {notebookList[index].subNotebook.map(
            (subtitleNotebook, subtitleindex) => {
              return (
                <div
                  className="flex items-center justify-between h-[32px] w-full"
                  key={subtitleNotebook.subId}
                >
                  <SubNotebook
                    subNotebookName={subtitleNotebook.subtitle}
                    NotebookId={index}
                    subId={subtitleindex + 1}
                  />
                </div>
              );
            }
          )}
        </div>
      )}
    </Fragment>
  );
}

export default Notebook;
