import styled from "styled-components";
import { theme } from "../style/theme";
import img_accident from "../img/card_accident.jpg";
import img_damage from "../img/card_damage.jpg";
import img_pollution from "../img/card_pollution.jpg";
import TopTitleBar from "../Components/TopTitleBar";
import introThumb from "../img/intro_thumb.png";
import { useNavigate } from "react-router-dom";

interface BoxProps {
  backgroundImage: string;
}

const TitleBox = styled.div`
  padding: 10px 50px 100px 50px;
  margin: 0 -20px 30px -20px;
  background: linear-gradient(to bottom, #171717 0%, rgba(0, 0, 0, 0.814) 100%),
    ${theme.color.black} url(${introThumb}) no-repeat bottom 50% left 105% /
      160%;
  background-blend-mode: normal;
  color: ${theme.color.white};
  text-align: center;
  text-shadow: black 1px 1px 5px;
`;

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 320/512;
  padding: 50px 40px;
  margin: 0px 0 30px 0;
  background: linear-gradient(
      to bottom,
      #1e1e20 0%,
      rgba(30, 30, 32, 0.718) 100%
    ),
    url(${(props: BoxProps) => props.backgroundImage}) no-repeat center center /
      cover;
  background-color: ${theme.color.black};
  background-blend-mode: multiply, normal;
  color: ${theme.color.white};
  border-radius: 25px;
  @media screen and (min-width: 500px) {
    aspect-ratio: 560/315;
  }
`;

const BoxType = styled.div`
  font-size: 5vw;
  font-weight: 600;
  margin-bottom: 30px;
  @media screen and (min-width: 500px) {
    font-size: 30px;
  }
`;
const BoxInterview = styled.div`
  font-size: 8vw;
  font-weight: 700;
  margin-bottom: 30px;
  @media screen and (min-width: 500px) {
    font-size: 40px;
  }
`;
const BoxDescription = styled.div`
  font-size: 5vw;
  font-weight: 500;
  line-height: 7vw;
  @media screen and (min-width: 500px) {
    line-height: 30px;
    font-size: 20px;
  }
`;

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <theme.style.page>
      <TitleBox>
        <div style={{ marginLeft: -30 }}>
          <TopTitleBar titleName=" " />
        </div>

        <div
          style={{
            marginTop: 50,
            fontSize: 32,
            fontWeight: 500,
            marginBottom: 50,
          }}
        >
          정당 현수막
          <br />
          제보 서비스
          <br />
          <strong>“현수막 헌터"</strong>
        </div>
        <div style={{ fontSize: 16, fontWeight: 400, lineHeight: "24px" }}>
          최근 옥외광고물법이 일부개정되며
          <br />
          정당 현수막의 경우
          <br />
          <strong>15일의 표시기간 </strong>
          이외의
          <br />
          규정을 적용 받지 않습니다.
          <br />
          <br />
          이에 따른 부작용을 알리고,
          <br />
          정당 현수막에 대한 시민의 생각을 전달하고자
          <br />
          서비스를 시작하게 되었습니다.
        </div>
      </TitleBox>

      <Box backgroundImage={img_pollution}>
        <BoxType>환경오염</BoxType>
        <BoxInterview>“소각시 발생하는 1급 발암물질"...</BoxInterview>
        <BoxDescription>
          폐현수막은 사실상 재활용이 불가능해 소각하거나 매립해 처리합니다.
          <br />이 과정에서 다이옥신, 이산화탄소, 1급 발암물질 등이 배출되어
          환경오염을 유발합니다.
        </BoxDescription>
      </Box>

      <Box backgroundImage={img_accident}>
        <BoxType>안전 사고</BoxType>
        <BoxInterview>“현수막에 가려 안 보여요"...</BoxInterview>
        <BoxDescription>
          지정 게시대 외의 장소에 무질서하게 설치된 현수막은, 운전자와 보행자의
          시야 확보에 어려움을 줍니다.
          <br />
          이는 교통 사고 및 걸림 사고로 이어질 수 있습니다.
        </BoxDescription>
      </Box>

      <Box backgroundImage={img_damage}>
        <BoxType>거리 미관 훼손</BoxType>
        <BoxInterview>“너무 지저분해 보기 싫어요"...</BoxInterview>
        <BoxDescription>
          비방・왜곡・혐오 등 자극적인 문구의 현수막 난립으로 거리의 미관이
          훼손될 뿐아니라, 시민의 불쾌감도 조성하고 있습니다.
        </BoxDescription>
      </Box>

      <iframe
        style={{
          width: "100%",
          aspectRatio: "560/315",
          borderRadius: 25,
        }}
        width="560"
        src="https://www.youtube.com/embed/videoseries?list=PLaIRd0g61qoci7g1VoMOipjaR793jHR5B"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div
        style={{
          textAlign: "end",
          fontSize: 13,
          marginBottom: 30,
          color: theme.color.gray1,
        }}
      >
        3개의 관련 뉴스가 자동으로 연속 재생됩니다.
      </div>

      <div
        style={{
          padding: "100px 75px",
          margin: "0 -20px",
          backgroundColor: theme.color.black,
          color: theme.color.white,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 20,
            lineHeight: "24px",
          }}
        >
          인터넷을 통해
          <br />
          <strong>시민이 목소리를 낼 수 있는</strong>
          <br />
          건전한 문화 생태계,
          <br />
          <strong>함께</strong> 조성해요.
        </div>

        <theme.style.defaultButton
          style={{
            display: "inline-block",
            padding: "12px 37px",
            border: `1px solid ${theme.color.white}`,
            borderRadius: 24,
          }}
          onClick={() => {
            navigate(-1);
          }}
        >
          제보하기
        </theme.style.defaultButton>

        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            marginTop: 80,
            marginBottom: 20,
            lineHeight: "24px",
          }}
        >
          서버비용 후원
          <div style={{ fontSize: 13, marginTop: 10, lineHeight: 1.2 }}>
            아직 부족한 점이 많지만,
            <br />
            원활한 사용을 위해 노력하겠습니다!
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 10,
            rowGap: 10,
          }}
        >
          <a href="https://qr.kakaopay.com/Ej9Pz0e5N1f408200" target="_blank">
            <theme.style.defaultButton
              style={{
                display: "inline-block",
                padding: "12px 37px",
                border: `1px solid ${theme.color.white}`,
                borderRadius: 24,
              }}
            >
              카카오페이
            </theme.style.defaultButton>
          </a>

          <a href="https://toss.me/bannerhnt/1000" target="_blank">
            <theme.style.defaultButton
              style={{
                display: "inline-block",
                padding: "12px 37px",
                border: `1px solid ${theme.color.white}`,
                borderRadius: 24,
              }}
            >
              토스
            </theme.style.defaultButton>
          </a>
        </div>
      </div>
    </theme.style.page>
  );
}
