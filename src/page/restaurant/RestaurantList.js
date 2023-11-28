import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DetailedSelect } from "./DetailedSelect";

import { Pagination } from "./Pagination";
import RestaurantImage from "./RestaurantImage";
import { SearchComponent } from "./SearchComponent";

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
      <SearchComponent />
      {/*상세 조건 컴포넌트  */}
      <DetailedSelect />
      {/*리뷰 썸네일  */}
      <SimpleGrid
        marginTop={5}
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
            <RestaurantImage restaurant={restaurant} />

            <CardBody mt={8} border={"1px solid blue"}>
              {restaurant.place}
            </CardBody>
            <CardFooter border={"1px solid black"}>
              {restaurant.address}
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      <Pagination pageInfo={pageInfo} />
    </Box>
  );
}

export default RestaurantList;
