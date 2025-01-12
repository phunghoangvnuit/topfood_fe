import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { searchMenuItem } from "component/State/Menu/Action";
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
  availability: null,
  keyword: ""
};

const MenuFilter = () => {
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurant, menu } = useSelector((store) => store);

  const handleSearch = (values) => {
    console.log("search values", values);
    dispatch(searchMenuItem({ searchValue: values, jwt }));
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
      <Formik onSubmit={handleSearch} initialValues={initialValues}>
        <Form>
          <Field
            margin="normal"
            as={Select}
            labelId="filter-simple-select-label"
            id="filter-simple-select"
            name="availability"
            displayEmpty
            startAdornment={
              <InputAdornment position="start">
                <FilterAltIcon sx={{ color: "#9E9E9E" }} />
              </InputAdornment>
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    "&.Mui-selected": {
                      backgroundColor: "#E0E0E0 !important", // Light gray for selected option
                      "&:hover": {
                        backgroundColor: "#BDBDBD !important", // Medium gray for hover effect
                      },
                    },
                  },
                },
              },
            }}
            sx={{
              width: "200px",
              height: "40px",
              marginRight: "10px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#9E9E9E",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#9E9E9E",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#9E9E9E",
                borderWidth: "1px"
              },
              "& .MuiSelect-select": {
                color: "#000000",
              },
              "& .MuiSvgIcon-root": {
                color: "#9E9E9E", // Default icon color
              },
              "&:hover .MuiSvgIcon-root": {
                color: "#9E9E9E", // Icon color on hover
              },
              "&.Mui-focused .MuiSvgIcon-root": {
                color: "#9E9E9E", // Icon color when focused
              },
              mt: 2,
              mb: 1,
            }}
          >
            <MenuItem sx={{ color: "#000000" }} value={null}>
              ALL
            </MenuItem>
            <MenuItem sx={{ color: "#000000" }} value={true}>
              IN STOCK
            </MenuItem>
            <MenuItem sx={{ color: "#000000" }} value={false}>
              OUT STOCK
            </MenuItem>
          </Field>
          <Field
            as={TextField}
            name="keyword"
            placeholder="Search by title or cate..."
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9E9E9E" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    sx={{
                      backgroundColor: "#004B87", // Button color
                      color: "#FFFFFF", // Text color
                      padding: "0 10px",
                      minWidth: "fit-content",
                      boxShadow: "none", // Remove box shadow
                      "&:hover": {
                        backgroundColor: "#003B77", // Hover color
                        boxShadow: "none", // Remove box shadow on hover
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
              width: "360px",
              height: "40px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#9E9E9E",
                },
                "&:hover fieldset": {
                  borderColor: "#9E9E9E",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#9E9E9E",
                  borderWidth: "1px"
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
