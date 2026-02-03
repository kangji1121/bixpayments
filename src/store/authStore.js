import { create } from "zustand";

function parseJwt(token) {
    try {
        if (!token) return null;
        const payload = token.split(".")[1];
        // JWT는 base64url이라 -,_ 보정 필요
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(json); // { name, username, iat, exp }
    } catch {
        return null;
    }
}

const useAuthStore = create((set) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    return {
        accessToken,
        refreshToken,
        user: parseJwt(accessToken),

        setTokens: ({ accessToken, refreshToken }) => {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            set({ accessToken, refreshToken, user: parseJwt(accessToken) });
        },

        logout: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            set({ accessToken: null, refreshToken: null, user: null });
        },
    };
});

export default useAuthStore;