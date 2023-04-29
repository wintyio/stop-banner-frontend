import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { kakaoLoginAsync } from "../features/counter/loginSlice";
import { theme } from "../style/theme";
import { RiKakaoTalkFill } from "react-icons/ri";
import TopTitleBar from "../Components/TopTitleBar";

const Page = styled(theme.style.page)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 73px;
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

      <theme.style.mainTitle>현수막 헌터</theme.style.mainTitle>
      <Description>정당 현수막 제보 서비스</Description>

      <theme.style.flexOne />
      <theme.style.flexOne />
      <theme.style.flexOne />

      <LoginButton onClick={() => dispatch(kakaoLoginAsync())}>
        <RiKakaoTalkFill style={{ marginRight: 10 }} />
        <span>카카오로 시작하기</span>
      </LoginButton>
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
