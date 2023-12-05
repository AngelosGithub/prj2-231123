import {
  Box,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  Radio,
  RadioGroup,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function DetailedSelect({
  restaurantType,
  restaurantPurpose,
  handleClickType,
  handleCheckBox,
  checkBoxIds,
}) {
  return (
    <Center>
      <Box>
        <Tabs>
          <TabList>
            <Tab>음식 요소</Tab>
            <Tab>음식 테마</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
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
            </TabPanel>
            <TabPanel>
              <Flex gap={1}>
                <CheckboxGroup onChange={handleCheckBox} value={checkBoxIds}>
                  <SimpleGrid
                    spacing={"10px"}
                    columns={{ base: 4, md: 4, lg: 6, "2xl": 6 }}
                  >
                    {restaurantPurpose !== null &&
                      restaurantPurpose.map((purpose) => (
                        <Checkbox
                          size={"3xl"}
                          key={purpose.no}
                          value={purpose.name}
                        >
                          {purpose.name}
                        </Checkbox>
                      ))}
                  </SimpleGrid>
                </CheckboxGroup>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}
