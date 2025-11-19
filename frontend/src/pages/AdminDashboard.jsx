import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); 

  const handleViewAllTasks = () => {
    navigate('/tasks');
  };

  const handleManageUsers = () => {
    navigate('/admin/users');
  };

  const adminCards = [
    {
      title: "Task Management",
      description: "View and manage all tasks across the entire system",
      icon: "📋",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
      action: handleViewAllTasks,
      stats: "Full system oversight"
    },
    {
      title: "User Management",
      description: "Manage all registered users and their permissions",
      icon: "👥",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      action: handleManageUsers,
      stats: "Complete user control"
    }
  ];

  const privileges = [
    { text: "View all tasks from all users", icon: "👁️", color: "text-blue-500" },
    { text: "Edit or delete any task in the system", icon: "⚡", color: "text-green-500" },
    { text: "Full user management and permissions", icon: "👑", color: "text-purple-500" },
    { text: "System-wide analytics and insights", icon: "📊", color: "text-cyan-500" },
    { text: "Access control and security settings", icon: "🔒", color: "text-orange-500" },
    { text: "Database administration tools", icon: "💾", color: "text-indigo-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl mb-6">
            <span className="text-2xl text-white">👑</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Welcome back, <span className="font-semibold text-gray-800">{user?.name}</span>
          </p>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            <span>Administrator Access Level</span>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {adminCards.map((card, index) => (
            <div 
              key={index}
              className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-blue-200 overflow-hidden"
            >
              <div className={`${card.bgColor} p-8 border-b ${card.borderColor}`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl text-white">{card.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{card.title}</h3>
                      <p className="text-gray-600 mt-2">{card.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>{card.stats}</span>
                  </div>
                  <button 
                    onClick={card.action}
                    className={`${card.buttonColor} text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 group`}
                  >
                    <span className="transition-transform group-hover:scale-110">🚀</span>
                    <span>Access</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span className="text-green-500">✓</span>
                    <span>Real-time data</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-500">✓</span>
                    <span>Full permissions</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-purple-500">✓</span>
                    <span>Secure access</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Administrator Privileges */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">⚡</span>
              Administrator Privileges
            </h2>
            <p className="text-purple-100 mt-2">Complete system control and management capabilities</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privileges.map((privilege, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group border border-gray-100 hover:border-blue-200"
                >
                  <div className={`w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${privilege.color} bg-opacity-20`}>
                    <span className="text-xl">{privilege.icon}</span>
                  </div>
                  <span className="text-gray-700 font-medium flex-1">{privilege.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Actions</h3>
            <p className="text-gray-600 mb-8">Access key administrative functions instantly</p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={handleViewAllTasks}
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-cyan-600 flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                <span className="text-xl transition-transform group-hover:scale-110">📋</span>
                <span>View All Tasks</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
              
              <button 
                onClick={handleManageUsers}
                className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                <span className="text-xl transition-transform group-hover:scale-110">👥</span>
                <span>Manage Users</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </div>

            {/* System Status */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>System: Operational</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Database: Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Security: Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Last login: {new Date().toLocaleDateString()} • 
            <span className="text-green-500 font-medium ml-2"> Session Active</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;