import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { myConstants } from "../../constants/constant";

export interface LoginState {
  value: number;
  currentUserName: string,
  newUserName: string;
  status: "none" | "logging" | "logged in" | "failed";
  kakaoAccessToken: string;
  wintyAccessToken: string;
  errMsg: string;
  ver: number;
}

const initialState: LoginState = {
  value: 0,
  currentUserName: "",
  newUserName: "",
  status: "none",
  kakaoAccessToken: "",
  wintyAccessToken: "",
  errMsg: "",
  ver: new Date().getTime()
};

export const getUserName = createAsyncThunk(
  "login/getUserName",
  async (_, { rejectWithValue, getState }) => {
    const login = (getState() as any).login as LoginState;;

    let url = `${myConstants.wintyHostUrl}/user`;
    let data = {
      headers: {
        "Authorization": `Bearer ${login.wintyAccessToken}`,
      },
    };

    let res = await axios.get(url, data);

    return (res.data.code === 1000) ? res.data : rejectWithValue(res.data);
  }
);

export const submitUserName = createAsyncThunk(
  "login/submitUserName",
  async (_, { rejectWithValue, getState }) => {
    const login = (getState() as any).login as LoginState;;

    const newUserName = login.newUserName;

    if (login.currentUserName === newUserName) return "success";

    var blank_pattern = /^\s+|\s+$/g;
    if (newUserName.replace(blank_pattern, '') == "") {
      return rejectWithValue("공백만 입력되었습니다.");
    }

    let url = `${myConstants.wintyHostUrl}/user/name`;
    let data = {
      headers: {
        "Authorization": `Bearer ${login.wintyAccessToken}`,
      },
    };

    let res = await axios.patch(url, { name: newUserName }, data);

    return (res.data.code === 1000) ? "success" : rejectWithValue(res.data.message);
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
      state.newUserName = state.currentUserName;
    },
    setUserName: (state, action) => {
      state.newUserName = action.payload;
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
        state.currentUserName = action.payload.name;
      })
      .addCase(getWintyAccessTokenAsync.rejected, (state) => {
        console.log("getWintyAccessTokenAsync:r");
        state.status = "failed";
        state.kakaoAccessToken = "";
        state.wintyAccessToken = "";
      })

      .addCase(getUserName.fulfilled, (state, action) => {
        state.currentUserName = action.payload.result.name;
      })
      .addCase(submitUserName.fulfilled, (state, action) => {
        state.currentUserName = state.newUserName;
      })
  },
});

export const { logout, initUserName, setUserName } = loginSlice.actions;

export const selectCurrentUserName = (state: RootState) => state.login.currentUserName;
export const selectNewUserName = (state: RootState) => state.login.newUserName;
export const selectKakaoAccessToken = (state: RootState) => state.login.kakaoAccessToken;
export const selectWintyAccessToken = (state: RootState) => state.login.wintyAccessToken;
export const selectLoginStatus = (state: RootState) => state.login.status;
export const selectLoginErrMsg = (state: RootState) => state.login.errMsg;

export default loginSlice.reducer;
