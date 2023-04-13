import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { myConstants } from "../../constants/constant";
import axios from "axios";
import Compressor from "compressorjs";


export interface ReportBannerState {
  partyIndex: number,
  memberName: string,
  imageSrc?: string,
  image: string | null,
  location: Array<number>,  // lat, lng
  cityId: number,
  localId: number,
  address: string,
  searchedPlacesInfoList: Array<any>
}

const initialState: ReportBannerState = {
  partyIndex: -1,
  memberName: "",
  image: null,
  location: [37.5663, 126.9779],
  cityId: -1,
  localId: -1,
  address: "",
  searchedPlacesInfoList: [],
};

export const searchPlacesInfoList = createAsyncThunk(
  "reportBanner/searchPlacesInfoList",
  async (keyword: string, { rejectWithValue }) => {
    // 검색 객체 생성
    let ps = new window.kakao.maps.services.Places();

    // Callback -> Promise
    const keywordSearch = (keyword: string) =>
      new Promise((resolve, reject) =>
        ps.keywordSearch(keyword, (data: any, status: any, pagination: any) =>
          (status === window.kakao.maps.services.Status.OK && data.length > 0)
            ? resolve(data) : reject()
        )
      );

    // 장소 검색
    try {
      return await keywordSearch(keyword);
    }
    catch {
      return rejectWithValue(null);
    }
  }
)

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};

var geocoder = new window.kakao.maps.services.Geocoder();

export const submitReportBanner = createAsyncThunk(
  "reportBanner/submitReportBanner",
  async (wintyAccessToken: string, { rejectWithValue, getState }) => {
    const reportBanner = (getState() as any).reportBanner as ReportBannerState;;

    if (!reportBanner.imageSrc)
      return rejectWithValue("사진을 추가해주세요.");
    if (reportBanner.partyIndex === -1)
      return rejectWithValue("정당을 선택해주세요.");
    if (!reportBanner.memberName.replaceAll(" ", ""))
      return rejectWithValue("인물을 입력해주세요.");

    let { result, status }: any = await new Promise((resolve) =>
      geocoder.coord2Address(reportBanner.location[1], reportBanner.location[0], (result: any, status: any) => resolve({ result, status })
      ));

    if (result.length === 0)
      return rejectWithValue("잘못된 위치입니다.");

    let address = result[0].address;
    let cityId = -1;
    let localId = -1;
    let addressName = "";
    if (address.hasOwnProperty("region_1depth_name"))
      cityId = myConstants.getCityId(address.region_1depth_name);
    if (address.hasOwnProperty("region_2depth_name"))
      localId = myConstants.getLocaLId(address.region_2depth_name);

    addressName = address.address_name;

    // 사진
    let file = await convertURLtoFile(reportBanner.imageSrc);
    let compressedFile: Blob | File = await new Promise(
      (resolve, reject) => new Compressor(file, {
        maxWidth: 1300, maxHeight: 1300, minWidth: 700, height: 700,
        success(result) {
          return resolve(result);
        },
        error(err) {
          return reject(err);
        },
      })
    );
    console.log(file.size);
    console.log(compressedFile.size);

    file = new File([compressedFile], file.name, { type: file.type });

    const formDataForSubmit = new FormData();
    // formDataForSubmit.append("lat", parseInt(reportBanner.location[0].toString()).toString());
    // formDataForSubmit.append("lng", parseInt(reportBanner.location[1].toString()).toString());
    formDataForSubmit.append("lat", reportBanner.location[0].toString());
    formDataForSubmit.append("lng", reportBanner.location[1].toString());
    formDataForSubmit.append("cityId", cityId.toString());
    formDataForSubmit.append("localId", localId.toString());
    formDataForSubmit.append("address", addressName.toString());
    formDataForSubmit.append("img", file);

    let url = `${myConstants.wintyHostUrl}/post/create`;
    let data = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${wintyAccessToken}`,
      },
    };

    let res = await axios.post(url, formDataForSubmit, data);

    return (res.data.code === 1000) ? "success" : rejectWithValue(res.data);
  });


export const reportBannerSlice = createSlice({
  name: "reportBanner",
  initialState,
  reducers: {
    initReportBanner: (state) => {
      state.image = null;
      state.location = [37.5663, 126.9779];
      state.searchedPlacesInfoList = [];
    },
    setPartyIndex: (state, action) => {
      if (state.partyIndex === action.payload)
        state.partyIndex = -1;
      else
        state.partyIndex = action.payload;
    },
    setMemberName: (state, action) => {
      state.memberName = action.payload;
    },
    setImageSrc: (state, action) => {
      state.imageSrc = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setLocation: (state, action) => {
      if (state.location[0] === action.payload[0] && state.location[1] === action.payload[1]) return;
      state.location = action.payload;
    },
    setLocationInfo: (state, { payload: { cityId, localId, address } }) => {
      state.cityId = cityId;
      state.localId = localId;
      state.address = address;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPlacesInfoList.fulfilled, (state, action) => {
        if (!action) return;
        state.searchedPlacesInfoList = action.payload as Array<any>;
      })
      .addCase(searchPlacesInfoList.rejected, () => {
      })
      .addCase(submitReportBanner.rejected, () => {
        console.log("submitReportBanner: r");
      });
  },
});

export const { initReportBanner, setPartyIndex, setMemberName, setImage, setImageSrc, setLocation, } = reportBannerSlice.actions;

export const selectPartyIndex = (state: RootState) => state.reportBanner.partyIndex;
export const selectMemberName = (state: RootState) => state.reportBanner.memberName;
export const selectImage = (state: RootState) => state.reportBanner.image;
export const selectImageSrc = (state: RootState) => state.reportBanner.imageSrc;
export const selectLocation = (state: RootState) => state.reportBanner.location;
export const selectSearchedPlacesInfoList = (state: RootState) => state.reportBanner.searchedPlacesInfoList;

export default reportBannerSlice.reducer;
