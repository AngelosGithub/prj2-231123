import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Center,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DetailedSelect } from "./DetailedSelect";

import { Pagination } from "./Pagination";
import RestaurantImage from "./RestaurantImage";
import { SearchComponent } from "./SearchComponent";
import { clear } from "@testing-library/user-event/dist/clear";

function RestaurantList(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [checkBoxIds, setCheckBoxIds] = useState([]);
  const [restaurantType, setRestaurntType] = useState(null);
  const [restaurantPurpose, setRestaurantPurpose] = useState(null);

  const [typeNo, setTypeNo] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams();
    if (checkBoxIds.length > 0) {
      params.set("purpose", checkBoxIds);
    }

    if (typeNo > 0) {
      params.set("typeno", typeNo);
    }

    axios.get("/api/restaurant/list?" + params).then((response) => {
      setRestaurant(response.data.restaurantList);
      setPageInfo(response.data.pageInfo);
      setRestaurantPurpose(response.data.restaurantPurpose);
      setRestaurntType(response.data.restaurantTypes);
    });
  }, [location, checkBoxIds, typeNo]);

  if (restaurant == null) {
    return <Spinner />;
  }

  function handleCheckBox(values) {
    setTypeNo(0);
    setCheckBoxIds(values);
  }

  function handleClickType(v) {
    setCheckBoxIds([]);
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
                {restaurant.place}
              </CardBody>
              <CardFooter fontSize={"md"}>{restaurant.address}</CardFooter>
            </Card>
          ))}
        </SimpleGrid>
        <Pagination pageInfo={pageInfo} />
      </Box>
    </Center>
  );
}

export default RestaurantList;
