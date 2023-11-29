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

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="signup" element={<MemberSignup />} />
      <Route path="login" element={<MemberLogin />} />
      <Route path="member" element={<MemberInfo />} />
      <Route path="member/list" element={<MemberList />} />
      <Route path="review" element={<ReviewList />} />
      <Route path="review/:no" element={<ReviewView />} />
      <Route path="edit/:no" element={<ReviewEdit />} />
      <Route path="write" element={<ReviewWrite />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
