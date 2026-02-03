import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { createBoard, getBoardCategories } from "../api/boards";

const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  background: #fff;
`;

const Title = styled.h2`
  margin: 0 0 16px;
`;

const Field = styled.div`
  margin-bottom: 14px;
`;

const Label = styled.div`
  font-size: 13px;
  color: #555;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 180px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 14px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Secondary = styled(Button)`
  background: #fff;
  color: #111;
  border: 1px solid #ddd;
`;

const Hint = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 6px;
`;

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
    <Container>
      <Title>글쓰기</Title>

      <form onSubmit={onSubmit}>
        <Field>
          <Label>카테고리</Label>
          <Select
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
          </Select>
          <Hint>
            카테고리는 API(/boards/categories)로 불러오며, 실패 시 기본 옵션을
            사용합니다.
          </Hint>
        </Field>

        <Field>
          <Label>제목</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>

        <Field>
          <Label>내용</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>

        <Actions>
          <Button disabled={!isValid || createMutation.isPending}>
            {createMutation.isPending ? "등록 중..." : "등록"}
          </Button>
          <Link to="/boards">
            <Secondary as="span">취소</Secondary>
          </Link>
        </Actions>
      </form>
    </Container>
  );
}
