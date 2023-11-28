import { Box, Button, Center, Flex } from "@chakra-ui/react";
import React from "react";

export function DetailedSelect() {
  return (
    <Center>
      <Flex gap={1} marginTop={5}>
        <Box>
          <Button>한식</Button>
          <Button>중식</Button>
          <Button>일식</Button>
          <Button>레스토랑</Button>
          <Button>씨푸드</Button>
          <Button>카페</Button>
        </Box>
      </Flex>
    </Center>
  );
}
