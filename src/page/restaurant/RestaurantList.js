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

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [params] = useSearchParams();
  useEffect(() => {
    if (checkBoxIds.length > 0) {
      params.set("purpose", checkBoxIds);
      params.delete("typeno");
    }

    if (typeNo > 0) {
      params.set("typeno", typeNo);
      params.delete("purpose");
    }

    params.set("p", nowPage);
    axios.get(`/api/restaurant/list?${params}`).then((response) => {
      setRestaurant(response.data.restaurantList);
      setPageInfo(response.data.pageInfo);
      setRestaurantPurpose(response.data.restaurantPurpose);
      setRestaurntType(response.data.restaurantTypes);
    });
  }, [checkBoxIds, typeNo, nowPage]);
  useEffect(() => {
    setCheckBoxIds([]);
    setTypeNo(0);

    params.delete("typeno");
    params.delete("purpose");
  }, [location]);
  if (restaurant == null) {
    return <Spinner />;
  }

  function handleCheckBox(values) {
    setTypeNo(0);
    setNowPage(1);
    setCategory("all");
    setKeyword("");
    setCheckBoxIds(values);
  }

  function handleClickType(v) {
    setCheckBoxIds([]);
    setCategory("all");
    setKeyword("");
    setNowPage(1);
    setTypeNo(v);
  }

  function handleSearch() {}

  return (
    <Center>
      <Box w={"3xl"}>
        <SearchComponent
          keyword={keyword}
          setKeyword={setKeyword}
          category={category}
          setCategory={setCategory}
        />
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
            <Box>
              <Text>글이 없습니다.</Text>
            </Box>
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
        <Pagination setNowPage={setNowPage} pageInfo={pageInfo} />
      </Box>
    </Center>
  );
}

export default RestaurantList;
