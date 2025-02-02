import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { AddReaction } from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "component/State/Authentication/Action";

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <AddReaction /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon /> },
  { title: "Notifications", icon: <NotificationsActiveIcon /> },
  { title: "Coupons", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];
export const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else navigate(`/my-profile/${item.title.toLowerCase()}`);
  };

  return (
    <div>
      <>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          onClose={handleClose}
          open={true}
          anchor="left"
          sx={{ zIndex: -1, position: "sticky" }}
        >
          <div
            className="w-[70vw] lg:w-[20vw] h-screen flex flex-col text-xl"
            style={{ backgroundColor: "#212529" }}
          >
            <div
              className="w-[70vw] lg:w-[20vw] h-screen flex flex-col text-xl space-y-[1.65rem]"
              style={{marginTop: "120px"}}
            >
              {menu.map((item, i) => (
                <>
                  <div
                    onClick={() => handleNavigate(item)}
                    className="px-5 flex items-center space-x-5 cursor-pointer"
                    style={{color: "#FFFFFF"}}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {i !== menu.length - 1 && (
                    <Divider sx={{ bgcolor: "#D4D4D4", opacity: "0.5" }} />
                  )}
                </>
              ))}
            </div>
            <div
              style={{ color: "gray", textAlign: "center", fontSize: "16px" }}
            >
              <p>
                Foody.vn - v1.0.0 - 17.01.2025
                <br />
                @phunghoangvnuit - FPT Aptech
              </p>
            </div>
          </div>
        </Drawer>
      </>
    </div>
  );
};
