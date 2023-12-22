import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import style from "../styles/Modal.module.css";

const Modal = forwardRef(({ handleModalClose }, ref) => {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className={style.modal} onClose={handleModalClose}>
      <div className={style["modal-container"]}>
        <p>All fields should be filled.</p>
        <form
          method="dialog"
          className={style.form}
          onSubmit={handleModalClose}
        >
          <button>Close</button>
        </form>
      </div>
    </dialog>,
    document.querySelector("#modal-root")
  );
});

export default Modal;
