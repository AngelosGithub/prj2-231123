import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import React, { useEffect, useState } from "react";
import RestaurantForm from "./page/restaurant/RestaurantForm";
import RestaurantList from "./page/restaurant/RestaurantList";

import { RestaurantView } from "./page/restaurant/RestaurantView";
import { RestaurantEdit } from "./page/restaurant/RestaurantEdit";

import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="restaurantList" element={<RestaurantList />} />

      <Route path="restaurant/view/:no" element={<RestaurantView />} />
      <Route path="restaurantForm" element={<RestaurantForm />} />
      <Route path="restaurant/edit/:no" element={<RestaurantEdit />} />
    </Route>,
  ),
);

function App() {
  // const [mapKey, setMapKey] = useState(null);
  //
  // useEffect(() => {
  //   axios
  //     .get("/api/restaurant/map/key")
  //     .then((response) => setMapKey(response.data));
  // }, []);
  //
  // if (mapKey === null) {
  //   return null;
  // }
  //
  // // insert kakao map script tag
  // let scriptTag = document.getElementById("kakaMapApiScriptTag");
  // if (!scriptTag) {
  //   scriptTag = document.createElement("script");
  //   scriptTag.id = "kakaMapApiScriptTag";
  //   scriptTag.type = "text/javascript";
  //   scriptTag.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${mapKey}&libraries=services,clusterer,drawing&autoload=false`;
  //   document.querySelector("title").before(scriptTag);
  // }
  return <RouterProvider router={router} />;
}

export default App;
