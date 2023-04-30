import { useEffect, useRef, useState } from "react";
import axios from "axios";
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
import { myConstants } from "../constants/constant";

interface SubTitleButtonProps {
  selected: boolean;
}

const SubTitleButton = styled(theme.style.subTitle)`
  color: ${(props: SubTitleButtonProps) =>
    props.selected ? theme.color.black : theme.color.gray2};
  margin-top: 0;
  padding-bottom: 4px;
  border-bottom: ${(props: SubTitleButtonProps) =>
    props.selected ? `2px solid ${theme.color.black}` : `0px`};
  cursor: pointer;
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

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export default function StatisticPage() {
  const dispatch = useAppDispatch();

  const partyRankList: Array<PartyRank> = useAppSelector(selectPartyRankList);
  const memberRankList: Array<MemberRank> =
    useAppSelector(selectMemberRankList);
  const partyRankData = useAppSelector(selectPartyRankData);

  const [selectSubTitle, setSelectSubTitle] = useState(0);

  const init = async () => {
    dispatch(getPartyRank());
    dispatch(getMemberRank());
  };

  useEffect(() => {
    init();
    initMap();
  }, []);

  const mapElement = useRef(null);

  let renderMap = false;

  const initMap = () => {
    const { naverOriginal } = window;
    let naver = naverOriginal;
    if (!mapElement.current || !naver) {
      // setTimeout(initMap, 1000);
      return;
    }

    const location = new naver.maps.LatLng(36.0207091, 127.9204629);
    const mapOptions = {
      center: location,
      zoom: 6,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    const renderHeatMap = (data: any) => {
      if (renderMap) return;
      renderMap = true;

      new naver.maps.visualization.HeatMap({
        map: map,
        data,
      });
    };

    // 1초 뒤 렌더링
    setTimeout(() => {
      if (renderMap) return;
      axios
        .get(myConstants.wintyHostUrl + "/forum/positions")
        .then((val: any) => renderHeatMap(val.data.result));
    }, 1000);

    // 또는 콘텐츠 로드 완료 시, 렌더링
    naver.maps.onJSContentLoaded = () => {
      if (renderMap) return;
      axios
        .get(myConstants.wintyHostUrl + "/forum/positions")
        .then((val: any) => renderHeatMap(val.data.result));
    };
  };

  return (
    <theme.style.page paddingBottom={67}>
      <TopMenuBar selectedPageName="통계" />

      <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
        <SubTitleButton
          selected={selectSubTitle === 0}
          onClick={() => setSelectSubTitle(0)}
        >
          정당별
        </SubTitleButton>
        <SubTitleButton
          selected={selectSubTitle === 1}
          onClick={() => setSelectSubTitle(1)}
        >
          전체 지도
        </SubTitleButton>
      </div>

      <div style={{ fontSize: 20, fontWeight: 600 }}>
        {/* <------- 정당별 -------> */}
        {selectSubTitle === 0 && (
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
                  fontSize: `${lerp(
                    4,
                    5.5,
                    (dataEntry.percentage - 5) / 50
                  )}px`,
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
            style={{ width: "100%", aspectRatio: "150/120" }}
            data={partyRankData}
            center={[75, 60]}
            viewBoxSize={[150, 120]}
          />
        )}
        {selectSubTitle === 0 &&
          partyRankList.map((value, index) => {
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
        {/* >------- 정당별 -------< */}

        {/* <------- 전체 지도 -------> */}
        <div>
          <div
            ref={mapElement}
            style={{
              position: selectSubTitle === 1 ? "relative" : "absolute",
              top: selectSubTitle === 1 ? 0 : -100000,
              borderRadius: 8,
              width: "100%",
              aspectRatio: "150/120",
            }}
          />
        </div>
        {/* >------- 전체 지도 -------< */}

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
      </div>
    </theme.style.page>
  );
}
