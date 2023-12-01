import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";

import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DetailedSelect } from "./DetailedSelect";

import { Pagination } from "./Pagination";
import RestaurantImage from "./RestaurantImage";
import { SearchComponent } from "./SearchComponent";
import { clear } from "@testing-library/user-event/dist/clear";
import StarRatings from "react-star-ratings/build/star-ratings";

function RestaurantList(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [checkBoxIds, setCheckBoxIds] = useState([]);
  const [restaurantType, setRestaurntType] = useState(null);
  const [restaurantPurpose, setRestaurantPurpose] = useState(null);

  const [typeNo, setTypeNo] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [nowPage, setNowPage] = useState(1);

  const [isCheckbox, setIsCheckbox] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (checkBoxIds.length > 0) {
      params.set("purpose", checkBoxIds);
    }

    if (typeNo > 0) {
      params.set("typeno", typeNo);
    }

    axios
      .get(`/api/restaurant/list?${params}&&p=${nowPage}`)
      .then((response) => {
        setRestaurant(response.data.restaurantList);
        setPageInfo(response.data.pageInfo);
        setRestaurantPurpose(response.data.restaurantPurpose);
        setRestaurntType(response.data.restaurantTypes);
      });
  }, [checkBoxIds, typeNo, nowPage]);
  useEffect(() => {
    setCheckBoxIds([]);
    setTypeNo(0);
  }, [location]);
  if (restaurant == null) {
    return <Spinner />;
  }

  function handleCheckBox(values) {
    setTypeNo(0);
    setNowPage(1);
    setCheckBoxIds(values);
  }

  function handleClickType(v) {
    setCheckBoxIds([]);
    setNowPage(1);
    setTypeNo(v);
  }

  return (
    <Center>
      <Box w={"3xl"}>
        <SearchComponent />
        {/*상세 조건 컴포넌트  */}
        <DetailedSelect
          checkBoxIds={checkBoxIds}
          handleClickType={handleClickType}
          restaurantType={restaurantType}
          restaurantPurpose={restaurantPurpose}
          handleCheckBox={handleCheckBox}
        />
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

              <CardBody mt={8} fontSize={"2xl"} textAlign={"center"}>
                <Flex>
                  <Text> {restaurant.place}</Text>
                </Flex>
              </CardBody>
              <CardFooter fontSize={"md"}>
                <Box>
                  <Box>
                    <StarRatings
                      rating={3}
                      starDimension="25px"
                      starSpacing="8px"
                      starRatedColor="blue"
                      numberOfStars={5}
                    />
                  </Box>

                  {restaurant.address}
                </Box>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
        <Pagination setNowPage={setNowPage} pageInfo={pageInfo} />
      </Box>
    </Center>
  );
}

export default RestaurantList;
