import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopMenuBar from "../Components/TopMenuBar";
import { theme } from "../style/theme";
import { PieChart } from "react-minimal-pie-chart";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getUserRank,
  selectUserRankList,
} from "../features/counter/statisticSclice";
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

export default function RankPage() {
  const dispatch = useAppDispatch();

  const userRankList: Array<MemberRank> = useAppSelector(selectUserRankList);

  useEffect(() => {
    dispatch(getUserRank());
  }, []);

  return (
    <theme.style.page
      style={{ fontSize: 20, fontWeight: 600 }}
      paddingBottom={67}
    >
      <TopMenuBar selectedPageName="랭킹" />

      <theme.style.subTitle>랭킹</theme.style.subTitle>

      {userRankList.map((value, index) => {
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
