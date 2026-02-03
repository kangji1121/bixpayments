import axios from "axios";
import useAuthStore from "../store/authStore";

const BASE_URL = "https://front-mission.bigs.or.kr";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터: accessToken 자동 첨부
api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// 응답 인터셉터: 401 → refresh → 재시도 1회
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
                const res = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    { refreshToken: store.refreshToken }
                );

                store.setTokens(res.data);
                originalRequest.headers.Authorization =
                    `Bearer ${res.data.accessToken}`;

                return api(originalRequest);
            } catch (error) {
                console.error("refresh failed", error);
                store.logout();
                window.location.href = "/login";
            }
        }



        return Promise.reject(error);
    }
);

export default api;