import React from "react";
import { Box, Button, Center, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar(props) {
  const navigate = useNavigate();

  function handleLogout() {
    axios.post("/api/member/logout").then(() => console.log("success"));
  }

  return (
    <Center>
      <Flex w={"3xl"} mb={10} gap={4} borderBottom={"1px solid #778899"}>
        {/* jsb */}
        <Button onClick={() => navigate("/")}>Home</Button>
        <Spacer />

        <Button onClick={() => navigate("/categoryList")}>카테고리 관리</Button>
        <Button onClick={() => navigate("/restaurantList")}>맛집찾기</Button>
        <Button onClick={() => navigate("/RestaurantForm")}>맛집등록</Button>

        {/* 팀장 */}
        <Button onClick={() => navigate("/review")}>리뷰</Button>
        <Button onClick={() => navigate("/member/list")}>회원 정보</Button>
        <Button onClick={() => navigate("/signup")}>회원 가입</Button>
        <Button onClick={() => navigate("/login")}>로그인</Button>
        <Button onClick={handleLogout}>로그아웃</Button>
      </Flex>
    </Center>
  );
}

export default Navbar;
