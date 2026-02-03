import styled from "styled-components";

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const WriteButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: #111;
  color: #fff;
  border-radius: 6px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Item = styled.li`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

export const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const PageButton = styled.button`
  padding: 6px 10px;
  border: 1px solid #ddd;
  background: ${(p) => (p.$active ? "#111" : "#fff")};
  color: ${(p) => (p.$active ? "#fff" : "#111")};
  border-radius: 6px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;