import style from "../styles/MainContent.module.css";

const MainContent = ({ children }) => {
  return <div className={style["main-content"]}>{children}</div>;
};

export default MainContent;
