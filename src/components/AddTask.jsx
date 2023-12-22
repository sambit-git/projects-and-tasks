import { useContext, useRef } from "react";
import Input from "./Input";

import style from "../styles/AddTask.module.css";
import { ProjectContext } from "../store/ProjectContextProvider";

const AddTask = ({ projectId }) => {
  const task = useRef();

  const ctx = useContext(ProjectContext);

  const handleEnter = (event) => {
    if (event.key === "Enter") handleAddTask();
  };

  const handleAddTask = () => {
    if (task.current.value.trim()) {
      ctx.addTask({ task: task.current.value, projectId });
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
