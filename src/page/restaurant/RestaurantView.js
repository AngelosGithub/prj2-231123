import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
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
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { ReviewContainer } from "./ReviewContainer";
import KakaoMap from "../../component/KakaoMap";

export function RestaurantView() {
  const [restaurant, setRestaurant] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { no } = useParams();

  const navigate = useNavigate();
  const toast = useToast();
  const { kakao } = window;
  useEffect(() => {
    axios
      .get(`/api/restaurant/no/${no}`)
      .then((response) => {
        setRestaurant(response.data);
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
        navigate("/");
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
        <Card border={"1px solid black"}>
          <CardHeader>
            <KakaoMap restaurant={restaurant} />
          </CardHeader>
          <CardBody>
            <FormControl>
              <FormLabel>별점</FormLabel>
            </FormControl>

            <FormControl>
              <FormLabel>이미지</FormLabel>
              {restaurant.files.map((file) => (
                <Card key={file.no} mb={5}>
                  <CardBody>
                    <Image
                      width="100%"
                      height="300px"
                      src={file.url}
                      alt={file.fileName}
                    />
                  </CardBody>
                </Card>
              ))}
            </FormControl>

            <FormControl>
              <FormLabel>매장 이름</FormLabel>
              <Input value={restaurant.place} readOnly />
            </FormControl>

            <FormControl>
              <FormLabel>주소</FormLabel>
              <Input value={restaurant.address} readOnly />
            </FormControl>

            <FormControl>
              <FormLabel>전화번호</FormLabel>
              <Input value={restaurant.phone} readOnly />
            </FormControl>

            <FormControl>
              <FormLabel>간단 설명</FormLabel>
              <Input value={restaurant.info} readOnly />
            </FormControl>

            <FormControl>
              <FormLabel>테마</FormLabel>
              <Flex>
                {restaurant.purpose.map((purpose) => (
                  <Card key={purpose.no} mb={5}>
                    <CardBody>
                      <Text>{purpose.name}</Text>
                    </CardBody>
                  </Card>
                ))}
              </Flex>
            </FormControl>
          </CardBody>
          <CardFooter>
            <Flex gap={8}>
              <Button colorScheme="blue">더보기</Button>
              <Button colorScheme="green">리뷰작성</Button>

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
      <ReviewContainer restaurantNo={no} />
    </>
  );
}
