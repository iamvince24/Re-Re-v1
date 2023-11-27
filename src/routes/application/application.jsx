import React, { Fragment, useState } from "react";

import NotebookGuildeline from "../../features/notebookGuildeline/components/NotebookGuildeline";
import NotebookEditer from "../../features/notebookEditing/components/NotebookEditing";
import GanttChart from "../../features/ganttchart/ganttchartGuild/components/GanttChart";

function Application() {
  const [toggleApplicationMode, setToggleApplicationMode] = useState(true);

  return (
    <Fragment>
      <section className="flex flex-col m-3 md:grid md:grid-cols-10 md:gap-4  lg:m-5 md:h-full">
        <NotebookGuildeline
          toggleApplicationMode={toggleApplicationMode}
          setToggleApplicationMode={setToggleApplicationMode}
        />
        {toggleApplicationMode ? <GanttChart /> : <NotebookEditer />}
      </section>
    </Fragment>
  );
}

export default Application;
