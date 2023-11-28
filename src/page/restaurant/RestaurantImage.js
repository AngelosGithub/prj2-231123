import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { Styled_Slide } from "../../component/Styled_Slide";
import Slider from "react-slick";
import { Card, CardBody, Container, Image } from "@chakra-ui/react";

export default function RestaurantImage({ restaurant }) {
  const settings = {
    dots: true, // 슬라이드 밑에 점 보이게
    arrows: false,
    infinite: true, // 무한으로 반복
    speed: 500,
    slidesToShow: 1, //1장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    // centerMode: true,
    // centerPadding: "0px", //0px 하면 슬라이드 끝쪽 이미지가 안잘림
    // appendDots: (dots) => (
    //   <div
    //     style={{
    //       border: "1px solid black",
    //       backgroundColor: "#ddd",
    //       borderRadius: "10px",
    //       padding: "10px",
    //     }}
    //   >
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
  };

  return (
    <Slider {...settings}>
      {restaurant.files.length > 0 &&
        restaurant.files.map((file) => (
          <Card>
            <CardBody w={"100%"} h={"300px"}>
              <Image
                w={"100%"}
                h={"100%"}
                key={file.no}
                src={file.url}
                alt="stay slide"
              />
            </CardBody>
          </Card>
        ))}
    </Slider>

    // <Styled_Slide {...settings}>
    //   {restaurant.files.length > 0 &&
    //     restaurant.files.map((file) => (
    //       <img key={file.no} src={file.url} alt="stay slide" />
    //     ))}
    // </Styled_Slide>
  );
}
