import {
  // Avatar,
  // AvatarGroup,
  Box,
  // Button,
  Card,
  CardHeader,
  // Chip,
  // Menu,
  // MenuItem,
  IconButton,
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
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from "component/State/Restaurant Order/Action";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StopCircleIcon from '@mui/icons-material/StopCircle';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatDate } from "AdminComponent/util/dateUltis";
import { formatMoney } from "AdminComponent/util/moneyUltis";
import OrderFilter from "./OrderFilter";
import { Navigate, useNavigate } from "react-router-dom";

export default function OrderTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <CardHeader
          title={"All Orders"}
          sx={{ pt: 2, alignItems: "center", color: "#ED1C24" }}
        />
        <OrderFilter restaurantId={restaurant.usersRestaurant.id}/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Id
                </TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Created At
                </TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Customer
                </TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Phone
                </TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Total Price
                </TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Delivery Address
                </TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Payment
                </TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ color: "#000000" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.search.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {item.id}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {formatDate(item.createdAt)}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000000", textAlign: "center" }}>
                    {item.customer?.fullName}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000000", textAlign: "center" }}>
                    {item.customer?.mobile}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000000", textAlign: "center" }}>
                    {formatMoney(item.totalPrice)}đ
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000000", textAlign: "center" }}>
                    {item.deliveryAddress?.district}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000000", textAlign: "center" }}>
                    {item.paymentStatus}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#000000", textAlign: "center" }}>
                    {item.orderStatus === "PENDING" && (
                      <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#ED1C24", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                        PENDING
                      </button>
                    )}
                    {item.orderStatus === "PREPARING" && (
                      <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#FFC300", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                        PREPARING
                      </button>
                    )}
                    {item.orderStatus === "DELIVERING" && (
                      <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#004B87", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                        DELIVERING
                      </button>
                    )}
                    {item.orderStatus === "COMPLETED" && (
                      <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#227F3E", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                        COMPLETED
                      </button>
                    )}
                    {item.orderStatus === "REFUNDING" && (
                      <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#2596BE", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                        REFUNDING
                      </button>
                    )}
                    {item.orderStatus === "CANCEL" && (
                      <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#9E9E9E", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                        CANCEL
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="warning"
                      onClick={() => navigate(`/admin/restaurants/order-details/${item.id}`)}
                      sx={{
                        color: "#fff",
                        backgroundColor: "#FFC300",
                        borderRadius: "3px",
                        padding: "5px",
                        marginRight: "5px",
                        "&:hover": {
                          backgroundColor: "#FFB300",
                        },
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      // onClick={() => handleDeleteFood(item.id)}
                      sx={{
                        color: "#fff",
                        backgroundColor: "#ED1C24",
                        borderRadius: "3px",
                        padding: "5px",
                        marginRight: "5px",
                        "&:hover": {
                          backgroundColor: "#DC0C14",
                        },
                      }}
                    >
                      <StopCircleIcon />
                    </IconButton>
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
