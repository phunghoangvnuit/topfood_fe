import React, { useEffect } from "react";
import { AdminSideBar } from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";
import { RestaurantDasboard } from "AdminComponent/Dashboard/Dashboard";
import { Orders } from "AdminComponent/Orders/Orders";
import { Menu } from "AdminComponent/Menu/Menu";
import { FoodCategory } from "AdminComponent/FoodCategory/FoodCategory";
import { Ingredients } from "AdminComponent/Ingredients/Ingredients";
import { Events } from "AdminComponent/Events/Events";
import { RestaurantDetails } from "AdminComponent/Admin/RestaurantDetails";
import CreateMenuForm from "AdminComponent/Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "component/State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "component/State/Menu/Action";
import { fetchRestaurantsOrder } from "component/State/Restaurant Order/Action";

export const Admin = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  const handleClose = () => {};
  useEffect(() => {
    dispatch(
      getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
    dispatch(fetchRestaurantsOrder({
      jwt,
      restaurantId: restaurant.usersRestaurant?.id,

    }))

  }, []);
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSideBar handleClose={handleClose} />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<RestaurantDasboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/category" element={<FoodCategory />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/event" element={<Events />} />
            <Route path="/details" element={<RestaurantDetails />} />
            <Route path="/add-menu" element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
