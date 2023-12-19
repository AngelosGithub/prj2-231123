import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "./LoginProvider";
import { HamburgerIcon } from "@chakra-ui/icons";
import mainLogo from "../img/Logo.png";

function Navbar(props) {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);

  const navigate = useNavigate();
  const toast = useToast();
  // 로그인 정보값을 받아옴
  const urlParams = new URLSearchParams();
  // 세션을 계속 받아와서 서버에서 세션이 사라지면 실시간으로 업데이트 됨
  const location = useLocation();

  useEffect(() => {
    fetchLogin();
  }, [location]);

  function handleLogout() {
    axios.post("/api/member/logout").then(() => {
      toast({
        description: "로그아웃 완료",
        status: "info",
      });
      navigate("/");
    });
  }

  if (login !== "") {
    // 로그인 한 정보값중 아이디를 가져옴
    urlParams.set("id", login.id);
  }

  return (
    <Center mb={10}>
      <Flex w={"5xl"} h={"75px"} gap={4} borderBottom={"1px solid #778899"}>
        {/* jsb */}
        <Box
          w={"100px"}
          h={"73px"}
          cursor={"pointer"}
          mt={2}
          onClick={() => navigate("/")}
        >
          <Image w={"100px"} src={mainLogo} alt="준비중" />
        </Box>
        <Spacer />

        <Button
          w={"100px"}
          h={"73px"}
          variant={"ghost"}
          margin={"auto"}
          onClick={() => navigate("/review")}
        >
          리뷰
        </Button>
        <Button
          w={"100px"}
          h={"73px"}
          variant={"ghost"}
          margin={"auto"}
          onClick={() => navigate("/restaurantList")}
        >
          맛집찾기
        </Button>
        {/* 로그인 했을때만 보이도록 */}
        {isAuthenticated() && (
          <Button
            w={"100px"}
            h={"73px"}
            margin={"auto"}
            variant={"ghost"}
            onClick={() => navigate("/member?" + urlParams.toString())}
          >
            내 정보
          </Button>
        )}
        {/* 관리자 로그인 했을때만 보이도록 */}
        {isAdmin() && (
          <>
            <Menu>
              <MenuButton
                margin={"auto"}
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem
                  onClick={() => navigate("/member/list")}
                  command="회원정보"
                />
                <MenuItem
                  onClick={() => navigate("/RestaurantForm")}
                  command="맛집등록"
                />
                <MenuItem
                  onClick={() => navigate("/categoryList")}
                  command="카테고리 관리"
                />
              </MenuList>
            </Menu>
          </>
        )}
        {/* 로그인 안되어 있을때 보이도록 */}
        {isAuthenticated() || (
          <Button
            w={"100px"}
            h={"73px"}
            variant={"ghost"}
            margin={"auto"}
            onClick={() => navigate("/signup")}
          >
            회원 가입
          </Button>
        )}
        {isAuthenticated() || (
          <Button
            w={"100px"}
            h={"73px"}
            variant={"ghost"}
            margin={"auto"}
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>
        )}
        {isAuthenticated() && (
          <Button
            w={"100px"}
            h={"73px"}
            variant={"ghost"}
            margin={"auto"}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        )}
      </Flex>
    </Center>
  );
}

export default Navbar;
