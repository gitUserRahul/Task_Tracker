import React from "react";

const TaskList = ({ taskList, onEdit, onDelete }) => {
  if (taskList.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="5" className="text-center py-4">
            No Data To Show
          </td>
        </tr>
      </tbody>
    );
  } else {
    return (
      <tbody>
        {taskList.map((task) => (
          <tr key={task.id} className="[&>td]:px-4 [&>td]:py-2">
            <td>{task.title}</td>
            <td>{task.date}</td>
            <td>{task.status}</td>
            <td>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
};

export default TaskList;
