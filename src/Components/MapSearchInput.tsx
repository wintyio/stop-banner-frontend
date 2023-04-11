import styled from "styled-components";
import { theme } from "../style/theme";
import { useState } from "react";
import {
  searchLoactionInfos,
  selectSearchedPlaceInfos,
  setLocation,
} from "../features/counter/reportBannerSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const RecomandContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 4px;
  justify-content: center;
  border-bottom: 1px solid ${theme.color.gray2};
  cursor: pointer;
`;

const RecomandPlaceDiv = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
`;

const RecomandAddressDiv = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

export function MapSearchInput() {
  const [wasChanged, setWasChanged] = useState(false);
  const [value, setValue] = useState("");
  const searchedPlaceInfos = useAppSelector(selectSearchedPlaceInfos);
  const dispatch = useAppDispatch();

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
          dispatch(searchLoactionInfos(value));
          e.preventDefault();
        }}
        placeholder="현수막 발견 장소를 입력하세요 (예시: 강남구 테헤란로)"
      />

      {value.length != 0 &&
        wasChanged &&
        searchedPlaceInfos.map((value) => {
          return (
            <RecomandContentDiv
              onClick={() => {
                setWasChanged(false);
                setValue(value.place_name);
                dispatch(
                  setLocation([parseFloat(value.y), parseFloat(value.x)])
                );
              }}
            >
              <RecomandPlaceDiv>{value.place_name}</RecomandPlaceDiv>
              <RecomandAddressDiv>{value.address_name}</RecomandAddressDiv>
            </RecomandContentDiv>
          );
        })}
    </div>
  );
}
