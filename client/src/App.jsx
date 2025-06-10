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

// App Component
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
};

// Export
export default App;
