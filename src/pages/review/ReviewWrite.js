import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function ReviewWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [recommend, setRecommend] = useState("");
  const [restaurantId, setRestaurantId] = useState();

  function handleSubmit() {
    axios
      .post("/api/review/add", {
        title,
        recommend,
        content,
        restaurantId,
      })
      .then(() => console.log("잘됨"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("end"));
  }

  return (
    <Box>
      <Flex>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>추천메뉴</FormLabel>
          <Input
            value={recommend}
            onChange={(e) => setRecommend(e.target.value)}
          />
        </FormControl>
      </Flex>
      <FormControl>
        <FormLabel>내용</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>임시 맛집id</FormLabel>
        <Input
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit}>확인</Button>
    </Box>
  );
}
