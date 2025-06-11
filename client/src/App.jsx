/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 08 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

// Internal Imports
import Login from './components/admin/Login.jsx';
import useAppContext from './context/useAppContext.jsx';
import Blog from './pages/Blog.jsx';
import Home from './pages/Home.jsx';
import AddBlog from './pages/admin/AddBlog.jsx';
import Comments from './pages/admin/Comments.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Layout from './pages/admin/Layout.jsx';
import ListBlog from './pages/admin/ListBlog.jsx';

// Quill CSS
import 'quill/dist/quill.snow.css';

// App Component
const App = () => {
  const { token } = useAppContext();
  return (
    <div>
      <Toaster position="top-right" reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="listblog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};

// Export
export default App;
