
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { TaskProvider } from '@/context/TaskContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { Header } from '@/components/layout/Header';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const TaskDashboard = () => {
  const { user, loading } = useAuth();
  const [showTaskForm, setShowTaskForm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onShowTaskForm={() => setShowTaskForm(true)} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-600">
              Let's get things done today. Here are your tasks.
            </p>
          </div>

          <TaskFilters />
          <TaskList />
        </main>

        <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
          <DialogContent className="sm:max-w-md">
            <TaskForm onClose={() => setShowTaskForm(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </TaskProvider>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <TaskDashboard />
    </AuthProvider>
  );
};

export default Index;
