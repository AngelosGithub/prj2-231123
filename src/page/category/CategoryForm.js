import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function CategoryForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("types");
  const navigate = useNavigate();
  const toast = useToast();
  function handleSubmit() {
    if (category !== null) {
      if (category === "types") {
        axios
          .post(`/api/category/add/restaurantTypes`, { name })
          .then((response) => {
            toast({
              description: "저장 성공",
              status: "success",
            });
            navigate("/categoryList");
          })
          .catch((err) => {
            if (err.response.status === 400) {
              toast({
                description: "작성 내용을 확인해주세요",
                status: "warning",
              });
            } else {
              toast({
                description: "서버 문제로 저장 실패",
                status: "error",
              });
            }
          });
      }

      if (category === "purpose") {
        axios
          .post(`/api/category/add/restaurantPurpose`, { name })
          .then((response) => {
            toast({
              description: "저장 성공",
              status: "success",
            });
            navigate("/categoryList");
          })
          .catch((err) => {
            toast({
              description: "서버 문제로 저장 실패",
              status: "error",
            });
          });
      }
    }
  }

  return (
    <Center>
      <Card border={"1px solid black"}>
        <CardHeader>카테고리 등록</CardHeader>
        <CardBody>
          <FormControl>
            <Flex>
              <Box>
                <Select
                  defaultValue={"types"}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="types">요소</option>
                  <option value="purpose">목적</option>
                </Select>
              </Box>
              <Box>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
                <Button onClick={handleSubmit}>등록</Button>
                <Button onClick={() => navigate(-1)}>취소</Button>
              </Box>
            </Flex>
          </FormControl>
        </CardBody>
      </Card>
    </Center>
  );
}
