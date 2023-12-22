import { useRef } from "react";
import Input from "./Input";

import style from "../styles/AddTask.module.css";

const AddTask = ({ projectId, onAddTask }) => {
  const task = useRef();

  const handleEnter = (event) => {
    if (event.key === "Enter") handleAddTask();
  };

  const handleAddTask = () => {
    if (task.current.value.trim()) {
      onAddTask({ task: task.current.value, projectId });
      task.current.value = "";
    } else return;
  };

  return (
    <div className={style["task-form"]}>
      <Input type="text" id="task" ref={task} onEnter={handleEnter} />
      <button
        className={style["btn-add"]}
        type="button"
        onClick={handleAddTask}
      >
        Add&nbsp;Task
      </button>
    </div>
  );
};

export default AddTask;
