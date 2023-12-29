import { useDispatch } from "react-redux";

import style from "../styles/NoProjects.module.css";
import image from "../assets/no-projects.png";

const NoProjects = () => {
  const dispatch = useDispatch();
  return (
    <>
      <img className={style.image} src={image} />
      <p className={style.heading}>No Projects Selected</p>
      <p className={style.hint}>
        Select a new project or get started with a new one
      </p>
      <button
        className={style.btn}
        onClick={() => dispatch({ type: "SHOW_PROJECT_FORM" })}
      >
        Create new project
      </button>
    </>
  );
};

export default NoProjects;
