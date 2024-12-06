import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createIngredient,
  createIngredientCategory,
} from "component/State/Ingredients/Action";

const CreateIngredientForm = () => {
  const { restaurant, ingredients } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      restaurantId: restaurant.usersRestaurant.id
    };
    dispatch(createIngredient({data,jwt}));

    console.log(data);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10" style={{color:"#ED1C24"}}>
          Create Ingredient
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
            InputProps={{
              sx: { color: "#000000" } // color of text input
            }}
            InputLabelProps={{
              sx: { color: "#9E9E9E" } // color of text placeholder
            }}
            sx = {{ // color of inputfield when it actived
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#D4D4D4',
                  borderWidth: "1px"
                },
                '&:hover fieldset': {
                  borderColor: '#ED1C24',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ED1C24',
                },
              },
              '& input:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 100px #FFFFFF inset !important', // Fix background color
                WebkitTextFillColor: '#000000 !important', // Fix text color
                transition: 'background-color 5000s ease-in-out 0s', // Prevent background flash
              },
            }}
          ></TextField>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ color: "#9E9E9E" }}>Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.categoryId}
              label="Category"
              onChange={handleInputChange}
              name="categoryId"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D4D4D4',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ED1C24',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ED1C24',
                },
                '& .MuiSelect-select': {
                  color: '#000000', // Text color for selected value
                },
                '& .MuiSvgIcon-root': {
                  color: '#D4D4D4', // Default icon color
                },
                '&:hover .MuiSvgIcon-root': {
                  color: '#ED1C24', // Icon color on hover
                },
                '&.Mui-focused .MuiSvgIcon-root': {
                  color: '#ED1C24', // Icon color when focused
                }
              }}
            >
              {ingredients.category.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" type="submit">
            Create Ingredient
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
