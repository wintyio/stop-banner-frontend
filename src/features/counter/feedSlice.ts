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

let isLoading = false;

export const updateFeedInfoList = createAsyncThunk("feed/updateFeedInfoList",
    async (_, { rejectWithValue, getState }) => {
        if (isLoading) return;
        isLoading = true;

        const feed = (getState() as any).feed as FeedState;

        let feedLength = feed.feedInfoList.length;
        let lastId = 9999999999999;
        if (feedLength !== 0)
            lastId = feed.feedInfoList[feed.feedInfoList.length - 1].id;

        let url = `${myConstants.wintyHostUrl}/forum`;

        let res = await axios.get(url, { params: { id: lastId, cnt: 10 } });

        return (res.data.code === 1000) ? res.data.result : rejectWithValue(res.data);
    });

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        initFeedSlice: (state) => {
            isLoading = false;
            state.feedInfoList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateFeedInfoList.rejected, (state, action) => {
                isLoading = false;
            })
            .addCase(updateFeedInfoList.fulfilled, (state, action) => {
                for (let json of action.payload) {
                    let feed = FeedInfo.fromJSON(json);
                    state.feedInfoList.push(feed);
                }

                setTimeout(() => { isLoading = false; }, 1000);
            });
    },
});

export const { initFeedSlice } = feedSlice.actions;

export const selectFeedInfoList = (state: RootState) => state.feed.feedInfoList;

export default feedSlice.reducer;
