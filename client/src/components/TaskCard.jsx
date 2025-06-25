import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, onComplete, isCompleted }) => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <h3 className="text-xl font-semibold">{task.title}</h3>
    <p className="text-gray-600">{task.description}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {!isCompleted && (
        <>
          <button
            onClick={() => onEdit(task)}
            className="bg-yellow-400 px-3 py-1 rounded text-white"
          >
            Edit
          </button>
          <button
            onClick={() => onComplete(task.id)}
            className="bg-green-500 px-3 py-1 rounded text-white"
          >
            Done
          </button>
        </>
      )}
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 px-3 py-1 rounded text-white"
      >
        Delete
      </button>
    </div>
  </div>
);

export default TaskCard;
