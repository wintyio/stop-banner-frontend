import styled from "styled-components";
import { theme } from "../style/theme";
import { useNavigate } from "react-router-dom";
import {
  initUserName,
  logout,
  selectNewUserName,
  setUserName,
  submitUserName,
} from "../features/counter/loginSlice";
import TopTitleBar from "../Components/TopTitleBar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";

const Page = styled(theme.style.page)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 73px;
`;

export default function EditNicknamePage() {
  const dispatch = useAppDispatch();

  const userName = useAppSelector(selectNewUserName);

  const [submit, setSubmit] = useState(false);

  const onSubmit = async () => {
    if (submit) return;
    setSubmit(true);

    let _submit = await dispatch(submitUserName());
    if (submitUserName.fulfilled.match(_submit)) {
      window.location.href = "./#/my";
    } else {
      setSubmit(false);

      window.confirm(
        `변경 실패: ${JSON.stringify(
          _submit.payload ? _submit.payload : _submit.error
        )}`
      );
    }
  };

  useEffect(() => {
    dispatch(initUserName());
  }, []);

  return (
    <Page>
      <TopTitleBar titleName=" " />

      <theme.style.flexOne />

      <theme.style.mainTitle>닉네임 설정</theme.style.mainTitle>

      <theme.style.flexOne />

      <theme.style.searchInput
        placeholder="닉네임을 입력하세요"
        onChange={(e) => dispatch(setUserName(e.target.value))}
        maxLength={8}
        value={userName}
      />
      <theme.style.smallDescription style={{ marginBottom: 17 }}>
        {userName.length}/8
      </theme.style.smallDescription>

      <theme.style.flexOne />
      <theme.style.flexOne />
      <theme.style.flexOne />
      <theme.style.flexOne />

      <theme.style.defaultButton onClick={() => onSubmit()}>
        <span>변경하기</span>
      </theme.style.defaultButton>
    </Page>
  );
}
