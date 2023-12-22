import style from "../styles/ProjectDetails.module.css";
import AddTask from "./AddTask";
import Tasks from "./Tasks";

const ProjectDetails = ({
  title,
  description,
  dueDate,
  id,
  tasks,
  onAddTask,
  onDelete,
}) => {
  return (
    <div className={style["task-content"]}>
      <div className={style.title}>
        <h1>{title}</h1>
        <button
          type="button"
          className={style["btn-delete"]}
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
      <div className={style.dueDate}>{dueDate}</div>
      <pre className={style.descriptions}>{description}</pre>
      <h1>Tasks</h1>
      <AddTask projectId={id} onAddTask={onAddTask} />
      <Tasks projectId={id} tasks={tasks} />
    </div>
  );
};

export default ProjectDetails;
