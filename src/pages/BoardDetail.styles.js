import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  background: #fff;
`;

export const ActionBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
`;

export const Button = styled.button`
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

export const Title = styled.h2`
  margin-bottom: 8px;
`;

export const Meta = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  max-width: 100%;
  margin-bottom: 20px;
  border-radius: 6px;
`;

export const Content = styled.div`
  white-space: pre-wrap;
  line-height: 1.5;
  margin-bottom: 20px;
`;