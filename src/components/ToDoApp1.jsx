// src/components/ToDoApp1.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  deleteTask,
  toggleComplete,
  editTask,
} from '../redux/todoSlice';
import '../todo.css';

function ToDoApp1() {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState('');
  const [message, setMessage] = useState('');
  const [persistedTasks, setPersistedTasks] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('persist:root');
    if (raw) {
      const parsedOuter = JSON.parse(raw);
      const todo = JSON.parse(parsedOuter.todo);
      const tasks = todo.tasks;
      setPersistedTasks(tasks);
    }
  }, []);

  const isValid = (text) => text.length >= 8 && text.length <= 20;

  const handleAddTask = () => {
    const text = taskText.trim();
    if (!isValid(text)) {
      setMessage('Task must be between 8 and 20 characters');
      return;
    }
    dispatch(addTask({ text, completed: false }));
    setTaskText('');
    setMessage('Task added successfully!');
  };

  const handleDelete = (index) => {
    dispatch(deleteTask(index));
  };

  const handleEdit = (index) => {
    const newText = prompt('Edit your task:', tasks[index].text);
    if (newText && isValid(newText.trim())) {
      dispatch(editTask({ index, newText: newText.trim() }));
    } else {
      alert('Task must be between 8 and 20 characters.');
    }
  };

  const handleToggleComplete = (index) => {
    dispatch(toggleComplete(index));
  };

  return (
    <div className="todo-container">
      <h1 className="h1">TODO LIST</h1>
      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="todo-input"
        placeholder="Enter a task (8–20 characters)"
      />
      <button onClick={handleAddTask} className="todo-button">
        Add Task
      </button>
      <p style={{ color: '#facc15' }}>{message}</p>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
                className="task-checkbox"
              />
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  opacity: task.completed ? 0.6 : 1,
                  color: 'white',
                }}
              >
                {task.text}
              </span>
            </label>
            <div className="task-actions">
              <a href="#" onClick={() => handleEdit(index)}>Edit</a> |{' '}
              <a href="#" onClick={() => handleDelete(index)}>Delete</a>
            </div>
          </li>
        ))}
      </ul>

      {/* Display parsed persisted localStorage Redux state */}
      <div style={{ color: 'white', background: '#1e293b', padding: '1rem', marginTop: '2rem' }}>
        <h2>Persisted Tasks</h2>
        {persistedTasks.length > 0 ? (
          <ul>
            {persistedTasks.map((task, index) => (
              <li key={index}>
                {task.text} — {task.completed ? '✅ Done' : '❌ Not Done'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No persisted tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default ToDoApp1;