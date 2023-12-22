import Input from "./Input";

import style from "../styles/AddProject.module.css";
import { useContext, useRef, useState } from "react";
import Modal from "./Modal";
import { ProjectContext } from "../store/ProjectContextProvider";

const AddProject = () => {
  const ctx = useContext(ProjectContext);
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const modal = useRef();

  const [validInput, setValidInput] = useState(true);

  const handleModalClose = () => {
    setValidInput(true);
  };

  const handleSaveNewProject = () => {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (enteredTitle && enteredDescription && enteredDueDate) {
      setValidInput(true);
      ctx.addProject({
        title: enteredTitle,
        description: enteredDescription,
        dueDate: enteredDueDate,
      });
    } else {
      setValidInput(false);
      modal.current.open();
    }
  };

  return (
    <div className={style.form}>
      <Modal ref={modal} handleModalClose={handleModalClose} />
      <div className={style["action-buttons"]}>
        <button
          className={style.cancel}
          type="button"
          onClick={ctx.hideNewProjectForm}
        >
          Cancel
        </button>
        <button
          className={style.save}
          type="button"
          onClick={handleSaveNewProject}
        >
          Save
        </button>
      </div>
      <Input ref={title} label="title" id="title" type="text" />
      <Input
        ref={description}
        label="description"
        id="description"
        type="textarea"
      />
      <Input ref={dueDate} label="due date" id="duedate" type="date" />
    </div>
  );
};

export default AddProject;
