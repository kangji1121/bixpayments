import api from "./client";

export const loginApi = (data) => api.post("/auth/signin", data);
export const signupApi = (data) => api.post("/auth/signup", data);