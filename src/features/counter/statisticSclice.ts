import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myConstants } from "../../constants/constant";
import { RootState } from "../../app/store";
import { BaseDataEntry } from "react-minimal-pie-chart/types/commonTypes";
import PartyRank from "../../classes/PartyRank";
import MemberRank from "../../classes/MemberRank";

export interface StatisticState {
    partyRankList: Array<PartyRank>;
    partyRankData: Array<BaseDataEntry>;
    memberRankList: Array<MemberRank>;
    userRankList: Array<MemberRank>;
}

const initialState: StatisticState = {
    partyRankList: [],
    partyRankData: [],
    memberRankList: [],
    userRankList: [],
};

let initPartyRank = false;
export const getPartyRank = createAsyncThunk("statistic/getPartyStatistic",
    async (_, { rejectWithValue, getState }) => {
        if (initPartyRank) return;
        initPartyRank = true;

        let url = `${myConstants.wintyHostUrl}/rank/party`;

        let res = await axios.get(url);

        return (res.data.code === 1000) ? res.data : rejectWithValue(res.data);
    }
);

let initMemberRank = false;
export const getMemberRank = createAsyncThunk("statistic/getMemberRank",
    async (_, { rejectWithValue, getState }) => {
        if (initMemberRank) return;
        initMemberRank = true;

        let url = `${myConstants.wintyHostUrl}/rank/name`;

        let res = await axios.get(url);

        return (res.data.code === 1000) ? res.data : rejectWithValue(res.data);
    }
);

let initUserRank = false;
export const getUserRank = createAsyncThunk("statistic/getUserRank",
    async (_, { rejectWithValue, getState }) => {
        if (initUserRank) return;
        initUserRank = true;

        let url = `${myConstants.wintyHostUrl}/rank/user`;

        let res = await axios.get(url);

        return (res.data.code === 1000) ? res.data : rejectWithValue(res.data);
    }
);

export const statisticSlice = createSlice({
    name: "statistic",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPartyRank.rejected, (state, action) => { initPartyRank = false; })
            .addCase(getPartyRank.fulfilled, (state, action) => {
                let rankList = [];
                let rankData = [];

                let totalCount = 0;  // 총 카운트
                let jsonList = action.payload.result;

                // 파티 랭크 생성
                for (let json of jsonList) {
                    let rank = PartyRank.fromJSON(json);
                    totalCount += rank.count;

                    rankList.push(rank);
                    rankData.push(rank.toChartData());
                }

                // 퍼센트 지정
                let totalPercent = 100;  // 남아있는 퍼센트
                for (let i = 0; i < rankList.length; i++) {
                    const partyRank = rankList[i];

                    let originalPercent = Math.round(partyRank.count / totalCount * 100);
                    let targetPercent = originalPercent;

                    if (i === rankList.length - 1)
                        targetPercent = totalPercent;
                    else
                        totalPercent -= targetPercent;

                    partyRank.setPercent(targetPercent);
                }

                state.partyRankList = rankList;
                state.partyRankData = rankData;
            })
            .addCase(getMemberRank.rejected, (state, action) => { initMemberRank = false; })
            .addCase(getMemberRank.fulfilled, (state, action) => {
                let rankList = [];

                let jsonList = action.payload.result;
                for (let json of jsonList) {
                    if (!json.name.replaceAll(" ", "")) continue;
                    let rank = MemberRank.fromJSON(json);
                    rankList.push(rank);
                }

                state.memberRankList = rankList;
            })
            .addCase(getUserRank.rejected, (state, action) => { initUserRank = false; })
            .addCase(getUserRank.fulfilled, (state, action) => {
                let rankList = [];

                let jsonList = action.payload.result;
                for (let json of jsonList) {
                    let rank = MemberRank.fromJSON(json);

                    if (rank.name === "익명의 사냥꾼") continue;  // 익명 예외 처리

                    rankList.push(rank);
                }

                state.userRankList = rankList;
            });
    },
});

export const selectPartyRankList = (state: RootState) => state.statistic.partyRankList;
export const selectPartyRankData = (state: RootState) => state.statistic.partyRankData;
export const selectMemberRankList = (state: RootState) => state.statistic.memberRankList;
export const selectUserRankList = (state: RootState) => state.statistic.userRankList;

export default statisticSlice.reducer;
