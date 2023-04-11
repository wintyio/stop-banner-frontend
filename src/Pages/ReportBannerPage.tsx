import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectLocation,
  setLocation,
} from "../features/counter/reportBannerSlice";
import TopMenuBar from "../Components/TopMenuBar";
import { BannerImageInput } from "../Components/BannerImageInput";
import { PartyButton } from "../Components/PartyButton";
import { MapSearchInput } from "../Components/MapSearchInput";
import { Container as MapDiv, Marker, NaverMap } from "react-naver-maps";
import styled from "styled-components";
import { theme } from "../style/theme";
import { BiCurrentLocation } from "react-icons/bi";
import partyInfos from "../party_info.json";
import { useState } from "react";

const PartyButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 8px;
`;

const GPSButton = styled(theme.style.defaultButton)`
  display: inline-block;
  padding: 2px 4px;
  margin-left: 10px;
  ${theme.style.defaultBorder}
`;

let key = 0;

interface ReportBannerPageProps {
  navermaps: any;
}

function ReportBannerPage(props: ReportBannerPageProps) {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectLocation);
  const [isFindingCurrentPosition, setIsFindingCurrentPosition] =
    useState(false);

  return (
    <theme.style.page paddingBottom={65}>
      <TopMenuBar selectedPageName="제보하기" />

      <theme.style.subTitle>정당</theme.style.subTitle>
      <PartyButtons>
        {partyInfos.map((val) => {
          return (
            <PartyButton key={key++} name={val.name} img_uri={val.img_uri} />
          );
        })}
      </PartyButtons>

      <theme.style.subTitle>인물</theme.style.subTitle>
      <theme.style.searchInput placeholder="인물의 이름을 입력하세요" />
      <div
        style={{
          marginTop: 8,
          paddingLeft: 4,
          fontSize: 12,
          color: theme.color.gray1,
        }}
      >
        인물이 표기되지 않은 경우 입력하지 않아도 됩니다.
      </div>

      <theme.style.subTitle>사진</theme.style.subTitle>
      <BannerImageInput />

      <theme.style.subTitle>
        위치
        {"geolocation" in navigator && (
          <GPSButton
            onClick={() => {
              if (isFindingCurrentPosition) return;

              setIsFindingCurrentPosition(true);
              navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                  dispatch(setLocation([coords.latitude, coords.longitude]));
                  setIsFindingCurrentPosition(false);
                },
                () => {
                  setIsFindingCurrentPosition(false);
                  window.confirm(
                    "위치를 찾을 수 없습니다. 검색으로 위치를 지정해주세요."
                  );
                }
              );
            }}
          >
            <BiCurrentLocation style={{ marginBottom: -2 }} />
            <span>
              {isFindingCurrentPosition ? "위치 검색 중.." : "헌재 위치로"}
            </span>
          </GPSButton>
        )}
      </theme.style.subTitle>

      <MapSearchInput />

      <MapDiv
        style={{
          width: "100%",
          aspectRatio: 320 / 200,
          marginTop: 20,
          border: `1px solid ${theme.color.black}`,
          borderRadius: 8,
        }}
      >
        {location && (
          <NaverMap
            defaultZoom={17}
            onCenterChanged={(coord) => {
              dispatch(setLocation([coord.lat(), coord.lng()]));
            }}
            center={new props.navermaps.LatLng(location[0], location[1])}
          >
            <Marker
              position={new props.navermaps.LatLng(location[0], location[1])}
            />
          </NaverMap>
        )}
      </MapDiv>

      <div
        style={{
          marginTop: 8,
          marginBottom: 36,
          paddingLeft: 4,
          fontSize: 12,
          color: theme.color.gray1,
        }}
      >
        지도를 움직여 현수막 위치를 지정해주세요.
      </div>

      <theme.style.defaultButton onClick={() => {}}>
        올리기
      </theme.style.defaultButton>
    </theme.style.page>
  );
}

export default ReportBannerPage;
