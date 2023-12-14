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
} from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChatIcon } from "@chakra-ui/icons";
import { FaAngleLeft, FaAngleRight, FaFileImage } from "react-icons/fa";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const navigate = useNavigate();

  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);
    // 검색어를 저장할 코드

    navigate("/review/?" + params);
  }

  return (
    <Center>
      <Flex w={"2xl"}>
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
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
    return <Spinner />;
  }

  return (
    <Center>
      <Box w={"5xl"}>
        <Heading>리뷰 보기</Heading>
        <SearchComp />
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>글번호</Th>
                <Th>제목</Th>
                <Th>작성자</Th>
                <Th>작성시간</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reviewList.map((review) => (
                <Tr
                  key={review.no}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/review/" + review.no)}
                >
                  <Td>{review.no}</Td>
                  <Td>
                    {review.title}
                    {review.countComment > 0 && (
                      <Badge>
                        {" "}
                        <ChatIcon />
                        {review.countComment}
                      </Badge>
                    )}
                  </Td>
                  <Td>{review.nickName}</Td>
                  <Td>{review.ago}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Pagination pageInfo={pageInfo} />
      </Box>
    </Center>
  );
}
