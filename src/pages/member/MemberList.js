import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [memberList, setMemberList] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/member/list")
      .then((response) => setMemberList(response.data));
  }, []);

  if (memberList === null) {
    return <Spinner />;
  }

  function handleMemberClick(id) {
    const params = new URLSearchParams();
    params.set("id", id);

    navigate("/member?" + params.toString());
  }

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>아이디</Th>
            <Th>닉네임</Th>
            <Th>이메일</Th>
            <Th>가입일자</Th>
          </Tr>
        </Thead>
        <Tbody>
          {memberList.map((member) => (
            <Tr
              key={member.id}
              onClick={() => handleMemberClick(member.id)}
              _hover={{ cursor: "pointer" }}
            >
              <Td>{member.id}</Td>
              <Td>{member.nickName}</Td>
              <Td>{member.email}</Td>
              <Td>{member.inserted}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
