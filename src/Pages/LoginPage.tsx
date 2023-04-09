import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { kakaoLoginAsync } from "../features/counter/loginSlice";
import { theme } from "../style/theme";
import { RiKakaoTalkFill } from "react-icons/ri";

const Page = styled(theme.style.page)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 160px;
  padding-bottom: 73px;
`;

const Title = styled.div`
  margin-bottom: 17px;
  font-size: 36px;
  font-weight: 700;
`;

const Description = styled.div`
  margin-bottom: 17px;
  font-size: 20px;
`;

const LoginButton = styled(theme.style.defaultButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.black};
  background-color: #fee500;
`;

function LoginPage() {
  const dispatch = useAppDispatch();

  return (
    <Page>
      <div>
        <Title>현수막 헌터</Title>
        <Description>서비스 설명입니다.</Description>
      </div>

      <theme.style.flexOne />

      <LoginButton onClick={() => dispatch(kakaoLoginAsync())}>
        <RiKakaoTalkFill style={{ marginRight: 10 }} />
        <span>카카오로 시작하기</span>
      </LoginButton>
    </Page>
  );
}

export default LoginPage;
