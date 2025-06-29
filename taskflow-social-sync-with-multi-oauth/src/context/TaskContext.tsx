
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFilter } from '@/types/task';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filter: TaskFilter;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: Partial<TaskFilter>) => void;
  loading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilterState] = useState<TaskFilter>({
    status: 'all',
    priority: 'all',
    category: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = () => {
    setLoading(true);
    try {
      const storedTasks = localStorage.getItem(`tasks_${user?.id}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = (updatedTasks: Task[]) => {
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(updatedTasks));
    }
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;

    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const setFilter = (newFilter: Partial<TaskFilter>) => {
    setFilterState(prev => ({ ...prev, ...newFilter }));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter.status === 'completed' && !task.completed) return false;
    if (filter.status === 'pending' && task.completed) return false;
    if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
    if (filter.category && task.category !== filter.category) return false;
    return true;
  }).sort((a, b) => {
    const aValue = a[filter.sortBy] || '';
    const bValue = b[filter.sortBy] || '';
    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return filter.sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <TaskContext.Provider value={{
      tasks,
      filteredTasks,
      filter,
      addTask,
      updateTask,
      deleteTask,
      setFilter,
      loading
    }}>
      {children}
    </TaskContext.Provider>
  );
};
