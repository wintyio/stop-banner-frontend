import { NavermapsProvider } from "react-naver-maps";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import FeedPage from "./Pages/FeedPage";
import LoginPage from "./Pages/LoginPage";
import KakaoRedirectHandler from "./Pages/KakaoRedirectHandler";
import ReportPage from "./Pages/ReportPage";
import styled from "styled-components";
import { theme } from "./style/theme";

const AppDiv = styled.div`
  color: ${theme.color.black};
`;

function App() {
  return (
    <AppDiv id="App">
      <NavermapsProvider ncpClientId="4wpduqcu60">
        <HashRouter>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </HashRouter>
      </NavermapsProvider>
    </AppDiv>
  );
}

export default App;
