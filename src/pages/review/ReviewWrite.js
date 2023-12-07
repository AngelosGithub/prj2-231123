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
import { useNavigate } from "react-router-dom";

export function ReviewWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [recommend, setRecommend] = useState("");
  const [file, setFile] = useState(null);
  const [restaurantId, setRestaurantId] = useState();

  const navigate = useNavigate();

  function handleSubmit() {
    axios
      // 파일을 보내기위해 데이터를 multipart/form-data로 보내는 요청방식(postForm)
      .postForm("/api/review/add", {
        title,
        recommend,
        content,
        restaurantId,
        file,
      })
      .then(() => navigate("/review"))
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
      {/* 리뷰 파일첨부 */}
      <FormControl>
        <FormLabel>사진 첨부</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </FormControl>
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
