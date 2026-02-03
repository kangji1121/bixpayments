import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
    baseURL: "/api", // 반드시 프록시 타게
});

api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const store = useAuthStore.getState();

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            store.refreshToken
        ) {
            originalRequest._retry = true;
            try {
                const res = await axios.post("/api/auth/refresh", {
                    refreshToken: store.refreshToken,
                });

                store.setTokens(res.data);

                originalRequest.headers = originalRequest.headers ?? {};
                originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return api(originalRequest);
            } catch (e) {
                console.log("error", e)
                store.logout();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;