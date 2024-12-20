import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardHeader,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodAction, getMenuItemsByRestaurantId } from "component/State/Menu/Action";
export default function MenuTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: restaurant.usersRestaurant.id,
        vegetarian: false,
        non_vegetarian: false,
        seasonal: false,
        foodCategory: ""
      })
    );
  },[])

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({foodId,jwt}))
  }
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton onClick={()=>navigate("/admin/restaurants/add-menu")} aria-label="settings">
              <CreateIcon sx={{color: "#ED1C24"}}/>
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center", color:"#ED1C24" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{color:"#000000"}} align="left">Image</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Title</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Ingredients</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Price</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Availability</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={item.images[0]}></Avatar>
                  </TableCell>
                  <TableCell sx={{color:"#000000"}} align="right">{item.name}</TableCell>
                  <TableCell align="right">
                    {item.ingredients.map((ingredient)=><Chip sx={{color: "#FFFFFF", backgroundColor: "#000000"}} label={ingredient.name}/>)}
                  </TableCell>

                  <TableCell sx={{color:"#000000"}} align="right">{item.price}</TableCell>
                  <TableCell sx={{color:"#000000"}} align="right">{item.available?"in_stock":"out_of_stock"}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={()=>handleDeleteFood(item.id)}>
                      <Delete sx={{color: "#ED1C24"}}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
