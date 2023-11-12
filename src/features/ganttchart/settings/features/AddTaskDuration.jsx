import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setNobebookStartAndEndTime } from "../../../../redux/actions";

export default function AddTaskDuration({ tasks, setTaskDurations }) {
  const notebookList = useSelector((state) => state.notebookList);
  const dispatch = useDispatch();
  const displayNumberList = useSelector((state) => state.notebookDisplaying);

  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (
      notebookList.length === 0 ||
      notebookList[displayNumberList.notebookId - 1].subNotebook.length === 0
    ) {
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(
        notebookList[displayNumberList.notebookId - 1].subNotebook[
          displayNumberList.subNotebookId - 1
        ].subStart
      );
      setEndDate(
        notebookList[displayNumberList.notebookId - 1].subNotebook[
          displayNumberList.subNotebookId - 1
        ].subEnd
      );
    }
  }, [displayNumberList]);

  function onChange(e) {
    const { value, id } = e.target;

    if (id === "select-task") {
      setTask(value);
    }
    if (id === "start-date") {
      setStartDate(value);
    }
    if (id === "end-date") {
      setEndDate(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      setNobebookStartAndEndTime(
        displayNumberList.notebookId,
        displayNumberList.subNotebookId,
        "start-date",
        startDate
      )
    );

    dispatch(
      setNobebookStartAndEndTime(
        displayNumberList.notebookId,
        displayNumberList.subNotebookId,
        "end-date",
        endDate
      )
    );

    if (task === "") return;
    const timeStamp = Date.now();
    const newTaskDuration = {
      id: timeStamp,
      start: startDate,
      end: endDate,
      task: parseInt(task),
    };
    setTaskDurations((prevState) => {
      const newState = prevState;
      return [...newState, newTaskDuration];
    });
  }

  return (
    <form
      id="add-task-duration"
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray p-3 md:w-2/3 md:mr-4"
    >
      <h2 className="h3tag font-bold mb-5 md:h4tag md:mb-8">
        Adjust Task Duration
      </h2>
      <div className="flex flex-col">
        <div
          id="task"
          className="w-auto flex items-center flex-nowrap whitespace-nowrap mb-3"
        >
          <p>Now Selected:&nbsp;</p>
          <p className="flex flex-nowrap items-center">
            <strong className="h44tag">
              {notebookList.length === 0 ||
              notebookList[displayNumberList.notebookId - 1].subNotebook
                .length === 0
                ? null
                : notebookList[displayNumberList.notebookId - 1].subNotebook[
                    displayNumberList.subNotebookId - 1
                  ].subtitle}
            </strong>
            {notebookList.length === 0 ||
            notebookList[displayNumberList.notebookId - 1].subNotebook
              .length === 0 ? null : (
              <p className="h5tag">
                &nbsp; in {notebookList[displayNumberList.notebookId - 1].title}
              </p>
            )}
          </p>
        </div>
        <div className="flex flex-col mb-3 md:justify-between md:flex-row">
          <div className="fieldset-container flex items-center w-[200px] mb-3 md:mb-0">
            <label
              htmlFor="start-date"
              className="text-[1rem] mr-2 whitespace-nowrap md:h5tag"
            >
              Start date:
            </label>
            <input
              type="date"
              id="start-date"
              name="start-date"
              value={startDate}
              min="2022-01-01"
              max="2050-12-31"
              onChange={onChange}
              className="w-[125px] px-[10px] py-[5px] h-[30px] h5tag rounded-md bg-lightgray hover:border hover:border-colorText md:h-[40px]"
            />
          </div>
          <div className="fieldset-container flex items-center w-[200px]">
            <label
              htmlFor="end-date"
              className="text-[1rem] mr-2 whitespace-nowrap md:h5tag"
            >
              End date:
            </label>
            <input
              type="date"
              id="end-date"
              name="end-date"
              value={endDate}
              min="2022-01-01"
              max="2050-12-31"
              onChange={onChange}
              className="w-[125px] px-[10px] py-[5px] h-[30px] h5tag rounded-md bg-lightgray  hover:border hover:border-colorText md:h-[40px]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn w-[105px] h-[30px] bg-lightgray md:w-[125px] md:h-[40px]"
          onChange={handleSubmit}
        >
          Set up
        </button>
      </div>
    </form>
  );
}
