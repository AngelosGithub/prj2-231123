import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ReviewContainer } from "./ReviewContainer";
import KakaoMap from "../../component/KakaoMap";
import RestaurantImage from "../../component/RestaurantImage";

import StarRatings from "react-star-ratings/build/star-ratings";
import { LoginContext } from "../../component/LoginProvider";

export function RestaurantView() {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [url, setUrl] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { no } = useParams();
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const navigate = useNavigate();
  const toast = useToast();
  const { kakao } = window;
  useEffect(() => {
    axios
      .get(`/api/restaurant/no/${no}`)
      .then((response) => {
        setRestaurant(response.data.restaurant);
        setReviews(response.data.reviews);
        setUrl(response.data.restaurant.files[0].url);
      })
      .catch(() => console.log("에러"));
  }, []);

  function handleDelete() {
    axios
      .delete(`/api/restaurant/remove/${no}`)
      .then((response) => {
        toast({
          description: no + "번 이 삭제되었습니다.",
          status: "success",
          duration: 1000,
        });
        navigate("/restaurantList");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            description: "작성 내용을 확인해주세요",
            status: "warning",
          });
        } else if (err.response.status === 401) {
          toast({
            description: "로그인후 이용 가능합니다.",
            status: "warning",
          });
        } else if (err.response.status === 403) {
          toast({
            description: "작성 권한이 없습니다.",
            status: "warning",
          });
        } else {
          toast({
            description: "서버 문제로 저장 실패",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  if (restaurant === null) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  function handleClickMore() {
    const params = new URLSearchParams();
    params.set("restaurantNo", no);
    navigate("/review?" + params);
  }

  function handleClick(url) {
    setUrl(url);
  }

  function handleClickWrite() {
    if (isAuthenticated()) {
      navigate("/write/" + restaurant.no);
    } else {
      toast({
        description: "로그인 후 이용 가능 합니다",
        status: "warning",
      });
    }
  }

  return (
    <Center>
      <Box w={"5xl"}>
        <Box h={"500px"}>
          <Flex>
            <Box w={"60%"}>
              <Image w={"100%"} h={"500px"} src={url} />
            </Box>
            <Box w={"40%"} h={"500px"} overflowY={"scroll"}>
              <SimpleGrid
                marginTop={5}
                columns={{ base: 2, md: 2, lg: 2, "2xl": 2 }}
              >
                {restaurant.files.length > 0 &&
                  restaurant.files.map((file) => (
                    <Button
                      mt={2}
                      bg={"white"}
                      h="180px"
                      key={file.no}
                      overflow={"hidden"}
                      onClick={() => handleClick(file.url)}
                    >
                      <Image
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

        <Box h="100px" mt={5} lineHeight="50px">
          <Flex>
            <Box lineHeight="50px">
              <Text fontSize="30px">별점 : </Text>
            </Box>
            <Box lineHeight="50px" ml={5}>
              {restaurant.starPoint > 0 ? (
                <StarRatings
                  rating={restaurant.starPoint}
                  starDimension="30px"
                  starSpacing="3px"
                  starRatedColor="#fcc419"
                  numberOfStars={5}
                />
              ) : (
                <Text fontSize="25px">평가가 아직없습니다.</Text>
              )}
            </Box>
          </Flex>
          <Text fontSize="20px">
            {restaurant.city}-{restaurant.district}
          </Text>
        </Box>

        <Box mt={7}>
          <Box>
            <Heading>매장소개</Heading>
            <Text>{restaurant.info}</Text>
          </Box>
          <Box mt={7}>
            <Flex>
              <Box w="50%" h="350px">
                <Box h="210px">
                  <Text fontSize={"20px"} h={"70px"} lineHeight={"70px"}>
                    가게 이름 : {restaurant.place}
                  </Text>
                  <Text fontSize={"20px"} h={"70px"} lineHeight={"70px"}>
                    주소 : {restaurant.address}
                  </Text>
                  <Text fontSize={"20px"} h={"70px"} lineHeight={"70px"}>
                    전화번호 : {restaurant.phone}
                  </Text>
                </Box>
                <Box h={"140px"}>
                  <Heading mb={5}>테마 요소</Heading>
                  <SimpleGrid columns={{ base: 4, md: 3, lg: 4, "2xl": 4 }}>
                    {restaurant.purpose.map((purpose) => (
                      <Text fontSize={"20px"} key={purpose.no}>
                        {purpose.name}
                      </Text>
                    ))}
                  </SimpleGrid>
                </Box>
              </Box>
              <Box w="50%" h="350px">
                <KakaoMap restaurant={restaurant} />
              </Box>
            </Flex>
          </Box>
          <Box mt={7}>
            <Heading>리뷰</Heading>
            <ReviewContainer reviews={reviews} restaurantNo={no} />
            {reviews.length === 0 ? (
              <Button colorScheme="blue" onClick={handleClickWrite}>
                리뷰작성
              </Button>
            ) : (
              <Flex gap={5} justifyContent={"space-between"} margin={5}>
                <Button onClick={handleClickMore} colorScheme="blue">
                  더보기
                </Button>

                <Button colorScheme="blue" onClick={handleClickWrite}>
                  리뷰작성
                </Button>
              </Flex>
            )}
          </Box>
          <Box>
            {isAdmin() && (
              <Flex gap={8}>
                <Button
                  colorScheme="purple"
                  onClick={() => navigate(`/restaurant/edit/${no}`)}
                >
                  수정
                </Button>
                <Button colorScheme="red" onClick={onOpen}>
                  삭제
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
      {/* 삭제 모달  */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까 ?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              삭제하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
