/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import testController from '../controllers/testController.js';

//
const router = express.Router();

// Routes
router.get('/', testController);

// Export
export default router;
