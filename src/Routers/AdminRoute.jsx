import { Admin } from "AdminComponent/Admin/Admin";
import CreateRestaurantForm from "AdminComponent/CreateRestaurantForm/CreateRestaurantForm";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export const AdminRoute = () => {
  const { restaurant } = useSelector((store) => store);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />
          }
        ></Route>
      </Routes>
    </div>
  );
};
