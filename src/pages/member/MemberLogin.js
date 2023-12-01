import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function MemberLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin() {
    axios
      .post("/api/member/login", { id, password })
      .then(() => navigate("/"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }

  return (
    <Box>
      <FormControl>
        <FormLabel>아이디</FormLabel>
        <Input value={id} onChange={(e) => setId(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Flex>
        <Button onClick={() => navigate("/signup")}>회원 가입</Button>
        <Button onClick={handleLogin}>로그인</Button>
      </Flex>
    </Box>
  );
}
