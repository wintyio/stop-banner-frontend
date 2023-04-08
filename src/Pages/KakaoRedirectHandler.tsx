import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getKakaoAccessTokenAsync,
  selectKakaoAccessToken,
} from "../features/counter/loginSlice";
import { theme } from "../style/theme";

const KakaoRedirectHandler = () => {
  const kakaoAccessToken = useAppSelector(selectKakaoAccessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code") || "";

    dispatch(getKakaoAccessTokenAsync(code));
  });

  return (
    <div>
      <div>kakao login 완료: {kakaoAccessToken}</div>
      <theme.style.defaultButton
        onClick={() => {
          window.location.href = "./";
        }}
      >
        피드로 이동
      </theme.style.defaultButton>
    </div>
  );
};

export default KakaoRedirectHandler;
