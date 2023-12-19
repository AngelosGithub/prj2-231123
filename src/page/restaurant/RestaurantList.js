import React, { useContext, useEffect, useState } from "react";
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
import { SearchContext } from "../../context/SearchProvider";

function RestaurantList(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [restaurantType, setRestaurntType] = useState(null);
  const [restaurantPurpose, setRestaurantPurpose] = useState(null);
  const { keyword, setKeyword } = useContext(SearchContext);
  const [checkBoxIds, setCheckBoxIds] = useState([]);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    // console.log(params.has("purpose"));
    if (!params.has("purpose")) {
      setCheckBoxIds([]);
    }

    axios.get(`/api/restaurant/list?${params}`).then((response) => {
      setRestaurant(response.data.restaurantList);
      setPageInfo(response.data.pageInfo);
      setRestaurantPurpose(response.data.restaurantPurpose);
      setRestaurntType(response.data.restaurantTypes);
      setKeyword("");
    });
  }, [location]);

  if (restaurant === null) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Center>
      <Box w={"5xl"} h={"1200px"}>
        <Box>
          <Box>
            <DetailedSelect
              restaurantType={restaurantType}
              restaurantPurpose={restaurantPurpose}
              setCheckBoxIds={setCheckBoxIds}
              checkBoxIds={checkBoxIds}
            />
          </Box>
        </Box>
        <Box h={"900px"}>
          <SimpleGrid
            marginTop={5}
            spacing={"10px"}
            columns={{ base: 2, md: 3, lg: 3, "2xl": 3 }}
          >
            {restaurant.length === 0 ? (
              <Text>글이 없습니다. </Text>
            ) : (
              restaurant.map((restaurant) => (
                <Box
                  key={restaurant.no}
                  h={"300px"}
                  onClick={() => navigate("/restaurant/view/" + restaurant.no)}
                >
                  <Box h={"180px"}>
                    {restaurant.files.length > 0 &&
                      restaurant.files.map((file) => (
                        <Image
                          borderRadius="lg"
                          w={"100%"}
                          h={"100%"}
                          key={file.no}
                          src={file.url}
                          alt="stay slide"
                        />
                      ))}
                  </Box>
                  <Box mt={2} h={"120px"}>
                    {restaurant.reviewCount !== 0 ? (
                      <StarRatings
                        rating={restaurant.starPoint}
                        starDimension="25px"
                        starSpacing="8px"
                        starRatedColor="#fcc419"
                        numberOfStars={5}
                      />
                    ) : (
                      <Text textAlign={"center"}>평가 준비중.</Text>
                    )}
                    <Text mt={2}>{restaurant.place}</Text>
                    <Text fontSize={"14px"}>{restaurant.address}</Text>
                  </Box>
                </Box>
              ))
            )}
          </SimpleGrid>
          {pageInfo !== null && <Pagination pageInfo={pageInfo} />}
        </Box>
      </Box>
    </Center>
  );
}

export default RestaurantList;
