import styled from "styled-components";
import { theme } from "../style/theme";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/counter/loginSlice";

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

export default function EditNicknamePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Page>
      <div>
        <Title>닉네임 설정</Title>
      </div>

      <theme.style.flexOne />

      <theme.style.searchInput
        style={{ marginBottom: 17 }}
        placeholder="닉네임을 입력하세요"
      />

      <theme.style.flexOne />
      <theme.style.flexOne />

      <theme.style.defaultButton onClick={() => navigate("/")}>
        <span>변경하기</span>
      </theme.style.defaultButton>

      <theme.style.defaultButton
        style={{ marginTop: 20 }}
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
      >
        로그아웃
      </theme.style.defaultButton>
    </Page>
  );
}
