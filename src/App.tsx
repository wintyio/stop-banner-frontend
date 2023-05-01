import { useNavermaps } from "react-naver-maps";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import FeedPage from "./Pages/FeedPage";
import IntroPage from "./Pages/IntroPage";
import StatisticPage from "./Pages/StatisticPage";
import RankPage from "./Pages/RankPage";
import ReportBannerPage from "./Pages/ReportBannerPage";
import ReportPostPage from "./Pages/ReportPostPage";
import LoginPage from "./Pages/LoginPage";
import KakaoRedirectHandler from "./Pages/KakaoRedirectHandler";
import EditNicknamePage from "./Pages/EditNicknamePage";
import MyPage from "./Pages/MyPage";

import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./app/store";

import styled from "styled-components";
import { theme } from "./style/theme";
import { useEffect } from "react";

const AppDiv = styled.div`
  max-width: 700px;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  font-weight: 500;
  color: ${theme.color.black};
  /* border: 1px black solid; */
`;

const persistor = persistStore(store);

function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
}

window.addEventListener("resize", () => setScreenSize());

const title = "현수막 헌터"; // 메인 타이틀

const pages = [
  { path: "/intro", subtitle: "서비스 소개" },
  { path: "/notice", subtitle: "Notice" },
  { path: "/statistic", subtitle: "통계" },
  { path: "/rank", subtitle: "랭킹" },
  { path: "/login", subtitle: "로그인" },
  { path: "/login/oauth", subtitle: "로그인" },
  { path: "/report/banner", subtitle: "제보하기" },
  { path: "/report/post", subtitle: "신고하기" },
  { path: "/my", subtitle: "MY" },
  { path: "/edit/nickname", subtitle: "닉네임 변경" },
];

function App() {
  const navermaps = useNavermaps();

  useEffect(() => setScreenSize());

  const { pathname } = useLocation(); // 현재 페이지 pathname

  useEffect(() => {
    // 현재 경로에 맞는 타이틀 찾기
    const oldTitle = document.title;
    const result = pages.find((p) => p.path === pathname);
    const newTitle = title + (result?.subtitle ? " - " + result?.subtitle : ""); // title 적용

    if (newTitle !== oldTitle) {
      document.title = newTitle;
      window.gtag("event", "페이지 변경", { oldTitle, newTitle });
    }
  }, [pathname]);

  return (
    <AppDiv id="App">
      <PersistGate persistor={persistor}>
        <Routes>
          <Route path="/" element={<FeedPage navermaps={navermaps} />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/statistic" element={<StatisticPage />} />
          <Route path="/rank" element={<RankPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
          <Route
            path="/report/banner"
            element={<ReportBannerPage navermaps={navermaps} />}
          />
          <Route path="/report/post" element={<ReportPostPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/edit/nickname" element={<EditNicknamePage />} />
        </Routes>
      </PersistGate>
    </AppDiv>
  );
}

export default App;
