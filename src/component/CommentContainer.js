import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function CommentForm({ reviewNo }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    axios.post("/api/comment/add", {
      // 댓글 입력 할 글의 번호를 받아옴
      reviewNo,
      comment,
    });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={handleSubmit}>쓰기</Button>
    </Box>
  );
}

function CommentList() {
  return <Box>댓글 리스트</Box>;
}

export function CommentContainer({ reviewNo }) {
  // 넘어온 글 번호를 받음
  return (
    <Box>
      <CommentForm reviewNo={reviewNo} />
      <CommentList />
    </Box>
  );
}
