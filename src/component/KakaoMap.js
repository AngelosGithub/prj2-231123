import React, { useState } from "react";

import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faXmark } from "@fortawesome/free-solid-svg-icons";
const { kakao } = window;
function KakaoMap({ restaurant }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Map
      center={{ lat: restaurant.x, lng: restaurant.y }}
      style={{ width: "100%", height: "350px" }}
    >
      <MapMarker
        position={{ lat: restaurant.x, lng: restaurant.y }}
        clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        onClick={() => setIsOpen(true)}
      >
        {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
        {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
        {isOpen && (
          <Card w="300px">
            <CardHeader>
              <Flex justifyContent={"space-between"}>
                <Heading fontSize={"28px"}>{restaurant.place}</Heading>
                <Button onClick={() => setIsOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </Flex>
            </CardHeader>
            <CardBody borderBottom={"1px solid black"}>
              <Text>{restaurant.address}</Text>
            </CardBody>
            <CardFooter>
              <Text>{restaurant.phone}</Text>
            </CardFooter>
          </Card>
        )}
      </MapMarker>
    </Map>
  );
}

export default KakaoMap;
