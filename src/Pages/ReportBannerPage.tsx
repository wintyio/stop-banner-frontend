import { Container as MapDiv, NaverMap } from "react-naver-maps";
import styled from "styled-components";
import { BannerImageInput } from "../Components/BannerImageInput";
import { PartyButton } from "../Components/PartyButton";
import { PoliticianSearch } from "../Components/PoliticianSearch";

import partyInfos from "../party_info.json";
import TopMenuBar from "../Components/TopMenuBar";
import { theme } from "../style/theme";

const PartyButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 8px;
`;

let key = 0;

interface ReportBannerPageProps {
  navermaps: any;
}

function ReportBannerPage(props: ReportBannerPageProps) {
  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);

  // navigator.geolocation.getCurrentPosition((coord) => {
  //   setLat(coord.coords.latitude);
  //   setLat(coord.coords.longitude);
  // });

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
      <PoliticianSearch />
      <div
        style={{ marginTop: 8, paddingLeft: 4, fontSize: 12, color: "#B9B9B9" }}
      >
        인물이 표기되지 않은 경우 입력하지 않아도 됩니다.
      </div>

      <theme.style.subTitle>사진</theme.style.subTitle>
      <BannerImageInput />

      <theme.style.subTitle>위치</theme.style.subTitle>
      <MapDiv
        style={{
          width: "100%",
          aspectRatio: 320 / 200,
          marginBottom: 36,
          border: `1px solid ${theme.color.black}`,
          borderRadius: 8,
        }}
      >
        {/* {lat != 0 && ( */}
        <NaverMap
          // defaultCenter={new props.navermaps.LatLng(lat, lng)}
          defaultZoom={15}
          onCenterChanged={(coord) => {
            console.log(coord);
          }}
        />
        {/* )} */}
      </MapDiv>

      <theme.style.defaultButton>올리기</theme.style.defaultButton>
    </theme.style.page>
  );
}

export default ReportBannerPage;
