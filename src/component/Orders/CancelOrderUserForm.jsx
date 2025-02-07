import { Button, TextField } from "@mui/material";
import { createIngredientCategory } from "component/State/Ingredients/Action";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CancelOrderUserForm = ({orderId, handleClose}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant} = useSelector(store=>store);
  const [formData, setFormData] = useState({
    id: orderId,
    reason: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { id: orderId, reason:formData.reason }
    console.log(formData);
    // dispatch(createIngredientCategory({data,jwt}));
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
        <h1 className="text-center text-xl" style={{color:"#ED1C24"}}>
          Cancel Order #{orderId}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="reason"
            name="reason"
            label="reason"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.reason}
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
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
            <Button variant="contained" onClick={handleClose} fullWidth sx={{height: "40px", backgroundColor: "#004B87"}} >
              Return
            </Button>
            <Button variant="contained" type="submit" fullWidth sx={{height: "40px"}}>
              I want to cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelOrderUserForm;
