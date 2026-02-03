import api from "./client";

export const getBoards = ({ page = 0, size = 10 }) =>
    api.get("/boards", { params: { page, size } });

export const getBoardDetail = (id) => api.get(`/boards/${id}`);

export const deleteBoard = (id) => api.delete(`/boards/${id}`);