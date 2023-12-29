import { useContext } from "react";
import style from "../styles/Navs.module.css";
import { useSelector, useDispatch } from "react-redux";

const Navs = () => {
  const projects = useSelector((store) => store.projects);
  const selected = useSelector((store) => store.selected);
  const dispatch = useDispatch();

  return (
    <div className={style.navigation}>
      <h1 className={style.heading}>YOUR PROJECTS</h1>
      <button
        type="button"
        className={style.button}
        onClick={() => dispatch({ type: "SHOW_PROJECT_FORM" })}
      >
        + Add Project
      </button>
      {projects.map((project) => (
        <div
          key={project.id}
          className={`${style.project} ${
            selected === project.id && style.selected
          }`}
          onClick={() =>
            dispatch({ type: "SELECT_PROJECT", payload: project.id })
          }
        >
          {project.title}
        </div>
      ))}
    </div>
  );
};

export default Navs;
