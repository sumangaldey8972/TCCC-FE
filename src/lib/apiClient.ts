import axios from "axios";
import { BASE_API_URL } from "./config/apiConfig";

const apiClient = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    timeout: 30000
})

// Global error handler
// Global error handler
apiClient.interceptors.response.use(
    (res) => res,
    (error) => {
        console.error("API Proxy Error:", {
            url: error.config?.url,
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            data: error.response?.data,
        });

        // Transform specific errors
        if (error.response?.status === 413) {
            error.message = "File size exceeds maximum limit (5MB)";
        }

        return Promise.reject(error);
    }
);

export default apiClient