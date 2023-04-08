import styled from "styled-components";
import { theme } from "../style/theme";
import { FeedImage } from "./FeedImage";

export class FeedInfo {
  memberName: string;
  partyName: string;
  position: string;
  userName: string;
  date: Date;
  imgUrl: string;

  constructor(
    memberName: string,
    partyName: string,
    position: string,
    userName: string,
    date: Date,
    imgUrl: string
  ) {
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
  return (
    <ContentDiv>
      <InfoLineDiv style={{ marginBottom: 4 }}>
        <PartyInfoSpan>
          {props.feedInfo.memberName} · {props.feedInfo.partyName}
        </PartyInfoSpan>
        <span>···</span>
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
