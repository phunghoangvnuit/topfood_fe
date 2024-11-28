import { Admin } from 'AdminComponent/Admin/Admin';
import CreateRestaurantForm from 'AdminComponent/CreateRestaurantForm/CreateRestaurantForm';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const AdminRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={false?<CreateRestaurantForm/>:<Admin/>}>
        
        </Route>
      </Routes>
    </div>
  )
}
