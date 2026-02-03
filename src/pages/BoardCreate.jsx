import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { createBoard, getBoardCategories } from "../api/boards";
import * as S from "./BoardCreate.styles";

export default function BoardCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("NOTICE");

  const { data: categoriesRes, isLoading: categoriesLoading } = useQuery({
    queryKey: ["boardCategories"],
    queryFn: getBoardCategories,
  });

  const categoryOptions = useMemo(() => {
    if (!categoriesRes?.data) return [];
    return Object.entries(categoriesRes.data).map(([key, label]) => ({
      key,
      label,
    }));
  }, [categoriesRes]);

  const createMutation = useMutation({
    mutationFn: () => createBoard({ title, content, category }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      navigate("/boards");
    },
    onError: () => alert("등록 실패"),
  });

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    createMutation.mutate();
  };

  return (
    <S.Container>
      <S.Title>글쓰기</S.Title>

      <form onSubmit={onSubmit}>
        <S.Field>
          <S.Label>카테고리</S.Label>
          <S.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={categoriesLoading}
          >
            {categoryOptions.length > 0 ? (
              categoryOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))
            ) : (
              <>
                <option value="NOTICE">공지</option>
                <option value="FREE">자유</option>
                <option value="QNA">Q&A</option>
                <option value="ETC">기타</option>
              </>
            )}
          </S.Select>
          <S.Hint>
            카테고리는 API(/boards/categories)로 불러오며, 실패 시 기본 옵션을
            사용합니다.
          </S.Hint>
        </S.Field>

        <S.Field>
          <S.Label>제목</S.Label>
          <S.Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </S.Field>

        <S.Field>
          <S.Label>내용</S.Label>
          <S.Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </S.Field>

        <S.Actions>
          <S.Button disabled={!isValid || createMutation.isPending}>
            {createMutation.isPending ? "등록 중..." : "등록"}
          </S.Button>

          <Link to="/boards">
            <S.Secondary as="span">취소</S.Secondary>
          </Link>
        </S.Actions>
      </form>
    </S.Container>
  );
}
