import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newSchedule, setNewSchedule] = useState("");
  
  
  // Lấy danh sách task từ API khi component load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        setTasks(response.data);  // Cập nhật tasks từ API
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchTasks();
  }, []);  // Chạy 1 lần khi component mount

  // Thêm task mới vào API
  const addTask = async () => {
    if (newTask.trim() === "" || newSchedule.trim() === "") return;

    const newTaskItem = {
      text: newTask,
      schedule: newSchedule,
      status: "todo"
    };

    try {
      const response = await axios.post('http://localhost:3000/api/tasks', newTaskItem);
      setTasks([...tasks, response.data]);  // Thêm task mới vào danh sách
      setNewTask("");  // Xóa input sau khi thêm
      setNewSchedule("");  // Xóa lịch trình sau khi thêm
    } catch (error) {
      console.error('Lỗi khi thêm task:', error);
    }
  };

  // Xóa task
  const removeTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));  // Xóa task khỏi danh sách
    } catch (error) {
      console.error('Lỗi khi xóa task:', error);
    }
  };

  // Bật/tắt trạng thái task
  const toggleTaskStatus = async (taskId) => {
    const updatedTask = tasks.find(task => task.id === taskId);
    updatedTask.status = updatedTask.status === "todo" ? "done" : "todo";

    try {
      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedTask);
      setTasks(tasks.map(task =>
        task.id === taskId ? updatedTask : task
      ));
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái task:', error);
    }
  };

  // Sắp xếp tasks theo lịch trình
  const sortedTasks = tasks.sort((a, b) => new Date(a.schedule) - new Date(b.schedule));

  return (
    <div className="todo-container">
      <h1>My work 🎯</h1>

      {/* Thêm task mới */}
      <input 
        type="text" 
        placeholder="Add new task" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)}
      />
      
      {/* Thêm lịch trình */}
      <input 
        type="datetime-local" 
        placeholder="Add schedule" 
        value={newSchedule} 
        onChange={(e) => setNewSchedule(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      {/* Danh sách task */}
      <ul>
        {sortedTasks.map(task => (
          <li key={task.id}>
            {/* Thay checkbox để bật/tắt trạng thái */}
            <input
              type="checkbox"
              checked={task.status === "done"}
              onChange={() => toggleTaskStatus(task.id)} // Bật/tắt trạng thái khi click
            />
            <span style={{ textDecoration: task.status === "done" ? "line-through" : "none" }}>
              {task.text}
            </span>

            {/* Hiển thị và sửa lịch trình */}
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

            {/* Nút xóa task */}
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
