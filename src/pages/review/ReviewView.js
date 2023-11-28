import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function ReviewView() {
  const [review, setReview] = useState(null);

  const { no } = useParams();

  useEffect(() => {
    axios
      .get("/api/review/no/" + no)
      .then((response) => setReview(response.data));
  }, []);

  if (review === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>리뷰 보기</Heading>
      <Text>번호 : {review.no}</Text>
      <Text>제목 : {review.title}</Text>
      <Text>내용 : {review.content}</Text>
      <Text>작성자 : {review.writer}</Text>
      <Text>작성일 : {review.inserted}</Text>
    </Box>
  );
}
