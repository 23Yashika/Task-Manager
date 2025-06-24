import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Imported for navigation
import TaskCard from '../pages/TaskCard';

const TaskManager = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  const navigate = useNavigate(); // ✅ Ready for future use (e.g., logout)

  const handleAddOrUpdate = () => {
    if (editTaskId) {
      setTasks(tasks.map(t => t.id === editTaskId ? { ...t, title, description } : t));
      setEditTaskId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), title, description }]);
    }
    setTitle('');
    setDescription('');
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditTaskId(task.id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 text-red-500">Task Manager</h1>
        <h1 className="text-3xl font-bold mb-2 mt-3">Welcome, {user.fullName}</h1>
        <p className="text-lg text-gray-600">Username: {user.username}</p>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        ></textarea>
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <div>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
