import React from "react";

import { Fragment } from "react";
// import { useState } from "react";
import { useEffect } from "react";

import SubNotebook from "./subtitleNotebook.component.jsx";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

function NotebookSubtitle({ notebookSubtitleList, id }) {
  const notebookList = useSelector((state) => state.notebookList);

  useEffect(() => {
    notebookList[id].subNotebook.map((subnotebook, index) => {
      subnotebook.subId = index + 1;
      return subnotebook;
    });
  });

  return (
    <Fragment>
      <div className="flex flex-col justify-between w-full mb-4 ">
        {notebookSubtitleList.subNotebook.map((subtitleNotebook, index) => {
          return (
            <div
              className="flex items-center justify-between h-[32px] pl-[24px] w-full"
              key={subtitleNotebook.subId}
            >
              <SubNotebook
                subNotebookName={subtitleNotebook.subtitle}
                NotebookId={id}
                subId={index + 1}
              />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default NotebookSubtitle;
