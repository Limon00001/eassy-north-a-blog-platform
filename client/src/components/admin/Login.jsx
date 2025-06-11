/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useState } from 'react';
import toast from 'react-hot-toast';

// Internal Imports
import useAppContext from '../../context/useAppContext';

const Login = () => {
  const { axios, setToken } = useAppContext();
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/admin/login', formFields);

      if (!data?.success) {
        toast.error('Login Failed');
      } else {
        setToken(data?.token);
        localStorage.setItem('token', data?.token);
        axios.defaults.headers.common['Authorization'] = data?.token;
        toast.success('Login Successful');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm py-8 px-10 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-semibold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-6 md:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your email"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                value={formFields.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Enter your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                value={formFields.password}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 font-medium rounded cursor-pointer hover:bg-primary/90 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export
export default Login;
