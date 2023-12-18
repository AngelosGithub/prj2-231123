import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { MemberSignup } from "./pages/member/MemberSignup";
import { MemberLogin } from "./pages/member/MemberLogin";
import { MemberInfo } from "./pages/member/MemberInfo";
import { ReviewList } from "./pages/review/ReviewList";
import { ReviewWrite } from "./pages/review/ReviewWrite";
import { ReviewView } from "./pages/review/ReviewView";
import { ReviewEdit } from "./pages/review/ReviewEdit";
import { MemberList } from "./pages/member/MemberList";
import { MemberEdit } from "./pages/member/MemberEdit";

// TODO : HomeLayout의 내용을 MainLayout으로 옮기기
//  둘이 합의 볼 것...
import RestaurantForm from "./page/restaurant/RestaurantForm";
import RestaurantList from "./page/restaurant/RestaurantList";

import { RestaurantView } from "./page/restaurant/RestaurantView";
import { RestaurantEdit } from "./page/restaurant/RestaurantEdit";
import CategoryList from "./page/category/CategoryList";
import { CategoryForm } from "./page/category/CategoryForm";
import RestaurantTypeEdit from "./page/category/RestaurantTypeEdit";
import RestaurantPurposeEdit from "./page/category/RestaurantPurposeEdit";
import LoginProvider from "./component/LoginProvider";
import { Home } from "./page/Home";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {/* 팀장*/}
      <Route index element={<Home />} />
      <Route path="signup" element={<MemberSignup />} />
      <Route path="login" element={<MemberLogin />} />
      <Route path="member" element={<MemberInfo />} />
      <Route path="member/edit" element={<MemberEdit />} />
      <Route path="member/list" element={<MemberList />} />
      <Route path="review" element={<ReviewList />} />
      <Route path="review/:no" element={<ReviewView />} />
      <Route path="edit/:no" element={<ReviewEdit />} />
      <Route path="write" element={<ReviewWrite />} />
      {/* jsb*/}
      <Route path="/categoryList" element={<CategoryList />} />
      <Route path="/category/insert" element={<CategoryForm />} />
      <Route path="/category/typeEdit/:no" element={<RestaurantTypeEdit />} />
      <Route
        path="/category/purposeEdit/:no"
        element={<RestaurantPurposeEdit />}
      />
      <Route path="restaurantList" element={<RestaurantList />} />
      <Route path="restaurant/view/:no" element={<RestaurantView />} />
      <Route path="restaurantForm" element={<RestaurantForm />} />
      <Route path="restaurant/edit/:no" element={<RestaurantEdit />} />
    </Route>,
  ),
);

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={routes} />
    </LoginProvider>
  );
}

export default App;
