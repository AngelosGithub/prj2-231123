import {
  Box,
  Button,
  Center,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import StarRatings from "react-star-ratings/build/star-ratings";
import { useNavigate } from "react-router-dom";

export function ReviewContainer({ reviews }) {
  const navigate = useNavigate();
  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>작성날짜</Th>
            <Th>평점</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reviews.length === 0 ? (
            <Tr>
              <Td>준비중입니다</Td>
            </Tr>
          ) : (
            reviews.map((reivew) => (
              <Tr
                key={reivew.no}
                onClick={() => navigate(`/review/${reivew.no}`)}
              >
                <Td>{reivew.no}</Td>
                <Td>{reivew.title}</Td>
                <Td>{reivew.writer}</Td>
                <Td>{reivew.ago}</Td>
                <Td>
                  <StarRatings
                    rating={reivew.starPoint}
                    starDimension="13px"
                    starSpacing="4px"
                    starRatedColor="#fcc419"
                    numberOfStars={5}
                  />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
