import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();
  return (
    <Box>
      <Button onClick={() => navigate("/")}>홈으로</Button>
      <Button>리뷰</Button>
      <Button>맛집 찾기</Button>
      <Button onClick={() => navigate("/signup")}>회원 가입</Button>
    </Box>
  );
}
