import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import NotebookGuildeline from "../../features/notebookGuildeline/guild/NotebookGuildeline";
import NotebookEditer from "../../features/notebookEditing/NotebookEditing";
import GanttChart from "../../features/ganttchart/guild/GanttChart";

function Application() {
  // const togglMenu = useSelector((state) => state.toggleNoteTimeline);
  const toggleNoteTimeline = useSelector((state) => state.toggleNoteTimeline);
  const [toggle, setToggle] = useState(toggleNoteTimeline);

  useEffect(() => {
    setToggle(toggleNoteTimeline);
  }, [toggleNoteTimeline]);

  return (
    <Fragment>
      <section className="flex flex-col m-3 md:grid md:grid-cols-10 md:gap-4 md:m-5 md:h-full">
        <NotebookGuildeline />
        {toggle ? <GanttChart /> : <NotebookEditer />}
      </section>
    </Fragment>
  );
}

export default Application;
