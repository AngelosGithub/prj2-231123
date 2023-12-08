import React, { useContext, useEffect } from "react";
import { Button, Center, Flex, Spacer, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "./LoginProvider";

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
    <Center>
      <Flex w={"5xl"} mb={10} gap={4} borderBottom={"1px solid #778899"}>
        {/* jsb */}
        <Button onClick={() => navigate("/")}>Home</Button>
        <Spacer />

        <Button onClick={() => navigate("/review")}>리뷰</Button>
        <Button onClick={() => navigate("/restaurantList")}>맛집찾기</Button>
        {/* 로그인 했을때만 보이도록 */}
        {isAuthenticated() && (
          <Button onClick={() => navigate("/member?" + urlParams.toString())}>
            내 정보
          </Button>
        )}
        {/* 관리자 로그인 했을때만 보이도록 */}
        {isAdmin() && (
          <>
            <Button onClick={() => navigate("/member/list")}>회원 정보</Button>
            <Button onClick={() => navigate("/RestaurantForm")}>
              맛집등록
            </Button>
            <Button onClick={() => navigate("/categoryList")}>
              카테고리 관리
            </Button>
          </>
        )}
        {/* 로그인 안되어 있을때 보이도록 */}
        {isAuthenticated() || (
          <Button onClick={() => navigate("/signup")}>회원 가입</Button>
        )}
        {isAuthenticated() || (
          <Button onClick={() => navigate("/login")}>로그인</Button>
        )}
        {isAuthenticated() && <Button onClick={handleLogout}>로그아웃</Button>}
      </Flex>
    </Center>
  );
}

export default Navbar;
