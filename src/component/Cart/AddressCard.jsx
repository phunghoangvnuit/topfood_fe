import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";

export const AddressCard = ({ item, showButton, handleSelectAddress }) => {

  return (
    <Card className="flex gap-5 w-64 p-5">
      <HomeIcon sx={{color:"#ED1C24"}}/>
      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg text-white" style={{color:"#ED1C24"}}>Home</h1>
        <p style={{color:"#000000", fontSize:"14px"}}>
          Detech Building 8th, Ton That Thuyet street , Nam Tu Liem District ,
          Hanoi City, Vietnam
        </p>
        {showButton && (
          <Button variant="outlined" fullWidth onClick={() => handleSelectAddress(item)}>Select</Button>
        )}
      </div>
    </Card>
  );
};
