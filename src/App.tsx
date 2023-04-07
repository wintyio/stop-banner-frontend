import { useNavermaps } from "react-naver-maps";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import FeedPage from "./Pages/FeedPage";
import LoginPage from "./Pages/LoginPage";
import KakaoRedirectHandler from "./Pages/KakaoRedirectHandler";
import ReportPage from "./Pages/ReportPage";
import styled from "styled-components";
import { theme } from "./style/theme";
import EditNicknamePage from "./Pages/EditNicknamePage";

const AppDiv = styled.div`
  max-width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  font-weight: 500;
  color: ${theme.color.black};
  border: 1px black solid;
`;

function App() {
  const navermaps = useNavermaps();

  return (
    <AppDiv id="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
          <Route
            path="/report"
            element={<ReportPage navermaps={navermaps} />}
          />
          <Route path="/edit/nickname" element={<EditNicknamePage />} />
        </Routes>
      </HashRouter>
    </AppDiv>
  );
}

export default App;
