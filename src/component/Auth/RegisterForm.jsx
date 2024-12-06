import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { registerUser } from "component/State/Authentication/Action";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER"
};
export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("form values", values)
    dispatch(registerUser({userData:values,navigate}))
  };
  return (
    <div>
      <Typography variant="h5" className="text-center" sx={{color:"#ED1C24"}}>
        Register
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full name"
            fullWidth
            variant="outlined"
            margin="normal"
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

          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            type="email"
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
          <Field
            as={TextField}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
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

          <Field
            fullWidth
            margin="normal"
            as={Select}
            labelId="role-simple-select-label"
            id="role-simple-select"
            name="role"
            // value={age}

            // onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D4D4D4',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ED1C24',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ED1C24',
              },
              '& .MuiSelect-select': {
                color: '#000000', // Text color for selected value
              },
              '& .MuiSvgIcon-root': {
                color: '#D4D4D4', // Default icon color
              },
              '&:hover .MuiSvgIcon-root': {
                color: '#ED1C24', // Icon color on hover
              },
              '&.Mui-focused .MuiSvgIcon-root': {
                color: '#ED1C24', // Icon color when focused
              },
              mt: 2,
              mb: 1
            }}
          >
            <MenuItem sx={{color: "#000000"}} value={"ROLE_CUSTOMER"}>Customer</MenuItem>
            <MenuItem sx={{color: "#000000"}} value={"ROLE_RESTAURANT_OWNER"}>
              Restaurant Owner
            </MenuItem>
          </Field>

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3, color:"#9E9E9E" }}>
        If you already have an account?
        <Button size="small" onClick={() => navigate("/account/login")}>
          Login
        </Button>
      </Typography>
    </div>
  );
};
