import {
  Box,
  Card,
  CardHeader,
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
import { OrderCard } from "./OrderCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "component/State/Order/Action";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatDate } from "AdminComponent/util/dateUltis";
import { formatMoney } from "AdminComponent/util/moneyUltis";

export const Orders = () => {
  const { auth, cart, order } = useSelector((store) => store);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [auth.jwt]);

  return (
    // <div className="flex items-center flex-col" style={{color: "#000000"}}>
    //   <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
    //   <div className="space-y-5 w-full lg:w-1/2">
    //     {
    //       order.orders.map((order)=>order.items.map((item)=><OrderCard order={order} item={item}/>))
    //     }

    //   </div>
    // </div>

    <Box>
      <Card className="mt-1">
        <CardHeader
          title={"All Orders"}
          sx={{ pt: 2, alignItems: "center", color: "#ED1C24" }}
        />
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
              {order.orders.map((order) => (
                <TableRow
                  key={order.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {order.id}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {order.customer?.fullName}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {order.customer?.mobile}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {formatMoney(order.totalPrice)}đ
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {order.deliveryAddress?.district}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {order.paymentStatus}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#000000", textAlign: "center" }}
                  >
                    {order.orderStatus === "PENDING" && (
                      <span
                        style={{
                          width: "100px",
                          backgroundColor: "#ED1C24",
                          color: "#FFF",
                          display: "inline-block",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        PENDING
                      </span>
                    )}
                    {order.orderStatus === "PREPARING" && (
                      <span
                        style={{
                          width: "100px",
                          backgroundColor: "#FFC300",
                          color: "#FFF",
                          display: "inline-block",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        PREPARING
                      </span>
                    )}
                    {order.orderStatus === "DELIVERING" && (
                      <span
                        style={{
                          width: "100px",
                          backgroundColor: "#004B87",
                          color: "#FFF",
                          display: "inline-block",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        DELIVERING
                      </span>
                    )}
                    {order.orderStatus === "COMPLETED" && (
                      <span
                        style={{
                          width: "100px",
                          backgroundColor: "#227F3E",
                          color: "#FFF",
                          display: "inline-block",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        COMPLETED
                      </span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="warning"
                      onClick={() =>
                        navigate(`/order-details/${order.id}`)
                      }
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
};
