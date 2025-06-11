/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useContext } from 'react';

// Internal Imports
import { AppContext } from './AppContext';

const useAppContext = () => {
  return useContext(AppContext);
};

// Export
export default useAppContext;
