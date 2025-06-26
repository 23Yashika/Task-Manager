// pages/TaskDashboard.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import useTasks from '../hooks/useTasks';

const TaskDashboard = () => {
  const { userId } = useParams();
  const API_BASE = 'http://localhost:5000/api/tasks';

  const {
    tasks,
    completedTasks,
    loading,
    deleteTask,
    completeTask,
    handleSubmit,
    form,
    setForm,
    isEditing,
    startEdit,
  } = useTasks(userId, API_BASE);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Task Dashboard</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
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
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <h3 className="text-lg font-semibold mt-4">Recent Tasks</h3>
          <ul className="space-y-3 mb-6">
            {tasks.map((task) => (
              <li key={task._id} className="p-4 border rounded flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => startEdit(task)} className="text-blue-500 text-sm">Edit</button>
                  <button onClick={() => completeTask(task._id)} className="text-green-600 text-sm">Done</button>
                  <button onClick={() => deleteTask(task._id)} className="text-red-500 text-sm">Delete</button>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mt-4">Completed Tasks</h3>
          <ul className="space-y-3">
            {completedTasks.map((task) => (
              <li key={task._id} className="p-4 border rounded bg-green-50">
                <h4 className="font-semibold text-green-700">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 text-sm ml-110 relative -top-10"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskDashboard;
