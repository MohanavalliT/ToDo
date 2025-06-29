
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Search, SortAsc, SortDesc } from 'lucide-react';
import { useTask } from '@/context/TaskContext';

export const TaskFilters = () => {
  const { filter, setFilter, tasks } = useTask();

  const categories = Array.from(new Set(tasks.map(task => task.category))).filter(Boolean);

  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ] as const;

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ] as const;

  const sortOptions = [
    { value: 'createdAt', label: 'Created Date' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' }
  ] as const;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters & Search</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                className="pl-10"
                // Note: Search functionality would be implemented in the context
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <div className="flex flex-wrap gap-1">
              {statusOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={filter.status === option.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilter({ status: option.value })}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <div className="flex flex-wrap gap-1">
              {priorityOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={filter.priority === option.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilter({ priority: option.value })}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <div className="flex flex-wrap gap-1">
              {sortOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={filter.sortBy === option.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilter({ sortBy: option.value })}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilter({ 
                sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc' 
              })}
            >
              {filter.sortOrder === 'asc' ? (
                <SortAsc className="h-4 w-4 mr-1" />
              ) : (
                <SortDesc className="h-4 w-4 mr-1" />
              )}
              {filter.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Categories</label>
            <div className="flex flex-wrap gap-1">
              <Badge
                variant={!filter.category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilter({ category: '' })}
              >
                All Categories
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={filter.category === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilter({ category })}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
