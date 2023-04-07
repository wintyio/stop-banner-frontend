import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
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

export default function EditNicknamePage() {
  return (
    <ContentDiv>
      <div>
        <Title>닉네임 설정</Title>
      </div>

      <theme.style.flexOne />

      <theme.style.searchInput placeholder="닉네임을 입력하세요" />

      <theme.style.flexOne />
      <theme.style.flexOne />

      <theme.style.defaultButton>
        <span>시작하기</span>
      </theme.style.defaultButton>
    </ContentDiv>
  );
}
