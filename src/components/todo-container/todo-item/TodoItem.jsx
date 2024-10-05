import React from "react";
import styles from "./TodoItem.module.css";
import classNames from "classnames";
import { FaRegTrashAlt } from "react-icons/fa";

export const TodoItem = ({ item, updateComplete, deleteTask }) => {
  return (
    <div
      className={classNames(styles["todo-item"], {
        [styles.completed]: item.isComplete,
      })}
    >
      <label className={styles["check-container"]}>
        {item.task}
        <input
          type="checkbox"
          checked={item.isComplete}
          onChange={() => updateComplete(item._id, item.isComplete)}
        />
        <span className={styles.checkmark}></span>
      </label>
      <button
        className={styles["delete-button"]}
        onClick={() => {
          deleteTask(item._id);
        }}
      >
        <FaRegTrashAlt />
      </button>
    </div>
  );
};
