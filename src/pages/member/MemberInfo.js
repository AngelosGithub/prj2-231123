import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export function MemberInfo() {
  const [member, setMember] = useState(null);

  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get("/api/member?" + params.toString())
      .then((response) => setMember(response.data));
  }, []);

  if (member === null) {
    return <Spinner />;
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
        <Button>수정</Button>
        <Button>탈퇴</Button>
      </Flex>
    </Box>
  );
}
