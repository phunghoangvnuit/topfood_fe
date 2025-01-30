import { Avatar, Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MenuFilter from 'AdminComponent/Menu/MenuFilter';
import { deleteFoodAction, getMenuItemsByRestaurantId, updateMenuItemsAvailability } from 'component/State/Menu/Action';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CategoryDetails = ({ selectedCategory, menuItems }) => {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
        foodCategory: selectedCategory,
      })
    );
    // Code test: 
    console.log(restaurant.usersRestaurant?.id);
    console.log(selectedCategory);
  }, [selectedCategory]);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  const handleUpdateStoke = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt }));
  };

  return (
  <Box>
      <Card className="mt-1" sx={{ boxShadow: "none" }}>
        <CardHeader
          title={`Category \"${selectedCategory}\"`}
          sx={{ pt: 2, alignItems: "center", color: "#ED1C24" }}
        />
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table
            sx={{ minWidth: 600, tableLayout: "fixed" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: "#000000", width: "10%" }}
                  align="center"
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "10%" }}
                  align="center"
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "10%" }}
                  align="center"
                >
                  Listed Price
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "10%" }}
                  align="center"
                >
                  Availability
                </TableCell>
                <TableCell
                  sx={{ color: "#000000", width: "10%" }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuItems.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar src={item.images[0]}></Avatar>
                    </div>
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }} align="center">
                    {item.name}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default CategoryDetails