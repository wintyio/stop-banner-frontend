import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getKakaoAccessTokenAsync,
  getWintyAccessTokenAsync,
  selectKakaoAccessToken,
  selectLoginErrMsg,
  selectLoginStatus,
} from "../features/counter/loginSlice";

const KakaoRedirectHandler = () => {
  const dispatch = useAppDispatch();

  const failedLogin = (errMsg: string) => {
    window.confirm(`로그인 실패: ${errMsg}`);
    window.location.href = "./";
  };

  const loginProcess = async () => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code");

    if (!code) return;

    // 카카오 엑세스 토큰 가져오기
    let kakaoAsyncAction = await dispatch(getKakaoAccessTokenAsync(code)); //.unwrap();
    let kakaoAccessToken;

    if (getKakaoAccessTokenAsync.fulfilled.match(kakaoAsyncAction))
      kakaoAccessToken = kakaoAsyncAction.payload;
    else failedLogin("카카오 엑세스 토큰 획득 실패");

    // 윈티 엑세스 토큰 가져오기
    let wintyAccessToken = await dispatch(
      getWintyAccessTokenAsync(kakaoAccessToken)
    );

    if (getWintyAccessTokenAsync.fulfilled.match(wintyAccessToken))
      window.location.href = "./";
    else failedLogin("윈티 엑세스 토큰 획득 실패");
  };

  useEffect(() => {
    loginProcess();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 0.4, marginTop: 50, marginBottom: 10 }}>
        <div id="loader"></div>
      </div>
    </div>
  );
};

export default KakaoRedirectHandler;
