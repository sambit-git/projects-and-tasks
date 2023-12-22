import { forwardRef } from "react";
import style from "../styles/Input.module.css";

const Input = forwardRef(({ label, type, id, ...props }, ref) => {
  return (
    <>
      {label && (
        <label className={style.label} htmlFor={id}>
          {label}
        </label>
      )}
      {type == "textarea" ? (
        <textarea ref={ref} className={style.textarea} id={id} />
      ) : (
        <input
          type={type}
          id={id}
          ref={ref}
          className={style.input}
          onKeyDown={props.onEnter ? (event) => props.onEnter(event) : () => {}}
        />
      )}
    </>
  );
});

export default Input;
