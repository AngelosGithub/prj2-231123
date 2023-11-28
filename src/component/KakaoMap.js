import React from "react";

import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;
function KakaoMap({ restaurant }) {
  return (
    <Map
      center={{ lat: restaurant.y, lng: restaurant.x }}
      style={{ width: "100%", height: "360px" }}
    >
      <MapMarker
        position={{ lat: restaurant.y, lng: restaurant.x }}
      ></MapMarker>

      <CustomOverlayMap position={{ lat: restaurant.y, lng: restaurant.x }}>
        <div style={{}}>{restaurant.place}</div>
      </CustomOverlayMap>
    </Map>
  );
}

export default KakaoMap;
