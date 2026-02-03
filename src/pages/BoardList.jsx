import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getBoards } from "../api/boards";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const PageButton = styled.button`
  padding: 6px 10px;
  border: 1px solid #ddd;
  background: ${(p) => (p.$active ? "#111" : "#fff")};
  color: ${(p) => (p.$active ? "#fff" : "#111")};
  border-radius: 6px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const WriteButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: #111;
  color: #fff;
  border-radius: 6px;
`;

export default function BoardList() {
  const [page, setPage] = useState(0);
  const size = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["boards", page, size],
    queryFn: () => getBoards({ page, size }),
    keepPreviousData: true,
  });

  if (isLoading) return <div>로딩중...</div>;

  const boards = data.data.content;
  const totalPages = data.data.totalPages;

  const maxButtons = 7;
  let startPage = Math.max(0, page - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;
  if (endPage >= totalPages) {
    endPage = totalPages - 1;
    startPage = Math.max(0, endPage - maxButtons + 1);
  }
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <>
      <TopBar>
        <h2 style={{ margin: 0 }}>게시글 목록</h2>
        <Link to="/boards/new">
          <WriteButton type="button">글쓰기</WriteButton>
        </Link>
      </TopBar>

      <List>
        {boards.map((board) => (
          <Item key={board.id}>
            <Link to={`/boards/${board.id}`}>{board.title}</Link>
            <div style={{ fontSize: 12, color: "#666" }}>
              {board.category} · {board.createdAt.slice(0, 10)}
            </div>
          </Item>
        ))}
      </List>

      <Pagination>
        <PageButton disabled={page === 0} onClick={() => setPage(0)}>
          처음
        </PageButton>

        <PageButton disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          이전
        </PageButton>

        {pageNumbers.map((p) => (
          <PageButton key={p} $active={p === page} onClick={() => setPage(p)}>
            {p + 1}
          </PageButton>
        ))}

        <PageButton
          disabled={page + 1 === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          다음
        </PageButton>

        <PageButton
          disabled={page + 1 === totalPages}
          onClick={() => setPage(totalPages - 1)}
        >
          끝
        </PageButton>

        <span>
          {page + 1} / {totalPages}
        </span>
      </Pagination>
    </>
  );
}
