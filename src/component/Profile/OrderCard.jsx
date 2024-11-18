import { Button, Card } from "@mui/material";
import React from "react";

export const OrderCard = () => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16 object-cover"
          src="https://images.pexels.com/photos/1483769/pexels-photo-1483769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <div>
          <p>Banh Mi</p>
          <p>30.000 VND</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed"> Completed </Button>
      </div>
    </Card>
  );
};
