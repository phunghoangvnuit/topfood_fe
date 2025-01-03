import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder, updateOrderStatus } from "component/State/Restaurant Order/Action";

export default function OrderTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
  }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

  const handleUpdateOrder = (orderId) => {
    dispatch(updateOrderStatus({ orderId, jwt }));
  };
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center", color:"#ED1C24" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{color:"#000000"}}>Id</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Image</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Customer</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Price</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Quantity</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Name</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Ingredients</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Status</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{color:"#000000"}}>
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) => (
                        <Avatar src={orderItem.food?.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right" sx={{color:"#000000"}}>{item.customer?.fullName}</TableCell>
                  <TableCell align="right" sx={{color:"#000000"}}>{item.totalPrice}</TableCell>
                  <TableCell align="right" sx={{color:"#000000"}}>{item.items[0].quantity}</TableCell>
                  <TableCell align="right" sx={{color:"#000000"}}>
                    {item.items.map((orderItem) => (
                      <p>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <div>
                        {orderItem.ingredients.map((ingredient) => (
                          <Chip sx={{color: "#FFFFFF", backgroundColor: "#000000"}} label={ingredient} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell sx={{color:"#000000"}} align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      onClick={() => handleUpdateOrder(item.id)}
                    >
                      UPDATE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
