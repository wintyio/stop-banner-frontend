import styled from "styled-components";
import { theme } from "../style/theme";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/counter/loginSlice";
import TopTitleBar from "../Components/TopTitleBar";

const Page = styled(theme.style.page)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 73px;
`;

export default function EditNicknamePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Page>
      <TopTitleBar titleName=" " />

      <theme.style.flexOne />

      <theme.style.mainTitle>닉네임 설정</theme.style.mainTitle>

      <theme.style.flexOne />

      <theme.style.searchInput
        style={{ marginBottom: 17 }}
        placeholder="닉네임을 입력하세요"
      />

      <theme.style.flexOne />
      <theme.style.flexOne />
      <theme.style.flexOne />
      <theme.style.flexOne />

      <theme.style.defaultButton onClick={() => navigate("/")}>
        <span>변경하기</span>
      </theme.style.defaultButton>
    </Page>
  );
}
