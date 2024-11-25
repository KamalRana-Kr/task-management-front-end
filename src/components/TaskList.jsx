import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadTasks,
  updateTaskAsync,
  deleteTaskAsync,
} from "../features/tasks/taskSlice";
import AddTask from "./AddTask";
import ConfirmationModal from "./ConfirmationModal";

const TaskList = () => {
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    dispatch(loadTasks({ search, sortField, sortOrder }));
  }, [dispatch, search, sortField, sortOrder]);

  const toggleAddTask = () => setShowAddTask((prev) => !prev);

  const handleSortChange = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const showModal = (task, type) => {
    setSelectedTask(task);
    setModalType(type);
  };

  const handleConfirm = async () => {
    if (modalType === "update" && selectedTask) {
      await dispatch(
        updateTaskAsync({
          id: selectedTask._id,
          updatedTask: { status: selectedTask.status },
        })
      );
    } else if (modalType === "delete" && selectedTask) {
      await dispatch(deleteTaskAsync(selectedTask._id));
    }

    dispatch(loadTasks({ search, sortField, sortOrder }));

    setSelectedTask(null);
    setModalType(null);
  };

  const handleCancel = () => {
    setSelectedTask(null);
    setModalType(null);
  };

  const renderTaskItem = (task) => (
    <li
      key={task._id}
      className="flex justify-between items-center p-2 mb-2 border rounded"
    >
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-gray-600">Status: {task.status}</p>
        <p className="text-sm text-gray-500">
          Start: {new Date(task.start_task_date).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          End: {new Date(task.end_task_date).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <select
          value={task.status}
          onChange={(e) =>
            showModal({ ...task, status: e.target.value }, "update")
          }
          className="p-1 border rounded"
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          onClick={() => showModal(task, "delete")}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );

  if (status === "loading") return <p>Loading tasks...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!tasks || !tasks.taskList || tasks.taskList.length === 0) {
    return <p className="text-gray-600">No tasks available.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Task Management</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks by title or status"
        className="block w-full p-2 mb-4 border rounded"
      />
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleSortChange("title")}
          className={`p-2 rounded ${
            sortField === "title"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Sort by Title
        </button>
        <button
          onClick={() => handleSortChange("status")}
          className={`p-2 rounded ${
            sortField === "status"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Sort by Status
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Manage Your Tasks</h3>
        <button
          onClick={toggleAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded shadow-md hover:bg-blue-600 transition-all duration-200"
        >
          {showAddTask ? "Hide Add Task" : "Show Add Task"}
        </button>
      </div>
      {showAddTask && (
        <div>
          <AddTask />
        </div>
      )}
      <ul>{tasks.taskList.map((task) => renderTaskItem(task))}</ul>
      <ConfirmationModal
        isOpen={!!modalType}
        title={
          modalType === "update"
            ? "Confirm Status Update"
            : "Confirm Task Deletion"
        }
        message={
          modalType === "update"
            ? `Are you sure you want to update the status of "${selectedTask?.title}"?`
            : `Are you sure you want to delete the task "${selectedTask?.title}"?`
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TaskList;
