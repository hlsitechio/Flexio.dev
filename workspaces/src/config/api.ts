const isProd = import.meta.env.PROD;

export const API_URL = isProd
  ? 'https://api.flexio.dev'  // Replace with your actual production API URL
  : import.meta.env.VITE_API_URL;

export const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_URL || !API_KEY) {
  console.error('API_URL or API_KEY is not defined in the environment variables');
}

console.log('Current API URL:', API_URL);