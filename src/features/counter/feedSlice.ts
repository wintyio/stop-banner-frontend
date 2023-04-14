import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myConstants } from "../../constants/constant";
import axios from "axios";
import { RootState } from "../../app/store";
import { FeedInfo } from "../../classes/FeedInfo";

export interface FeedState {
    feedInfoList: Array<FeedInfo>;
}

const initialState: FeedState = {
    feedInfoList: [],
};

export const updateFeedInfoList = createAsyncThunk("feed/updateFeedInfoList",
    async (_, { rejectWithValue, getState }) => {
        let url = `${myConstants.wintyHostUrl}/post/get`;

        let res = await axios.get(url);

        return (res.data.code === 1000) ? res.data.result : rejectWithValue(res.data);
    });

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        initFeedSlice: (state) => {
            state.feedInfoList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateFeedInfoList.fulfilled, (state, action) => {
                for (let json of action.payload) {
                    state.feedInfoList.push(FeedInfo.fromJSON(json));
                }
            });
    },
});

export const { initFeedSlice } = feedSlice.actions;

export const selectFeedInfoList = (state: RootState) => state.feed.feedInfoList;

export default feedSlice.reducer;
