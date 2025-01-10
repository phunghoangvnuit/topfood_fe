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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
  updateMenuItemsAvailability
} from "component/State/Menu/Action";
export default function MenuTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: restaurant.usersRestaurant.id,
        vegetarian: false,
        non_vegetarian: false,
        seasonal: false,
        foodCategory: "",
      })
    );
  }, []);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  const handleUpdateStoke = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt }));
  };
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurants/add-menu")}
              aria-label="settings"
            >
              <CreateIcon sx={{ color: "#ED1C24" }} />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center", color: "#ED1C24" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: "#000000", width: "5%" }}
                  align="center"
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "25%" }}
                  align="center"
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "15%" }}
                  align="center"
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "10%" }}
                  align="center"
                >
                  Discounted Price
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "10%" }}
                  align="center"
                >
                  Listed Price
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "5%" }}
                  align="center"
                >
                  Availability
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "10%" }}
                  align="center"
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Avatar src={item.images[0]}></Avatar>
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }} align="center">
                    {item.name}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }} align="center">
                    {item.foodCategory.name}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }} align="center">
                    {item.price}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }} align="center">
                    {item.price}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }} align="center">
                    <Box
                      onClick={() => handleUpdateStoke(item.id)}
                      sx={{
                        border: `1px solid ${item.available ? "green" : "red"}`,
                        borderRadius: "3px",
                        padding: "5px",
                        color: item.available ? "green" : "red",
                        textTransform: "uppercase",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: item.available ? "green" : "red",
                          color: "#fff",
                        },
                      }}
                    >
                      {item.available ? "In Stock" : "Out Stock"}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="warning"
                      onClick={() => alert(`Viewing`)}
                      sx={{
                        color: "#fff",
                        backgroundColor: "#FFC300",
                        borderRadius: "3px",
                        padding: "5px",
                        marginRight: "5px",
                        "&:hover": {
                          backgroundColor: "#FFB300",
                        },
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => alert(`Editing`)}
                      sx={{
                        color: "#fff",
                        backgroundColor: "#004B87",
                        borderRadius: "3px",
                        padding: "5px",
                        marginRight: "5px",
                        "&:hover": {
                          backgroundColor: "#003B77",
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteFood(item.id)}
                      sx={{
                        color: "#fff",
                        backgroundColor: "#ED1C24",
                        borderRadius: "3px",
                        padding: "5px",
                        marginRight: "5px",
                        "&:hover": {
                          backgroundColor: "#DC0C14",
                        },
                      }}
                    >
                      <DeleteForeverIcon />
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
