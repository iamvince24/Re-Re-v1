import React, { Fragment, useState } from "react";

import NotebookGuildeline from "../../features/notebookGuildeline/guild/NotebookGuildeline";
import NotebookEditer from "../../features/notebookEditing/NotebookEditing";
import GanttChart from "../../features/ganttchart/guild/GanttChart";

function Application() {
  const [toggle, setToggle] = useState(true);

  const [loaded, setLoaded] = useState(false);

  return (
    <Fragment>
      <section className="flex flex-col m-3 md:grid md:grid-cols-10 md:gap-4  lg:m-5 md:h-full">
        <NotebookGuildeline
          toggle={toggle}
          setToggle={setToggle}
          setLoaded={setLoaded}
        />
        {toggle ? <GanttChart /> : <NotebookEditer />}
      </section>
    </Fragment>
  );
}

export default Application;
