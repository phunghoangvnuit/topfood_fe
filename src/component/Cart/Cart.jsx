import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import { CartItem } from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { AddLocation } from "@mui/icons-material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "component/State/Order/Action";
// import * as Yup from "yup";

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
const initialValues = {
  detailsAddress: "",
  street: "",
  district: "",
  city: "",
};
// const validationSchema=Yup.object.shape({
//   detailsAddress:Yup.string().required("Details Address is required"),
//   street:Yup.string().required("Street is required"),
//   district:Yup.string().required("District is required"),
//   city:Yup.string().required("City is required")
// })

const Cart = () => {
  const createOrderUsingSelectedAddress = () => {};
  const handleOpenAddressModal = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const { cart,auth } = useSelector(store=>store);
  const dispatch=useDispatch();

  let price = {
    items: 0,
    delivery: 10000,
    tax: 0,
    total: 0
  };

  const calculateItemTotal = () => {
    price.items = cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    price.delivery = 10000;
    price.tax = price.items * 0.1;
    price.total = price.items + price.delivery + price.tax;
  }; calculateItemTotal();

  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order:{
        restaurantId:cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName:auth.user?.fullName,
          detailsAddress: values.detailsAddress,
          street: values.street,
          district: values.district,
          city: values.city
          // phone: values.phone
        }
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
            <p className="py-5" style={{color:"#ED1C24", fontWeight:"600"}}>Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p>Item Total</p>
                <p>{price.items}đ</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>{price.delivery}đ</p>
              </div>
              <div className="flex justify-between">
                <p>Tax (VAT)</p>
                <p>{price.tax}đ</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between" style={{color:"#ED1C24", fontWeight:"600"}}>
              <p>Total pay</p>
              <p>{price.total}đ</p>
            </div>
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
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                    // error={!ErrorMessage("detailsAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
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
                    // error={!ErrorMessage("detailsAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
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
                    // error={!ErrorMessage("detailsAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
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
                    // error={!ErrorMessage("detailsAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
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
