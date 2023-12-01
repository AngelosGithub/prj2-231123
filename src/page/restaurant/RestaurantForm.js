import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { kakao } = window;
function RestaurantForm(props) {
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  //db 저장용
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [place, setPlace] = useState("");
  const [info, setInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [uploadFiles, setUploadFiles] = useState(null);
  //checkBoxIds
  const [checkBoxIds, setCheckBoxIds] = useState([]);
  const [restaurantTypeName, setRestaurantTypeName] = useState("");

  // Available
  const [addressAvailable, setAdddressAvailable] = useState(false);
  const [cityAvailable, setCityAvailable] = useState(false);
  const [placeAvailable, setPlaceAvailable] = useState(false);
  const [infoAvailable, setInfoAvailable] = useState(false);
  const [phoneAvailable, setPhoneAvailable] = useState(false);
  const [uploadFileAvaliable, setUploadFileAvaliable] = useState(false);
  const [restaurantTypeAvaliable, setRestaurantTypeAvaliable] = useState(false);
  const [checkBoxAvaliable, setCheckBoxAvaliable] = useState(false);

  const [townAddressAvaliable, setTownAddressAvaliable] = useState(false);

  //restauranttypes restaurantpurpose
  const [restaurantTypesList, setRestaurantTypesList] = useState(null);
  const [restaurantPurpose, setRestaurantPurpose] = useState(null);
  const [location, setLocation] = useState("");
  const [townAddress, setTownAddress] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get("/api/category/list")
      .then((response) => {
        setRestaurantTypesList(response.data.restaurantTypes);
        setRestaurantPurpose(response.data.restaurantPurpose);
      })
      .catch((err) => console.log("실패"));
  }, []);

  useEffect(() => {
    if (place == null || place.length === 0) {
      setPlaceAvailable(false);
    } else {
      setPlaceAvailable(true);
    }

    if (info == null || info.length === 0) {
      setInfoAvailable(false);
    } else {
      setInfoAvailable(true);
    }

    if (phone == null || phone.length === 0) {
      setPhoneAvailable(false);
    } else {
      setPhoneAvailable(true);
    }

    if (uploadFiles == null || uploadFiles.length === 0) {
      setUploadFileAvaliable(false);
    } else {
      setUploadFileAvaliable(true);
    }

    if (restaurantTypeName == null || restaurantTypeName.length === 0) {
      setRestaurantTypeAvaliable(false);
    } else {
      setRestaurantTypeAvaliable(true);
    }

    if (checkBoxIds == null || checkBoxIds.length === 0) {
      setCheckBoxAvaliable(false);
    } else {
      setCheckBoxAvaliable(true);
    }

    if (townAddress == null || townAddress.length === 0) {
      setTownAddressAvaliable(false);
    } else {
      setTownAddressAvaliable(true);
    }
  }, [place, info, phone, uploadFiles, restaurantTypeName, checkBoxIds]);

  function handleSubmit() {
    axios
      .postForm("/api/restaurant/add", {
        place,
        info,
        address,
        city,
        district,
        x,
        y,
        phone,
        checkBoxIds,
        uploadFiles,
        restaurantTypeName,
      })
      .then((response) => {
        toast({
          description: "저장 성공",
          status: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            description: "작성 내용을 확인해주세요",
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
  console.log(uploadFiles);
  const handleComplete = (data) => {
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
      setAddress(localAddress + " " + townAddress);
      setCity(cityAddress);
      setDistrict(districtAddress);
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  if (address !== "") {
    // 주소-좌표 변환 객체를 생성합니다
    kakao.maps.load(() => {
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setX(coords.Ma);
          setY(coords.La);
        }
      });
    });
  }

  if (restaurantTypesList == null) {
    return <Spinner />;
  }

  //저장 버튼 비활성화 (필수 항목 입력시 활성화) 및 필요 항목 정규식 작업화(미완료)

  function handleCheckBox(e) {
    if (e.target.checked) {
      // checkBoxIds 추가
      setCheckBoxIds([...checkBoxIds, e.target.value]);
    } else {
      setCheckBoxIds(checkBoxIds.filter((item) => item !== e.target.value));
      // checkBoxIds에서 삭제
    }
  }

  return (
    <Center>
      <Card w={"3xl"}>
        <CardHeader>
          <Heading>맛집 주소 등록</Heading>
        </CardHeader>
        <CardBody>
          <FormControl mb={5}>
            <FormLabel>매장이름</FormLabel>
            <Input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder={"매장이름"}
              required
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>간략 설명</FormLabel>
            <Textarea
              value={info}
              onChange={(e) => setInfo(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>이미지 첨부</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setUploadFiles(e.target.files)}
            />
            <FormHelperText>
              한 개파일은 MB이내, 총 용량은 MB 이내로 첨부하세요.
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>음식 요소</FormLabel>
            <Select onChange={(e) => setRestaurantTypeName(e.target.value)}>
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
                columns={{ base: 2, md: 3, lg: 4, "2xl": 6 }}
              >
                {restaurantPurpose.map((purpose) => (
                  <Checkbox
                    size={"xm"}
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
          <Button
            mb={5}
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={
              !(
                placeAvailable &&
                infoAvailable &&
                phoneAvailable &&
                uploadFileAvaliable &&
                restaurantTypeAvaliable &&
                checkBoxAvaliable &&
                townAddressAvaliable
              )
            }
          >
            저장
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}

export default RestaurantForm;
