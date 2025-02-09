import { Box, Card, CardHeader, Grid } from "@mui/material";
import React, { useEffect } from "react";
import MenuTable from "AdminComponent/Menu/MenuTable";
import OrderTable from "AdminComponent/Orders/OrderTable";
import { fetchRestaurantsOrder } from "component/State/Restaurant Order/Action";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "AdminComponent/util/moneyUltis";

export const RestaurantDasboard = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector((store) => store);

  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(
        fetchRestaurantsOrder({
          jwt,
          restaurantId: restaurant.usersRestaurant.id,
        })
      );
    }
  }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

  // // Calculate the total price of completed orders
  // const totalCompletedPrice = restaurantOrder.orders
  //   ? restaurantOrder.orders
  //       .filter((item) => item.orderStatus === "COMPLETED")
  //       .reduce((total, item) => total + item.totalPrice, 0)
  //   : 0;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Calculate the total price of completed orders created today
  const totalCompletedPrice = restaurantOrder.orders
    ? restaurantOrder.orders
        .filter(
          (item) =>
            item.orderStatus === "COMPLETED" &&
            item.createdAt.startsWith(today)
        )
        .reduce((total, item) => total + item.totalPrice, 0)
    : 0;

  // Calculate the total number of orders created today
  const totalOrdersToday = restaurantOrder.orders
  ? restaurantOrder.orders.filter((item) => item.createdAt.startsWith(today)).length
  : 0;

  // Calculate the total number of completed orders created today
  const totalCompletedOrdersToday = restaurantOrder.orders
  ? restaurantOrder.orders.filter(
      (item) =>
        item.orderStatus === "COMPLETED" &&
        item.createdAt.startsWith(today)
    ).length
  : 0;

  // Calculate the total number of pending orders created today
  const totalPendingOrdersToday = restaurantOrder.orders
  ? restaurantOrder.orders.filter(
      (item) =>
        item.orderStatus === "PENDING" &&
        item.createdAt.startsWith(today)
    ).length
  : 0;

  return (
    <Box>
      <Card className="mt-1" sx={{ boxShadow: "none" }}>
        <CardHeader
          title={"Dashboard"}
          sx={{ pt: 2, alignItems: "center", color: "#ED1C24" }}
        />
          <div style={{ color: "#FFFFFF", display: "flex", alignContent: "center", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "50px",
                backgroundColor: "#FFFFFF",
                color: "#227F3E",
                borderStyle: "solid",
                borderColor: "#227F3E",
                borderWidth: "2px",
                padding: "10px",
                width: "360px",
                borderRadius: "5px",
                margin: "10px"
              }}
            >
              <h1 style={{ fontSize: "25px", fontWeight: "bold", textAlign: "left" }}>Today Revenue:</h1>
              <p style={{fontSize: "32px", fontWeight: "300", textAlign: "right"}}>{formatMoney(totalCompletedPrice)}đ</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "50px",
                backgroundColor: "#004B87",
                padding: "10px",
                width: "360px",
                borderRadius: "5px",
                margin: "10px"
              }}
            >
              <h1 style={{ fontSize: "25px", fontWeight: "bold", textAlign: "left" }}>Total Orders:</h1>
              <p style={{fontSize: "32px", fontWeight: "300", textAlign: "right"}}>{totalOrdersToday}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "50px",
                backgroundColor: "#227F3E",
                padding: "10px",
                width: "360px",
                borderRadius: "5px",
                margin: "10px"
              }}
            >
              <h1 style={{ fontSize: "25px", fontWeight: "bold", textAlign: "left" }}>Today Completed:</h1>
              <p style={{fontSize: "32px", fontWeight: "300", textAlign: "right"}}>{totalCompletedOrdersToday}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "50px",
                backgroundColor: "#ED1C24",
                padding: "10px",
                width: "360px",
                borderRadius: "5px",
                margin: "10px"
              }}
            >
              <h1 style={{ fontSize: "25px", fontWeight: "bold", textAlign: "left" }}>Pending:</h1>
              <p style={{fontSize: "32px", fontWeight: "300", textAlign: "right"}}>{totalPendingOrdersToday}</p>
            </div>
          </div>
      </Card>
    </Box>
  );
};
