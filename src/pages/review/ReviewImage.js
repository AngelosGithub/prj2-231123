import Slider from "react-slick";
import { Box, Center, Image } from "@chakra-ui/react";
import React from "react";

export function ReviewImage({ review }) {
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
      {review.files.length > 0 &&
        review.files.map((file) => (
          <Box
            textAlign={"center"}
            overflow={"hidden"}
            borderRadius="lg"
            w={"100%"}
            h={"500px"}
          >
            <Image w={"50%"} key={file.no} src={file.url} alt="stay slide" />
          </Box>
        ))}
    </Slider>
  );
}
