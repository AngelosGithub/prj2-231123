import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useImmer } from "use-immer";

function RestaurantTypeEdit(props) {
  const { no } = useParams();
  const navigate = useNavigate();

  const toast = useToast();
  const [typeCategory, updateTypeCategory] = useImmer(null);

  useEffect(() => {
    axios
      .get(`/api/category/gettype/${no}`)
      .then((response) => updateTypeCategory(response.data))
      .catch(() => console.log("실패"));
  }, []);

  function handleUpdate() {
    axios
      .put(`/api/category/update/restaurantTypes`, {
        no: typeCategory.no,
        name: typeCategory.name,
      })
      .then(() => {
        toast({
          description: "타입 수정 성공",
          status: "success",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "업데이트 실패",
          status: "error",
        });
      });
  }

  function handleDelete() {
    axios
      .delete(`/api/category/remove/restaurantTypes/${no}`)
      .then(() => {
        toast({
          description: "삭제 성공",
          status: "success",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "삭제 실패",
          status: "error",
        });
      });
  }

  if (typeCategory == null) {
    return <Spinner />;
  }

  return (
    <Center>
      <Card border={"1px solid black"}>
        <CardHeader> 레스토랑 요소 수정</CardHeader>
        <CardBody>
          <FormControl>
            <Box>
              <Input
                value={typeCategory.name}
                onChange={(e) =>
                  updateTypeCategory((draft) => {
                    draft.name = e.target.value;
                  })
                }
              />
            </Box>
            <Box>
              <Flex>
                <Button onClick={handleUpdate}>수정</Button>
                <Button onClick={handleDelete}>삭제</Button>
                <Button onClick={() => navigate(-1)}>취소</Button>
              </Flex>
            </Box>
          </FormControl>
        </CardBody>
      </Card>
    </Center>
  );
}

export default RestaurantTypeEdit;
