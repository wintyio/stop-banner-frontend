import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopMenuBar from "../Components/TopMenuBar";
import { theme } from "../style/theme";
import { Feed, FeedInfo } from "../Components/Feed";
import styled, { keyframes } from "styled-components";

const loadingTextColorKeyframe = keyframes`
  from{color: #ffffffff;}
  to{color: #ffffff00;}
`;

const LoginLoadingDiv = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000c7;
  color: white;
  font-size: 40px;
  text-align: center;
  z-index: 100;
  animation: ${loadingTextColorKeyframe} 1s linear infinite alternate;
`;

function FeedPage() {
  const code = new URL(window.location.href).searchParams.get("code");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!code || code.length <= 1) return;

    setLoading(true);
    setTimeout(() => navigate("/login/oauth"), 3000);
  });

  const navigate = useNavigate();
  const f = new FeedInfo(
    1,
    "홍길동",
    "국민의힘",
    "경기도 시흥시 시청로 20",
    "박유천",
    new Date(),
    "https://img.khan.co.kr/news/2023/03/09/rcv.YNA.20230118.PYH2023011816770005100_P1.jpg"
  );

  return (
    <theme.style.page>
      {loading && <LoginLoadingDiv>로그인 중..</LoginLoadingDiv>}

      <TopMenuBar selectedPageName="피드" />

      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
      <Feed feedInfo={f} />
    </theme.style.page>
  );
}

export default FeedPage;
