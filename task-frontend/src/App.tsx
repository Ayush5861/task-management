import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

import type { Taskdata } from './types/task';
import { getTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState<Taskdata[]>([]);
  const [editTask, setEditTask] = useState<Taskdata | null>(null);
  const [status, setStatus] = useState('');

  const getData = async (selectedStatus = '') => {
    try {
      const data = await getTask(selectedStatus);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addTaskToList = (task: Taskdata) => {
    setTasks((prev) => [...prev, task]);
  };

  const editTaskData = (task: Taskdata) => {
    setEditTask(task);
  };

  const updateTaskInList = (updatedTask: Taskdata) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setEditTask(null);
  };

  const cancelEdit = () => {
    setEditTask(null);
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedStatus = e.target.value;

    setStatus(selectedStatus);
    getData(selectedStatus);
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100 p-6">
              <div className="max-w-6xl mx-auto">

                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Task Dashboard
                  </h1>

                  <p className="text-gray-500 mt-1">
                    Manage your tasks
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <label className="font-medium text-gray-700">
                      Search by Status
                    </label>

                    <select
                      value={status}
                      onChange={handleStatusChange}
                      className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Tasks</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  <div>
                    <TaskForm
                      onAddTask={addTaskToList}
                      editTask={editTask}
                      onUpdateTask={updateTaskInList}
                      onCancelEdit={cancelEdit}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <TaskList
                      tasks={tasks}
                      setTasks={setTasks}
                      onEditTask={editTaskData}
                    />
                  </div>

                </div>
              </div>
            </div>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;