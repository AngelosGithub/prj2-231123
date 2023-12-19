import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { LoginContext } from "../../component/LoginProvider";

export function MemberLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { fetchLogin } = useContext(LoginContext);

  const navigate = useNavigate();
  const toast = useToast();

  function handleLogin() {
    axios
      .post("/api/member/login", { id, password })
      .then(() => {
        toast({
          description: "로그인 되었습니다",
          status: "info",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "아이디와 암호를 확인하세요",
          status: "warning",
        });
      });
  }

  const onSubmitLogin = (e) => {
    if (e.key === "Enter") {
      handleLogin(); //키를 눌렀을 때 동작할 코드
    }
  };

  return (
    <Center>
      <Box w={"1xl"}>
        <FormControl>
          <FormLabel>아이디</FormLabel>
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyPress={onSubmitLogin}
          />
        </FormControl>
        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input
            onKeyPress={onSubmitLogin}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Flex justifyContent={"space-between"} marginTop={"20px"}>
          <Button colorScheme="green" onClick={() => navigate("/signup")}>
            회원 가입
          </Button>
          <Button colorScheme="blue" onClick={handleLogin}>
            로그인
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
