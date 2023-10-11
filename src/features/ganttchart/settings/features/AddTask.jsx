import { useState } from "react";
import AddButton from "../../../../component/AddButton";

export default function AddTask({ setTasks }) {
  const [task, setTask] = useState("");

  function onChange(e) {
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTask("");
  }

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
