import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function MemberEdit() {
  const [member, setMember] = useState(null);
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nickAvailable, setNickAvailable] = useState(false);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios.get("/api/member?" + params.toString()).then((response) => {
      setMember(response.data);
      setNickName(response.data.nickName);
      setPhone(response.data.phone);
      setEmail(response.data.email);
    });
  }, []);

  const id = params.get("id");
  // 기존 닉네임과 같은지
  let sameBeforeNickname = false;
  let nickBlank = false;
  let passwordChecked = false;

  if (member !== null) {
    sameBeforeNickname = member.nickName === nickName;
  }

  if (nickName === "") {
    nickBlank = true;
  }

  if (password.length === 0) {
    passwordChecked = true;
  }

  if (password.length > 5) {
    passwordChecked = true;
  }

  // 기존 닉네임과 같은지, 중복확인을 했거나
  let checkedNickname = sameBeforeNickname || nickAvailable;

  if (member === null) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  function handleSubmit() {
    axios
      .put("/api/member/edit", {
        id: member.id,
        password,
        nickName,
        phone,
        email,
      })
      .then(() => {
        toast({
          description: "회원정보가 수정되었습니다",
          status: "success",
        });
        navigate(-1);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다",
            status: "error",
          });
        } else {
          toast({
            description: "문제가 발생했습니다",
            status: "error",
          });
        }
      })
      .finally(() => console.log("done"));
  }

  function handleCheckNickname() {
    const searchParam = new URLSearchParams();
    searchParam.set("nickName", nickName);

    axios
      .get("/api/member/check?" + searchParam.toString())
      .then(() => {
        setNickAvailable(false);
        toast({
          description: "이미 사용중인 닉네임입니다",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setNickAvailable(true);
          toast({
            description: "사용 가능합니다",
            status: "success",
          });
        }
      });
  }

  return (
    <Center>
      <Box w={"5xl"}>
        <Heading>{id}님 정보 수정</Heading>
        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <Input
            type="text"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
              setNickAvailable(false);
            }}
          />
          <Button
            isDisabled={checkedNickname || nickBlank}
            onClick={handleCheckNickname}
          >
            중복확인
          </Button>
        </FormControl>
        <FormControl isInvalid={password.length < 6}>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 || (
            <FormErrorMessage>
              비밀번호를 입력하지 않으시면 기존 비밀번호로 유지 됩니다
            </FormErrorMessage>
          )}
          {password.length > 0 && (
            <FormErrorMessage>
              비밀번호는 6글자 이상 입력해 주세요
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>전화번호</FormLabel>
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Flex>
          <Button
            colorScheme="blue"
            onClick={onOpen}
            isDisabled={!checkedNickname || !passwordChecked}
          >
            완료
          </Button>
          <Button onClick={() => navigate(-1)}>취소</Button>
        </Flex>

        {/* 수정 모달 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>수정 확인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>수정 하시겠습니까?</ModalBody>

            <ModalFooter>
              <Button onClick={handleSubmit} colorScheme="blue">
                수정
              </Button>
              <Button onClick={onClose}>닫기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
}
