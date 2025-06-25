import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskDashboard = () => {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api/tasks';

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title) return;

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title: form.title,
          description: form.description,
        }),
      });

      if (!res.ok) throw new Error('Failed to create task');
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setForm({ title: '', description: '' });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Task Dashboard</h2>

      <form onSubmit={handleCreate} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 border rounded flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskDashboard;
