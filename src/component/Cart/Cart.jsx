import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CartItem } from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { AddLocation } from "@mui/icons-material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "component/State/Order/Action";
import { calculateDeliveryFee, estimateDuration, estimateTime } from "component/util/MapBoxAPI";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const createOrderUsingSelectedAddress = () => {};
  const handleOpenAddressModal = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const { cart,auth } = useSelector(store=>store);
  const dispatch=useDispatch();

  // Get Restaurant Address (START)
  const [restaurantAddress, setRestaurantAddress] = useState("");
  useEffect(() => {
      if (cart.cartItems.length > 0){
        const address = cart.cartItems[0].food.restaurant.address;
        setRestaurantAddress(`${address.detailsAddress}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}`);
        console.log(address);
      } else return;
  }, [cart.cartItems]);

  // Get Delivery Address (START)
  const initialValues = {
    detailsAddress: "",
    street: "",
    ward: "",
    district: "",
    city: "",
  };
  const [formValues, setFormValues] = useState({
    detailsAddress: "",
    street: "",
    ward: "",
    district: "",
    city: ""
  });
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const handleUpdateAddress = (values) => {
    setDeliveryAddress(`${values.detailsAddress}, ${values.street}, ${values.ward}, ${values.district}, ${values.city}`);
  };

  // Get Delivery Fee
  const [deliveryFee, setDeliveryFee] = useState(0);
  useEffect(() => {
    const fetchDeliveryFee = async () => {
      const fee = await calculateDeliveryFee(deliveryAddress, restaurantAddress);
      setDeliveryFee(fee);
    };
    fetchDeliveryFee();
  }, [deliveryAddress]);

  // Caculate Bill Details
  let price = {
    items: 0,
    delivery: 0,
    tax: 0
  };
  const calculateItemTotal = () => {
    price.items = cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    price.delivery = (!deliveryFee) ? 0 : (deliveryFee);
    price.tax = (price.items + price.delivery) * 0.1;
  };
  calculateItemTotal();

  // Get Delivery Time (For Example: Delivery At 10:00 AM)
  const [deliveryTime, setDeliveryTime] = useState(0);
  useEffect(() => {
    const fetchEstimateTime = async () => {
      const deliveryTime = await estimateTime(deliveryAddress, restaurantAddress);
      setDeliveryTime(deliveryTime);
    };
    fetchEstimateTime();
  }, [deliveryAddress]);

  // Get Delivery Duration (For Example: Delivery in 15 minutes)
  const [deliveryDuration, setDeliveryDuration] = useState(0);
  useEffect(() => {
    const fetchEstimateDuration = async () => {
      const deliveryDuration = await estimateDuration(deliveryAddress, restaurantAddress);
      setDeliveryDuration(deliveryDuration);
    };
    fetchEstimateDuration();
  }, [deliveryAddress]);

  // Handle Submit
  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order:{
        restaurantId:cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          detailsAddress: formValues.detailsAddress,
          street: formValues.street,
          ward: formValues.ward,
          district: formValues.district,
          city: formValues.city,
          country: "vietnam"
        },
        deliveryFee: deliveryFee,
      }
    }
    dispatch(createOrder(data))
    console.log("form value",values)
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10" style={{ border: "1px solid rgba(212, 212, 212, 0.5)" }}>
          {cart.cartItems.map((item) => (
            <CartItem item={item}/>
          ))}
          <Divider sx={{bgcolor: "#D4D4D4", opacity:"0.5"}} />
          <div className="billDetails px-5 text-sm" style={{color:"#000000", fontSize:"16px"}}>
              <div className="flex-col justify-left space-y-2">
                <p style={{color:"#ED1C24", fontWeight:"600"}}>Delivery Address</p>
                <p>{deliveryAddress}</p>
                <p>Delivery at: {deliveryTime} ({deliveryDuration} minutes)</p>
              </div>
            <p className="py-5" style={{color:"#ED1C24", fontWeight:"600"}}>Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p>Item Total</p>
                <p>{price.items} đ</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>{price.delivery} đ</p>
              </div>
              <div className="flex justify-between">
                <p>Tax (VAT)</p>
                <p>{price.tax} đ</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between" style={{color:"#ED1C24", fontWeight:"600"}}>
              <p>Total pay</p>
              <p>{price.items + price.delivery + price.tax} đ</p>
            </div>
            <button onClick={handleSubmit} style={{color: "white", background: "#ED1C24", padding: "8px 10px", borderRadius: "3px", marginTop: "80px", width: "100%"}}>Purchase</button>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10" style={{color:"#ED1C24"}}>
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1].map((item) => (
                <AddressCard
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocation sx={{color:"#ED1C24"}}/>
                <div className="space-y-3">
                  <h1 className="font-semibold text-lg text-white" style={{color:"#ED1C24"}}>
                    Add New Address
                  </h1>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModal}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              setFormValues(values);
              handleUpdateAddress(values);
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="detailsAddress"
                    label="Details Address"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      sx: { color: "#000000" } // color of text input
                    }}
                    InputLabelProps={{
                      sx: { color: "#9E9E9E" } // color of text placeholder
                    }}
                    sx = {{ // color of inputfield when it actived
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#D4D4D4',
                          borderWidth: "1px"
                        },
                        '&:hover fieldset': {
                          borderColor: '#ED1C24',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ED1C24',
                        },
                      },
                      '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset !important', // Fix background color
                        WebkitTextFillColor: '#000000 !important', // Fix text color
                        transition: 'background-color 5000s ease-in-out 0s', // Prevent background flash
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="street"
                    label="Street"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      sx: { color: "#000000" } // color of text input
                    }}
                    InputLabelProps={{
                      sx: { color: "#9E9E9E" } // color of text placeholder
                    }}
                    sx = {{ // color of inputfield when it actived
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#D4D4D4',
                          borderWidth: "1px"
                        },
                        '&:hover fieldset': {
                          borderColor: '#ED1C24',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ED1C24',
                        },
                      },
                      '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset !important', // Fix background color
                        WebkitTextFillColor: '#000000 !important', // Fix text color
                        transition: 'background-color 5000s ease-in-out 0s', // Prevent background flash
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="ward"
                    label="Ward"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      sx: { color: "#000000" } // color of text input
                    }}
                    InputLabelProps={{
                      sx: { color: "#9E9E9E" } // color of text placeholder
                    }}
                    sx = {{ // color of inputfield when it actived
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#D4D4D4',
                          borderWidth: "1px"
                        },
                        '&:hover fieldset': {
                          borderColor: '#ED1C24',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ED1C24',
                        },
                      },
                      '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset !important', // Fix background color
                        WebkitTextFillColor: '#000000 !important', // Fix text color
                        transition: 'background-color 5000s ease-in-out 0s', // Prevent background flash
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="district"
                    label="District"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      sx: { color: "#000000" } // color of text input
                    }}
                    InputLabelProps={{
                      sx: { color: "#9E9E9E" } // color of text placeholder
                    }}
                    sx = {{ // color of inputfield when it actived
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#D4D4D4',
                          borderWidth: "1px"
                        },
                        '&:hover fieldset': {
                          borderColor: '#ED1C24',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ED1C24',
                        },
                      },
                      '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset !important', // Fix background color
                        WebkitTextFillColor: '#000000 !important', // Fix text color
                        transition: 'background-color 5000s ease-in-out 0s', // Prevent background flash
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      sx: { color: "#000000" } // color of text input
                    }}
                    InputLabelProps={{
                      sx: { color: "#9E9E9E" } // color of text placeholder
                    }}
                    sx = {{ // color of inputfield when it actived
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#D4D4D4',
                          borderWidth: "1px"
                        },
                        '&:hover fieldset': {
                          borderColor: '#ED1C24',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ED1C24',
                        },
                      },
                      '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset !important', // Fix background color
                        WebkitTextFillColor: '#000000 !important', // Fix text color
                        transition: 'background-color 5000s ease-in-out 0s', // Prevent background flash
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit" color="primary">Deliver Here</Button>
                </Grid>
              </Grid>
            </Form>

          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
