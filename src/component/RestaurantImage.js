import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

import Slider from "react-slick";
import { Image } from "@chakra-ui/react";

export default function RestaurantImage({ restaurant }) {
  const settings = {
    dots: true, // 슬라이드 밑에 점 보이게
    arrows: false,
    infinite: true, // 무한으로 반복
    speed: 1000,
    slidesToShow: 1, //1장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
  };

  return (
    <Slider {...settings}>
      {restaurant.files.length > 0 &&
        restaurant.files.map((file) => (
          <Image
            borderRadius="lg"
            w={"100%"}
            h={"220px"}
            key={file.no}
            src={file.url}
            alt="stay slide"
          />
        ))}
    </Slider>
  );
}
