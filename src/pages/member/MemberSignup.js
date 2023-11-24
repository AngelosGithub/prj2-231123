import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMonth, getYear } from "date-fns";
import { ko } from "date-fns/esm/locale";
import axios from "axios";

export function MemberSignup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  const navigate = useNavigate();

  const Calendar = () => {
    const [startDate, setStartDate] = useState(new Date());
    const startYear = require("lodash");

    const years = startYear.range(1900, getYear(new Date()) + 1, 1);
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    return (
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
        dateFormat={"yyyy.MM.dd"}
        locale={ko}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    );
  };

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
      .then(() => console.log("good"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("end"));
  }

  return (
    <Box>
      <Text>회원가입</Text>
      <FormControl>
        <FormLabel>ID</FormLabel>
        <Input value={id} onChange={(e) => setId(e.target.value)} />
        <Button>중복확인</Button>
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
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
        <Calendar
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit}>가입</Button>
      <Button onClick={() => navigate("/")}>취소</Button>
    </Box>
  );
}
