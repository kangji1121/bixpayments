import api from "./client";

export const getBoards = ({ page = 0, size = 10 }) => {
    return api.get("/boards", {
        params: { page, size },
    });
};

export const getBoardDetail = (id) => {
    return api.get(`/boards/${id}`);
};