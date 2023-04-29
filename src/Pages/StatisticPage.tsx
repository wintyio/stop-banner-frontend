import { useEffect, useState } from "react";
import TopMenuBar from "../Components/TopMenuBar";
import { theme } from "../style/theme";
import { PieChart } from "react-minimal-pie-chart";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getMemberRank,
  getPartyRank,
  selectMemberRankList,
  selectPartyRankData,
  selectPartyRankList,
} from "../features/counter/statisticSclice";
import PartyRank from "../classes/PartyRank";
import MemberRank from "../classes/MemberRank";

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

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export default function StatisticPage() {
  const dispatch = useAppDispatch();

  const partyRankList: Array<PartyRank> = useAppSelector(selectPartyRankList);
  const memberRankList: Array<MemberRank> =
    useAppSelector(selectMemberRankList);
  const partyRankData = useAppSelector(selectPartyRankData);

  const init = async () => {
    dispatch(getPartyRank());
    dispatch(getMemberRank());
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <theme.style.page
      style={{ fontSize: 20, fontWeight: 600 }}
      paddingBottom={67}
    >
      <TopMenuBar selectedPageName="통계" />

      <theme.style.subTitle>정당별</theme.style.subTitle>

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
                fontSize: `${lerp(4, 5.5, (dataEntry.percentage - 5) / 50)}px`,
                mixBlendMode: "darken",
                filter: "brightness(1)",
              }}
            >
              {dataEntry.title}
            </text>
          )}
          labelPosition={70}
          startAngle={-90}
          lineWidth={60}
          animate
          data={partyRankData}
          style={{ margin: "-50px" }}
          center={[75, 75]}
          viewBoxSize={[150, 150]}
        />
      </div>

      {partyRankList.map((value, index) => {
        return (
          <RankLineDiv>
            <RankSpan>
              <span>{index + 1}</span>
            </RankSpan>
            <span>{value.party?.name}</span>
            <theme.style.flexOne />
            <span
              style={{
                marginRight: 12,
                fontSize: 16,
                fontWeight: 600,
                color: theme.color.gray1,
              }}
            >
              {value.count}건
            </span>
            <span>{value.percent}%</span>
          </RankLineDiv>
        );
      })}

      <theme.style.subTitle style={{ marginTop: 40 }}>
        인물별
      </theme.style.subTitle>

      {memberRankList.map((value, index) => {
        return (
          <RankLineDiv>
            <RankSpan>
              <span>{index + 1}</span>
            </RankSpan>
            <span>{value.name}</span>
            <theme.style.flexOne />
            <span>{value.count}건</span>
          </RankLineDiv>
        );
      })}
    </theme.style.page>
  );
}
