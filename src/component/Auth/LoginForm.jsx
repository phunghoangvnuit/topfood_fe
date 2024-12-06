import { Button, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'component/State/Authentication/Action';

const initialValues = {
  email:"",
  password:""
}
export const LoginForm = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleSubmit=(values)=>{
    dispatch(loginUser({userData:values,navigate}))
  }
  return (
    <div>

      <Typography variant="h5" className="text-center" sx={{color:"#ED1C24"}}>
        Login
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>

        <Form>

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
          <Button sx={{mt:2, padding: "1rem"}} fullWidth type="submit" variant="contained">Login</Button>

        </Form>

      </Formik>
      <Typography variant="body2" align="center" sx={{mt:3, color:"#9E9E9E"}}>
        Don't have an account?
        <Button size="small" onClick={()=>navigate("/account/register")}>
          Register
        </Button>
      </Typography>
      
    </div>
  )
}
