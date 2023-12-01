import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import React from "react";
import RestaurantForm from "./page/restaurant/RestaurantForm";
import RestaurantList from "./page/restaurant/RestaurantList";

import { RestaurantView } from "./page/restaurant/RestaurantView";
import { RestaurantEdit } from "./page/restaurant/RestaurantEdit";
import CategoryList from "./page/category/CategoryList";
import { CategoryForm } from "./page/category/CategoryForm";
import RestaurantTypeEdit from "./page/category/RestaurantTypeEdit";
import RestaurantPurposeEdit from "./page/category/RestaurantPurposeEdit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
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
  return <RouterProvider router={router} />;
}

export default App;
