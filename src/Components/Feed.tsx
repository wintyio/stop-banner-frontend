import styled from "styled-components";
import { theme } from "../style/theme";
import { FeedImage } from "./FeedImage";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setArticleIndex } from "../features/counter/reportArticleSlice";
import { selectLoginStatus } from "../features/counter/loginSlice";
export class FeedInfo {
  index: number;
  memberName: string;
  partyName: string;
  position: string;
  userName: string;
  date: Date;
  imgUrl: string;

  constructor(
    index: number,
    memberName: string,
    partyName: string,
    position: string,
    userName: string,
    date: Date,
    imgUrl: string
  ) {
    this.index = index;
    this.memberName = memberName;
    this.partyName = partyName;
    this.position = position;
    this.userName = userName;
    this.date = date;
    this.imgUrl = imgUrl;
  }
}

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

interface Props {
  feedInfo: FeedInfo;
}

export function Feed(props: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(selectLoginStatus);

  const reportArticle = (index: number) => {
    if (loginStatus !== "logged in") {
      let check = window.confirm(
        "게시글을 신고하려면 로그인이 필요합니다.\n로그인 페이지로 이동할까요?"
      );

      if (check) navigate("/login");

      return;
    }

    dispatch(setArticleIndex(index));
    navigate("/report/article");
  };

  return (
    <ContentDiv>
      <InfoLineDiv style={{ marginBottom: 4 }}>
        <PartyInfoSpan>
          {props.feedInfo.memberName} · {props.feedInfo.partyName}
        </PartyInfoSpan>
        <BsThreeDots onClick={() => reportArticle(props.feedInfo.index)} />
      </InfoLineDiv>

      <InfoLineDiv style={{ marginBottom: 12 }}>
        <FeedInfoSpan>{props.feedInfo.position}</FeedInfoSpan>
        <FeedInfoSpan>
          {props.feedInfo.userName} |{" "}
          {props.feedInfo.date.toLocaleDateString("ko-KR", {
            day: "2-digit",
            year: "2-digit",
            month: "2-digit",
            // weekday: "narrow",
          })}
        </FeedInfoSpan>
      </InfoLineDiv>

      <FeedImage feedInfo={props.feedInfo} />
    </ContentDiv>
  );
}
