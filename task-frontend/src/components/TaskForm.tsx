import { useEffect, useState } from 'react';
import type { task, Taskdata } from '../types/task';
import { addTask, updateTask } from '../services/taskService';

interface TaskFormProps {
  onAddTask: (task: Taskdata) => void;
  editTask: Taskdata | null;
  onUpdateTask: (task: Taskdata) => void;
  onCancelEdit: () => void;
}

const TaskForm = ({
  onAddTask,
  editTask,
  onUpdateTask,
  onCancelEdit,
}: TaskFormProps) => {
  const [form, setForm] = useState<task>({
    title: '',
    status: 'pending',
  });

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        status: editTask.status,
      });
    }
  }, [editTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (form.title.trim() === '') {
      alert('Title is required');
      return;
    }

    try {
      if (editTask) {
        const data = await updateTask(editTask.id, form);
        onUpdateTask(data);
        onCancelEdit();
      } else {
        const data = await addTask(form);
        onAddTask(data);
      }

      setForm({
        title: '',
        status: 'pending',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        {editTask ? 'Edit Task' : 'Add New Task'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {editTask ? 'Update Task' : 'Add Task'}
          </button>

          {editTask && (
            <button
              onClick={onCancelEdit}
              className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskForm;