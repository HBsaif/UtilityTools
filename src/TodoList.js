
import React, { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [task, setTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">To-Do List</h5>
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={task} onChange={(e) => setTask(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') addTask(); }} placeholder="Add a new task" />
          <button className="btn btn-custom" onClick={addTask}>Add Task</button>
        </div>
        <ul className="list-group">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {task}
              <button className="btn btn-danger btn-sm btn-custom" onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
