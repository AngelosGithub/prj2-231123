import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { TypeSelect } from "./TypeSelect";
import { PurposeSelect } from "./PurposeSelect";

export function DetailedSelect({
  restaurantType,
  restaurantPurpose,
  checkBoxIds,
  setCheckBoxIds,
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
              <TypeSelect
                restaurantType={restaurantType}
                setCheckBoxIds={setCheckBoxIds}
              />
            </TabPanel>
            <TabPanel>
              <PurposeSelect
                setCheckBoxIds={setCheckBoxIds}
                checkBoxIds={checkBoxIds}
                restaurantPurpose={restaurantPurpose}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}
