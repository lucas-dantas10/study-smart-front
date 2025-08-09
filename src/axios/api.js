import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.STUDY_SMART_API_BASE_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
