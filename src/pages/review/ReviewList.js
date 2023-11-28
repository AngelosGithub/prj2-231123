import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function ReviewList() {
  const navigate = useNavigate();
  return (
    <Box>
      <Heading>게시물 보기</Heading>
      <Button onClick={() => navigate("/write")}>리뷰 쓰기</Button>
    </Box>
  );
}
