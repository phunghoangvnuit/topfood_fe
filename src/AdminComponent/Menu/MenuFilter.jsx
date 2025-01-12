import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { registerUser } from "component/State/Authentication/Action";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import {IconButton, Button} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CategoryIcon from '@mui/icons-material/Category';

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "",
};
const MenuFilter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("form values", values);
    dispatch(registerUser({ userData: values, navigate }));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px"
      }}
    >
      <div>
        <IconButton
          onClick={() => navigate("/admin/restaurants/add-menu")}
          aria-label="settings"
          sx={{
            color: "#227F3E",
            fontSize: "14px",
            fontWeight: "500",
            border: "1px solid",
            borderRadius: "4px",
            width: "80px",
            height: "40px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginRight: "8px",
            "&:hover": {
              backgroundColor: "green",
              color: "#fff",
            },
          }}
        >
          <AddCircleOutlineIcon sx={{ width: "18px", marginRight: "3px" }} /> Create
        </IconButton>
        <IconButton
          onClick={() => navigate("/admin/restaurants/category")}
          aria-label="settings"
          sx={{
            backgroundColor: "#004B87",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "500",
            border: "1px solid",
            borderRadius: "4px",
            width: "150px",
            height: "41px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#003B77",
            },
          }}
        >
          <CategoryIcon sx={{ width: "18px", marginRight: "3px" }} /> View Category
        </IconButton>        
      </div>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            margin="normal"
            as={Select}
            labelId="role-simple-select-label"
            id="role-simple-select"
            name="role"
            displayEmpty
            inputProps={{
              "aria-label": "Sort By",
            }}
            startAdornment={
              <InputAdornment position="start">
                <FilterAltIcon sx={{ color: "#9E9E9E" }} />
              </InputAdornment>
            }
            sx={{
              width: "200px",
              height: "40px",
              marginRight: "10px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#9E9E9E",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ED1C24",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ED1C24",
              },
              "& .MuiSelect-select": {
                color: (theme) =>
                  theme?.value === "" || theme?.value === undefined
                    ? "#9E9E9E"
                    : "#000000", // Gray for placeholder
              },
              "& .MuiSvgIcon-root": {
                color: "#9E9E9E", // Default icon color
              },
              "&:hover .MuiSvgIcon-root": {
                color: "#ED1C24", // Icon color on hover
              },
              "&.Mui-focused .MuiSvgIcon-root": {
                color: "#ED1C24", // Icon color when focused
              },
              mt: 2,
              mb: 1,
            }}
          >
            {/* Placeholder MenuItem */}
            <MenuItem
              disabled
              value=""
              sx={{ color: "#9E9E9E", display: "none" }}
            >
              <em>Sort By</em>
            </MenuItem>
            <MenuItem sx={{ color: "#000000" }} value="ALL">
              ALL
            </MenuItem>
            <MenuItem sx={{ color: "#000000" }} value="IN STOCK">
              IN STOCK
            </MenuItem>
            <MenuItem sx={{ color: "#000000" }} value="OUT STOCK">
              OUT STOCK
            </MenuItem>
          </Field>
          {/* <Field
            as={TextField}
            name="fullName"
            placeholder="Search by title or cate..."
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9E9E9E" }} />
                </InputAdornment>
              ),
              sx: { 
                height: "40px", // Apply height directly to InputBase
                color: "#000000", // Text color
              },
            }}
            InputLabelProps={{
              sx: { color: "#9E9E9E" }, // color of text placeholder
            }}
            sx={{
              width: "300px",
              height: "40px",
              // color of inputfield when it actived
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#9E9E9E",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#ED1C24",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ED1C24",
                },
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px #FFFFFF inset !important", // Fix background color
                WebkitTextFillColor: "#000000 !important", // Fix text color
                transition: "background-color 5000s ease-in-out 0s", // Prevent background flash
              },
            }}
          /> */}
          <Field
            as={TextField}
            name="fullName"
            placeholder="Search by title or cate..."
            variant="outlined"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#ED1C24", // Button color
                      color: "#FFFFFF", // Text color
                      padding: "0 10px",
                      minWidth: "fit-content",
                      "&:hover": {
                        backgroundColor: "#D0171F", // Hover color
                      },
                    }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
              sx: {
                height: "40px", // Apply height directly to InputBase
                color: "#000000", // Text color
              },
            }}
            InputLabelProps={{
              sx: { color: "#9E9E9E" }, // Placeholder text color
            }}
            sx={{
              width: "300px",
              height: "40px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#9E9E9E",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#ED1C24",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ED1C24",
                },
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px #FFFFFF inset !important", // Fix background color
                WebkitTextFillColor: "#000000 !important", // Fix text color
                transition: "background-color 5000s ease-in-out 0s", // Prevent background flash
              },
            }}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default MenuFilter;
