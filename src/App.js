import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./components/todo-header/Header";
import { Container } from "./components/todo-container/Container";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const getTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTodoList(response.data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        console.log("task has successfully saved");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("Failed to add task");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const updateComplete = async (id, isComplete) => {
    try {
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !isComplete,
      });
      if (response.status === 200) {
        console.log("task has successfully updated");
        getTasks();
      } else {
        throw new Error("Failed to update task");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        console.log("task has successfully deleted");
        getTasks();
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="background">
      <h1 className="title">Todo App</h1>
      <div className="todo-board">
        <Header
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          addTask={addTask}
        />
        <Container
          todoList={todoList}
          updateComplete={updateComplete}
          deleteTask={deleteTask}
          isFiltered={isFiltered}
          setIsFiltered={setIsFiltered}
        />
      </div>
    </div>
  );
}

export default App;
