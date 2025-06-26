// hooks/useTasks.js
import { useState, useEffect } from 'react';

const useTasks = (userId, API_BASE) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data.filter((task) => !task.completed));
      setCompletedTasks(data.filter((task) => task.completed));
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error('Failed to create task');
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
    setTasks((prev) => prev.filter((task) => task._id !== id));
    setCompletedTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const completeTask = async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true }),
    });
    if (!res.ok) throw new Error('Failed to complete task');
    const updated = await res.json();
    setTasks((prev) => prev.filter((task) => task._id !== id));
    setCompletedTasks((prev) => [...prev, updated]);
  };

  const editTask = async (id, updatedData) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updatedData, userId }),
    });
    if (!res.ok) throw new Error('Failed to edit task');
    const updated = await res.json();
    if (updated.completed) {
      setCompletedTasks((prev) => prev.map((task) => (task._id === id ? updated : task)));
    } else {
      setTasks((prev) => prev.map((task) => (task._id === id ? updated : task)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;

    try {
      if (isEditing) {
        await editTask(editId, { title: form.title, description: form.description });
        setIsEditing(false);
        setEditId(null);
      } else {
        await createTask({ userId, ...form });
      }
      setForm({ title: '', description: '' });
    } catch (err) {
      console.error(err.message);
    }
  };

  const startEdit = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditId(task._id);
    setIsEditing(true);
  };

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  return {
    tasks,
    completedTasks,
    loading,
    createTask,
    deleteTask,
    completeTask,
    editTask,
    handleSubmit,
    form,
    setForm,
    isEditing,
    startEdit,
  };
};

export default useTasks;
