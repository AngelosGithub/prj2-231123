import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";

import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import StarRatings from "react-star-ratings/build/star-ratings";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DetailedSelect } from "../../component/DetailedSelect";
import { SearchComponent } from "../../component/SearchComponent";
import { Pagination } from "./Pagination";
import RestaurantImage from "../../component/RestaurantImage";

function RestaurantList(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [restaurantType, setRestaurntType] = useState(null);
  const [restaurantPurpose, setRestaurantPurpose] = useState(null);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    axios.get(`/api/restaurant/list?${params}`).then((response) => {
      setRestaurant(response.data.restaurantList);
      setPageInfo(response.data.pageInfo);
      setRestaurantPurpose(response.data.restaurantPurpose);
      setRestaurntType(response.data.restaurantTypes);
    });
  }, [location]);
  if (restaurant === null) {
    return <Spinner />;
  }

  return (
    <Center>
      <Box w={"3xl"}>
        <SearchComponent />
        {/*/!*상세 조건 컴포넌트  *!/*/}
        <DetailedSelect
          restaurantType={restaurantType}
          restaurantPurpose={restaurantPurpose}
        />
        {/*리뷰 썸네일  */}
        <SimpleGrid
          marginTop={5}
          spacing={"10px"}
          columns={{ base: 2, md: 3, lg: 3, "2xl": 3 }}
        >
          {restaurant.length === 0 ? (
            <Text>글이 없습니다. </Text>
          ) : (
            restaurant.map((restaurant) => (
              <Card
                onClick={() => navigate("/restaurant/view/" + restaurant.no)}
                cursor="pointer"
                key={restaurant.no}
                border={"1px solid black"}
              >
                <RestaurantImage restaurant={restaurant} />

                <CardBody mt={8} fontSize={"2xl"} textAlign={"center"}>
                  <Text> {restaurant.place}</Text>
                </CardBody>
                <CardFooter fontSize={"md"}>
                  <Box>
                    <Box>
                      {restaurant.starPoint > 0 ? (
                        <StarRatings
                          rating={restaurant.starPoint}
                          starDimension="25px"
                          starSpacing="8px"
                          starRatedColor="blue"
                          numberOfStars={5}
                        />
                      ) : (
                        <Text>평가가 없습니다.</Text>
                      )}
                    </Box>

                    {restaurant.address}
                  </Box>
                </CardFooter>
              </Card>
            ))
          )}
        </SimpleGrid>
        {pageInfo !== null && <Pagination pageInfo={pageInfo} />}
      </Box>
    </Center>
  );
}

export default RestaurantList;
