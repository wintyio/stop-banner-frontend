import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { kakaoLoginAsync } from "../features/counter/loginSlice";
import { theme } from "../style/theme";
import { RiKakaoTalkFill } from "react-icons/ri";
import TopTitleBar from "../Components/TopTitleBar";
import logo from "../img/logo_motion.gif";

const Page = styled(theme.style.page)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 50px;
`;

const Description = styled.div`
  margin-bottom: 17px;
  font-size: 16px;
`;

const LoginButton = styled(theme.style.defaultButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.black};
  background-color: #fee500;
`;

const SmallDescription = styled.div`
  margin-top: 10px;
  padding-left: 4px;
  font-size: 12px;
  color: ${theme.color.gray1};
`;

function LoginPage() {
  const dispatch = useAppDispatch();

  return (
    <Page>
      <TopTitleBar titleName=" " />

      <theme.style.flexOne />

      <img src={logo} style={{ width: 50, marginBottom: 20 }} />
      <theme.style.mainTitle id="logo-text">현수막 헌터</theme.style.mainTitle>
      <Description>정당 현수막 제보 서비스</Description>

      <theme.style.flexOne />
      <theme.style.flexOne />
      <theme.style.flexOne />
      <theme.style.flexOne />
      <theme.style.flexOne />

      <LoginButton onClick={() => dispatch(kakaoLoginAsync())}>
        <RiKakaoTalkFill style={{ marginRight: 10 }} />
        <span>카카오로 시작하기</span>
      </LoginButton>
      <SmallDescription style={{ marginBottom: -6 }}>
        본 서비스는 어떠한 개인정보도 수집하지 않습니다.
      </SmallDescription>
      <SmallDescription>
        회원 가입 시,{" "}
        <a
          style={{ textDecoration: "underline" }}
          href="https://pickple.notion.site/pickple/81e6dadc82514735a8b64309229e39bd"
          target="_blank"
          rel="noreferrer"
        >
          서비스 이용약관
        </a>
        에 동의한 것으로 간주합니다.
      </SmallDescription>
    </Page>
  );
}

export default LoginPage;
