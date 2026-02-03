import { useNavigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as S from "./BoardDetail.styles";
import { deleteBoard, getBoardDetail } from "../api/boards";
import useAuthStore from "../store/authStore";

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
    <S.Container>
      <S.Title>{board.title}</S.Title>
      <S.Meta>
        {board.category ?? board.boardCategory} · {board.createdAt.slice(0, 10)}
      </S.Meta>

      {imageSrc && <S.Image src={imageSrc} alt="board image" />}

      <S.Content>{board.content}</S.Content>

      <S.ActionBar>
        <Link to="/boards">
          <S.Button as="span">목록</S.Button>
        </Link>

        {accessToken && (
          <>
            <S.Button onClick={() => navigate(`/boards/${id}/edit`)}>
              수정
            </S.Button>
            <S.Button
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (window.confirm("삭제할까요?")) {
                  deleteMutation.mutate();
                }
              }}
            >
              {deleteMutation.isPending ? "삭제중..." : "삭제"}
            </S.Button>
          </>
        )}
      </S.ActionBar>
    </S.Container>
  );
}
