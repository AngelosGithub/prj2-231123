import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    axios.post("/api/member/logout").then(() => console.log("success"));
  }

  return (
    <Box>
      <Button onClick={() => navigate("/")}>홈으로</Button>
      <Button onClick={() => navigate("/review")}>리뷰</Button>
      <Button>맛집 찾기</Button>
      <Button onClick={() => navigate("/member/list")}>회원 정보</Button>
      <Button onClick={() => navigate("/signup")}>회원 가입</Button>
      <Button onClick={() => navigate("/login")}>로그인</Button>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Box>
  );
}
