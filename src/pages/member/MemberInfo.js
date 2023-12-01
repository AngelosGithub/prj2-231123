import {
  Box,
  Button,
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
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function MemberInfo() {
  const [member, setMember] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  if (member === null) {
    return <Spinner />;
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
    <Box>
      <Heading>{member.id}님 정보</Heading>
      <FormControl>
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
      <Flex>
        <Button
          colorScheme="blue"
          onClick={() => navigate("/member/edit?" + params.toString())}
        >
          수정
        </Button>
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
  );
}
