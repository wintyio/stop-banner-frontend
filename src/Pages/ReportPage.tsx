import {
  Container as MapDiv,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
} from "react-naver-maps";
import styled from "styled-components";
import { BannerImageInput } from "../Components/BannerImageInput";
import { ConfirmButton } from "../Components/ConfirmButton";
import { PartyButton } from "../Components/PartyButton";
import { PoliticianSearch } from "../Components/PoliticianSearch";

import partyInfos from "../party_info.json";

const Page = styled.div`
  padding: 44px 20px 65px 20px;
`;
const MainTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
`;
const SubTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin: 40px 0 20px 0;
`;

const PartyButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 8px;
`;

let key = 0;

function ReportPage() {
  const navermaps = useNavermaps();

  return (
    <Page>
      <MainTitle>제보하기</MainTitle>

      <SubTitle>정당</SubTitle>
      <PartyButtons>
        {partyInfos.map((val) => {
          return (
            <PartyButton key={key++} name={val.name} img_uri={val.img_uri} />
          );
        })}
      </PartyButtons>

      <SubTitle>인물</SubTitle>
      <PoliticianSearch />
      <div
        style={{ marginTop: 8, paddingLeft: 4, fontSize: 12, color: "#B9B9B9" }}
      >
        인물이 표기되지 않은 경우 입력하지 않아도 됩니다.
      </div>

      <SubTitle>사진</SubTitle>
      <BannerImageInput />

      <SubTitle>위치</SubTitle>
      <MapDiv
        style={{
          width: "100%",
          aspectRatio: 320 / 200,
          marginBottom: 36,
          border: `1px solid ${"#BCBCBC"}`,
          borderRadius: 8,
        }}
      >
        <NaverMap
          defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
          defaultZoom={15}
        />
      </MapDiv>

      <ConfirmButton />
    </Page>
  );
}

export default ReportPage;
