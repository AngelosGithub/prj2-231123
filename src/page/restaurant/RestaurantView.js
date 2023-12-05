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
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { ReviewContainer } from "./ReviewContainer";
import KakaoMap from "../../component/KakaoMap";
import RestaurantImage from "./RestaurantImage";

import StarRatings from "react-star-ratings/build/star-ratings";

export function RestaurantView() {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { no } = useParams();

  const navigate = useNavigate();
  const toast = useToast();
  const { kakao } = window;
  useEffect(() => {
    axios
      .get(`/api/restaurant/no/${no}`)
      .then((response) => {
        setRestaurant(response.data.restaurant);
        setReviews(response.data.reviews);
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
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  if (restaurant === null) {
    return <Spinner />;
  }
  return (
    <>
      <Center>
        <Card w={"3xl"} border={"1px solid black"}>
          <CardHeader>
            <KakaoMap restaurant={restaurant} />
          </CardHeader>
          <CardBody>
            <FormControl mt={5}>
              {/*TODO :
             해당 별점 점수 데이터 받아서 별점 컴포넌트에 전달해서 출력*/}
              <FormLabel>별점</FormLabel>
              {/*<StarView />*/}
              {restaurant.starPoint > 0 ? (
                <StarRatings
                  rating={restaurant.starPoint}
                  starDimension="30px"
                  starSpacing="3px"
                  starRatedColor="blue"
                  numberOfStars={5}
                />
              ) : (
                <Text>평가가 아직없습니다.</Text>
              )}
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>이미지</FormLabel>

              <RestaurantImage restaurant={restaurant} />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>매장 이름</FormLabel>
              <Input value={restaurant.place} readOnly />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>주소</FormLabel>
              <Input value={restaurant.address} readOnly />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>전화번호</FormLabel>
              <Input value={restaurant.phone} readOnly />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>간단 설명</FormLabel>
              <Textarea value={restaurant.info} readOnly />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>테마</FormLabel>
              <Flex>
                <SimpleGrid
                  spacing={"10px"}
                  columns={{ base: 4, md: 3, lg: 4, "2xl": 6 }}
                >
                  {restaurant.purpose.map((purpose) => (
                    <Card key={purpose.no} mb={5}>
                      <CardBody>
                        <Text>{purpose.name}</Text>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </Flex>
            </FormControl>
          </CardBody>

          <Box>
            <Flex>
              <Text>리뷰</Text>
            </Flex>
            <ReviewContainer reviews={reviews} restaurantNo={no} />
          </Box>
          <CardFooter>
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
          </CardFooter>
        </Card>

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
    </>
  );
}
