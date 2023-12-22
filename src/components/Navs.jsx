import style from "../styles/Navs.module.css";

const Navs = ({ onAddProject, projects, selected, onProjectSelect }) => {
  return (
    <div className={style.navigation}>
      <h1 className={style.heading}>YOUR PROJECTS</h1>
      <button type="button" className={style.button} onClick={onAddProject}>
        + Add Project
      </button>
      {projects.map((project) => (
        <div
          key={project.id}
          className={`${style.project} ${
            selected === project.id && style.selected
          }`}
          onClick={() => onProjectSelect(project.id)}
        >
          {project.title}
        </div>
      ))}
    </div>
  );
};

export default Navs;
