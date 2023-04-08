import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../Components/TopBar";
import { theme } from "../style/theme";
import { Feed, FeedInfo } from "../Components/Feed";

function FeedPage() {
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code && code.length > 1) navigate("/login/oauth");
  });

  const navigate = useNavigate();
  const f = new FeedInfo(
    "홍길동",
    "국민의힘",
    "경기도 시흥시 시청로 20",
    "박유천",
    new Date(),
    "https://img.khan.co.kr/news/2023/03/09/rcv.YNA.20230118.PYH2023011816770005100_P1.jpg"
  );
  return (
    <theme.style.page>
      <TopBar selectedPageName="피드" />

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
