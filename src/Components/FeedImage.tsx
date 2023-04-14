import { Container as MapDiv, Marker, NaverMap } from "react-naver-maps";
import styled from "styled-components";
import { useState } from "react";
import { FeedInfo } from "../classes/FeedInfo";

interface DefaultImgProps {
  feedInfo: FeedInfo;
}

const DefaultImg = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 320/285;

  background-image: ${(props: DefaultImgProps) => {
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

interface FeedImageProps {
  feedInfo: FeedInfo;
  navermaps: any;
}

export function FeedImage(props: FeedImageProps) {
  let [imgState, setImgState] = useState("default");

  const LatLng = props.navermaps.LatLng;

  const onClick = () => {
    let newState =
      imgState === "default"
        ? "origin"
        : imgState === "origin"
        ? "map"
        : "default";
    setImgState(newState);
  };

  return (
    <div>
      {imgState === "default" && (
        <DefaultImg onClick={onClick} feedInfo={props.feedInfo} />
      )}
      {imgState === "map" && (
        <div>
          <MapDiv
            style={{
              width: "100%",
              aspectRatio: 320 / 285,
            }}
            onClick={onClick}
          >
            <NaverMap
              defaultZoom={17}
              maxZoom={17}
              minZoom={17}
              center={
                new LatLng(
                  props.feedInfo.location[0],
                  props.feedInfo.location[1]
                )
              }
              draggable={false}
              scrollWheel={false}
            >
              <Marker
                position={
                  new LatLng(
                    props.feedInfo.location[0],
                    props.feedInfo.location[1]
                  )
                }
              />
            </NaverMap>
          </MapDiv>
        </div>
      )}
      {imgState === "origin" && (
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
