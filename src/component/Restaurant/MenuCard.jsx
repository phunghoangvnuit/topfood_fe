import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categorizeIngredients } from "component/util/categorizeIngredients";
import { useDispatch } from "react-redux";
import { addItemToCart } from "component/State/Cart/Action";

const demo = [
  {
    category: "Spicy/No-Spicy",
    ingredients: ["Yes", "No"],
  },
  {
    category: "Tomato/No-Tomato",
    ingredients: ["No Tomato"],
  },
];

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch=useDispatch();

  const handleCheckBoxChange = (ingredientItem) => {
    console.log("value", ingredientItem);
    if (selectedIngredients.includes(ingredientItem)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== ingredientItem)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientItem]);
    }    
  };
  const handleAddItemToCart = (e) => {
    e.preventDefault()
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    console.log("req data",reqData);
  };


  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt=""
            />
            <div className="space-y-1 lg:space-y-3 lg:max-w-2xl" style={{color: "#000000", fontWeight: "500"}}>
              <p className="font-semibold text-xl">{item.name}</p>
              <p style={{color: "#ED1C24", fontWeight: "500"}}>{item.price} VND</p>
              <p className="text-gray-400" style={{fontWeight: "400"}}>{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{marginTop: "-30px"}}>
      <form onSubmit={handleAddItemToCart}>
        <div className="flex gap-3 flex-wrap">
          {item.ingredientCategories.map((category) => (
            <div key={category.id}>
              <p style={{color: "black", fontWeight: 600, marginTop: "10px"}}>{category.name}</p>
              <FormGroup>
                {category.ingredients.map((ingredient) => (
                  <FormControlLabel
                    key={ingredient.id}
                    control={
                      <Checkbox
                        onChange={() => handleCheckBoxChange(ingredient)}
                        sx={{ color: "#000000" }}
                      />
                    }
                    sx={{ color: "#000000" }}
                    label={`${ingredient.name} (+${ingredient.price})`}
                  />
                ))}
              </FormGroup>
            </div>
          ))}
        </div>
        <div className="pt-5">
          <Button 
            variant="contained" 
            disabled={!item.available} 
            type="submit"
            style={{ backgroundColor: item.available ? "primary" : "#9E9E9E", color: "#fff" }}
          >
            {item.available ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
