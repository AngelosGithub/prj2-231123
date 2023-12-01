import React from "react";
import { Box, Button, Center, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  let navigate = useNavigate();
  return (
    <Center>
      <Flex w={"3xl"} mb={10} gap={4} borderBottom={"1px solid #778899"}>
        <Button onClick={() => navigate("/")}>Home</Button>
        <Spacer />
        <Button>리뷰</Button>

        <Button onClick={() => navigate("/categoryList")}>카테고리 관리</Button>
        <Button onClick={() => navigate("/restaurantList")}>맛집찾기</Button>
        <Button onClick={() => navigate("/RestaurantForm")}>맛집등록</Button>

        <Button>로그인</Button>
      </Flex>
    </Center>
  );
}

export default Navbar;
