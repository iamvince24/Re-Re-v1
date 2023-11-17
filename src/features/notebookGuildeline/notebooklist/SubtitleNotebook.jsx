import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import {
  deleteSubNotebook,
  displayNumber,
  setSubNobebookTitle,
} from "../../../redux/actions";

function SubNotebook({ subNotebookName, NotebookId, subId }) {
  const displayNumberList = useSelector((state) => state.notebookDisplaying);

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(subNotebookName);

  function handleSave() {
    setIsEditing(false);
    setEditedName(editedName);
  }

  function handleditedName(e) {
    dispatch(
      setSubNobebookTitle(
        displayNumberList.notebookId,
        displayNumberList.subNotebookId,
        e.target.value
      )
    );
    setEditedName(e.target.value);
  }

  function handleDisplayNumber() {
    dispatch(displayNumber(NotebookId + 1, subId));
  }

  const handleDeleteNotebook = (index) => {
    dispatch(deleteSubNotebook(NotebookId + 1, index));
  };

  return (
    <Fragment>
      <div className="flex justify-start items-center">
        <FontAwesomeIcon
          className={`w-3 h-3 md:w-2 md:h-2 lg:w-3 lg:h-3 mr-4 md:mr-2 lg:mr-4 invisible`}
          icon={faPlay}
        ></FontAwesomeIcon>
        {isEditing ? (
          <input
            type="text"
            value={subNotebookName}
            onChange={handleditedName}
            onBlur={handleSave}
            autoFocus
            className="h-4/5 w-full font-bold border rounded px-3 py-1 mr-2 focus:outline-none focus:border-white"
            style={{ minWidth: "100px" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
          />
        ) : (
          <button
            className="font-bold h4tag md:h5tag hover:underline leading-4 text-left"
            onDoubleClick={() => {
              setIsEditing(true);
            }}
            onClick={handleDisplayNumber}
          >
            {subNotebookName}
          </button>
        )}
      </div>
      <button
        className="text-[20px] text-gray-400 font-medium mb-[3px] hover:font-black active:text-gray"
        onClick={() => handleDeleteNotebook(subId)}
      >
        ×
      </button>
    </Fragment>
  );
}

export default SubNotebook;
