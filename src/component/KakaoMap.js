import React from "react";

import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;
function KakaoMap({ restaurant }) {
  return (
    <Map
      center={{ lat: restaurant.x, lng: restaurant.y }}
      style={{ width: "100%", height: "360px" }}
    >
      <MapMarker
        position={{ lat: restaurant.x, lng: restaurant.y }}
      ></MapMarker>

      <CustomOverlayMap position={{ lat: restaurant.x, lng: restaurant.y }}>
        <div style={{}}>{restaurant.place}</div>
      </CustomOverlayMap>
    </Map>
  );
}

export default KakaoMap;
