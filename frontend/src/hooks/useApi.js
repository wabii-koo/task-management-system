import { useState, useCallback } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (apiCall, options = {}) => {
    const { showLoading = true, onSuccess, onError } = options;
    
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      setError(errorMessage);
      if (onError) onError(err);
      throw err;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  return { loading, error, callApi, setError };
};