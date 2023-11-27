import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  Input,
  Select,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DetailedSelect } from "./DetailedSelect";
import { Pagination } from "./Pagination";

function RestaurantList(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    axios.get("/api/restaurant/list?" + params).then((response) => {
      setRestaurant(response.data.restaurantList);
      setPageInfo(response.data.pageInfo);
    });
  }, [location]);

  if (restaurant == null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex>
        <Select>
          <option>전체</option>
          <option>제목</option>
          <option>내용</option>
        </Select>

        <Input placeholder="검색창" />
        <Button>검색 버튼</Button>
      </Flex>

      {/*상세 조건 컴포넌트  */}
      <DetailedSelect />
      {/*리뷰 썸네일  */}
      <SimpleGrid
        spacing={"10px"}
        columns={{ base: 2, md: 3, lg: 3, "2xl": 3 }}
      >
        {restaurant.map((restaurant) => (
          <Card
            onClick={() => navigate("/restaurant/view/" + restaurant.no)}
            cursor="pointer"
            key={restaurant.no}
            border={"1px solid black"}
          >
            {restaurant.files.length > 0 &&
              restaurant.files.map((file) => (
                <CardHeader border={"1px solid black"} w="100%" h="200px">
                  <Image
                    border={"1px solid black"}
                    h="100%"
                    src={file.url}
                    alt={file.fileName}
                  />
                </CardHeader>
              ))}

            <CardBody>{restaurant.info}</CardBody>
            <CardFooter>{restaurant.address}</CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      <Pagination pageInfo={pageInfo} />
    </Box>
  );
}

export default RestaurantList;
