/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 08 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Route, Routes } from 'react-router-dom';

// Internal Imports
import Blog from './pages/Blog.jsx';
import Home from './pages/Home.jsx';
import AddBlog from './pages/admin/AddBlog.jsx';
import Comments from './pages/admin/Comments.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Layout from './pages/admin/Layout.jsx';
import ListBlog from './pages/admin/ListBlog.jsx';

// App Component
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={<Layout />}>
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
