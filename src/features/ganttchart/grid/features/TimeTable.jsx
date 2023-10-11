import { useState } from "react";
import {
  monthDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  dayDiff,
} from "../../../../helpers/dateFunctions";
import { months } from "../../../../assets/data/constants";

export default function TimeTable({
  timeRange,
  tasks,
  taskDurations,
  setTaskDurations,
}) {
  const [taskDurationElDraggedId, setTaskDurationElDraggedId] = useState(null);

  // for dynamic css styling
  const ganttTimePeriod = {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "minmax(30px, 1fr)",
    textAlign: "center",
    height: 35,
  };

  const ganttTimePeriodSpan = {
    margin: "auto",
  };

  const ganttTimePeriodCell = {
    position: "relative",
    outline: "0.5px solid #e9eaeb",
    marginTop: "0.5px",
  };

  const taskDuration = {
    position: "absolute",
    height: "calc(33px - 1px)",
    zIndex: "1",
    background: "linear-gradient(90deg, #9ddcff 0%, #0195e4 100%)",
    borderRadius: "5px",
    boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
    cursor: "move",
  };

  // creating rows
  const startMonth = new Date(
    parseInt(timeRange.fromSelectYear),
    timeRange.fromSelectMonth
  );

  const endMonth = new Date(
    parseInt(timeRange.toSelectYear),
    timeRange.toSelectMonth
  );

  const numMonths = monthDiff(startMonth, endMonth) + 1;
  let month = new Date(startMonth);

  let monthRows = [];
  let dayRows = [];
  let dayRow = [];
  let weekRows = [];
  let weekRow = [];
  let taskRows = [];
  let taskRow = [];

  for (let i = 0; i < numMonths; i++) {
    // create month rows
    monthRows.push(
      <div
        key={i}
        style={{
          ...ganttTimePeriod,
        }}
        className="h4tag text-center h-[40px] border-r-[1px] border-gray pt-3"
      >
        <span style={ganttTimePeriodSpan} className="font-bold">
          {months[month.getMonth()] + " " + month.getFullYear()}
        </span>
      </div>
    );

    // create day and week rows
    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
    const currYear = month.getFullYear();
    const currMonth = month.getMonth() + 1;

    for (let j = 1; j <= numDays; j++) {
      dayRow.push(
        <div
          key={j}
          style={{
            ...ganttTimePeriod,
            outline: "none",
          }}
          className="h5tag h-[40px]"
        >
          <span style={ganttTimePeriodSpan}>{j}</span>
        </div>
      );
      weekRow.push(
        <div
          key={j}
          style={{
            ...ganttTimePeriod,
            outline: "none",
          }}
          className="h5tag h-[40px]"
        >
          <span
            style={{
              ...ganttTimePeriodSpan,
            }}
          >
            {getDayOfWeek(currYear, currMonth - 1, j - 1)}
          </span>
        </div>
      );
    }
    dayRows.push(
      <div
        key={i}
        style={{
          ...ganttTimePeriod,
          outline: "none",
        }}
        className="border-r-[1px] border-gray"
      >
        {dayRow}
      </div>
    );
    weekRows.push(
      <div
        key={i}
        style={{
          ...ganttTimePeriod,
        }}
        className="border-r-[1px] border-gray h-[20x] "
      >
        {weekRow}
      </div>
    );
    dayRow = [];
    weekRow = [];
    month.setMonth(month.getMonth() + 1);
  }

  // create task rows
  if (tasks) {
    tasks.forEach((task) => {
      let mnth = new Date(startMonth);
      for (let i = 0; i < numMonths; i++) {
        const curYear = mnth.getFullYear();
        const curMonth = mnth.getMonth() + 1;
        const numDays = getDaysInMonth(curYear, curMonth);
        for (let j = 1; j <= numDays; j++) {
          // color weekend cells differently
          const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);
          // add task and date data attributes
          const formattedDate = createFormattedDateFromStr(
            curYear,
            curMonth,
            j
          );
          taskRow.push(
            <div
              key={`${task.id}-${j}`}
              style={{
                ...ganttTimePeriodCell,
                backgroundColor: dayOfTheWeek === "S" ? "#f7f7f7" : "#fff",
              }}
              data-task={task?.id}
              data-date={formattedDate}
              // onDrop={onTaskDurationDrop}
            >
              {taskDurations.map((el, i) => {
                if (el?.task === task?.id && el?.start === formattedDate) {
                  return (
                    <div
                      key={`${i}-${el.id}`}
                      draggable="true"
                      tabIndex="0"
                      style={{
                        ...taskDuration,
                        width: `calc(${dayDiff(
                          el.start,
                          el.end
                        )} * 100% - 1px)`,
                        opacity:
                          taskDurationElDraggedId === el?.id ? "0.5" : "1",
                      }}
                    ></div>
                  );
                }
              })}
            </div>
          );
        }
        taskRows.push(
          <div key={`${i}-${task.id}`} style={ganttTimePeriod}>
            {taskRow}
          </div>
        );
        taskRow = [];
        mnth.setMonth(mnth.getMonth() + 1);
      }
    });
  }

  return (
    <div
      id="gantt-grid-container_time"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
      }}
      className="col-span-5 border-r border-t border-b border-gray overflow-x-auto flex content-start rounded-tr-lg rounded-br-lg"
    >
      {monthRows}
      {dayRows}
      {weekRows}
      <div
        id="gantt-time-period-cell-container"
        style={{
          gridColumn: "1/-1",
          display: "grid",
          gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
          paddingLeft: "0.5px",
          height: "90px",
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {taskRows}
      </div>
    </div>
  );
}
