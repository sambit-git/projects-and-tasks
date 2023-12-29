import AddTask from "./AddTask";
import Tasks from "./Tasks";
import { useSelector, useDispatch } from "react-redux";
import style from "../styles/ProjectDetails.module.css";

const ProjectDetails = () => {
  const projects = useSelector((store) => store.projects);
  const tasks = useSelector((store) => store.tasks);
  const selected = useSelector((store) => store.selected);
  const dispatch = useDispatch();

  const { title, description, dueDate, id } = projects.find(
    (project) => project.id === selected
  );
  return (
    <div className={style["task-content"]}>
      <div className={style.title}>
        <h1>{title}</h1>
        <button
          type="button"
          className={style["btn-delete"]}
          onClick={() => dispatch({ type: "DELETE_PROJECT", payload: id })}
        >
          Delete
        </button>
      </div>
      <div className={style.dueDate}>{dueDate}</div>
      <pre className={style.descriptions}>{description}</pre>
      <h1>Tasks</h1>
      <AddTask projectId={id} />
      <Tasks projectId={id} tasks={tasks} />
    </div>
  );
};

export default ProjectDetails;
