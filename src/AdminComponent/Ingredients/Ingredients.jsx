import React, { useEffect, useState } from 'react'
import IngredientTable from './IngredientTable'
import { Grid } from '@mui/material'
import IngredientCategoryTable from './IngredientCategoryTable'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuItemsByRestaurantId } from 'component/State/Menu/Action'
import { getIngredientsbyCategory } from 'component/State/Ingredients/Action'

export const Ingredients = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, restaurant, menu, ingredients } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState({id: "", name: ""});

  useEffect(() => {
    dispatch(
      getIngredientsbyCategory({
        jwt,
        id: selectedCategory.id,
      })
    );
    console.log(ingredients.ingredients);
  }, [selectedCategory]);

  return (
    <div className="px-2">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <IngredientCategoryTable onSelectCategory={setSelectedCategory} />
        </Grid>
        <Grid item xs={12} lg={8}>
          <IngredientTable selectedCategory={selectedCategory} ingredientItems={ingredients.ingredients} />
        </Grid>
      </Grid>
    </div>
  )
}
