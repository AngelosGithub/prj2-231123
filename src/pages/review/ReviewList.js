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
} from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChatIcon } from "@chakra-ui/icons";

function Pagination({ pageInfo }) {
  // page 컴포넌트
  const navigate = useNavigate();

  const pageNums = [];

  for (let i = pageInfo.startPageNum; i < pageInfo.endPageNum; i++) {
    pageNums.push(i);
  }

  return (
    <Box>
      {pageNums.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => navigate("/review?p=" + pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
    </Box>
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
    <Box>
      <Heading>리뷰 보기</Heading>
      <Button onClick={() => navigate("/write")}>리뷰 쓰기</Button>
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
  );
}
