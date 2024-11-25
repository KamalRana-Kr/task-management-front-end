import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskAsync, loadTasks } from "../features/tasks/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    start_task_date: "",
    end_task_date: "",
  });

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async () => {
    try {
      const addTaskResult = await dispatch(addTaskAsync(newTask));

      if (addTaskResult.meta.requestStatus === "fulfilled") {
        console.log("Teess");

        dispatch(loadTasks({ sortField: "createdAt", sortOrder: "desc" }));
        setNewTask({
          title: "",
          description: "",
          status: "All",
          start_task_date: "",
          end_task_date: "",
        });
      } else {
        console.error("Failed to add task", addTaskResult.error);
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <input
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleNewTaskChange}
        placeholder="Title"
        className="block w-full p-2 mb-2 border rounded"
      />
      <textarea
        name="description"
        value={newTask.description}
        onChange={handleNewTaskChange}
        placeholder="Description"
        className="block w-full p-2 mb-2 border rounded"
      />
      <select
        name="status"
        value={newTask.status}
        onChange={handleNewTaskChange}
        className="block w-full p-2 mb-2 border rounded"
      >
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <input
        type="datetime-local"
        name="start_task_date"
        value={newTask.start_task_date}
        onChange={handleNewTaskChange}
        className="block w-full p-2 mb-2 border rounded"
      />
      <input
        type="datetime-local"
        name="end_task_date"
        value={newTask.end_task_date}
        onChange={handleNewTaskChange}
        className="block w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleAddTask}
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
