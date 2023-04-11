import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ReportBannerState {
  image: string | null,
  location: Array<number>,
  searchedPlaceInfos: Array<any>
}

const initialState: ReportBannerState = {
  image: null,
  location: [37.5663, 126.9779],
  searchedPlaceInfos: []
};

export const searchLoactionInfos = createAsyncThunk(
  "reportBanner/searchLoactionInfos",
  async (keyword: string, { rejectWithValue }) => {
    var ps = new window.kakao.maps.services.Places();

    const keywordSearch = (keyword: string) => {
      return new Promise((resolve, reject) => {
        ps.keywordSearch(keyword,
          (data: any, status: any, pagination: any) => {
            if (status === window.kakao.maps.services.Status.OK && data.length > 0)
              resolve(data);
            else
              reject();
          });
      });
    };

    try {
      return await keywordSearch(keyword);
    }
    catch {
      console.log("catched");
      return rejectWithValue(null);
    }
  }
)

export const reportBannerSlice = createSlice({
  name: "reportBanner",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setLocation: (state, action) => {
      if (state.location[0] == action.payload[0] && state.location[1] == action.payload[1]) return;

      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchLoactionInfos.fulfilled, (state, action) => {
      if (!action) return;
      state.searchedPlaceInfos = action.payload as Array<any>;
    });
    builder.addCase(searchLoactionInfos.rejected, () => {
      // window.confirm("검색 결과가 없습니다.");
    });
  },
});

export const { setImage, setLocation, } = reportBannerSlice.actions;

export const selectImage = (state: RootState) => state.reportBanner.image;
export const selectLocation = (state: RootState) => state.reportBanner.location;
export const selectSearchedPlaceInfos = (state: RootState) => state.reportBanner.searchedPlaceInfos;

export default reportBannerSlice.reducer;
