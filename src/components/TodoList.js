import React, { useState, useEffect } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return alert("Task cannot be empty!");
    setTasks([...tasks, { text: task.trim(), completed: false }]);
    setTask("");
  };

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "completed") return t.completed;
    return !t.completed;
  });

  return (
    <div className="todo-container">
      <h2>🌟 Celebal Week 2 - To-Do List 🌟</h2>
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      <ul className="task-list">
        {filteredTasks.length ? (
          filteredTasks.map((t, index) => (
            <li key={index} className={t.completed ? "completed" : ""}>
              <span onClick={() => toggleCompletion(index)}>{t.text}</span>
              <button onClick={() => removeTask(index)}>❌</button>
            </li>
          ))
        ) : (
          <p>No tasks to show</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
