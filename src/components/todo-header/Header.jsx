import React from "react";
import styles from "./Header.module.css";

export const Header = ({ todoValue, setTodoValue, addTask }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles["input-area"]}
        type="text"
        placeholder="Create Some Tasks..."
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
      ></input>
      <button className={styles["add-button"]} onClick={addTask}>+</button>
    </div>
  );
};
