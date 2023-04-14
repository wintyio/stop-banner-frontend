import { useNavermaps } from "react-naver-maps";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import FeedPage from "./Pages/FeedPage";
import IntroPage from "./Pages/IntroPage";
import StatisticPage from "./Pages/StatisticPage";
import ReportBannerPage from "./Pages/ReportBannerPage";
import ReportPostPage from "./Pages/ReportPostPage";
import LoginPage from "./Pages/LoginPage";
import KakaoRedirectHandler from "./Pages/KakaoRedirectHandler";

import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./app/store";

import styled from "styled-components";
import { theme } from "./style/theme";
import { useEffect } from "react";
import ReportArticlePage from "./Pages/ReportArticlePage";

const AppDiv = styled.div`
  max-width: 700px;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  font-weight: 500;
  color: ${theme.color.black};
  border: 1px black solid;
`;

const persistor = persistStore(store);

function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
}

window.addEventListener("resize", () => setScreenSize());

function App() {
  const navermaps = useNavermaps();

  useEffect(() => setScreenSize());

  return (
    <AppDiv id="App">
      <HashRouter>
        <PersistGate persistor={persistor}>
          <Routes>
            <Route path="/" element={<FeedPage navermaps={navermaps} />} />
            <Route path="/intro" element={<IntroPage />} />
            <Route path="/statistic" element={<StatisticPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
            <Route
              path="/report/banner"
              element={<ReportBannerPage navermaps={navermaps} />}
            />
            <Route path="/report/post" element={<ReportPostPage />} />
            <Route path="/edit/nickname" element={<EditNicknamePage />} />
          </Routes>
        </PersistGate>
      </HashRouter>
    </AppDiv>
  );
}

export default App;
