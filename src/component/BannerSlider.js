import React from "react";
import Slider from "react-slick";
import { Image } from "@chakra-ui/react";
import banner1 from "../img/Banner1.jpg";
import banner2 from "../img/Banner2.jpg";
import banner3 from "../img/Banner3.jpg";

export const BannerImg = [
  { no: 1, src: banner1, alt: "준비중" },
  { no: 2, src: banner2, alt: "준비중" },
  { no: 3, src: banner3, alt: "준비중" },
];

function BannerSlider(props) {
  const settings = {
    dots: false, // 슬라이드 밑에 점 보이게
    arrows: false,
    infinite: true, // 무한으로 반복
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1, //1장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
  };
  return (
    <Slider {...settings}>
      {BannerImg.map((img) => (
        <Image borderRadius="lg" key={img.no} src={img.src} alt={img.alt} />
      ))}
    </Slider>
  );
}

export default BannerSlider;
