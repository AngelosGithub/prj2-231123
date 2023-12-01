import React, { useEffect } from "react";
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
import { useImmer } from "use-immer";
import axios from "axios";

function RestaurantPurposeEdit(props) {
  const { no } = useParams();
  const navigate = useNavigate();

  const [purposeCategory, updatePurposeCategory] = useImmer(null);

  const toast = useToast();
  useEffect(() => {
    axios
      .get(`/api/category/getpurpose/${no}`)
      .then((respose) => updatePurposeCategory(respose.data))
      .catch(() => console.log("실패"));
  }, []);

  function handleUpdate() {
    axios
      .put(`/api/category/update/restaurantpurpose`, {
        no: purposeCategory.no,
        name: purposeCategory.name,
      })
      .then(() => {
        toast({
          description: "테마 목적 수정 성공",
          status: "success",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "실패",
          status: "error",
        });
      });
  }

  function handleDelete() {
    axios
      .delete(`/api/category/remove/restaurantpurpose/${no}`)
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
  if (purposeCategory == null) {
    return <Spinner />;
  }

  return (
    <Center>
      <Card border={"1px solid black"}>
        <CardHeader> 레스토랑 테마 수정</CardHeader>
        <CardBody>
          <FormControl>
            <Box>
              <Input
                value={purposeCategory.name}
                onChange={(e) =>
                  updatePurposeCategory((dreft) => {
                    dreft.name = e.target.value;
                  })
                }
              />
            </Box>
            <Box>
              <Flex gap={5}>
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

export default RestaurantPurposeEdit;
