import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newSchedule, setNewSchedule] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); 
  };

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
       
        const formattedTasks = response.data.map(task => ({
          ...task,
          schedule: formatDate(task.schedule) 
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchTasks();
  }, []);

  
  const saveTask = async () => {
    if (newTask.trim() === "" || newSchedule.trim() === "") return;
  
    const taskData = {
      text: newTask,
      schedule: newSchedule,
      status: "todo"
    };
  
    try {
      if (editingTaskId) {
       
        await axios.put(`http://localhost:3000/api/tasks/${editingTaskId}`, taskData);
        setTasks(tasks.map(task => (task.id === editingTaskId ? { ...task, ...taskData } : task)));
        setEditingTaskId(null);
      } else {
        
        const response = await axios.post('http://localhost:3000/api/tasks', taskData);
        const newTask = { ...taskData, id: response.data.insertId }; 
        setTasks([...tasks, newTask]); 
      }
      setNewTask("");
      setNewSchedule("");
    } catch (error) {
      console.error('Lỗi khi lưu task:', error);
    }
  };
  
  

 
  const removeTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Lỗi khi xóa task:', error);
    }
  };

 
  const toggleTaskStatus = async (taskId) => {
    const updatedTask = tasks.find(task => task.id === taskId);
    updatedTask.status = updatedTask.status === "todo" ? "done" : "todo";

    try {
      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedTask);
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái task:', error);
    }
  };


  const editTask = (task) => {
    setNewTask(task.text);
    setNewSchedule(formatDate(task.schedule)); 
    setEditingTaskId(task.id);
  };

  
  const sortedTasks = tasks.sort((a, b) => new Date(a.schedule) - new Date(b.schedule));

  return (
    <div className="todo-container">
      <h1>My work 🎯</h1>

      <input 
        type="text" 
        placeholder="Add new task" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)}
      />
      <input 
        type="datetime-local" 
        placeholder="Add schedule" 
        value={newSchedule} 
        onChange={(e) => setNewSchedule(e.target.value)}
      />
      <button onClick={saveTask}>{editingTaskId ? "Update Task" : "Add Task"}</button>

      <ul>
        {sortedTasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.status === "done"}
              onChange={() => toggleTaskStatus(task.id)}
            />
            <span style={{ textDecoration: task.status === "done" ? "line-through" : "none" }}>
              {task.text}
            </span>
            <div>
              <input 
                type="datetime-local" 
                value={task.schedule} 
                onChange={(e) => {
                  const updatedTask = { ...task, schedule: e.target.value };
                  setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
                }} 
              />
            </div>
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
