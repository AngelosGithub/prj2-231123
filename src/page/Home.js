import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Image,
  Img,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BannerSlider, { BannerImg } from "../component/BannerSlider";
export function Home() {
  const [restaurantTypeList, setRestaurantTypeList] = useState(null);
  const [typeNameList, setTypeNameList] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/restaurant/typeList").then((response) => {
      setRestaurantTypeList(response.data.restaurantList);
      setTypeNameList(response.data.typeName);
    });
  }, []);

  if (restaurantTypeList == null) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Center>
        <Box w={"5xl"}>
          <BannerSlider />
        </Box>
      </Center>

      {typeNameList.length === 0 ? (
        <Text>사이트 준비중</Text>
      ) : (
        typeNameList.map((nameList) => (
          <Box marginTop={20} key={nameList.no}>
            <Center>
              <Card w={"800px"} h={"320px"} borderRadius="lg">
                <CardHeader borderBottom={"1px solid #D7DBDD"}>
                  <Flex justifyContent={"space-between"}>
                    <Text>
                      {nameList.name}({nameList.count})
                    </Text>
                    <Button
                      rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
                      onClick={() =>
                        navigate("restaurantList?typeNo=" + nameList.no)
                      }
                      colorScheme="blue"
                    >
                      자세히보기
                    </Button>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Flex gap={8} justifyContent={"flex-start"}>
                    {restaurantTypeList
                      .filter((item) => item.typeName === nameList.name)
                      .map(
                        (restaurant) =>
                          restaurant.files.length > 0 &&
                          restaurant.files.map((file) => (
                            <Box
                              key={restaurant.no}
                              w={"250px"}
                              h={"180px"}
                              onClick={() =>
                                navigate("/restaurant/view/" + restaurant.no)
                              }
                            >
                              <Center
                                my={"5px"}
                                w={"100%"}
                                h={"130px"}
                                overflow={"hidden"}
                                borderRadius="lg"
                              >
                                <Image
                                  w={"100%"}
                                  key={file.no}
                                  src={file.url}
                                  alt="stay slide"
                                />
                              </Center>
                              <Text>{restaurant.place}</Text>
                              {restaurant.starPoint > 0 ? (
                                <StarRatings
                                  rating={restaurant.starPoint}
                                  starDimension="25px"
                                  starSpacing="8px"
                                  starRatedColor="#fcc419"
                                  numberOfStars={5}
                                />
                              ) : (
                                <Text>평가 준비중입니다.</Text>
                              )}
                            </Box>
                          )),
                      )}
                  </Flex>
                </CardBody>
              </Card>
            </Center>
          </Box>
        ))
      )}
    </>
  );
}
