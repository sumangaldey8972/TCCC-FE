import axios from "axios";

const appClient = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 30000,
});


// Global error handler
appClient.interceptors.response.use(
    (res) => res,
    (error) => {
        console.error("Frontend API Error:", {
            endpoint: error.config?.url,
            status: error.response?.status,
            message: error.message,
        });

        // Format error messages consistently
        if (error.response?.data?.error) {
            error.message = error.response.data.error;
        } else if (error.response?.data?.message) {
            error.message = error.response.data.message;
        }

        return Promise.reject(error);
    }
);

export default appClient;
