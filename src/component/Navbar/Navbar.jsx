import { Avatar, Badge, Box, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import nav_logo from "../../assets/Logo-Foody-r.webp";

export const Navbar = () => {
  const { auth,cart } = useSelector(store => store);
  const navigate = useNavigate();

  const handleAvatarClick=() => {
    if(auth.user?.role === "ROLE_CUSTOMER"){
      navigate("/my-profile")
    }
    else {
      navigate("/admin/restaurants")
    }
  }
  return (
    <Box className="px-5 sticky top-0 z-50 py-[.2rem] bg-[#FFFFFF] lg:px-20 flex justify-between" sx={{ boxShadow: 3 }}>
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li onClick={()=>navigate("/")} className="logo font-semibold text-gray-300 text-2xl">
          <img src={nav_logo} alt="" style={{width: "150px"}}/>
        </li>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem", color: "#000000"}} />
          </IconButton>
        </div>
        <div className="" style={{cursor: "pointer"}}>
          {auth.user ? (
            <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "#ED1C24", color: "#FFFFFF" }}>
              {auth.user?.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person sx={{ bgcolor: "white", color: "#000000" }}/>
            </IconButton>
          )}
        </div>

        <div className="">
          <IconButton onClick={()=>navigate("/cart")}>
            <Badge sx={{ "& .MuiBadge-badge": { backgroundColor: "#ED1C24" } }} badgeContent={cart.cartItems.length}>
              <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "#000000" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};
