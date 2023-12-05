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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function ReviewList() {
  const [reviewList, setReviewList] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/review/list")
      .then((response) => setReviewList(response.data));
  }, []);

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
                <Td>{review.title}</Td>
                <Td>{review.nickName}</Td>
                <Td>{review.inserted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
