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

const Page = styled.div``;
const MainTitle = styled.h1``;
const SubTitle = styled.h2``;

const partyImgUri =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/People_Power_Party_%28South_Korea%29%2C_signature_1.svg/200px-People_Power_Party_%28South_Korea%29%2C_signature_1.svg.png";

const partyInfos = [
  { name: "국민의 힘", img_uri: partyImgUri },
  { name: "더불어민주당", img_uri: partyImgUri },
  { name: "정의당", img_uri: partyImgUri },
  { name: "기타", img_uri: partyImgUri },
];

let key = 0;

function ReportPage() {
  const navermaps = useNavermaps();

  return (
    <Page>
      <MainTitle>제보하기</MainTitle>

      <SubTitle>정당</SubTitle>
      {partyInfos.map((val) => {
        return (
          <PartyButton key={key++} name={val.name} img_uri={val.img_uri} />
        );
      })}

      <SubTitle>인물</SubTitle>
      <PoliticianSearch />

      <SubTitle>사진</SubTitle>
      <BannerImageInput />

      <SubTitle>위치</SubTitle>
      <MapDiv style={{ width: "100%", height: 300, marginBottom: 50 }}>
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
