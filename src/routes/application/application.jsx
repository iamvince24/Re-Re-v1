import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import NotebookGuildeline from "../../features/notebookGuildeline/guild/NotebookGuildeline";
import NotebookEditer from "../../features/notebookEditing/NotebookEditing";
import GanttChart from "../../features/ganttchart/guild/GanttChart";

function Application() {
  const toggleNoteTimeline = useSelector((state) => state.toggleNoteTimeline);
  const [toggle, setToggle] = useState(toggleNoteTimeline);
  useEffect(() => {
    setToggle(toggleNoteTimeline);
  }, [toggleNoteTimeline]);

  return (
    <Fragment>
      <section className="grid grid-cols-10 gap-4 m-5 h-full">
        <NotebookGuildeline />

        {toggle ? <GanttChart /> : <NotebookEditer />}
      </section>
    </Fragment>
  );
}

export default Application;
