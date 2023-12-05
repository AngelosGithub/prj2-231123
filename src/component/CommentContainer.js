import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

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

function CommentList({ commentList, onDeleteModal, isSubmitting }) {
  return (
    <Card>
      <CardHeader>
        <Heading size={"md"}>댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={"4"}>
          {commentList.map((comment) => (
            <Box key={comment.no}>
              <Flex justifyContent={"space-between"}>
                <Heading size={"xs"}>{comment.memberId}</Heading>
                <Text fontSize={"xs"}>{comment.inserted}</Text>
              </Flex>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                {/* 댓글 줄 바꿈 */}
                <Text sx={{ whiteSpace: "pre-wrap" }} pt={"2"} fontSize={"sm"}>
                  {comment.comment}
                </Text>
                <Flex>
                  <Button size={"xs"} colorScheme="blue">
                    <EditIcon />
                  </Button>
                  <Button
                    isDisabled={isSubmitting}
                    onClick={() => onDeleteModal(comment.no)}
                    size={"xs"}
                    colorScheme="red"
                  >
                    <DeleteIcon />
                  </Button>
                </Flex>
              </Flex>
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
  // 댓글 데이터를 배열 형태로 응답받음
  const [commentList, setCommentList] = useState([]);
  // 댓글 키 값을 state에 저장
  const [no, setNo] = useState(0);

  // 모달 컨트롤
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  function handleDelete() {
    // 삭제버튼 클릭시 key값을 가져오는 지 확인
    // console.log(no + "Comment Deleted");

    setIsSubmitting(true);
    // 삭제 요청 보내기
    axios.delete("/api/comment/" + no).finally(() => {
      setIsSubmitting(false);
      onClose();
    });
  }

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

  function handleDeleteModal(no) {
    // id를 어딘가 저장
    setNo(no);
    // >> 모달 열기
    onOpen();
  }
  return (
    <Box>
      {/* Form에서 submit 되었을때 List가 다시 랜더링 되어야하기 때문에
      상위 컴포넌트에 공통 state를 만들 것 */}
      <CommentForm
        reviewId={reviewId}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      <CommentList
        reviewId={reviewId}
        isSubmitting={isSubmitting}
        commentList={commentList}
        onDeleteModal={handleDeleteModal}
      />

      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button
              isDisabled={isSubmitting}
              onClick={handleDelete}
              colorScheme="red"
            >
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
