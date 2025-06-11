/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import multer from 'multer';

// Storage
const upload = multer({ storage: multer.diskStorage({}) });

// Export
export default upload;
