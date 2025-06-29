
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, X } from 'lucide-react';
import { useTask } from '@/context/TaskContext';

interface TaskFormProps {
  onClose?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const { addTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      category: category.trim() || 'General',
      dueDate: dueDate || undefined,
      completed: false
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('');
    setDueDate('');
    
    if (onClose) onClose();
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Add New Task</CardTitle>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g., Work, Personal, Study"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <Badge
                  key={p}
                  variant={priority === p ? "default" : "outline"}
                  className={`cursor-pointer capitalize ${
                    priority === p ? priorityColors[p] : ''
                  }`}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date (Optional)</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
