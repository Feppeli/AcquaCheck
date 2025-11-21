import axios, { type AxiosInstance } from 'axios';

const baseURL: string = `http://localhost:3000`

const api: AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use((response) => {
    return response;
    },
    (error) => {
        if (error.reponse && error.reponse.status === 401) {
            console.error('Unauthorized request - redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default api;