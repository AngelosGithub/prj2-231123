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
import { useNavigate } from "react-router-dom";

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

  console.log(restaurantTypeList);
  console.log(typeNameList);
  if (restaurantTypeList == null) {
    return <Spinner />;
  }

  return (
    <>
      <Box bg={"skyblue"} h={"200px"}>
        <Center>
          <Text>맛집 사이트</Text>
        </Center>
      </Box>

      {typeNameList.length === 0 ? (
        <Text>사이트 준비중</Text>
      ) : (
        typeNameList.map((name) => (
          <Box marginTop={20}>
            <Center>
              <Card bg={"skyblue"} w={"300px"} h={"300px"}>
                <CardHeader bg={"pink"}>
                  <Flex justifyContent={"space-between"}>
                    <Text>{name}</Text>
                    <Button>자세히보기</Button>
                  </Flex>
                </CardHeader>

                {restaurantTypeList.map((restaurant) => (
                  <Flex>
                    <Box border={"1px solid black"}>
                      <Text>{restaurant.typeName}</Text>
                    </Box>
                  </Flex>
                ))}
              </Card>
            </Center>
          </Box>
        ))
      )}
    </>
  );
}
