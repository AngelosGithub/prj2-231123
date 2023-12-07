import { Checkbox, CheckboxGroup, Flex, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function PurposeSelect({ restaurantPurpose }) {
  const [checkBoxIds, setCheckBoxIds] = useState([]);
  const navigate = useNavigate();

  function handleCheckBox(values) {
    setCheckBoxIds(values);
    const params = new URLSearchParams();
    params.set("purpose", values);
    navigate("/restaurantList?" + params);
  }

  return (
    <Flex gap={1}>
      <CheckboxGroup onChange={handleCheckBox} value={checkBoxIds}>
        <SimpleGrid
          spacing={"10px"}
          columns={{ base: 4, md: 4, lg: 6, "2xl": 6 }}
        >
          {restaurantPurpose !== null &&
            restaurantPurpose.map((purpose) => (
              <Checkbox size={"3xl"} key={purpose.no} value={purpose.name}>
                {purpose.name}
              </Checkbox>
            ))}
        </SimpleGrid>
      </CheckboxGroup>
    </Flex>
  );
}
