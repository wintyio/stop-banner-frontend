import styled from "styled-components";
import { theme } from "../style/theme";
import { useNavigate } from "react-router-dom";
import TopTitleBar from "../Components/TopTitleBar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  initReportPostSlice,
  selectReportReason,
  selectReportType,
  setReportReason,
  setReportType,
  submitReportPost,
} from "../features/counter/reportPostSlice";
import { selectWintyAccessToken } from "../features/counter/loginSlice";
import { useEffect, useState } from "react";

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

export default function ReportPostPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wintyAccessToken = useAppSelector(selectWintyAccessToken);
  const reportType = useAppSelector(selectReportType);
  const reportReason = useAppSelector(selectReportReason);
  const [submit, setSubmit] = useState(false);

  const onSubmit = async () => {
    if (submit) return;
    setSubmit(true);

    let _submit = await dispatch(submitReportPost(wintyAccessToken));
    if (submitReportPost.fulfilled.match(_submit)) navigate(-1);
    else {
      setSubmit(false);
      window.confirm(
        `올리기 실패: ${JSON.stringify(
          _submit.payload ? _submit.payload : _submit.error
        )}`
      );
    }
  };

  useEffect(() => {
    dispatch(initReportPostSlice());
  }, []);

  return (
    <theme.style.page>
      <TopTitleBar titleName="신고하기" />

      <theme.style.subTitle>신고 유형</theme.style.subTitle>
      <ReportType
        value={reportType}
        onChange={({ target: { value } }) => dispatch(setReportType(value))}
      >
        <option disabled value="">
          선택하세요
        </option>
        <option value="도배성 게시">도배성 게시</option>
        <option value="부정확한 정보 게시">부정확한 정보 게시</option>
        <option value="관계없는 정보 게시">관계없는 정보 게시</option>
        <option value="기타">기타</option>
      </ReportType>

      <theme.style.subTitle>신고 사유</theme.style.subTitle>
      <ReportReason
        value={reportReason}
        onChange={({ target: { value } }) => dispatch(setReportReason(value))}
        placeholder="신고 사유를 설명해주세요"
      />

      <theme.style.defaultButton
        onClick={onSubmit}
        style={{ marginBottom: 65 }}
      >
        {submit ? "올리는 중.." : "신고하기"}
      </theme.style.defaultButton>
    </theme.style.page>
  );
}
