import { useContext } from "react";
import style from "../styles/ProjectDetails.module.css";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import { ProjectContext } from "../store/ProjectContextProvider";

const ProjectDetails = () => {
  const ctx = useContext(ProjectContext);

  const { title, description, dueDate, id } = ctx.projects.find(
    (project) => project.id === ctx.selected
  );
  return (
    <div className={style["task-content"]}>
      <div className={style.title}>
        <h1>{title}</h1>
        <button
          type="button"
          className={style["btn-delete"]}
          onClick={() => ctx.deleteProject(id)}
        >
          Delete
        </button>
      </div>
      <div className={style.dueDate}>{dueDate}</div>
      <pre className={style.descriptions}>{description}</pre>
      <h1>Tasks</h1>
      <AddTask projectId={id} />
      <Tasks projectId={id} tasks={ctx.tasks} />
    </div>
  );
};

export default ProjectDetails;
