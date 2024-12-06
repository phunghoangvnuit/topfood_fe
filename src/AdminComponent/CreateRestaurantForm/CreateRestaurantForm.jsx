import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudiary } from "AdminComponent/util/uploadToCloudinary";
import { useDispatch } from "react-redux";
import { createRestaurant } from "component/State/Restaurant/Action";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  detailsAddress: "",
  street: "",
  district: "",
  city: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun : 9:00 AM - 12:00 PM",
  images: []
};
const CreateRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          detailsAddress: values.detailsAddress,
          street: values.street,
          district: values.district,
          city: values.city,
          country: values.country,
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images,
      };
      console.log("data ---",data);

      dispatch(createRestaurant({data,token:jwt}));
    },
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudiary(file);
    console.log("image ---",image);
    formik.setFieldValue("images",[...formik.values.images,image])
    setUploadImage(false)
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index,1);
    formik.setFieldValue("images",updatedImages);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2" style={{color:"#ED1C24"}}>
          Add New Restaurant
        </h1>
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
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
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
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
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
                id="detailsAddress"
                name="detailsAddress"
                label="Details Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.detailsAddress}
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
                id="street"
                name="street"
                label="Street"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.street}
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

            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id="district"
                name="district"
                label="District"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.district}
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

            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
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

            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
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
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
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
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
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
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
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
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
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
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
