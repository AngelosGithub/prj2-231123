import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function CommentForm({ reviewId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    // 상위 컴포넌트에서 함수를 받아서 사용
    onSubmit({ reviewId, comment });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      {/* 댓글 전송 요청시 isSubmitting이 true가 되어 버튼 비활성화 >>
      >> 전송 완료시 false가 되어 다시 버튼 활성화*/}
      <Button isDisabled={isSubmitting} onClick={handleSubmit}>
        쓰기
      </Button>
    </Box>
  );
}

function CommentList({ commentList }) {
  return (
    <Card>
      <CardHeader>
        <Heading size={"md"}>댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={"4"}>
          {commentList.map((comment) => (
            <Box>
              <Flex justifyContent={"space-between"}>
                <Heading size={"xs"}>{comment.memberId}</Heading>
                <Text fontSize={"xs"}>{comment.inserted}</Text>
              </Flex>
              {/* 댓글 줄 바꿈 */}
              <Text sx={{ whiteSpace: "pre-wrap" }} pt={"2"} fontSize={"sm"}>
                {comment.comment}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function CommentContainer({ reviewId }) {
  // 넘어온 글 번호를 받음

  // 댓글 요청상태를 알아내는 공통 state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 댓글 쓰기 함수
  function handleSubmit(comment) {
    // 이 곳에서 댓글 전송 요청
    // 요청시 true
    setIsSubmitting(true);

    axios
      // 댓글 입력 할 글의 번호를 받아옴
      .post("/api/comment/add", comment)
      //요청이 끝나면 다시 false
      .finally(() => setIsSubmitting(false));
  }

  const [commentList, setCommentList] = useState([]);

  // 댓글 리스트 불러오는 함수
  useEffect(() => {
    // isSubmitting이 false 일때만 랜더링을 하도록 함
    if (!isSubmitting) {
      // 댓글 목록을 보여줄 글의 번호값 받기
      const params = new URLSearchParams();
      params.set("id", reviewId);

      axios
        // 글 번호에 해당하는 댓글 데이터 요청하기
        .get("/api/comment/list?" + params)
        .then((response) => setCommentList(response.data));
    }
  }, [isSubmitting]);

  return (
    <Box>
      {/* Form에서 submit 되었을때 List가 다시 랜더링 되어야하기 때문에
      상위 컴포넌트에 공통 state를 만들 것 */}
      <CommentForm
        reviewId={reviewId}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      <CommentList reviewId={reviewId} commentList={commentList} />
    </Box>
  );
}
