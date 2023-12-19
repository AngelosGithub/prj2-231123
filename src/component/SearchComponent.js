import { Box, Button, Center, Flex, Input, Select } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { SearchContext } from "../context/SearchProvider";

export function SearchComponent() {
  const [category, setCategory] = useState("all");
  const { keyword, setKeyword } = useContext(SearchContext);
  const navigate = useNavigate();

  function handleSearch() {
    const params = new URLSearchParams();
    // setCheckBoxIds([]);
    params.set("k", keyword);
    params.set("c", category);
    navigate("/restaurantList?" + params);
  }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <Center>
      <Flex gap={1} mb={5} margin={"auto"}>
        <Box>
          <Select
            w={"90px"}
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
            w={"300px"}
            border={"1px solid black"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleOnKeyPress}
            placeholder="음식점 및 지역 검색 "
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
