/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Not Found Blog Component
const NotFoundBlog = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[20vh] px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        No Blogs Found
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        We couldn't find any blogs matching your search criteria. Try adjusting
        your filters or search terms.
      </p>
    </div>
  );
};

// Export
export default NotFoundBlog;
