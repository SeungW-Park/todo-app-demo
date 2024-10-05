import React from "react";
import styles from "./Button.module.css";

export const Button = ({
  color,
  title,
  count,
  buttonStatus,
  setButtonStatus,
}) => {

  const handleClick = () => {
    setButtonStatus(title);
    console.log('buttonStatus:', buttonStatus);
  };

  return (
    <button
      className={styles["filter-button"]}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {title} : {count}
    </button>
  );
};