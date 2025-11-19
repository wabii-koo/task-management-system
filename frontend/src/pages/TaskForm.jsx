import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { taskAPI } from '../services/api';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isEdit) fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getById(id);
      const task = response.data.task;

      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        due_date: task.due_date?.split('T')[0] || ''
      });
    } catch {
      setError('Failed to fetch task');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setValidationErrors({});

    try {
      const payload = { ...formData, due_date: formData.due_date || null };

      if (isEdit) await taskAPI.update(id, payload);
      else await taskAPI.create(payload);

      navigate('/tasks');
    } catch (err) {
      const errors = err.response?.data?.errors;
      setValidationErrors(errors || {});
      setError(err.response?.data?.message || "Failed to submit");
    }
    setLoading(false);
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading task details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto mb-8 text-center relative"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-6">
          <span className="text-2xl text-white">📋</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {isEdit ? "Update Your Task" : "Create New Task"}
        </h1>
        <p className="text-gray-600 text-lg">
          {isEdit ? "Refine and update your task details" : "Plan and organize your next task"}
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="max-w-2xl mx-auto relative"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/tasks')}
                className="group flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
                <span className="font-medium">Back to Tasks</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isEdit ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`}></div>
                <span className="text-white/80 text-sm font-medium">
                  {isEdit ? 'Editing Mode' : 'Creation Mode'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-6 shadow-sm"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Task Title */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Task Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">🎯</span>
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-white/50 
                               focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none 
                               transition-all duration-300 group-hover:border-gray-300
                               shadow-sm backdrop-blur-sm"
                    placeholder="What needs to be done?"
                  />
                </div>
                {validationErrors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{validationErrors.title[0]}</span>
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl bg-white/50 
                               focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none 
                               transition-all duration-300 group-hover:border-gray-300
                               shadow-sm backdrop-blur-sm resize-none"
                    placeholder="Describe your task in detail..."
                  />
                  <div className="absolute bottom-3 right-3 text-gray-400 text-sm">
                    {formData.description.length}/500
                  </div>
                </div>
              </div>

              {/* Status and Due Date Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Status
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">📊</span>
                    </div>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-white/50 
                                 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none 
                                 transition-all duration-300 group-hover:border-gray-300
                                 shadow-sm backdrop-blur-sm appearance-none cursor-pointer"
                    >
                      <option value="pending" className="py-2">⏳ Pending</option>
                      <option value="in-progress" className="py-2">🚀 In Progress</option>
                      <option value="completed" className="py-2">✅ Completed</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Due Date */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Due Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">📅</span>
                    </div>
                    <input
                      type="date"
                      name="due_date"
                      value={formData.due_date}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-white/50 
                                 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none 
                                 transition-all duration-300 group-hover:border-gray-300
                                 shadow-sm backdrop-blur-sm cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => navigate('/tasks')}
                  className="px-8 py-4 rounded-2xl border-2 border-gray-300 bg-white text-gray-700 
                             font-semibold hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg
                             active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>←</span>
                  <span>Cancel</span>
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                             font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                             transition-all duration-300 flex items-center justify-center space-x-2
                             relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isEdit ? "Updating..." : "Creating..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{isEdit ? "🔄" : "✨"}</span>
                      <span>{isEdit ? "Update Task" : "Create Task"}</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskForm;