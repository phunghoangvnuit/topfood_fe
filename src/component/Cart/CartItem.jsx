import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItem } from "component/State/Cart/Action";

export const CartItem = ({item}) => {
  const { auth,cart } = useSelector(store => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleUpdateCartItem=(value)=>{
    if(value === -1 && item.quantity === 1) {
      handleRemoveCartItem()
    }
    const data = {cartItemId:item.id,quantity:item.quantity+value}
    dispatch(updateCartItem({data,jwt}))

  }
  const handleRemoveCartItem=()=>{
    dispatch(removeCartItem({cartItemId:item.id,jwt:auth.jwt || jwt}))
  }
  return (
    <div className="px-5" style={{color:"#000000", fontSize:"16px"}}>
      <div className="lg:flex items-center justify-between lg:space-x-5">
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={item.food.images[0]}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between lg:w-[80%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p style={{fontWeight: "600"}}>{item.food.name}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <IconButton onClick={()=>handleUpdateCartItem(-1)} sx={{color:"#ED1C24"}}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <div className="w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </div>
                <IconButton onClick={()=>handleUpdateCartItem(+1)} sx={{color:"#ED1C24"}}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <p style={{width:"100%", textAlign:"right"}}>{item.totalPrice}đ</p>
        </div>
      </div>
      <div className="pt-3 space-x-2" style={{textAlign: "left"}}>
        <p style={{fontWeight: "600"}}>Add-ons:</p>
        {item.ingredients.map((ingredient)=> <p style={{margin: 0, padding: 0}}>- {`${ingredient.name} (+${ingredient.price}đ)`}</p>)}
      </div>
    </div>
  );
};
