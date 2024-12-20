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
const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Delivering", value: "DELIVERING" },
  { label: "Delivered", value: "DELIVERED" },
];
export default function OrderTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder, ingredients, menu } = useSelector(
    (store) => store
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
  }, []);

  const handleUpdateOrder = (orderId,orderStatus) => {
    dispatch(updateOrderStatus({orderId,orderStatus,jwt}))
    handleClose();
  }
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
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      UPDATE
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem sx={{color:"#000000"}} onClick={()=>handleUpdateOrder(item.id,status.value)}>{status.label}</MenuItem>
                      ))}
                    </Menu>
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
