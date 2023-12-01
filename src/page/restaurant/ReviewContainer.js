import {
  Box,
  Button,
  Center,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export const reivew = [
  { no: 1, title: "돈까스 맛집", name: "홍길동1", inserted: "2023-12-01" },
  { no: 2, title: "곱창 맛집", name: "홍길동2", inserted: "2023-12-01" },
  { no: 3, title: "삼겹살 맛집", name: "홍길동3", inserted: "2023-12-01" },
  { no: 4, title: "치킨 맛집", name: "홍길동4", inserted: "2023-12-01" },
  { no: 5, title: "피자 맛집", name: "홍길동5", inserted: "2023-12-01" },
];

export function ReviewContainer(props) {
  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>작성날짜</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reivew.length < 0 ? (
            <Text>리뷰가 없습니다.</Text>
          ) : (
            reivew.map((reivews) => (
              <Tr>
                <Td>{reivews.no}</Td>
                <Td>{reivews.title}</Td>
                <Td>{reivews.name}</Td>
                <Td>{reivews.inserted}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Button colorScheme="blue">더보기</Button>
    </Box>
  );
}
