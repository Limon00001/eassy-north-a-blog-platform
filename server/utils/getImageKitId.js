/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Extract the image ID from the ImageKit URL
const getImageKitId = (url) => {
  try {
    // Check if the URL is valid
    if (!url) return null;

    // Split the URL into parts
    const splitUrl = url.split('/');

    // Get the last part of the URL
    const lastPartUrl = splitUrl[splitUrl.length - 1];

    // Get the file ID (everything before the extension)
    const fileId = lastPartUrl.split('.')[0];

    return fileId;
  } catch (error) {
    return null;
  }
};

// Export
export default getImageKitId;
