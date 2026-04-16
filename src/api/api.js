import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

api.interceptors.response.use(null, async (error) => {
  const { config, response } = error;

  if (
    response &&
    [502, 503, 504].includes(response.status) &&
    !config._retryCount
  ) {
    config._retryCount = (config._retryCount || 0) + 1;

    if (config._retryCount <= 3) {
      const delay = config._retryCount * 1000;
      // console.warn(`Server error ${response.status}, retrying attempt ${config._retryCount} in ${delay}ms...`);

      await new Promise((resolve) => setTimeout(resolve, delay));
      return api(config);
    }
  }

  return Promise.reject(error);
});

/**
 * Helper to get the full image URL from the legacy server
 * Uses the proxy path or fallback to absolute URL if needed
 */
export const getImageUrl = (path) => {
  if (!path) return "/assets/logo-icon.webp";
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE_URL}/${path}`;
};

/**
 * Helper to get the full technical file URL from the legacy server
 */
export const getTechFileUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${FILE_BASE_URL}/${path}`;
};

export default api;
