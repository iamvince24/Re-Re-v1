import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Tasks({ tasks, setTasks, setTaskDurations }) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

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
      className="col-span-4 md:col-span-3 lg:col-span-2 border border-gray rounded-tl-lg rounded-bl-lg overflow-x-auto"
    >
      <div className="">
        <div className="gantt-task-row h-[35px]"></div>
        <div className="gantt-task-row h-[35px]"></div>
        <div className="gantt-task-row h-[35px]"></div>
      </div>

      <div className="border-t border-gray overflow-x-auto">
        {tasks &&
          tasks.map((tsk, i) => (
            <div
              key={`${i}-${tsk.id}-${tsk.name}`}
              className="gantt-task-row flex justify-start h-[35px]"
            >
              {tsk.notebook ? (
                <div className="flex justify-start items-center ">
                  <FontAwesomeIcon
                    className="w-2 h-2 md:w-3 md:h-3 mx-2 md:mx-4 rotate-90"
                    icon={faPlay}
                  ></FontAwesomeIcon>
                  <input
                    data-task-id={tsk.id}
                    value={tsk.name}
                    onChange={(e) => onChange(e, i)}
                    ref={(el) => (inputRef.current[i] = el)}
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
                  ></FontAwesomeIcon>
                  <input
                    data-task-id={tsk.id}
                    value={tsk.name}
                    onChange={(e) => onChange(e, i)}
                    ref={(el) => (inputRef.current[i] = el)}
                    style={{
                      outline: "none",
                      background: "none",
                    }}
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
    </div>
  );
}
