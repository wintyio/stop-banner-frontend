import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getKakaoAccessTokenAsync,
  selectKakaoAccessToken,
} from "../features/counter/loginSlice";

const KakaoRedirectHandler = () => {
  const kakaoAccessToken = useAppSelector(selectKakaoAccessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code") || "";

    dispatch(getKakaoAccessTokenAsync(code));
  });

  return <div>kakao login 완료: {kakaoAccessToken}</div>;
};

export default KakaoRedirectHandler;
