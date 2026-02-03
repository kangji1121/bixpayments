import styled from "styled-components";

export const Wrap = styled.div`
  max-width: 360px;
  margin: 80px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 6px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;