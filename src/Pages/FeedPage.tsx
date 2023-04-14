import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopMenuBar from "../Components/TopMenuBar";
import { theme } from "../style/theme";
import { Feed } from "../Components/Feed";
import styled, { keyframes } from "styled-components";
import { FeedAds } from "../Components/FeedAds";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  initFeedSlice,
  selectFeedInfoList,
  updateFeedInfoList,
} from "../features/counter/feedSlice";
import { FeedInfo } from "../classes/FeedInfo";

const loadingTextColorKeyframe = keyframes`
  from{color: #0d0000;}
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

interface Props {
  navermaps: any;
}

let key = 0;

function FeedPage(props: Props) {
  const code = new URL(window.location.href).searchParams.get("code");
  const dispatch = useAppDispatch();
  const feedInfoList = useAppSelector(selectFeedInfoList);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (code && code.length > 1) {
      setLoading(true);
      setTimeout(() => navigate("/login/oauth"), 3000);
    }
    dispatch(initFeedSlice());
    dispatch(updateFeedInfoList());
  }, []);

  const navigate = useNavigate();

  return (
    <theme.style.page>
      {loading && <LoginLoadingDiv>로그인 중..</LoginLoadingDiv>}

      <TopMenuBar selectedPageName="피드" />

      <FeedAds />

      {feedInfoList.map((feed: FeedInfo) => (
        <Feed key={key++} navermaps={props.navermaps} feedInfo={feed} />
      ))}
    </theme.style.page>
  );
}

export default FeedPage;
