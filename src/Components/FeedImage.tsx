import { Container as MapDiv, NaverMap } from "react-naver-maps";
import { FeedInfo } from "./Feed";
import styled from "styled-components";
import { useState } from "react";

interface Props {
  feedInfo: FeedInfo;
}

const DefaultImg = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 320/285;

  background-image: ${(props: Props) => {
    return `url(${props.feedInfo.imgUrl})`;
  }};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const OriginImg = styled(DefaultImg)`
  background-size: contain;
  backdrop-filter: blur(20px) brightness(0.6);
`;

export function FeedImage(props: Props) {
  let [imgState, setImgState] = useState("default");

  const onClick = () => {
    let newState =
      imgState == "default"
        ? "origin"
        : imgState == "origin"
        ? "map"
        : "default";
    setImgState(newState);
  };

  return (
    <div>
      {imgState == "default" && (
        <DefaultImg onClick={onClick} feedInfo={props.feedInfo} />
      )}
      {imgState == "map" && (
        <MapDiv
          style={{
            width: "100%",
            aspectRatio: 320 / 285,
          }}
          onClick={onClick}
        >
          <NaverMap draggable={false} scrollWheel={false} />
        </MapDiv>
      )}
      {imgState == "origin" && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: 320 / 285,
            display: "flex",
          }}
          onClick={onClick}
        >
          <DefaultImg
            style={{ position: "absolute" }}
            feedInfo={props.feedInfo}
          />
          <OriginImg feedInfo={props.feedInfo} />
        </div>
      )}
    </div>
  );
}
