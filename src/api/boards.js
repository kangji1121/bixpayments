import api from "./client";

export const getBoards = ({ page = 0, size = 10 }) =>
    api.get("/boards", { params: { page, size } });

export const getBoardDetail = (id) => api.get(`/boards/${id}`);

export const deleteBoard = (id) => api.delete(`/boards/${id}`);

export const getBoardCategories = () => api.get("/boards/categories");

// 글 등록 (파일 없음) — request는 application/json Blob으로
export const createBoard = ({ title, content, category }) => {
    const formData = new FormData();
    const payload = { title, content, category };

    formData.append(
        "request",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    // Content-Type 강제 지정 금지 (boundary 자동)
    return api.post("/boards", formData);
};