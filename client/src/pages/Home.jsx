/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <BlogList />
      <Newsletter />
      <Footer />
    </>
  );
};

// Export
export default Home;
