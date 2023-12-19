import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function MemberSignup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [idAvailable, setIdAvailable] = useState(false);

  let submitAvailable = true;
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);

  const navigate = useNavigate();
  const toast = useToast();

  if (!idAvailable) {
    submitAvailable = false;
  }

  if (password.length < 6) {
    submitAvailable = false;
  }

  function handleSubmit() {
    axios
      .post("/api/member/signup", {
        id,
        password,
        email,
        gender,
        phone,
        birthDate,
      })
      .then(() => navigate("/"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }

  function handleCheckId() {
    const searchParam = new URLSearchParams();
    searchParam.set("id", id);

    axios
      .get("/api/member/check?" + searchParam.toString())
      .then(() => {
        setIdAvailable(false);
        toast({
          description: "이미 사용중인 아이디입니다",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIdAvailable(true);
          toast({
            description: "사용 가능합니다",
            status: "success",
          });
        }
      });
  }

  return (
    <Center>
      <Box w={"1xl"}>
        <FormControl marginTop={5}>
          <FormLabel>ID</FormLabel>
          <Input value={id} onChange={(e) => setId(e.target.value)} />
          <Button onClick={handleCheckId}>중복확인</Button>
        </FormControl>
        <FormControl isInvalid={password.length < 6}>
          <FormLabel>비밀번호</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <FormErrorMessage>
            비밀번호는 6글자 이상 입력해 주세요
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>E-Mail</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>성별</FormLabel>
          <RadioGroup onChange={setGender} value={gender}>
            <Stack direction="row">
              <Radio value="남">남</Radio>
              <Radio value="여">여</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>전화번호</FormLabel>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>생년월일</FormLabel>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            min={"1900-01-01"}
            max={today}
          />
        </FormControl>
        <Box marginTop={5}>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isDisabled={!submitAvailable}
          >
            가입
          </Button>
          <Button onClick={() => navigate("/")}>취소</Button>
        </Box>
      </Box>
    </Center>
  );
}
