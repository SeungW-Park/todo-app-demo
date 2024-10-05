import React, { useState, useEffect } from "react";
import styles from "./Container.module.css";
import { Button } from "./button-components/Button";
import { TodoItem } from "./todo-item/TodoItem";

export const Container = ({
  todoList,
  updateComplete,
  deleteTask,
  isFiltered,
  setIsFiltered,
}) => {
  const [taskCount, setTaskCount] = useState({
    allTask: 0,
    ongoing: 0,
    complete: 0,
  });
  const [filteredTask, setFilteredTask] = useState([]);
  const [buttonStatus, setButtonStatus] = useState("All Tasks");

  useEffect(() => {
    setTaskCount({
      allTask: todoList.length,
      ongoing: todoList.filter((task) => !task.isComplete).length,
      complete: todoList.filter((task) => task.isComplete).length,
    });
    if (buttonStatus === "All Tasks") {
      setIsFiltered(false);
      setFilteredTask([]);
    } else if (buttonStatus === "Ongoing") {
      setIsFiltered(true);
      setFilteredTask(
        todoList.filter((task) => {
          return !task.isComplete;
        })
      );
    } else if (buttonStatus === "Complete") {
      setIsFiltered(true);
      setFilteredTask(
        todoList.filter((task) => {
          return task.isComplete;
        })
      );
    }
  }, [todoList, buttonStatus, setIsFiltered]);

  return (
    <div className={styles.container}>
      <div className={styles["button-wrapper"]}>
        <Button
          color={"#03a7f6"}
          title={"All Tasks"}
          count={taskCount.allTask}
          buttonStatus={buttonStatus}
          setButtonStatus={setButtonStatus}
        />
        <Button
          color={"#f23a6d"}
          title={"Ongoing"}
          count={taskCount.ongoing}
          buttonStatus={buttonStatus}
          setButtonStatus={setButtonStatus}
        />
        <Button
          color={"#24b499"}
          title={"Complete"}
          count={taskCount.complete}
          buttonStatus={buttonStatus}
          setButtonStatus={setButtonStatus}
        />
      </div>
      <div className={styles["todo-list"]}>
        {isFiltered ? (
          filteredTask.map((item) => (
            <TodoItem
              key={item._id}
              item={item}
              updateComplete={updateComplete}
              deleteTask={deleteTask}
            />
          ))
        ) : todoList.length > 0 ? (
          todoList.map((item) => (
            <TodoItem
              key={item._id}
              item={item}
              updateComplete={updateComplete}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <h2 className={styles["no-item"]}>There is no item to show</h2>
        )}
      </div>
    </div>
  );
};
