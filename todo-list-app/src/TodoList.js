import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Học lập trình web với React", schedule: "2024-10-05T10:30", status: "todo" },
    { id: 2, text: "Gửi email nộp bài tập về nhà", schedule: "2024-10-06T08:00", status: "done" },
    { id: 3, text: "Học từ vựng tiếng anh mỗi ngày", schedule: "2024-10-07T15:00", status: "todo" },
    { id: 4, text: "Viết tiểu luận môn Triết học", schedule: "2024-10-08T12:00", status: "todo" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newSchedule, setNewSchedule] = useState("");


  const addTask = () => {
    if (newTask.trim() === "" || newSchedule.trim() === "") return;
    const newTaskItem = {
      id: tasks.length + 1,
      text: newTask,
      schedule: newSchedule,
      status: "todo"
    };
    setTasks([...tasks, newTaskItem]);
    setNewTask("");  // Xóa input sau khi thêm
    setNewSchedule(""); // Xóa lịch trình sau khi thêm
  };

  
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Bật/tắt 
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === "todo" ? "done" : "todo" }
        : task
    );
    setTasks(updatedTasks);
  };

  // Cập nhật 
  const updateTaskSchedule = (taskId, newSchedule) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, schedule: newSchedule }
        : task
    );
    setTasks(updatedTasks);
  };

  // Sắp xếp 
  const sortedTasks = tasks.sort((a, b) => {
    return new Date(a.schedule) - new Date(b.schedule);
  });

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
      <button onClick={addTask}>Update</button>

      {/* Danh sách task */}
      <ul>
        {sortedTasks.map(task => (
          <li key={task.id}>
            {/* Thay radio bằng checkbox */}
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
                onChange={(e) => updateTaskSchedule(task.id, e.target.value)} 
              />
            </div>

            {/* Nút xóa task */}
            <button onClick={() => removeTask(task.id)}>Xoá</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
