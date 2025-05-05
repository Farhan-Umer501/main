import React, { useState, useEffect } from 'react';

import '../todo.css';

function ToDoApp1() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('todo-Name', JSON.stringify(tasks));
  }, [tasks]);

  const isValid = (text) => text.length >= 8 && text.length <= 20;

  const handleAddTask = () => {
    const text = taskText.trim();
    if (!isValid(text)) {
      setMessage("Task must be between 8 and 20 characters");
      return;
    }
    const newTask = { text, completed: false };
    setTasks([...tasks, newTask]);
    setTaskText('');
    setMessage("Task added successfully!");
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText && isValid(newText.trim())) {
      const updated = [...tasks];
      updated[index].text = newText.trim();
      setTasks(updated);
    } else {
      alert("Task must be between 8 and 20 characters.");
    }
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="todo-container">
      <h1 className='h1'>   TODO LIST</h1>
      <input
        id="taskInput"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="todo-input"
        placeholder="Enter a task (8–20 characters)"
      />
      <button id="addTaskBtn" onClick={handleAddTask} className="todo-button">
        Add Task
      </button>
      <p id="message" style={{ color: '#facc15' }}>{message}</p>
<br />
      <ul id="taskList">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <label>
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <span
                className="task-text"
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  opacity: task.completed ? 0.6 : 1
                }}
              >
                {task.text}
              </span>
            </label>
            <div className="task-actions">
              <a href="#" onClick={() => handleEdit(index)}>Edit</a>
              <a href="#" onClick={() => handleDelete(index)}>Delete</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoApp1;
