import axios from "axios";

const baseURL = 'https://sw-api.starnavi.io/';

// Creatin client with base URL
const apiClient = axios.create({
  baseURL: baseURL,
});

// Interceptor for change base URL
apiClient.interceptors.request.use(config => {
  // Change base URL based on a request (characters, films, starships)
  if (config.url?.startsWith('/people')) {
    config.url = '/people';
  } else if (config.url?.startsWith('/films')) {
    config.url = '/films';
  } else if (config.url?.startsWith('/starships')) {
    config.url = '/starships';
  }
  return config;
});

export default apiClient;
