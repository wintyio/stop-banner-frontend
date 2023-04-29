import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myConstants } from "../../constants/constant";
import axios from "axios";
import { RootState } from "../../app/store";

export interface ReportPostState {
  postId: number;
  reportType: string;
  reportReason: string;
}

const initialState: ReportPostState = {
  postId: 0,
  reportType: "",
  reportReason: "",
};

export const submitReportPost = createAsyncThunk("reportPost/submitReportPost",
  async (wintyAccessToken: string, { rejectWithValue, getState }) => {
    const reportPost = (getState() as any).reportPost as ReportPostState;;

    if (!reportPost.reportType.replaceAll(" ", ""))
      return rejectWithValue("신고 유형을 선택해주세요.");

    let url = `${myConstants.wintyHostUrl}/report`;
    let data = {
      classification: reportPost.reportType,
      content: reportPost.reportReason ? reportPost.reportReason : "내용 없음",
      forum_id: reportPost.postId,
    };
    let headers = {
      headers: {
        "Authorization": `Bearer ${wintyAccessToken}`,
      }
    };

    let res = await axios.post(url, data, headers);

    return (res.data.code === 1000) ? "success" : rejectWithValue(res.data);
  });

export const reportPostSlice = createSlice({
  name: "reportPost",
  initialState,
  reducers: {
    initReportPostSlice: (state) => {
      state.reportType = "";
      state.reportReason = "";
    },
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
    setReportType: (state, action) => {
      state.reportType = action.payload;
    },
    setReportReason: (state, action) => {
      state.reportReason = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReportPost.fulfilled, (state, action) => {

      });
  },
});

export const { initReportPostSlice, setPostId, setReportType, setReportReason } = reportPostSlice.actions;

export const selectReportType = (state: RootState) => state.reportPost.reportType;
export const selectReportReason = (state: RootState) => state.reportPost.reportReason;

export default reportPostSlice.reducer;
