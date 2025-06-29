
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  shared?: boolean;
  sharedWith?: string[];
}

export interface TaskFilter {
  status: 'all' | 'completed' | 'pending';
  priority: 'all' | 'low' | 'medium' | 'high';
  category: string;
  sortBy: 'dueDate' | 'priority' | 'createdAt' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}
