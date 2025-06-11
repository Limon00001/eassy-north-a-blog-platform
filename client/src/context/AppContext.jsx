/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Set Base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Create the Context
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blog, setBlog] = useState([]);
  const [input, setInput] = useState('');

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all');

      if (!data?.success) {
        toast.error(data?.message || 'Something went wrong');
      } else {
        setBlog(data?.blogs);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchBlogs();

    const token = localStorage.getItem('token');

    if (token) {
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
  }, []);

  const value = {
    token,
    setToken,
    blog,
    setBlog,
    input,
    setInput,
    navigate,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Export
export { AppContext, AppContextProvider };
