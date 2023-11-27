import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  let navigate = useNavigate();
  return (
    <Box>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Button>리뷰</Button>

      <Button onClick={() => navigate("/restaurantList")}>맛집찾기</Button>
      <Button onClick={() => navigate("/RestaurantForm")}>맛집등록</Button>
      <Button onClick={() => navigate("/imgae")}>이미지 슬라이드 연습</Button>
      <Button>로그인</Button>
    </Box>
  );
}

export default Navbar;
