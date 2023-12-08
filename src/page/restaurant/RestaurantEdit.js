import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spinner,
  Switch,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import { useImmer } from "use-immer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../component/LoginProvider";
const { kakao } = window;
export function RestaurantEdit() {
  const [restaurantTypesList, setRestaurantTypesList] = useState(null);
  const [restaurantPurposeList, setRestaurantPurposeList] = useState(null);
  const { no } = useParams();

  const [uploadFiles, setUploadFiles] = useState(null);

  const [restaurant, updateRestaurant] = useImmer(null);

  const [restaurantTypeName, setRestaurantTypeName] = useState("");

  const [removeFileIds, setRemoveFileIds] = useState([]);
  const [checkBoxIds, setCheckBoxIds] = useState([]);

  const [location, setLocation] = useState("");
  const [townAddress, setTownAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const open = useDaumPostcodePopup(postcodeScriptUrl);
  const navigate = useNavigate();

  const toast = useToast();
  useEffect(() => {
    axios
      .get("/api/category/list")
      .then((response) => {
        setRestaurantTypesList(response.data.restaurantTypes);
        setRestaurantPurposeList(response.data.restaurantPurpose);
      })
      .catch((err) => console.log("실패"));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/restaurant/no/${no}`)
      .then((response) => updateRestaurant(response.data.restaurant))
      .catch((err) => console.log("실패"));
  }, []);
  function handleUpdate() {
    axios
      .putForm(`/api/restaurant/update`, {
        no: restaurant.no,
        place: restaurant.place,
        info: restaurant.info,
        address: restaurant.address,
        district: restaurant.district,
        y: restaurant.y,
        x: restaurant.x,
        phone: restaurant.phone,
        city: restaurant.city,
        restaurantTypeName,
        checkBoxIds,
        removeFileIds,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: "업데이트 성공",
          status: "success",
        });
        navigate(-1);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            description: "작성 내용을 확인해주세요",
            status: "warning",
          });
        } else if (err.response.status === 401) {
          toast({
            description: "로그인후 이용 가능합니다.",
            status: "warning",
          });
        } else if (err.response.status === 403) {
          toast({
            description: "작성 권한이 없습니다.",
            status: "warning",
          });
        } else {
          toast({
            description: "서버 문제로 저장 실패",
            status: "error",
          });
        }
      });
  }

  const handleComplete = (data) => {
    console.log("실행");
    let fullAddress = data.address;

    let extraAddress = ""; //추가될 주소
    let localAddress = data.sido + " " + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
    let cityAddress = data.sido;
    let districtAddress = data.sigungu;

    if (data.addressType === "R") {
      //주소타입이 도로명주소일 경우
      if (data.bname !== "") {
        extraAddress += data.bname; //법정동, 법정리
      }
      if (data.buildingName !== "") {
        //건물명
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }

      fullAddress = fullAddress.replace(localAddress, "");

      const townAddress = (fullAddress +=
        extraAddress !== "" ? `(${extraAddress})` : "");
      //
      setLocation(localAddress);
      setTownAddress(townAddress);

      // 데이터 전달할 스테이트

      updateRestaurant((draft) => {
        draft.address = localAddress + " " + townAddress;

        draft.city = cityAddress;

        draft.district = districtAddress;
      });
    }
  };

  if (restaurant !== null && restaurant.address !== null) {
    kakao.maps.load(() => {
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(restaurant.address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          updateRestaurant((draft) => {
            draft.x = coords.Ma;
          });

          updateRestaurant((draft) => {
            draft.y = coords.La;
          });
        }
      });
    });
  }

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  function handleRemoveFileSwitch(e) {
    if (e.target.checked) {
      // removeFileIds에 추가
      setRemoveFileIds([...removeFileIds, e.target.value]);
    } else {
      setRemoveFileIds(removeFileIds.filter((item) => item !== e.target.value));
      // removeFileIds에서 삭제
    }
  }

  function handleCheckBox(e) {
    if (e.target.checked) {
      // checkBoxIds 추가
      setCheckBoxIds([...checkBoxIds, e.target.value]);
    } else {
      setCheckBoxIds(checkBoxIds.filter((item) => item !== e.target.value));
      // checkBoxIds에서 삭제
    }
  }

  if (restaurant === null) {
    return <Spinner />;
  }

  return (
    <>
      <Center>
        <Card w={"xl"}>
          <CardHeader>
            <Heading>{restaurant.no}번맛집 가게 수정</Heading>
          </CardHeader>
          <CardBody>
            <FormControl mb={5}>
              <FormLabel>매장이름</FormLabel>
              <Input
                value={restaurant.place}
                onChange={(e) =>
                  updateRestaurant((draft) => {
                    draft.place = e.target.value;
                  })
                }
                placeholder={"매장이름"}
                required
              />
            </FormControl>

            <FormControl mb={5}>
              <FormLabel>간략 설명</FormLabel>
              <Textarea
                value={restaurant.info}
                onChange={(e) =>
                  updateRestaurant((draft) => {
                    draft.info = e.target.value;
                  })
                }
                placeholder="매장 설명"
                required
              />
            </FormControl>

            <FormControl mb={5}>
              <FormLabel>주소 입력</FormLabel>
              <Flex>
                <Input
                  type="text"
                  placeholder="지역주소"
                  value={location}
                  readOnly
                />
                <Button colorScheme="blue" type="button" onClick={handleClick}>
                  주소 찾기
                </Button>
              </Flex>
            </FormControl>

            <FormControl mb={5}>
              <FormLabel>상세주소</FormLabel>
              <Input
                type="text"
                placeholder="상세주소"
                value={townAddress}
                readOnly
              />
            </FormControl>

            <FormControl mb={5}>
              <FormLabel>전화번호</FormLabel>
              <Input
                value={restaurant.phone}
                onChange={(e) =>
                  updateRestaurant((draft) => {
                    draft.phone = e.target.value;
                  })
                }
              />
            </FormControl>

            {/*이미지 출력*/}

            {restaurant.files.length > 0 &&
              restaurant.files.map((file) => (
                <Card key={file.no} my={5}>
                  <CardBody height="300px">
                    <Img
                      width="100%"
                      height="100%"
                      src={file.url}
                      alt={file.fileName}
                    />
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <FormControl display="flex" alignItems="center" gap={2}>
                      <FormLabel m={0} p={0}>
                        <FontAwesomeIcon color="red" icon={faTrashCan} />
                      </FormLabel>
                      <Switch
                        value={file.no}
                        colorScheme="red"
                        onChange={handleRemoveFileSwitch}
                      />
                    </FormControl>
                  </CardFooter>
                </Card>
              ))}

            <FormControl mb={5}>
              <FormLabel>이미지 첨부</FormLabel>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setUploadFiles(e.target.files)}
              />
              <FormHelperText>
                한 개 파일은 MB이내, 총 용량은 MB 이내로 첨부하세요.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>음식 요소</FormLabel>
              <Select
                defaultValue={"한식"}
                onChange={(e) => setRestaurantTypeName(e.target.value)}
              >
                {restaurantTypesList.map((type) => (
                  <option value={type.name} key={type.no}>
                    {type.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>식사목적</FormLabel>
              <CheckboxGroup>
                <SimpleGrid
                  spacing={"10px"}
                  columns={{ base: 2, md: 3, lg: 4, "2xl": 4 }}
                >
                  {restaurantPurposeList !== null &&
                    restaurantPurposeList.map((purpose) => (
                      <Checkbox
                        size={"xm"}
                        spacing={5}
                        fontSize={"17px"}
                        key={purpose.no}
                        value={purpose.name}
                        onChange={handleCheckBox}
                      >
                        {purpose.name}
                      </Checkbox>
                    ))}
                </SimpleGrid>
              </CheckboxGroup>
            </FormControl>
          </CardBody>
          <CardFooter>
            <Flex gap={2}>
              <Button colorScheme="blue" onClick={onOpen}>
                수정
              </Button>
              <Button onClick={() => navigate(-1)}>취소</Button>
            </Flex>
          </CardFooter>
        </Card>
        {/*  수정 모달*/}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>수정 확인</ModalHeader>
            <ModalCloseButton onClick={() => navigate(-1)} />
            <ModalBody>수정 하시겠습니까 ? </ModalBody>
            <ModalFooter>
              {/* navigate(-1) : 이전 경로로 이동 */}
              <Button onClick={() => navigate(-1)}>닫기</Button>
              <Button onClick={handleUpdate} colorScheme="blue">
                수정하기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </>
  );
}
