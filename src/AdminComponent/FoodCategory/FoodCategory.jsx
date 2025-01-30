import React, { useEffect, useState } from 'react'
import FoodCategoryTable from './FoodCategoryTable'
import CategoryDetails from './CategoryDetails';
import { getMenuItemsByRestaurantId } from 'component/State/Menu/Action';
import { useDispatch, useSelector } from 'react-redux';

export const FoodCategory = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, restaurant, menu } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
        vegetarian: false,
        non_vegetarian: false,
        seasonal: false,
        foodCategory: selectedCategory,
      })
    );
    console.log(menu);
  }, [selectedCategory]);

  return (
    <div style={{display: "flex", gap: "20px"}}>
      <FoodCategoryTable onSelectCategory={setSelectedCategory}/>
      <CategoryDetails selectedCategory={selectedCategory} menuItems={menu}/>
    </div>
  )
}
