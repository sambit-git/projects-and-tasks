import style from "../styles/Tasks.module.css";

const Tasks = ({ tasks, projectId }) => {
  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  return (
    <div className={style["tasks-list"]}>
      {projectTasks.map((task) => {
        return (
          <div className={style["project-task"]} key={task.id}>
            {task.task}
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
