import styled from "styled-components";
import { theme } from "../style/theme";
import { FeedImage } from "./FeedImage";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPostId } from "../features/counter/reportPostSlice";
import { selectLoginStatus } from "../features/counter/loginSlice";
import { FeedInfo } from "../classes/FeedInfo";

const ContentDiv = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const InfoLineDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PartyInfoSpan = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const FeedInfoSpan = styled.span`
  font-size: 12px;
  color: ${theme.color.gray1};
`;

function timeForToday(timeValue: Date) {
  const today = new Date();

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  return timeValue.toLocaleDateString("ko-KR", {
    day: "2-digit",
    year: "2-digit",
    month: "2-digit",
    // weekday: "narrow",
  });

  // const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  // if (betweenTimeDay < 365) {
  //   return `${betweenTimeDay}일전`;
  // }

  // return `${Math.floor(betweenTimeDay / 365)}년전`;
}

interface Props {
  feedInfo: FeedInfo;
  navermaps: any;
}

export function Feed(props: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(selectLoginStatus);

  const reportPost = () => {
    if (loginStatus !== "logged in") {
      let check = window.confirm(
        "게시글을 신고하려면 로그인이 필요합니다.\n로그인 페이지로 이동할까요?"
      );

      dispatch(setPostId(props.feedInfo.id));

      if (check) navigate("/login");

      return;
    }

    dispatch(setPostId(props.feedInfo.id));

    navigate("/report/post");
  };

  return (
    <ContentDiv>
      <InfoLineDiv style={{ marginBottom: 4 }}>
        <PartyInfoSpan>
          {props.feedInfo.partyMemberName
            ? `${props.feedInfo.partyMemberName} ·`
            : ""}{" "}
          {props.feedInfo.partyName}
        </PartyInfoSpan>
        <BsThreeDots onClick={() => reportPost()} />
      </InfoLineDiv>

      <InfoLineDiv style={{ marginBottom: 12 }}>
        <FeedInfoSpan>{props.feedInfo.address}</FeedInfoSpan>
        <FeedInfoSpan>
          {props.feedInfo.userName} | {timeForToday(props.feedInfo.date)}
        </FeedInfoSpan>
      </InfoLineDiv>

      <FeedImage navermaps={props.navermaps} feedInfo={props.feedInfo} />
    </ContentDiv>
  );
}
