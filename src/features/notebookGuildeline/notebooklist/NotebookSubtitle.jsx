import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

import SubNotebook from "./SubtitleNotebook.jsx";

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
