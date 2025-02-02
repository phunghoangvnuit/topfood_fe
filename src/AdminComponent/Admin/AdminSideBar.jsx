import { Dashboard, ShoppingBag } from "@mui/icons-material";
import React from "react";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "component/State/Authentication/Action";
import EditNoteIcon from "@mui/icons-material/EditNote";
import logo from "../../assets/Logo-Foody-w.webp";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders Management", icon: <EditNoteIcon />, path: "/orders" },
  { title: "Foods Management", icon: <FastfoodIcon />, path: "/menu" },
  // { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export const AdminSideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    navigate(`/admin/restaurants${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
      handleClose();
    }
  };
  return (
    <div>
      <>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          onClose={handleClose}
          open={true}
          anchor="left"
          sx={{ zIndex: 1, position: "sticky" }}
        >
          <div
            className="w-[70vw] lg:w-[20vw] h-screen flex flex-col text-xl"
            style={{ backgroundColor: "#212529" }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: "75%", height: "auto" }}
              />
            </div>
            <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col text-xl space-y-[1.65rem]">
              {menu.map((item, i) => (
                <>
                  <div
                    onClick={() => handleNavigate(item)}
                    className="px-5 flex items-center gap-5 cursor-pointer"
                    style={{ color: "#FFFFFF" }}
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
