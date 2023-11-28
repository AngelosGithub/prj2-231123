import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import axios from "axios";

export function ReviewEdit() {
  const [review, updateReview] = useImmer(null);

  const navigate = new Navigator();
  const { no } = useParams();

  useEffect(() => {
    axios
      .get("/api/review/no/" + no)
      .then((response) => updateReview(response.data));
  }, []);

  if (review === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>리뷰 수정하기</Heading>

      <Flex>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
            value={review.title}
            onChange={(e) => {
              updateReview((draft) => {
                draft.title = e.target.value;
              });
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>추천메뉴</FormLabel>
          <Input
            value={review.recommend}
            onChange={(e) => {
              updateReview((draft) => {
                draft.recommend = e.target.value;
              });
            }}
          />
        </FormControl>
      </Flex>
      <FormControl>
        <FormLabel>내용</FormLabel>
        <Textarea
          value={review.content}
          onChange={(e) => {
            updateReview((draft) => {
              draft.content = e.target.value;
            });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input
          value={review.writer}
          onChange={(e) => {
            updateReview((draft) => {
              draft.writer = e.target.value;
            });
          }}
        />
      </FormControl>
      <Button>수정</Button>
      <Button onClick={() => navigate(-1)}>취소</Button>
    </Box>
  );
}
