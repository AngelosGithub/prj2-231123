import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  Spinner,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CategoryList(props) {
  const [restaurantTypeList, setRestaurantTypeList] = useState(null);
  const [restaurantPurposeList, setRestaurantPurposeList] = useState(null);
  const no = useRef(0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    axios
      .get("/api/category/list")
      .then((reponse) => {
        setRestaurantTypeList(reponse.data.restaurantTypes);
        setRestaurantPurposeList(reponse.data.restaurantPurpose);
      })
      .catch((erro) => console.log("실패"));
  }, []);

  if (restaurantTypeList === null && restaurantPurposeList === null) {
    return <Spinner />;
  }

  function handleDeleteModal(no) {
    console.log(no);
  }

  return (
    <Center>
      <Box w={"3xl"}>
        <Tabs>
          <TabList>
            <Tab>RestaurantTypeList</Tab>
            <Tab>RestaurantPurposeList</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Table>
                <Thead>
                  <Tr>
                    <Th>no</Th>
                    <Th>음식 요소</Th>
                    <Th>수정</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {restaurantTypeList.map((typeList) => (
                    <Tr key={typeList.no}>
                      <Td>{typeList.no}</Td>
                      <Td>{typeList.name}</Td>
                      <Td>
                        <Button
                          onClick={() =>
                            navigate(`/category/typeEdit/${typeList.no}`)
                          }
                        >
                          수정
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <Table>
                <Thead>
                  <Tr>
                    <Th>no</Th>
                    <Th>음식 목적</Th>
                    <Th>수정</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {restaurantPurposeList.map((purposeList) => (
                    <Tr key={purposeList.no}>
                      <Td>{purposeList.no}</Td>
                      <Td>{purposeList.name}</Td>
                      <Td>
                        <Button
                          onClick={() =>
                            navigate(`/category/purposeEdit/${purposeList.no}`)
                          }
                        >
                          수정
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Button type="submit" onClick={() => navigate("/category/insert")}>
          카테고리 등록
        </Button>
      </Box>
    </Center>
  );
}

export default CategoryList;
