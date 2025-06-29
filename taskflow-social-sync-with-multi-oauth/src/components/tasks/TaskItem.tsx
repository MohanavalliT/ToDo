
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  Edit, 
  Trash2, 
  Share2, 
  AlertCircle,
  CheckCircle2 
} from 'lucide-react';
import { Task } from '@/types/task';
import { useTask } from '@/context/TaskContext';
import { format, isAfter, isBefore, isToday } from 'date-fns';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleShare = () => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: task.title,
        text: task.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${task.title}\n${task.description || ''}`);
    }
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    
    if (isToday(dueDate)) return 'today';
    if (isBefore(dueDate, now)) return 'overdue';
    if (isAfter(dueDate, now)) return 'upcoming';
    
    return null;
  };

  const dueDateStatus = getDueDateStatus();

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className={`font-medium text-gray-900 ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={`text-sm mt-1 ${
                    task.completed ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
              
              <Badge variant="outline">
                {task.category}
              </Badge>

              {task.dueDate && (
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                  dueDateStatus === 'overdue' ? 'bg-red-100 text-red-800' :
                  dueDateStatus === 'today' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {dueDateStatus === 'overdue' && <AlertCircle className="h-3 w-3" />}
                  {dueDateStatus === 'today' && <Clock className="h-3 w-3" />}
                  {dueDateStatus === 'upcoming' && <Calendar className="h-3 w-3" />}
                  <span>
                    {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </span>
                </div>
              )}

              {task.completed && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Completed</span>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-400 mt-2">
              Created {format(new Date(task.createdAt), 'MMM dd, yyyy')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
