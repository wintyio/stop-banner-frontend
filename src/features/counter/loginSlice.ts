import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { myConstants } from "../../constants/constant";

export interface LoginState {
  value: number;
  originalUserName: string,
  userName: string;
  status: "none" | "logging" | "logged in" | "failed";
  kakaoAccessToken: string;
  wintyAccessToken: string;
  errMsg: string;
  ver: number;
}

const initialState: LoginState = {
  value: 0,
  originalUserName: "",
  userName: "",
  status: "none",
  kakaoAccessToken: "",
  wintyAccessToken: "",
  errMsg: "",
  ver: new Date().getTime()
};

export const submitUserName = createAsyncThunk(
  "login/submitUserName",
  async (_, { rejectWithValue, getState }) => {
    const login = (getState() as any).login as LoginState;;

    const userName = login.userName;

    var blank_pattern = /^\s+|\s+$/g;
    if (userName.replace(blank_pattern, '') == "") {
      return alert('공백만 입력되었습니다.');
    }

    let url = `${myConstants.wintyHostUrl}/user/name`;
    let data = {
      headers: {
        "Authorization": `Bearer ${login.wintyAccessToken}`,
      },
    };

    let res = await axios.patch(url, { name: userName }, data);

    return (res.data.code === 1000) ? "success" : rejectWithValue(res.data);
  }
);

export const kakaoLoginAsync = createAsyncThunk(
  "login/kakaoLogin",
  async () => {
    let config = {
      redirectUri: window.location.protocol + "//" + window.location.host,
    };

    window.Kakao.Auth.authorize(config);
  }
);

export const getKakaoAccessTokenAsync = createAsyncThunk(
  "login/kakaoAccessToken",
  async (code: string) => {
    let grant_type = "authorization_code";
    let redirectUri = window.location.protocol + "//" + window.location.host;
    let client_id = "b76f1c8406260f4ffdafd2f02f05222e"; // REST API KEY

    let url = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirectUri}&code=${code}`;
    let data = {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    let res = await axios.post(url, data);

    return res.data.access_token;
  }
)

export const getWintyAccessTokenAsync = createAsyncThunk(
  "login/wintyAccessToken",
  async (kakaoAccessToken: string, { rejectWithValue }) => {
    console.log(kakaoAccessToken);

    let url = `${myConstants.wintyHostUrl}/user/login`;
    let data = {
      "accessToken": kakaoAccessToken
    };

    let res = await axios.post(url, data);
    let status = res.status;

    console.log(status);
    console.log(res.data);

    return (status === 200) ? res.data.result : rejectWithValue(null);
  }
)

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "none";
      state.kakaoAccessToken = "";
      state.wintyAccessToken = "";
    },
    initUserName: (state) => {
      state.userName = state.originalUserName;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      /* 카카오 로그인 시작 */
      .addCase(kakaoLoginAsync.pending, (state) => {
        console.log("kakaoLoginAsync:pd");
        state.status = "logging";
      })
      .addCase(kakaoLoginAsync.fulfilled, (state, action) => {
        console.log("kakaoLoginAsync:ff");
      })
      .addCase(kakaoLoginAsync.rejected, (state) => {
        console.log("kakaoLoginAsync:r");
        state.status = "failed";
        state.kakaoAccessToken = "";
        state.wintyAccessToken = "";
      })

      /* 카카오 엑세스 토큰 */
      .addCase(getKakaoAccessTokenAsync.fulfilled, (state, action) => {
        console.log("getKakaoAccessTokenAsync:ff");
        state.kakaoAccessToken = action.payload;
        console.log(action.payload);

      })
      .addCase(getKakaoAccessTokenAsync.rejected, (state) => {
        console.log("getKakaoAccessTokenAsync:r");

        state.status = "failed";
        state.kakaoAccessToken = "";
        state.wintyAccessToken = "";
      })

      /* winty 엑세스 토큰 */
      .addCase(getWintyAccessTokenAsync.fulfilled, (state, action) => {
        console.log("getWintyAccessTokenAsync:ff");
        state.status = "logged in";
        state.wintyAccessToken = action.payload.token;
        state.originalUserName = action.payload.name;
        state.userName = action.payload.name;
      })
      .addCase(getWintyAccessTokenAsync.rejected, (state) => {
        console.log("getWintyAccessTokenAsync:r");
        state.status = "failed";
        state.kakaoAccessToken = "";
        state.wintyAccessToken = "";
      })

      .addCase(submitUserName.fulfilled, (state, action) => {
        state.originalUserName = state.userName;
      })
  },
});

export const { logout, initUserName, setUserName } = loginSlice.actions;

export const selectUserName = (state: RootState) => state.login.userName;
export const selectKakaoAccessToken = (state: RootState) => state.login.kakaoAccessToken;
export const selectWintyAccessToken = (state: RootState) => state.login.wintyAccessToken;
export const selectLoginStatus = (state: RootState) => state.login.status;
export const selectLoginErrMsg = (state: RootState) => state.login.errMsg;

export default loginSlice.reducer;
