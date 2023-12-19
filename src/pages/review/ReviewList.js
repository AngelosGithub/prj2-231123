import {
  Box,
  Button,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Input,
  Flex,
  Center,
  Text,
  Image,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatIcon } from "@chakra-ui/icons";
import { FaAngleLeft, FaAngleRight, FaFileImage } from "react-icons/fa";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from "react-star-ratings/build/star-ratings";
import { ReviewImage } from "./ReviewImage";

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  console.log(params.toString());

  function handleClick() {
    params.set("p", pageNumber);
    navigate("/review?" + params);
  }

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}

function Pagination({ pageInfo }) {
  // page 컴포넌트
  const navigate = useNavigate();

  const pageNums = [];

  for (let i = pageInfo.startPageNum; i <= pageInfo.endPageNum; i++) {
    pageNums.push(i);
  }

  return (
    <Center marginTop={5}>
      <Box>
        {pageInfo.prevPage && (
          <Button
            variant={"ghost"}
            onClick={() => navigate("/review?p=" + pageInfo.prevPage)}
          >
            <FaAngleLeft />
          </Button>
        )}

        {pageNums.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            variant={pageNumber === pageInfo.currentPage ? "solid" : "ghost"}
            pageNumber={pageNumber}
          >
            {pageNumber}
          </PageButton>
        ))}

        {pageInfo.nextPage && (
          <Button
            variant={"ghost"}
            onClick={() => navigate("/review?p=" + pageInfo.nextPage)}
          >
            <FaAngleRight />
          </Button>
        )}
      </Box>
    </Center>
  );
}

function SearchComp() {
  // 검색기능
  const [keyword, setKeyword] = useState("");
  // 조건 검색
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);
    // 검색어를 저장할 코드
    params.set("c", category);
    // 검색 조건 저장

    navigate("/review/?" + params);
  }

  const onSubmitSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch(); //키를 눌렀을 때 동작할 코드
    }
  };

  return (
    <Center>
      <Flex marginTop={"20px"}>
        {/* 조건 검색용 */}
        <Select w={"100px"} onChange={(e) => setCategory(e.target.value)}>
          <option selected value={"all"}>
            전체
          </option>
          <option value={"title"}>제목</option>
          <option value={"content"}>본문</option>
        </Select>
        <Input
          marginX={"5px"}
          w={"sm"}
          border={"1px solid black"}
          placeholder="리뷰 내 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={onSubmitSearch}
        />
        <Button onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Flex>
    </Center>
  );
}

export function ReviewList() {
  const [reviewList, setReviewList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  // 페이지 나누고 페이지 번호 받아오는 코드
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/api/review/list?" + params)
      // 얻어낸 페이지 번호 값 사용
      .then((response) => {
        setReviewList(response.data.reviewList);
        setPageInfo(response.data.pageInfo);
      });
  }, [location]);
  // dependency를 params에서 location으로 바꿈(react에서 권장)

  if (reviewList === null) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Center>
      <Box w={"5xl"}>
        <SimpleGrid
          marginTop={5}
          spacing={"10px"}
          columns={{ base: 2, md: 3, lg: 3, "2xl": 3 }}
        >
          {reviewList.map((review) => (
            <Box
              key={review.no}
              _hover={{ cursor: "pointer" }}
              onClick={() => navigate("/review/" + review.no)}
            >
              <Center
                my={"5px"}
                w={"100%"}
                h={"180px"}
                overflow={"hidden"}
                borderRadius="lg"
              >
                {review.files.length > 0 &&
                  review.files.map((file) => (
                    <Image
                      w={"100%"}
                      key={file.no}
                      src={file.url}
                      alt="stay slide"
                    />
                  ))}
              </Center>
              <Box>
                [{review.place}] {review.title}
                {review.countComment > 0 && (
                  <Badge>
                    {" "}
                    <ChatIcon />
                    {review.countComment}
                  </Badge>
                )}
                <Box>
                  {review.starPoint >= 0 && (
                    <StarRatings
                      rating={review.starPoint}
                      starDimension="20px"
                      starSpacing="2px"
                      starRatedColor="#fcc419"
                      numberOfStars={5}
                    />
                  )}
                </Box>
              </Box>
              <Box>{review.nickName}</Box>
              <Box>{review.ago}</Box>
            </Box>
          ))}
        </SimpleGrid>

        <SearchComp />
        <Pagination pageInfo={pageInfo} />
      </Box>
    </Center>
  );
}
