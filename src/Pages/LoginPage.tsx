import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { kakaoLoginAsync } from "../features/counter/loginSlice";
import { theme } from "../style/theme";

const ContentDiv = styled(theme.style.contentDiv)`
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
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

const LoginButton = styled(theme.style.button)`
  display: flex;
  padding: 13px 0;
  justify-content: center;
  font-size: 16px;
  background-color: #fee500;
`;

function LoginPage() {
  const dispatch = useAppDispatch();

  return (
    <ContentDiv>
      <div>
        <Title>현수막 헌터</Title>
        <Description>서비스 설명입니다.</Description>
      </div>

      <theme.style.flexOne />

      <LoginButton onClick={() => dispatch(kakaoLoginAsync())}>
        <span>카카오로 시작하기</span>
      </LoginButton>
    </ContentDiv>
  );
}

export default LoginPage;
