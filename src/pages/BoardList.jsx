import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getBoards } from "../api/boards";
import * as S from "./BoardList.styles";

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
      <S.TopBar>
        <h2 style={{ margin: 0 }}>게시글 목록</h2>
        <Link to="/boards/new">
          <S.WriteButton type="button">글쓰기</S.WriteButton>
        </Link>
      </S.TopBar>

      <S.List>
        {boards.map((board) => (
          <S.Item key={board.id}>
            <Link to={`/boards/${board.id}`}>{board.title}</Link>
            <div style={{ fontSize: 12, color: "#666" }}>
              {board.category} · {board.createdAt.slice(0, 10)}
            </div>
          </S.Item>
        ))}
      </S.List>

      <S.Pagination>
        <S.PageButton disabled={page === 0} onClick={() => setPage(0)}>
          처음
        </S.PageButton>

        <S.PageButton
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          이전
        </S.PageButton>

        {pageNumbers.map((p) => (
          <S.PageButton key={p} $active={p === page} onClick={() => setPage(p)}>
            {p + 1}
          </S.PageButton>
        ))}

        <S.PageButton
          disabled={page + 1 === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          다음
        </S.PageButton>

        <S.PageButton
          disabled={page + 1 === totalPages}
          onClick={() => setPage(totalPages - 1)}
        >
          끝
        </S.PageButton>

        <span>
          {page + 1} / {totalPages}
        </span>
      </S.Pagination>
    </>
  );
}
