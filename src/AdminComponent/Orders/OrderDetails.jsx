import { Box, Card, CardHeader } from "@mui/material";
import { getOrderById } from "component/State/Order/Action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import { formatMoney } from "AdminComponent/util/moneyUltis";
import { formatDate } from "AdminComponent/util/dateUltis";
import { OrderItem } from "./OrderItem";
import { updateOrderStatus } from "component/State/Restaurant Order/Action";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order: orderDetails } = useSelector((store) => store.order);
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getOrderById(id, jwt));
  }, [dispatch, id, jwt]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const handleUpdateOrderStatus = (orderId) => {
    dispatch(updateOrderStatus({ orderId, jwt }));
    navigate('/admin/restaurants/orders');
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "20px" }}>{`Order Details: #${id}`}</p>
                {orderDetails.orderStatus === "PENDING" && (
                  <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#ED1C24", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                    PENDING
                  </button>
                )}
                {orderDetails.orderStatus === "PREPARING" && (
                  <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#FFC300", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                    PREPARING
                  </button>
                )}
                {orderDetails.orderStatus === "DELIVERING" && (
                  <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#004B87", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                    DELIVERING
                  </button>
                )}
                {orderDetails.orderStatus === "COMPLETED" && (
                  <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#227F3E", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                    COMPLETED
                  </button>
                )}
                {orderDetails.orderStatus === "REFUNDING" && (
                  <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#2596BE", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                    REFUNDING
                  </button>
                )}
                {orderDetails.orderStatus === "CANCEL" && (
                  <button style={{ fontSize: "14px", width: "100px", height: "30px", backgroundColor: "#9E9E9E", color: "#FFF", display: "inline-block", padding: "5px", borderRadius: "3px" }}>
                    CANCEL
                  </button>
                )}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{
                    fontSize: "14px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "3px",
                    backgroundColor: "#9FD4A3",
                    color: "#FFF",
                    cursor: "pointer",
                  }}
                >
                  <PrintIcon sx={{ width: "18px" }} />
                </button>
                <button
                onClick={() => handleUpdateOrderStatus(orderDetails.id)}
                  style={{
                    fontSize: "14px",
                    width: "100px",
                    height: "30px",
                    borderRadius: "3px",
                    backgroundColor: "#FFC300",
                    color: "#FFF",
                    cursor: "pointer",
                  }}
                >
                  UPDATE
                </button>
                <button
                onClick={() => handleUpdateOrderStatus(orderDetails.id)}
                  style={{
                    fontSize: "14px",
                    width: "100px",
                    height: "30px",
                    borderRadius: "3px",
                    backgroundColor: "#004B87",
                    color: "#FFF",
                    cursor: "pointer",
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          }
          sx={{ pt: 2, alignItems: "center", color: "#ED1C24" }}
        />
      </Card>
      <div>
        <div
          style={{
            color: "black",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontWeight: "600",
          }}
        >
          <p>
            Create At:{" "}
            <span style={{ fontWeight: "400" }}>
              {formatDate(orderDetails.createdAt)}
            </span>
          </p>
          <p>
            Customer:{" "}
            <span style={{ fontWeight: "400" }}>
              {orderDetails.customer?.fullName} -{" "}
              {orderDetails.customer?.mobile}
            </span>
          </p>
          <p>
            Receiver:{" "}
            <span style={{ fontWeight: "400" }}>
              {orderDetails.receiverName} - {orderDetails.receiverMobile}
            </span>
          </p>
          <p>
            Delivery Address:{" "}
            <span style={{ fontWeight: "400" }}>
              {orderDetails.deliveryAddress?.detailsAddress},{" "}
              {orderDetails.deliveryAddress?.street},{" "}
              {orderDetails.deliveryAddress?.ward},{" "}
              {orderDetails.deliveryAddress?.district},{" "}
              {orderDetails.deliveryAddress?.city}
            </span>
          </p>
          {orderDetails.orderStatus === "COMPLETED" ? (
            <p>
              Delivery At:{" "}
              <span style={{ fontWeight: "400" }}>
                {formatDate(orderDetails.deliveryAt)}
              </span>
            </p>
          ) : (
            <p>
              Estimate Delivery At:{" "}
              <span style={{ fontWeight: "400" }}>
                {formatDate(orderDetails.deliveryAt)}
              </span>
            </p>
          )}
          <p>
            Payment Status:{" "}
            <span style={{ fontWeight: "400" }}>
              {orderDetails.paymentStatus}
            </span>
          </p>
        </div>
      </div>
      <div>
        <table style={{ width: "100%", color: "#000000", fontSize: "16px" }}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Id</th>
              <th style={{ width: "10%" }}>Image</th>
              <th style={{ width: "30%" }}>Name</th>
              <th style={{ width: "15%" }}>Quantity</th>
              <th style={{ width: "20%" }}>Add-ons</th>
              <th style={{ width: "15%" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items &&
              orderDetails.items.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
          </tbody>
        </table>
        <div
          style={{
            color: "black",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontWeight: "600",
          }}
        >
          <p>
            Delivery Fee:{" "}
            <span style={{ fontWeight: "400" }}>
              {formatMoney(Number(orderDetails.deliveryFee))}đ
            </span>
          </p>
          <p>
            Tax(10%):{" "}
            <span style={{ fontWeight: "400" }}>
              {formatMoney(
                (Number(orderDetails.deliveryFee) +
                  Number(orderDetails.totalPrice)) *
                  0.1
              )}
              đ
            </span>
          </p>
          <p>
            Total Price:{" "}
            <span style={{ fontWeight: "400" }}>
              {formatMoney(
                Number(
                  (Number(orderDetails.deliveryFee) +
                    Number(orderDetails.totalPrice)) *
                    0.1
                ) +
                  Number(
                    Number(orderDetails.deliveryFee) +
                      Number(orderDetails.totalPrice)
                  )
              )}
              đ
            </span>
          </p>
        </div>
      </div>
    </Box>
  );
};

export default OrderDetails;
