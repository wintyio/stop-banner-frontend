import { useState } from "react";
import styled from "styled-components";
import { theme } from "../style/theme";
import { useNavigate } from "react-router-dom";
import { BsChevronRight, BsXLg } from "react-icons/bs";
import introThumb from "../img/intro_thumb.png";

const ContentDiv = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  background: linear-gradient(to right, #000000 10%, #dfdfdf 60%, #ffffff 90%),
    #1e201e url(${introThumb}) no-repeat top 40% right / 110%;
  background-blend-mode: overlay;
  color: ${theme.color.white};
  margin-bottom: 24px;
  border-radius: 10px;
  cursor: pointer;
`;

function isToday(dateNum: number) {
  const date = new Date(dateNum);
  const today = new Date();
  return today.toDateString() === date.toDateString();
}

export function FeedAds() {
  const navigate = useNavigate();

  const prevCancelAds = localStorage.getItem("cancelAds") || "0";
  const prevCancelAdsNum = parseInt(prevCancelAds);

  const [cancelAds, setCancelAds] = useState(prevCancelAdsNum);

  const onClickedCancelButton = () => {
    const curCancelAdsNum = new Date().getTime();
    localStorage.setItem("cancelAds", curCancelAdsNum.toString());
    setCancelAds(curCancelAdsNum);
  };

  return (
    <ContentDiv style={isToday(cancelAds) ? { display: "none" } : {}}>
      {/* 취소 버튼 */}
      <BsXLg
        onClick={(e) => {
          e.preventDefault();
          onClickedCancelButton();
        }}
        style={{
          fontSize: 20,
          position: "absolute",
          padding: 20,
          top: 0,
          right: 0,
          zIndex: 10000,
        }}
      />

      {/* 클릭 가능 부분 */}
      <div
        onClick={() => navigate("/intro")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          right: 0,
          zIndex: 1000,
        }}
      />

      <h4>우리가 현수막 헌터를 시작한 이유</h4>
      <h5
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: -8,
          fontWeight: 400,
        }}
      >
        이야기 보러가기
        <BsChevronRight />
      </h5>
    </ContentDiv>
  );
}
