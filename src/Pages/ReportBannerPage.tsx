import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectLocation,
  selectMemberName,
  selectPartyIndex,
  setLocation,
  setMemberName,
  submitReportBanner,
} from "../features/counter/reportBannerSlice";
import TopMenuBar from "../Components/TopMenuBar";
import { BannerImageInput } from "../Components/BannerImageInput";
import { PartyButton } from "../Components/PartyButton";
import { MapSearchInput } from "../Components/MapSearchInput";
import { Container as MapDiv, Marker, NaverMap } from "react-naver-maps";
import styled from "styled-components";
import { theme } from "../style/theme";
import { BiCurrentLocation } from "react-icons/bi";
import { useState } from "react";
import { selectWintyAccessToken } from "../features/counter/loginSlice";
import { myConstants } from "../constants/constant";
import { useNavigate } from "react-router-dom";

const PartyButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 8px;
`;

const SmallDescription = styled.div`
  margin-top: 8px;
  padding-left: 4px;
  font-size: 12px;
  color: ${theme.color.gray1};
`;

const GPSButton = styled(theme.style.defaultButton)`
  display: inline-block;
  padding: 2px 4px;
  margin-left: 10px;
  ${theme.style.defaultBorder}
`;

const NaverDivStyle = {
  width: "100%",
  aspectRatio: 320 / 200,
  marginTop: 20,
  border: `1px solid ${theme.color.black}`,
  borderRadius: 8,
};

let key = 0;

interface ReportBannerPageProps {
  navermaps: any;
}

function ReportBannerPage(props: ReportBannerPageProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedPartyIndex = useAppSelector(selectPartyIndex);
  const memberName = useAppSelector(selectMemberName);
  const location = useAppSelector(selectLocation);
  const wintyAccessToken = useAppSelector(selectWintyAccessToken);
  const [processingGPS, setProcessingGPS] = useState(false);
  const [submit, setSubmit] = useState(false);

  const LatLng = props.navermaps.LatLng;

  const onSubmit = async () => {
    if (submit) return;
    setSubmit(true);

    let _submit = await dispatch(submitReportBanner(wintyAccessToken));
    if (submitReportBanner.fulfilled.match(_submit)) navigate("/");
    else {
      setSubmit(false);
      window.confirm(
        `올리기 실패: ${JSON.stringify(
          _submit.payload ? _submit.payload : _submit.error
        )}`
      );
    }
  };

  return (
    <theme.style.page paddingBottom={65}>
      <TopMenuBar selectedPageName="제보하기" />

      <theme.style.subTitle>사진</theme.style.subTitle>
      <BannerImageInput />

      <theme.style.subTitle>정당</theme.style.subTitle>
      <PartyButtons>
        {myConstants.partyInfos.map((val) => {
          return (
            <PartyButton
              key={key++}
              party={val}
              selected={selectedPartyIndex === val.index}
            />
          );
        })}
      </PartyButtons>

      <theme.style.subTitle>인물</theme.style.subTitle>
      <theme.style.searchInput
        value={memberName}
        onChange={(e) => dispatch(setMemberName(e.target.value))}
        placeholder="인물의 이름을 입력하세요"
      />
      <SmallDescription>
        인물이 표기되지 않은 경우 입력하지 않아도 됩니다.
      </SmallDescription>

      <theme.style.subTitle>
        위치
        {"geolocation" in navigator && (
          <GPSButton
            onClick={() => {
              if (processingGPS) return;
              setProcessingGPS(true);

              navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                  setProcessingGPS(false);
                  dispatch(setLocation([coords.latitude, coords.longitude]));
                },
                () => {
                  setProcessingGPS(false);
                  window.confirm(
                    "위치를 확인할 수 없습니다. 직접 검색해주세요."
                  );
                }
              );
            }}
          >
            <BiCurrentLocation style={{ marginBottom: -2 }} />
            <span>{processingGPS ? "위치 검색 중.." : "헌재 위치로"}</span>
          </GPSButton>
        )}
      </theme.style.subTitle>

      <MapSearchInput />

      <MapDiv style={NaverDivStyle}>
        {location && (
          <NaverMap
            defaultZoom={17}
            center={new LatLng(location[0], location[1])}
            onCenterChanged={(coord) =>
              dispatch(setLocation([coord.lat(), coord.lng()]))
            }
          >
            <Marker position={new LatLng(location[0], location[1])} />
          </NaverMap>
        )}
      </MapDiv>

      <SmallDescription style={{ marginBottom: 36 }}>
        지도를 움직여 현수막 위치를 지정해주세요.
      </SmallDescription>

      <theme.style.defaultButton onClick={onSubmit}>
        {submit ? "올리는 중.." : "올리기"}
      </theme.style.defaultButton>
    </theme.style.page>
  );
}

export default ReportBannerPage;
