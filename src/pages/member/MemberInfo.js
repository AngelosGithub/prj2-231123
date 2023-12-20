import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider";

export function MemberInfo() {
  const [member, setMember] = useState(null);

  const { hasAccess } = useContext(LoginContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 처음 페이지가 로딩될때 한번 랜더링
    axios
      .get("/api/member?" + params.toString())
      .then((response) => setMember(response.data))
      .catch((error) => {
        navigate("/login");
        toast({
          description: "권한이 없습니다",
          status: "warning",
        });
      });
  }, [params]);
  // 위의 값이 없을 경우 한번만 랜더링하고 값이 있을 경우 그 값이 변경 될 때 마다 다시 랜더링 함

  if (member === null) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  function handleDelete() {
    axios
      .delete("/api/member?" + params.toString())
      .then((response) => {
        toast({
          description: "탈퇴 되었습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "탈퇴 중 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  return (
    <Center>
      <Box w={"1xl"}>
        <Heading>{member.id}님 정보</Heading>
        <FormControl marginTop={5}>
          <FormLabel>닉네임</FormLabel>
          <Input value={member.nickName} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input type="text" value={member.password} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input value={member.email} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>전화번호</FormLabel>
          <Input value={member.phone} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>생년월일</FormLabel>
          <Input value={member.birthDate} readOnly />
        </FormControl>
        <Flex marginTop={5}>
          {hasAccess(member.id) && (
            <Button
              colorScheme="blue"
              onClick={() => navigate("/member/edit?" + params.toString())}
            >
              수정
            </Button>
          )}
          <Button colorScheme="red" onClick={onOpen}>
            탈퇴
          </Button>
          <Button onClick={() => navigate(-1)}>취소</Button>
        </Flex>

        {/* 탈퇴 모달 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>탈퇴 확인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>탈퇴 하시겠습니까?</ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>닫기</Button>
              <Button onClick={handleDelete} colorScheme="red">
                탈퇴
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
}
