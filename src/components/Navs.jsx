import { useContext } from "react";
import style from "../styles/Navs.module.css";
import { ProjectContext } from "../store/ProjectContextProvider";

const Navs = () => {
  const ctx = useContext(ProjectContext);

  return (
    <div className={style.navigation}>
      <h1 className={style.heading}>YOUR PROJECTS</h1>
      <button
        type="button"
        className={style.button}
        onClick={ctx.showNewProjectForm}
      >
        + Add Project
      </button>
      {ctx.projects.map((project) => (
        <div
          key={project.id}
          className={`${style.project} ${
            ctx.selected === project.id && style.selected
          }`}
          onClick={() => ctx.selectProject(project.id)}
        >
          {project.title}
        </div>
      ))}
    </div>
  );
};

export default Navs;
