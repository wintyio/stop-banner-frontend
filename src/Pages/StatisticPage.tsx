import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../Components/TopBar";
import { theme } from "../style/theme";
import { Feed, FeedInfo } from "../Components/Feed";
import { PieChart } from "react-minimal-pie-chart";
import styled from "styled-components";

const SubTitle = styled.div`
  margin-bottom: 20px;
`;

const RankLineDiv = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
`;

const RankSpan = styled.span`
  display: flex;
  width: 36px;
  height: 36px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${theme.color.black};
  color: ${theme.color.white};
`;

const PartyRankInfo = [
  { title: "국민의힘", partyName: "국민의힘", value: 60, color: "#D95151" },
  {
    title: "더불어민주당",
    partyName: "더불어민주당",
    value: 35,
    color: "#4E55FE",
  },
  { title: "정의당", partyName: "정의당", value: 3, color: "#FBE524" },
  { title: "기타", partyName: "기타", value: 2, color: "#D9D9D9" },
];

let MemberRankInfo = [
  {
    memberName: "홍길동",
    title: "국민의힘",
    partyName: "국민의힘",
    value: 60,
    color: "#D95151",
  },
  {
    memberName: "홍길동",
    title: "더불어민주당",
    partyName: "더불어민주당",
    value: 35,
    color: "#4E55FE",
  },
  {
    memberName: "홍길동",
    title: "정의당",
    partyName: "정의당",
    value: 3,
    color: "#FBE524",
  },
  {
    memberName: "홍길동",
    title: "기타",
    partyName: "기타",
    value: 2,
    color: "#D9D9D9",
  },
  {
    memberName: "홍길동",
    title: "국민의힘",
    partyName: "국민의힘",
    value: 60,
    color: "#D95151",
  },
  {
    memberName: "홍길동",
    title: "더불어민주당",
    partyName: "더불어민주당",
    value: 35,
    color: "#4E55FE",
  },
  {
    memberName: "홍길동",
    title: "정의당",
    partyName: "정의당",
    value: 3,
    color: "#FBE524",
  },
  {
    memberName: "홍길동",
    title: "기타",
    partyName: "기타",
    value: 2,
    color: "#D9D9D9",
  },
];

MemberRankInfo = [...MemberRankInfo, ...MemberRankInfo];

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export default function StatisticPage() {
  return (
    <theme.style.page
      style={{ fontSize: 20, fontWeight: 600 }}
      paddingBottom={67}
    >
      <TopBar selectedPageName="통계" />

      <SubTitle>정당별</SubTitle>

      <div style={{ textAlign: "center" }}>
        <PieChart
          label={({ x, y, dx, dy, dataEntry }) => (
            <text
              x={x}
              y={y}
              dx={dx}
              dy={dy}
              dominant-baseline="central"
              text-anchor="middle"
              style={{
                fontSize: `${lerp(4, 7, (dataEntry.percentage - 5) / 50)}px`,
                mixBlendMode: "overlay",
                filter: "brightness(1)",
              }}
            >
              {Math.round(dataEntry.percentage) + "%"}
            </text>
          )}
          labelPosition={80}
          startAngle={-90}
          lineWidth={60}
          segmentsShift={0.5}
          animate
          data={PartyRankInfo}
          style={{ width: "70%" }}
        />
      </div>

      {PartyRankInfo.map((value, index) => {
        return (
          <RankLineDiv>
            <RankSpan>
              <span>{index + 1}</span>
            </RankSpan>
            <span>{value.partyName}</span>
            <theme.style.flexOne />
            <span>{value.value}%</span>
          </RankLineDiv>
        );
      })}

      <SubTitle style={{ marginTop: 40 }}>인물별</SubTitle>

      <div style={{ textAlign: "center" }}>
        <PieChart
          label={({ x, y, dx, dy, dataEntry }) => (
            <text
              x={x}
              y={y}
              dx={dx}
              dy={dy}
              dominant-baseline="central"
              text-anchor="middle"
              style={{
                fontSize: `${lerp(4, 7, (dataEntry.percentage - 5) / 50)}px`,
                mixBlendMode: "overlay",
                filter: "brightness(1)",
              }}
            >
              {Math.round(dataEntry.percentage) + "%"}
            </text>
          )}
          labelPosition={80}
          startAngle={-90}
          lineWidth={60}
          segmentsShift={0.5}
          animate
          data={MemberRankInfo}
          style={{ width: "70%" }}
        />
      </div>

      {MemberRankInfo.map((value, index) => {
        return (
          <RankLineDiv>
            <RankSpan>
              <span>{index + 1}</span>
            </RankSpan>
            <span>{value.memberName}</span>
            <theme.style.flexOne />
            <span>{value.value}%</span>
          </RankLineDiv>
        );
      })}
    </theme.style.page>
  );
}
