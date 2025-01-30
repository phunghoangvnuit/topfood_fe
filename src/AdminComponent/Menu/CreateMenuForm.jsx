import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudiary } from "AdminComponent/util/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "component/State/Menu/Action";
import { getIngredientCategory } from "component/State/Ingredients/Action";

const initialValues = {
  name: "",
  description: "",
  price: "",
  discountedPrice: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredientCategories: [],
  images: [],
};

const CreateMenuForm = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  const [uploadImage, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = 2;
      dispatch(createMenuItem({menu:values,jwt}));
      console.log("data ---", values);
    },
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudiary(file);
    console.log("image ---", image);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  useEffect(() => {
    dispatch(
      getIngredientCategory({ jwt, id: restaurant.usersRestaurant.id })
    );
  }, []);
  // Code test
  console.log(ingredients);

  return (
    <Box>
      <Card className="mt-1" sx={{ boxShadow: "none" }}>
        <CardHeader
          title={"Create Food"}
          sx={{ pt: 2, alignItems: "center", color: "#ED1C24" }}
        />
        <div style={{padding: "16px"}}>
        {/* <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen"> */}
          <div className="lg:max-w-4xl">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <Grid container spacing={2}>
                <Grid className="flex flex-wrap gap-5" item xs={12}>
                  <input
                    accept="image/*"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    type="file"
                  />

                  <label className="relative" htmlFor="fileInput">
                    <span
                      className="w-24 h-24 cursor-pointer flex items-center justify-center 
                    p-3 border rounded-md" style={{borderColor:"#D4D4D4", borderWidth: "1px"}}
                    >
                      <AddPhotoAlternate className="text-white" sx={{color:"#D4D4D4", fontSize:"30px"}}/>
                    </span>
                    {uploadImage && (
                      <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                        <CircularProgress />
                      </div>
                    )}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formik.values.images.map((image, index) => (
                      <div className="relative">
                        <img
                          className="w-24 h-24 object-cover"
                          key={index}
                          src={image}
                          alt=""
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            outline: "none",
                          }}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <CloseIcon sx={{ fontSize: "1rem" }} />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.name}
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
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.description}
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
                  ></TextField>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.price}
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
                  ></TextField>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="discountedPrice"
                    name="discountedPrice"
                    label="Discounted Price"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.discountedPrice}
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
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" sx={{ color: "#9E9E9E" }}>Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.category}
                      label="Category"
                      onChange={formik.handleChange}
                      name="category"
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
                        }
                      }}
                    >
                      {restaurant.categories?.map((item)=><MenuItem sx={{color: "#000000"}} value={item}>{item.name}</MenuItem>)
                      }

                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-chip-label" sx={{ color: "#9E9E9E" }}>
                      Add-on Options
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      name="ingredientCategories"
                      multiple
                      value={formik.values.ingredientCategories}
                      onChange={formik.handleChange}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Add-on Options"
                        />
                      }
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
                        }
                      }}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip sx={{color: "#FFFFFF", backgroundColor: "#000000"}} key={value.id} label={value.name} />
                          ))}
                        </Box>
                      )}
                      // MenuProps={MenuProps}
                    >
                      {ingredients.category?.map((item, index) => (
                        <MenuItem sx={{color: "#000000"}} key={item.id} value={item}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" sx={{ color: "#9E9E9E" }}>Is Seasonal</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="seasonal"
                      value={formik.values.seasonal}
                      label="Is Seasonal"
                      onChange={formik.handleChange}
                      name="seasonal"
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
                        }
                      }}
                    >
                      <MenuItem sx={{color: "#000000"}} value={true}>Yes</MenuItem>
                      <MenuItem sx={{color: "#000000"}} value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" sx={{ color: "#9E9E9E" }}>Is Vegetarian</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="vegetarian"
                      value={formik.values.vegetarian}
                      label="Is Vegetarian"
                      onChange={formik.handleChange}
                      name="vegetarian"
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
                        }
                      }}
                    >
                      <MenuItem sx={{color: "#000000"}} value={true}>Yes</MenuItem>
                      <MenuItem sx={{color: "#000000"}} value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>
              <Button variant="contained" sx={{backgroundColor: "#227F3E", marginRight: "10px"}} type="submit">
                CREATE
              </Button>
              <Button variant="contained" sx={{backgroundColor: "#004B87", marginRight: "10px"}} type="submit">
                CANCEL
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default CreateMenuForm;
