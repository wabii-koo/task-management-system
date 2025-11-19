import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const location = useLocation();

  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (filter !== 'all') params.status = filter;
      
      const response = await taskAPI.getAll(params);
      setTasks(response.data.tasks || response.data || []);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.delete(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': 
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200';
      case 'in-progress': 
        return 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-200';
      default: 
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      default: return '⏳';
    }
  };

  const getFilterIcon = (filterType) => {
    switch (filterType) {
      case 'all': return '📁';
      case 'pending': return '⏳';
      case 'in-progress': return '🔄';
      case 'completed': return '✅';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your tasks...</p>
          <p className="text-gray-400 text-sm mt-2">Getting everything ready for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-lg shadow-2xl border-r border-white/50 flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">📋</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">TaskFlow</h1>
              <p className="text-blue-100 text-sm">Productivity Simplified</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              user?.role === 'admin' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : 'bg-gradient-to-r from-blue-400 to-cyan-400'
            }`}>
              <span className="text-white text-sm font-bold">
                {user?.role === 'admin' ? '👑' : '👤'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-blue-200 text-xs truncate">{user?.email}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-3">
            <Link
              to="/tasks"
              className={`flex items-center px-4 py-4 rounded-2xl font-semibold transition-all duration-300 group ${
                location.pathname === '/tasks' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-200' 
                  : 'text-gray-700 hover:bg-white/50 hover:shadow-lg'
              }`}
            >
              <span className={`mr-3 text-lg transition-transform group-hover:scale-110 ${
                location.pathname === '/tasks' ? 'text-white' : 'text-blue-500'
              }`}>📋</span>
              All Tasks
            </Link>
            
            <Link
              to="/tasks/create"
              className={`flex items-center px-4 py-4 rounded-2xl font-semibold transition-all duration-300 group ${
                location.pathname === '/tasks/create' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200' 
                  : 'text-gray-700 hover:bg-white/50 hover:shadow-lg'
              }`}
            >
              <span className={`mr-3 text-lg transition-transform group-hover:scale-110 ${
                location.pathname === '/tasks/create' ? 'text-white' : 'text-green-500'
              }`}>✨</span>
              Create Task
            </Link>
            
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`flex items-center px-4 py-4 rounded-2xl font-semibold transition-all duration-300 group ${
                  location.pathname === '/admin' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200' 
                    : 'text-gray-700 hover:bg-white/50 hover:shadow-lg'
                }`}
              >
                <span className={`mr-3 text-lg transition-transform group-hover:scale-110 ${
                  location.pathname === '/admin' ? 'text-white' : 'text-purple-500'
                }`}>👑</span>
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Filter Section */}
          <div className="mt-12">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Filter Tasks
            </h3>
            <div className="space-y-2">
              {['all', 'pending', 'in-progress', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`flex items-center w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    filter === filterType 
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 border-2 border-blue-200 shadow-md' 
                      : 'text-gray-600 hover:bg-white/50 hover:shadow-lg border-2 border-transparent'
                  }`}
                >
                  <span className={`mr-3 text-base transition-transform group-hover:scale-110 ${
                    filter === filterType ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    {getFilterIcon(filterType)}
                  </span>
                  {filterType === 'all' ? 'All Tasks' : 
                   filterType === 'pending' ? 'Pending' :
                   filterType === 'in-progress' ? 'In Progress' : 'Completed'}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          <button
            onClick={logout}
            className="flex items-center justify-center w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl text-sm font-semibold hover:from-gray-200 hover:to-gray-300 hover:shadow-lg transition-all duration-300 group"
          >
            <span className="mr-2 transition-transform group-hover:scale-110">🚪</span>
            Sign Out
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {filter === 'all' ? 'All Tasks' : 
                   filter === 'pending' ? 'Pending Tasks' :
                   filter === 'in-progress' ? 'Tasks In Progress' : 'Completed Tasks'}
                </h1>
                <p className="text-gray-600 mt-2 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  {tasks.length} task{tasks.length !== 1 ? 's' : ''} found
                  {user?.role === 'admin' && (
                    <span className="ml-3 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium">
                      👑 Administrative Access
                    </span>
                  )}
                </p>
              </div>
              
              <Link
                to="/tasks/create"
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-purple-700 flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span className="text-lg transition-transform group-hover:scale-110">✨</span>
                <span className="font-semibold">New Task</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-8 py-8">
            {/* Error Message */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-6 rounded-2xl shadow-lg mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-red-800 font-medium">{error}</p>
                    </div>
                  </div>
                  <button 
                    onClick={fetchTasks}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Admin Banner */}
            {user?.role === 'admin' && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-8 mb-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <span className="text-white text-xl">👑</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Admin Dashboard
                      </h2>
                      <p className="text-purple-600">Full system control and oversight</p>
                    </div>
                  </div>
                  <Link
                    to="/admin"
                    className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl hover:from-purple-700 hover:to-pink-700 flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span className="transition-transform group-hover:scale-110">🚀</span>
                    <span className="font-semibold">Dashboard</span>
                  </Link>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {[
                    { text: 'View all tasks from all users', icon: '👁️' },
                    { text: 'Edit or delete any task', icon: '⚡' },
                    { text: 'Full user management access', icon: '👥' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white/50 rounded-xl p-3">
                      <span className="text-purple-500 text-lg">{item.icon}</span>
                      <span className="text-purple-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Grid */}
            {tasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">No tasks found</h3>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                  {filter !== 'all' 
                    ? `No ${filter} tasks available. Try changing the filter to see more tasks.`
                    : 'Start organizing your work by creating your first task!'
                  }
                </p>
                <Link
                  to="/tasks/create"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
                >
                  <span className="text-xl">✨</span>
                  <span>Create Your First Task</span>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-blue-200 hover:scale-105"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex-1 pr-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {task.title}
                        </h3>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusColor(task.status)} whitespace-nowrap`}>
                          {getStatusIcon(task.status)} {task.status.replace('-', ' ')}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-600 mb-6 text-sm line-clamp-3 leading-relaxed">
                        {task.description || 'No description provided. Add a description to better organize your task.'}
                      </p>
                      
                      {/* Metadata */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-blue-600">📅</span>
                          </span>
                          <div>
                            <div className="font-semibold">Due Date</div>
                            <div>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Not set'}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-purple-600">🕐</span>
                          </span>
                          <div>
                            <div className="font-semibold">Created</div>
                            <div>{new Date(task.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                        
                        {user?.role === 'admin' && task.user && (
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-green-600">👤</span>
                            </span>
                            <div>
                              <div className="font-semibold">Owner</div>
                              <div>{task.user.name}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                        <Link
                          to={`/tasks/edit/${task.id}`}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-semibold px-4 py-2 rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group"
                        >
                          <span className="group-hover:scale-110 transition-transform">✏️</span>
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="flex items-center space-x-2 text-red-600 hover:text-red-800 text-sm font-semibold px-4 py-2 rounded-xl border-2 border-red-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 group"
                        >
                          <span className="group-hover:scale-110 transition-transform">🗑️</span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskList;