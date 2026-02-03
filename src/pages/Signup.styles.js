import styled from "styled-components";

export const Wrap = styled.div`
  max-width: 420px;
  margin: 60px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
`;

export const Field = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.div`
  font-size: 13px;
  color: #555;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
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

export const Helper = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #666;
`;

export const ErrorText = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: #d00;
`;