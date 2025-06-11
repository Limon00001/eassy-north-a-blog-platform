/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Test Controller
const testController = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Test route is working',
  });
};

// Export
export default testController;
