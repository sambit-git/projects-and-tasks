import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContextProvider";
import AddProject from "./AddProject";
import NoProjects from "./NoProjects";
import ProjectDetails from "./ProjectDetails";

import style from "../styles/MainContent.module.css";

const MainContent = () => {
  const ctx = useContext(ProjectContext);
  return (
    <div className={style["main-content"]}>
      {ctx.selected === undefined ? (
        <AddProject />
      ) : ctx.selected === null ? (
        <NoProjects />
      ) : (
        <ProjectDetails />
      )}
    </div>
  );
};

export default MainContent;
