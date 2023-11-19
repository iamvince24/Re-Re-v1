import React, { useState, useEffect } from "react";
import { client } from "../../../utils/fetchWrapper.js";

import AddTaskDuration from "../settings/features/AddTaskDuration.jsx";
import AddTask from "../settings/features/AddTask.jsx";
import Grid from "../grid/Grid.jsx";
import Settings from "../settings/Settings.jsx";
import Tasks from "../grid/features/Tasks.jsx";
import TimeRange from "../settings/features/TimeRange.jsx";
import TimeTable from "../grid/features/TimeTable.jsx";

import { useSelector, useDispatch } from "react-redux";

import { addtotalnotebooks } from "../../../redux/actions.js";
import { addTotalNotebooksDurations } from "../../../redux/actions.js";

function GanttChart(props) {
  const notebookList = useSelector((state) => state.notebookList);
  const totaltasksArray = useSelector((state) => state.totaltasks);
  const totaltaskDurationsArray = useSelector(
    (state) => state.totaltaskDurations
  );

  const dispatch = useDispatch();

  function getNotebookTimeRange() {
    let max = [];
    let min = [];

    notebookList.map((notebook) => {
      notebook.subNotebook.map((subnote) => {
        max.push(subnote.subEnd);
        min.push(subnote.subStart);
        return subnote;
      });
      return notebook;
    });

    var maxDateString = max.reduce(function (max, dateString) {
      return dateString > max ? dateString : max;
    }, "");

    var minDateString = min.reduce(function (min, dateString) {
      return dateString < min ? dateString : min;
    }, "9999-12-31");

    var mindate = new Date(minDateString);
    var maxdate = new Date(maxDateString);

    const TimeRange = {
      fromSelectMonth: mindate.getMonth(),
      fromSelectYear: mindate.getFullYear(),
      toSelectMonth: maxdate.getMonth(),
      toSelectYear: maxdate.getFullYear(),
    };

    return TimeRange;
  }

  const [tasks, setTasks] = useState(null);
  const [taskDurations, setTaskDurations] = useState(null);
  const [timeRange, setTimeRange] = useState(getNotebookTimeRange());

  useEffect(() => {
    client("data.json").then(
      (data) => {
        setTasks(data?.tasks);
        setTaskDurations(data?.taskDurations);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  useEffect(() => {
    let count = 0;

    let notebookarray = [];

    let notebookdurationsarray = [];

    for (let i = 0; i < notebookList.length; i++) {
      count += 1;
      const notebookd = notebookList[i];

      notebookarray.push({
        id: count,
        name: notebookd.title,
        notebook: true,
      });

      notebookdurationsarray.push({
        id: count,
        start: notebookd.start,
        end: notebookd.end,
        task: count,
      });

      for (let j = 0; j < notebookd.subNotebook.length; j++) {
        count += 1;
        const subnotebookd = notebookd.subNotebook[j];

        notebookarray.push({
          id: count,
          name: subnotebookd.subtitle,
          notebook: false,
        });

        notebookdurationsarray.push({
          id: count,
          start: subnotebookd.subStart,
          end: subnotebookd.subEnd,
          task: count,
        });
      }
    }
    dispatch(addtotalnotebooks(notebookarray));
    dispatch(addTotalNotebooksDurations(notebookdurationsarray));
  }, [notebookList]);

  useEffect(() => {
    setTimeRange(getNotebookTimeRange());
  }, [notebookList]);

  return (
    <div
      id="gantt-container"
      className="md:col-span-7 lg:col-span-8 bg-bgGray bg-opacity-20 rounded-xl border-gray border-[1px] md:border-0"
    >
      <Settings>
        <AddTask setTasks={setTasks} />
        <AddTaskDuration
          tasks={totaltasksArray}
          setTaskDurations={setTaskDurations}
        />
        <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      </Settings>

      <Grid>
        <Tasks
          tasks={totaltasksArray}
          setTasks={setTasks}
          setTaskDurations={setTaskDurations}
        />
        <TimeTable
          timeRange={timeRange}
          tasks={totaltasksArray}
          taskDurations={totaltaskDurationsArray}
          setTaskDurations={setTaskDurations}
        />
      </Grid>
    </div>
  );
}

export default GanttChart;
