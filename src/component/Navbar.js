import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  let navigate = useNavigate();
  return (
    <Box mb={6}>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Button>리뷰</Button>

      <Button onClick={() => navigate("/categoryList")}>카테고리 관리</Button>
      <Button onClick={() => navigate("/restaurantList")}>맛집찾기</Button>
      <Button onClick={() => navigate("/RestaurantForm")}>맛집등록</Button>

      <Button>로그인</Button>
    </Box>
  );
}

export default Navbar;
