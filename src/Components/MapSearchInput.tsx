import styled from "styled-components";
import { theme } from "../style/theme";
import { useState } from "react";
import {
  setLocation,
  selectSearchedPlacesInfoList,
  searchPlacesInfoList,
} from "../features/counter/reportBannerSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const RecommendContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 4px;
  justify-content: center;
  border-bottom: 1px solid ${theme.color.gray2};
  cursor: pointer;
`;

const RecommendPlaceDiv = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
`;

const RecommendAddressDiv = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

let key = 0;

export function MapSearchInput() {
  const [wasChanged, setWasChanged] = useState(false);
  const [value, setValue] = useState("");
  const searchedPlacesInfoList = useAppSelector(selectSearchedPlacesInfoList);
  const dispatch = useAppDispatch();

  const onClickedrecommendedPlace = (
    placeName: string,
    placeCoords: number[]
  ) => {
    setWasChanged(false);
    setValue(placeName);
    dispatch(setLocation(placeCoords));
  };

  return (
    <div>
      <theme.style.searchInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setWasChanged(true);
        }}
        onKeyUp={(e) => {
          // if (e.key !== "Enter") return;
          dispatch(searchPlacesInfoList(value));
          e.preventDefault();
        }}
        placeholder="현수막 발견 장소를 입력하세요."
      />

      {wasChanged &&
        value.length !== 0 &&
        searchedPlacesInfoList.map((value: any) => (
          <RecommendContentDiv
            key={key++}
            onClick={() => {
              onClickedrecommendedPlace(value.place_name, [
                parseFloat(value.y),
                parseFloat(value.x),
              ]);
            }}
          >
            <RecommendPlaceDiv>{value.place_name}</RecommendPlaceDiv>
            <RecommendAddressDiv>{value.address_name}</RecommendAddressDiv>
          </RecommendContentDiv>
        ))}
    </div>
  );
}
