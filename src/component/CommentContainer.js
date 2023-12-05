import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function CommentForm({ reviewId }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    axios.post("/api/comment/add", {
      // 댓글 입력 할 글의 번호를 받아옴
      reviewId,
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

function CommentList({ reviewId }) {
  const [commentList, setCommentList] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("id", reviewId);

    axios
      .get("/api/comment/list?" + params)
      .then((response) => setCommentList(response.data));
  }, []);

  return <Box>댓글 리스트</Box>;
}

export function CommentContainer({ reviewId }) {
  // 넘어온 글 번호를 받음
  return (
    <Box>
      <CommentForm reviewId={reviewId} />
      <CommentList reviewId={reviewId} />
    </Box>
  );
}
