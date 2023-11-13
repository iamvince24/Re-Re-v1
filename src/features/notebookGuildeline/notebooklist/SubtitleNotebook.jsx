import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { deleteSubNotebook } from "../../../redux/actions";
import { displayNumber } from "../../../redux/actions";
import { setSubNobebookTitle } from "../../../redux/actions";

function SubNotebook({ subNotebookName, NotebookId, subId }) {
  const displayNumberList = useSelector((state) => state.notebookDisplaying);

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(subNotebookName);

  function handleDoubleClick() {
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
    setEditedName(editedName);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave();
    }
  }

  function handleditedName(e) {
    setEditedName(e.target.value);
    dispatch(
      setSubNobebookTitle(
        displayNumberList.notebookId,
        displayNumberList.subNotebookId,
        e.target.value
      )
    );
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
            value={editedName}
            onChange={handleditedName}
            onBlur={handleSave}
            autoFocus
            className="font-bold border rounded px-3 py-1 focus:outline-none  focus:border-white h-4/5"
            style={{ minWidth: "100px" }}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <button
            className="font-bold h4tag md:h5tag hover:underline leading-4 text-left"
            onDoubleClick={handleDoubleClick}
            onClick={handleDisplayNumber}
          >
            {editedName}
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
