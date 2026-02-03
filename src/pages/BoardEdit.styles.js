import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  background: #fff;
`;

export const Title = styled.h2`
  margin: 0 0 16px;
`;

export const Field = styled.div`
  margin-bottom: 14px;
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

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 180px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
  align-items: center;
`;

export const Button = styled.button`
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

export const Secondary = styled(Button)`
  background: #fff;
  color: #111;
  border: 1px solid #ddd;
`;

export const Hint = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 6px;
`;