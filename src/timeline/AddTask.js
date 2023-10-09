import { useState } from "react";
import AddButton from "./AddButton";

import "./AddTask.css";

export default function AddTask({ setTasks }) {
  const [task, setTask] = useState("");

  function onChange(e) {
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTask("");
  }

  // setTasks((prevState) => {
  //   const newState = prevState;
  //   // find largest task number, add 1 for new task - else could end up with tasks with same id
  //   const maxIdVal = prevState.reduce(function (a, b) {
  //     return Math.max(a, b.id);
  //   }, -Infinity);
  //   // create new task
  //   newState.push({
  //     id: isFinite(maxIdVal) ? maxIdVal + 1 : 1,
  //     name: task,
  //   });
  //   return [...newState];
  // });

  return (
    <form
      id="add-task"
      className="rounded-xl shadow border border-white p-4 hidden"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold">Add Task</h2>
      <input
        value={task}
        onChange={onChange}
        placeholder="  add task name"
        className="h-[40px] mt-[21px] mb-[21px] border border-white rounded-lg"
        style={{ outline: "none", background: "none" }}
      />
      <AddButton />
    </form>
  );
}
