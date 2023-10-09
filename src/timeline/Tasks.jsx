import { useEffect, useRef } from "react";

import "./Tasks.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

export default function Tasks({ tasks, setTasks, setTaskDurations }) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  // const [openToggle, setOpenToggle] = useState(true);

  // function changeToggle() {
  //   setOpenToggle(!openToggle);
  // }

  function handleDelete(e) {
    const idNum = parseInt(e.target.getAttribute("data-task-id"));
    const newTasks = tasks.filter((task) => task.id !== idNum);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
    setTaskDurations((prevState) => {
      // delete any taskDurations associated with the task
      const newTaskDurations = prevState.filter(
        (taskDuration) => taskDuration.task !== idNum
      );
      return newTaskDurations;
    });
  }

  function onChange(e, i) {
    const { value } = e.target;
    const idNum = parseInt(e.target.getAttribute("data-task-id"));
    let newTasks = tasks.filter((task) => task.id !== idNum);
    newTasks.push({ id: idNum, name: value });
    newTasks = newTasks.sort((a, b) => a.id - b.id);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
  }

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });

  return (
    <div
      id="gantt-grid-container__tasks"
      className="col-span-1 border border-gray rounded-tl-lg rounded-bl-lg"
    >
      <div className="border-b border-gray">
        <div className="gantt-task-row h-[35px]"></div>
        <div className="gantt-task-row h-[35px]"></div>
        <div className="gantt-task-row h-[35px]"></div>
      </div>

      {tasks &&
        tasks.map((tsk, i) => (
          <div
            key={`${i}-${tsk.id}-${tsk.name}`}
            className="gantt-task-row flex justify-start h-[35px]"
          >
            {tsk.notebook ? (
              <div className="flex justify-start items-center ">
                <FontAwesomeIcon
                  className="w-3 h-3 ml-4 mr-4 rotate-90"
                  icon={faPlay}
                  // onClick={changeToggle}
                ></FontAwesomeIcon>
                <input
                  data-task-id={tsk.id}
                  value={tsk.name}
                  onChange={(e) => onChange(e, i)}
                  ref={(el) => (inputRef.current[i] = el)}
                  // className="border-none bg-none outline-none"
                  style={{
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                  className="h4tag font-bold"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <FontAwesomeIcon
                  className="w-3 h-3 hidden"
                  icon={faPlay}
                  // onClick={changeToggle}
                ></FontAwesomeIcon>
                <input
                  data-task-id={tsk.id}
                  value={tsk.name}
                  onChange={(e) => onChange(e, i)}
                  ref={(el) => (inputRef.current[i] = el)}
                  // className="border-none bg-none outline-none"
                  style={{
                    // border: "none",
                    outline: "none",
                    background: "none",
                  }}
                  // className={` ${openToggle ? null : "hidden"} font-bold h5tag`}
                  className="font-bold h5tag pl-[45px] "
                />
              </div>
            )}

            <button
              type="button"
              data-task-id={tsk.id}
              onClick={handleDelete}
              className="h-[35px] hidden"
            >
              x
            </button>
          </div>
        ))}
    </div>
  );
}
