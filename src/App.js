import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import React from "react";
import RestaurantForm from "./page/restaurant/restaurantForm";
import RestaurantList from "./page/restaurant/restaurantList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="restaurantList" element={<RestaurantList />} />
      <Route path="restaurantForm" element={<RestaurantForm />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
