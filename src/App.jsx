import Header from "./components/layout/Header";
import Router from "./routes/Router";
import styled from "styled-components";

const Main = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
`;

export default function App() {
  return (
    <>
      <Header />
      <Main>
        <Router />
      </Main>
    </>
  );
}
