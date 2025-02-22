import React, { useEffect } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { green } from "@mui/material/colors";
import { Button, Card } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { api, API_URL } from "../config/api";
import axios from "axios";
import { updatePaymentStatus } from "component/State/Restaurant Order/Action";
import { useDispatch } from "react-redux";
import { clearCartAction } from "component/State/Cart/Action";

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  // Send Order Email Confirmation
  useEffect(() => {
    const sendEmail = async () => {
      try {
        await axios.get(`${API_URL}/api/send-email/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };
    dispatch(updatePaymentStatus({ orderId: id, jwt }));
    dispatch(clearCartAction({jwt}));
    sendEmail();
  }, [id, dispatch, jwt]);

  return (
    <div className="min-h-screen px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <Card className="box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5">
          <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />
          <h1 className="py-5 text-2xl font-semibold">Order Success!</h1>
          <p className="py-3 text-center" style={{color: "#ED1C24"}}>Thank you for choosing our service! We appreciate your order</p>
          <p className="py-2 text-center text-black text-lg">
            Have A Great Day!
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            className="py-5"
            sx={{ margin: "1rem 0rem" }}
          >
            Go To Home
          </Button>
        </Card>
      </div>
    </div>
  );
};
