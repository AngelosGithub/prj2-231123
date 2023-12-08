import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LoginContext = createContext(null);
function LoginProvider({ children }) {
  const [login, setLogin] = useState("");
  // isAdmin 함수를 적용 할때 에러가 났는데 login 이 null 이라서
  // 비어있는 값에서 auth라는 배열을 찾으려고 하니 에러가 발생함
  // const [login, setLogin] = useState(null);

  useEffect(() => {
    fetchLogin();
  }, []);

  function fetchLogin() {
    axios.get("/api/member/login").then((response) => setLogin(response.data));
  }

  function isAuthenticated() {
    // 로그인 되어있는지 여부 확인 메소드
    return login !== "";
  }

  function isAdmin() {
    if (login.auth) {
      // some >> 배열중에 특정 값 찾기
      // 여기서는 admin 이라는 값을 찾는다
      return login.auth.some((elem) => elem.manager === "admin");
    }
    return false;
  }

  // function isManager() {
  //   login.auth.some((elem) => elem.manager === "manager");
  // }

  function hasAccess(userId) {
    // 로그인 되어있는 아이디를 확인하는 함수
    return login.id === userId;
  }

  return (
    <LoginContext.Provider
      value={{ login, fetchLogin, isAuthenticated, hasAccess, isAdmin }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
