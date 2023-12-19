import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Switch,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FaStar } from "react-icons/fa6";
import styled from "@emotion/styled";

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

export function ReviewEdit() {
  const [review, updateReview] = useImmer(null);
  const [removeFileIds, setRemoveFileIds] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);
  const ARRAY = [0, 1, 2, 3, 4];
  const [score, setScore] = useState([false, false, false, false, false]);
  const [point, setPoint] = useState(0);

  const navigate = useNavigate();
  const toast = useToast();
  const { no } = useParams();

  const handleStarClick = (index) => {
    let star = [...score];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index ? true : false;
    }
    setScore(star);
  };

  useEffect(() => {
    sendReview();
  }, [score]);

  const sendReview = () => {
    let point = score.filter(Boolean).length;
    // point 값을 할당
    setPoint(point);
    // 할당된 값을 서버로 보낼수 있게 함
  };

  useEffect(() => {
    axios
      .get("/api/review/no/" + no)
      .then((response) => updateReview(response.data));
  }, []);

  if (review === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    // 전송버튼 클릭시 removeFileIds 의 값도 같이 전송시키기
    axios
      .putForm("/api/review/edit", {
        no: review.no,
        title: review.title,
        content: review.content,
        recommend: review.recommend,
        removeFileIds,
        uploadFiles,
        point,
      })
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

  console.log(removeFileIds);
  function handleRemoveFile(e) {
    // e : 이벤트 객체를 받는다
    if (e.target.checked) {
      // removeFileIds 에 추가
      setRemoveFileIds([...removeFileIds, e.target.value]);
    } else {
      // removeFileIds 에서 삭제
      setRemoveFileIds(removeFileIds.filter((item) => item !== e.target.value));
    }
  }

  return (
    <Center>
      <Box w={"4xl"}>
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
        {/* 별점 출력 */}
        <Flex>
          <Stars>
            {ARRAY.map((el, index) => (
              <FaStar
                key={index}
                size="30"
                onClick={() => handleStarClick(el)}
                className={score[el] && "yellowStar"}
              ></FaStar>
            ))}
          </Stars>
        </Flex>
        {/* 이미지 출력 */}
        <Flex>
          {review.files.length > 0 &&
            review.files.map((file) => (
              <Box margin={"10px"}>
                <FormControl display={"flex"} alignItems={"center"}>
                  <FormLabel>
                    <FontAwesomeIcon color="red" icon={faTrashCan} />
                  </FormLabel>
                  <Switch
                    value={file.no}
                    colorScheme="red"
                    onChange={handleRemoveFile}
                  />
                </FormControl>
                <Box w={"150px"} h={"150px"}>
                  <Image src={file.url} alt={file.name} />
                </Box>
              </Box>
            ))}
        </Flex>
        {/* 파일 더 추가 하기 */}
        <FormControl>
          <FormLabel>사진 첨부</FormLabel>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setUploadFiles(e.target.files)}
          />
          {/* 여러 파일 전송 */}
          <FormHelperText>
            한 개 파일은 1MB, 총 용량은 10MB를 넘길수 없습니다
          </FormHelperText>
        </FormControl>
        <FormControl marginY={"20px"}>
          <FormLabel>리뷰 작성하기</FormLabel>
          <Textarea
            h={"500px"}
            resize={"none"}
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
    </Center>
  );
}
