import { useNavigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteBoard, getBoardDetail } from "../api/boards";
import useAuthStore from "../store/authStore";

const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  background: #fff;
`;

const ActionBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 14px;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Title = styled.h2`
  margin-bottom: 8px;
`;

const Meta = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  margin-bottom: 20px;
  border-radius: 6px;
`;

const Content = styled.div`
  white-space: pre-wrap;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoardDetail(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      navigate("/boards");
    },
    onError: () => {
      alert("삭제 실패");
    },
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>불러오기에 실패했습니다.</div>;

  const board = data.data;
  const imageSrc = board.imageUrl
    ? board.imageUrl.startsWith("/")
      ? `https://front-mission.bigs.or.kr${board.imageUrl}`
      : board.imageUrl
    : null;

  return (
    <Container>
      <Title>{board.title}</Title>
      <Meta>
        {board.category} · {board.createdAt.slice(0, 10)}
      </Meta>

      {imageSrc && <Image src={imageSrc} alt="board image" />}

      <Content>{board.content}</Content>

      <ActionBar>
        <Link to="/boards">
          <Button as="span">목록</Button>
        </Link>

        {accessToken && (
          <>
            <Button onClick={() => navigate(`/boards/${id}/edit`)}>수정</Button>
            <Button
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (window.confirm("삭제할까요?")) {
                  deleteMutation.mutate();
                }
              }}
            >
              {deleteMutation.isPending ? "삭제중..." : "삭제"}
            </Button>
          </>
        )}
      </ActionBar>
    </Container>
  );
}
