
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  LogOut, 
  Settings, 
  User, 
  Bell, 
  Search,
  Menu,
  X 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { TaskForm } from '@/components/tasks/TaskForm';

interface HeaderProps {
  onShowTaskForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowTaskForm }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Add Task Button */}
            <Button onClick={onShowTaskForm} className="hidden sm:flex">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
            
            <Button onClick={onShowTaskForm} size="sm" className="sm:hidden">
              <Plus className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-2"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block font-medium">
                  {user?.name}
                </span>
              </Button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b">
                      <div className="text-sm font-medium">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                    
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    
                    <button 
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
