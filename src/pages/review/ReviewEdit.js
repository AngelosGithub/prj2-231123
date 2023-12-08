import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import axios from "axios";

export function ReviewEdit() {
  const [review, updateReview] = useImmer(null);

  const navigate = useNavigate();
  const toast = useToast();
  const { no } = useParams();

  useEffect(() => {
    axios
      .get("/api/review/no/" + no)
      .then((response) => updateReview(response.data));
  }, []);

  if (review === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    axios
      .put("/api/review/edit", review)
      .then(() => {
        toast({
          description: review.no + "번 게시글이 수정되었습니다.",
          status: "success",
        });

        navigate("/review/" + no);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "요청이 잘못되었습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "수정 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => console.log("done"));
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
      {/* 이미지 출력 */}
      {review.files.length > 0 &&
        review.files.map((file) => (
          <Box>
            <Image src={file.url} alt={file.name} />
          </Box>
        ))}
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
      <Button colorScheme="blue" onClick={handleSubmit}>
        수정
      </Button>
      <Button onClick={() => navigate(-1)} colorScheme="red">
        취소
      </Button>
    </Box>
  );
}
