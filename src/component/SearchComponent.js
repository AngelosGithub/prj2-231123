import { Box, Button, Center, Flex, Input, Select } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export function SearchComponent({ keyword, setKeyword, setCheckBoxIds }) {
  const [category, setCategory] = useState("all");

  const navigate = useNavigate();

  function handleSearch() {
    const params = new URLSearchParams();
    setCheckBoxIds([]);
    params.set("k", keyword);
    params.set("c", category);
    navigate("/restaurantList?" + params);
  }
  return (
    <Center>
      <Flex gap={1} mb={5}>
        <Box>
          <Select
            border={"1px solid black"}
            defaultValue={"all"}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">전체</option>
            <option value="place">음식점</option>
            <option value="district">지역</option>
          </Select>
        </Box>
        <Box>
          <Input
            w={"sm"}
            border={"1px solid black"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Box>
        <Box>
          <Button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Box>
      </Flex>
    </Center>
  );
}
