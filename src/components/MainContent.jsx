import AddProject from "./AddProject";
import NoProjects from "./NoProjects";
import ProjectDetails from "./ProjectDetails";
import { useSelector } from "react-redux";

import style from "../styles/MainContent.module.css";

const MainContent = () => {
  const selected = useSelector((store) => store.selected);
  return (
    <div className={style["main-content"]}>
      {selected === undefined ? (
        <AddProject />
      ) : selected === null ? (
        <NoProjects />
      ) : (
        <ProjectDetails />
      )}
    </div>
  );
};

export default MainContent;
