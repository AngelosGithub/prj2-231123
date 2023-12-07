import { Flex, Radio, RadioGroup, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function TypeSelect({ restaurantType }) {
  const [typeNo, setTypeNo] = useState(0);

  const navigate = useNavigate();

  function handleClickType(v) {
    const params = new URLSearchParams();
    params.set("typeNo", v);
    navigate("/restaurantList?" + params);
  }

  return (
    <Flex gap={1}>
      <RadioGroup onChange={handleClickType}>
        <SimpleGrid
          spacing={"10px"}
          columns={{ base: 4, md: 4, lg: 6, "2xl": 6 }}
        >
          {restaurantType !== null &&
            restaurantType.map((type) => (
              <Radio
                size="sm"
                colorScheme="green"
                key={type.no}
                value={type.no}
              >
                {type.name}
              </Radio>
            ))}
        </SimpleGrid>
      </RadioGroup>
    </Flex>
  );
}
