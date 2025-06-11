/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};

// Export
export default auth;
