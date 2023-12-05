import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  SimpleGrid,
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
  const [keyword, setKeyword] = useState("");

  const [typeNo, setTypeNo] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [nowPage, setNowPage] = useState(1);

  const [params] = useSearchParams();
  useEffect(() => {
    // const nextParams = new URLSearchParams(params.toString());
    if (checkBoxIds.length >= 0) {
      params.set("purpose", checkBoxIds);
      params.delete("typeno");
    }

    if (typeNo > 0) {
      params.set("typeno", typeNo);
      params.delete("purpose");
    }

    params.set("p", nowPage);
    // setParams(nextParams);
    axios.get(`/api/restaurant/list?${params}`).then((response) => {
      setRestaurant(response.data.restaurantList);
      setPageInfo(response.data.pageInfo);
      setRestaurantPurpose(response.data.restaurantPurpose);
      setRestaurntType(response.data.restaurantTypes);
    });
  }, [checkBoxIds, typeNo, nowPage]);

  useEffect(() => {
    // const nextParams = new URLSearchParams(params.toString());

    setCheckBoxIds([]);
    setTypeNo(0);
    setKeyword("");
    params.delete("typeno");
    params.delete("purpose");

    // setParams(nextParams);
  }, [location]);

  function handleCheckBox(values) {
    setTypeNo(0);
    setNowPage(1);
    setKeyword("");
    setCheckBoxIds(values);
  }

  function handleClickType(v) {
    setCheckBoxIds([]);
    setKeyword("");
    setNowPage(1);
    setTypeNo(v);
  }

  console.log("123", checkBoxIds);
  return (
    <Center>
      <Box w={"3xl"}>
        <SearchComponent keyword={keyword} setKeyword={setKeyword} />
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
          {restaurant === null ? (
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
                  <Flex>
                    <Text> {restaurant.place}</Text>
                  </Flex>
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
        {pageInfo !== null && (
          <Pagination setNowPage={setNowPage} pageInfo={pageInfo} />
        )}
      </Box>
    </Center>
  );
}

export default RestaurantList;
