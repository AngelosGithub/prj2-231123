import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
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
import StarRatings from "react-star-ratings/build/star-ratings";
import { ReviewImage } from "./ReviewImage";

export function ReviewView() {
  const [review, setReview] = useState(null);
  const [url, setUrl] = useState("");

  const { hasAccess, isAdmin } = useContext(LoginContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const { no } = useParams();

  useEffect(() => {
    axios.get("/api/review/no/" + no).then((response) => {
      setReview(response.data);
      setUrl(response.data.files[0].url);
    });
  }, []);

  if (review === null) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
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

  function handleClick(url) {
    setUrl(url);
  }

  return (
    <Center>
      <Box w={"5xl"}>
        <Heading>{review.place} 리뷰</Heading>
        <Text>
          작성자 : {review.nickName} [{review.ago}]
        </Text>
        <Heading size={"lg"} marginTop={"20px"}>
          제목 : {review.title}
        </Heading>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          {/* 별점 출력 */}
          <Box lineHeight="50px" ml={5}>
            {review.starPoint >= 0 && (
              <StarRatings
                rating={review.starPoint}
                starDimension="30px"
                starSpacing="3px"
                starRatedColor="#fcc419"
                numberOfStars={5}
              />
            )}
          </Box>
          <Text>추천메뉴 : {review.recommend}</Text>
        </Flex>
        {/* 이미지 출력 */}
        <Box my={"20px"}>
          <Box w={"5xl"}>
            <Box h={"500px"}>
              <Flex>
                <Center overflow={"hidden"} w={"60%"} h={"500px"}>
                  <Image maxH={"450px"} maxW={"550px"} src={url} />
                </Center>
                <Box w={"40%"} h={"500px"} overflowY={"scroll"}>
                  <SimpleGrid
                    marginTop={5}
                    columns={{ base: 2, md: 2, lg: 2, "2xl": 2 }}
                  >
                    {review.files.length > 0 &&
                      review.files.map((file) => (
                        <Button
                          mt={2}
                          bg={"white"}
                          h="180px"
                          key={file.no}
                          overflow={"hidden"}
                          onClick={() => handleClick(file.url)}
                        >
                          <Image
                            maxH={"160px"}
                            borderRadius="lg"
                            src={file.url}
                            alt="stay slide"
                          />
                        </Button>
                      ))}
                  </SimpleGrid>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
        <Text sx={{ whiteSpace: "pre-wrap" }} marginTop={"50px"}>
          {review.content}
        </Text>

        <Box marginTop={"20px"}>
          {hasAccess(review.writer) && (
            <Button colorScheme="blue" onClick={() => navigate("/edit/" + no)}>
              수정
            </Button>
          )}
          {(hasAccess(review.writer) || isAdmin()) && (
            <Button onClick={onOpen} colorScheme="red">
              삭제
            </Button>
          )}
        </Box>
        <Flex marginTop={"20px"} justifyContent={"space-between"}>
          <Button onClick={() => navigate("/review")}>목록으로</Button>
          <Button
            onClick={() => navigate("/restaurant/view/" + review.restaurantId)}
            colorScheme="blue"
          >
            이 맛집 더보기
          </Button>
        </Flex>

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
        <Box marginTop={"20px"}>
          {/* 코멘트 컨테이너로 작성된 글의 번호를 넘김 */}
          <CommentContainer reviewId={no} />
        </Box>
      </Box>
    </Center>
  );
}
