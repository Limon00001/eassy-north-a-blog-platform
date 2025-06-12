/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Error Handler
const errorHandler = (err, req, res, next) => {
  //   Handle CastError
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  //   Handle ImageKit errors
  if (err.message.includes('ImageKit')) {
    return res.status(500).json({
      success: false,
      message: 'Error processing image',
      error: err.message,
    });
  }

  //   Handle other errors
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message,
  });
};

// Export
export default errorHandler;
