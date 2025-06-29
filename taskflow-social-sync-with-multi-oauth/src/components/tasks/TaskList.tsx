
import React from 'react';
import { TaskItem } from './TaskItem';
import { useTask } from '@/context/TaskContext';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const TaskList = () => {
  const { filteredTasks, loading, filter } = useTask();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter.status === 'all' ? 'No tasks yet' : 
             filter.status === 'completed' ? 'No completed tasks' : 
             'No pending tasks'}
          </h3>
          <p className="text-gray-500 mb-4">
            {filter.status === 'all' 
              ? 'Create your first task to get started!'
              : 'Try adjusting your filters to see more tasks.'
            }
          </p>
        </div>
      </div>
    );
  }

  const completedCount = filteredTasks.filter(task => task.completed).length;
  const pendingCount = filteredTasks.filter(task => !task.completed).length;
  const overdueCount = filteredTasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  ).length;

  return (
    <div className="space-y-4">
      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{pendingCount}</div>
              <div className="text-sm text-blue-800">Pending Tasks</div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-green-800">Completed Tasks</div>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
              <div className="text-sm text-red-800">Overdue Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        Showing {filteredTasks.length} of {filteredTasks.length} tasks
      </div>
    </div>
  );
};
