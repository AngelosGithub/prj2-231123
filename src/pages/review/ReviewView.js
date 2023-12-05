import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider";
import { CommentContainer } from "../../component/CommentContainer";

export function ReviewView() {
  const [review, setReview] = useState(null);

  const { hasAccess, isAdmin } = useContext(LoginContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const { no } = useParams();

  useEffect(() => {
    axios
      .get("/api/review/no/" + no)
      .then((response) => setReview(response.data));
  }, []);

  if (review === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/review/remove/" + no)
      .then((response) => {
        toast({
          description: no + "번 게시물이 삭제되었습니다.",
          status: "success",
        });
        navigate("/review");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  return (
    <Box>
      <Heading>리뷰 보기</Heading>
      <Text>번호 : {review.no}</Text>
      <Text>제목 : {review.title}</Text>
      <Text>추천메뉴 : {review.recommend}</Text>
      <Text>내용 : {review.content}</Text>
      <Text>작성자 : {review.nickName}</Text>
      <Text>작성일 : {review.inserted}</Text>

      {(hasAccess(review.writer) || isAdmin()) && (
        <Box>
          <Button colorScheme="blue" onClick={() => navigate("/edit/" + no)}>
            수정
          </Button>
          <Button onClick={onOpen} colorScheme="red">
            삭제
          </Button>
        </Box>
      )}

      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* 코멘트 컨테이너로 작성된 글의 번호를 넘김 */}
      <CommentContainer reviewId={no} />
    </Box>
  );
}
