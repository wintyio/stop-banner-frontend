import styled from "styled-components";
import { theme } from "../style/theme";
import { useNavigate } from "react-router-dom";
import TopTitleBar from "../Components/TopTitleBar";

const ReportType = styled.select`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 14.5px;
  ${theme.style.defaultBorder}
  text-align: center;
  font-size: 16px;
`;

const ReportReason = styled.textarea`
  position: relative;
  box-sizing: border-box;
  min-width: 100%;
  max-width: 100%;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 36px;
  padding: 16px;
  ${theme.style.defaultBorder}
  font-size: 16px;
  ::placeholder {
    color: ${theme.color.gray1};
    font-weight: 400;
  }
`;

function ReportArticlePage() {
  const navigate = useNavigate();

  return (
    <theme.style.page>
      <TopTitleBar titleName="신고하기" />

      <theme.style.subTitle>신고 유형</theme.style.subTitle>
      <ReportType>
        <option value="">선택하세요</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </ReportType>

      <theme.style.subTitle>신고 사유</theme.style.subTitle>
      <ReportReason placeholder="신고 사유를 설명해주세요" />

      <theme.style.defaultButton
        onClick={() => navigate("/")}
        style={{ marginBottom: 65 }}
      >
        신고하기
      </theme.style.defaultButton>
    </theme.style.page>
  );
}

export default ReportArticlePage;
