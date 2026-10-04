import type { Taskdata } from '../types/task';
import { deleteTask } from '../services/taskService';

interface TaskListProps {
  tasks: Taskdata[];
  setTasks: React.Dispatch<React.SetStateAction<Taskdata[]>>;
  onEditTask: (task: Taskdata) => void;
}

const TaskList = ({
  tasks,
  setTasks,
  onEditTask,
}: TaskListProps) => {
  const deleteData = async (id: number) => {
    try {
      const data = await deleteTask(id);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          My Tasks
        </h2>

        <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
          {tasks.length} Tasks
        </span>
      </div>

      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
            >
              <div>
                <h3 className="font-medium text-gray-800">
                  {task.title}
                </h3>

                <span
                  className={`inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full ${
                    task.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEditTask(task)}
                  className="text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-50 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteData(task.id)}
                  className="text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-sm hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg">No tasks found</p>
          <p className="text-sm mt-1">
            Add your first task using the form.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;