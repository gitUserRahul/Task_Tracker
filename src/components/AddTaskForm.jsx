import React, { useState } from "react";
import { mockData } from "../mockData";
import TaskTable from "../pages/TaskTable";
import { statusOption } from "../mockData";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState();

  const [taskList, setTaskList] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || mockData;
  });

  const [isEditing, setIsEditing] = useState(null);

  const [openForm, setOpenForm] = useState(false);

  //   handle Add or EditTask
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing === null) {
      const newTask = {
        id: taskList.length + 1,
        title,
        date: dueDate,
        status,
      };
      setTaskList([...taskList, newTask]);

      // store updated task list in local storage
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      storedTasks.push(newTask);

      alert("Task Added Successfully!");
    } else {
      const editedTasks = taskList.map((task) =>
        task.id === isEditing
          ? { ...task, title, date: dueDate, status: task.status }
          : task
      );
      setTaskList(editedTasks);
      alert("Task Edited Successfully!");
      setIsEditing(null);
    }
    setTitle("");
    setDueDate("");
    setStatus("");
    setOpenForm(false);
  };

  //   handle task edit
  const handleEdit = (task) => {
    setTitle(task.title);
    setDueDate(task.date);
    setStatus(task.status);
    setIsEditing(task.id);
    setOpenForm(true);
  };

  //   handle delete task
  const handleDelete = (taskId) => {
    const updatedTasks = taskList
      .filter((task, taskIndex) => task.id !== taskId)
      .map((task, taskIndex) => ({ ...task, id: taskIndex + 1 }));
    setTaskList(updatedTasks);
  };

  // store taskList in local storage
  localStorage.setItem("tasks", JSON.stringify(taskList));
  return (
    <div className="flex flex-col items-center gap-5">
      {/* task list */}
      <TaskTable
        taskList={taskList}
        onEdit={handleEdit}
        onDelete={handleDelete}
        statusOption={statusOption}
      />
      <div
        className={`w-full h-full fixed top-0 left-0 bg-black bg-opacity-70 z-50 ${
          openForm ? "" : "hidden"
        }`}
      >
        <form
          className={`w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-90 bg-white px-5 py-7 rounded-lg flex flex-col items-center ${
            openForm ? "" : "hidden"
          }`}
          onSubmit={handleSubmit}
        >
          <span
            onClick={() => {
              setOpenForm(false);
              setTitle("");
              setDueDate("");
              setStatus("");
              setIsEditing(null);
            }}
            className="absolute right-4 top-2 cursor-pointer text-xl font-bold text-red-600"
          >
            x
          </span>
          <h1 className="text-3xl pb-2">
            {isEditing === null ? "Add Task" : "Edit Task"}
          </h1>
          <div className="w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2  text-lg pb-0.5">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2  text-lg pb-0.5">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="w-full mb-4">
            <label className="text-gray-700 font-bold mb-2 text-lg pb-0.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select status</option>
              {statusOption.map((statusOption) => (
                <option key={statusOption} value={statusOption.toLowerCase()}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            {isEditing === null ? "Add Task" : "Save Changes"}
          </button>
        </form>
      </div>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded w-1/2 "
        onClick={() => setOpenForm(true)}
      >
        Add New Task
      </button>
    </div>
  );
};

export default AddTaskForm;
