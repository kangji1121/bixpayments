import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getBoardCategories, getBoardDetail, updateBoard } from "../api/boards";
import * as S from "./BoardEdit.styles";

export default function BoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const didInitRef = useRef(false);

  useEffect(() => {
    didInitRef.current = false;
  }, [id]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("NOTICE");

  const {
    data: detailRes,
    isLoading: detailLoading,
    isError: detailError,
  } = useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoardDetail(id),
  });

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

  useEffect(() => {
    if (!detailRes?.data) return;
    if (didInitRef.current) return;

    const b = detailRes.data;
    setTitle(b.title ?? "");
    setContent(b.content ?? "");
    // detail 응답이 category 또는 boardCategory로 올 수 있어 둘 다 처리
    setCategory(b.category ?? b.boardCategory ?? "NOTICE");

    didInitRef.current = true;
  }, [detailRes]);

  const updateMutation = useMutation({
    mutationFn: () => updateBoard({ id, title, content, category }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["board", id] });
      navigate(`/boards/${id}`);
    },
    onError: () => alert("수정 실패"),
  });

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    updateMutation.mutate();
  };

  if (detailLoading) return <div>로딩중...</div>;
  if (detailError) return <div>불러오기에 실패했습니다.</div>;

  return (
    <S.Container>
      <S.Title>글 수정</S.Title>

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
          <S.Button disabled={!isValid || updateMutation.isPending}>
            {updateMutation.isPending ? "수정 중..." : "수정"}
          </S.Button>

          <Link to={`/boards/${id}`}>
            <S.Secondary as="span">취소</S.Secondary>
          </Link>
        </S.Actions>
      </form>
    </S.Container>
  );
}
