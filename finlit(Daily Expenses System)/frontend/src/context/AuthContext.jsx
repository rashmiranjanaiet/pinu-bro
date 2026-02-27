import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/api/auth/login', { email, password }, config);
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Logged in successfully!');
      setError(null);
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message;
      setError(message);
      toast.error(message);
    }
  };
  
  const register = async (name, email, password) => {
     try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/api/auth/register', { name, email, password }, config);
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Registered successfully!');
      setError(null);
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message;
      setError(message);
      toast.error(message);
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    toast.success('Logged out!');
  };

  return (
    <AuthContext.Provider value={{ userInfo, loading, error, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
