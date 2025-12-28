import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { filterOptions } from "../mockData";

const TaskTable = ({ taskList, onEdit, onDelete }) => {
  const [searchTask, setSearchTask] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTask);
  const [sortOrder, setSortOrder] = useState(null);
  const [filterTasks, setFilterTasks] = useState("all");

  const handleFilter = (status) => setFilterTasks(status);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTask), 500);
    return () => clearTimeout(handler);
  }, [searchTask]);

  const filteredTasks = taskList
    .filter((task) => filterTasks === "all" || task.status === filterTasks)
    .filter((task) =>
      task.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

  let displayedTasks = filteredTasks;
  if (sortOrder) {
    displayedTasks = [...filteredTasks].sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }

  return (
    <>
      {/* Search by title */}
      <div className="mb-4 w-full">
        <input
          type="text"
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
          placeholder="Search by title..."
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      {/* Status filter buttons */}
      <div>
        {filterOptions.map((status) => (
          <button
            key={status}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={() => handleFilter(status.toLowerCase())}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Task table */}
      <table>
        <thead>
          <tr className="[&>th]:px-4 [&>th]:py-2">
            <th>
              Title
              <span
                className="text-[12px] ps-2 cursor-pointer"
                onClick={() =>
                  setSortOrder((prev) =>
                    prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
                  )
                }
              >
                {sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "⇅"}
              </span>
            </th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <TaskList
          taskList={displayedTasks}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </table>
    </>
  );
};

export default TaskTable;
