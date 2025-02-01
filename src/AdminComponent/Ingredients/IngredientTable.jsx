import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Modal,
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
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientsOfRestaurant,
  updateStockOfIngredient,
} from "component/State/Ingredients/Action";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const orders = [1, 1, 1, 1, 1, 1, 1];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function IngredientTable({ selectedCategory, ingredientItems }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(
      getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant.id })
    );
  }, []);

  const handleUpdateStoke = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };
  return (
    <Box>
      <Card className="mt-1" sx={{ boxShadow: "none" }}>
        <CardHeader
          action={
            <IconButton
              onClick={handleOpen}
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
              <AddCircleOutlineIcon
                sx={{ width: "18px", marginRight: "3px" }}
              />{" "}
              Create
            </IconButton>
          }
          title={selectedCategory.name ? `Add-on items in "${selectedCategory.name}"` : "All Add-ons"}
          sx={{ pt: 2, alignItems: "center", color: "#ED1C24" }}
        />

        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#000000", width: "10%" }} align="center">
                  Name
                </TableCell>
                <TableCell sx={{ color: "#000000", width: "10%" }} align="center">
                  Price
                </TableCell>
                <TableCell sx={{ color: "#000000", width: "5%" }} align="center">
                  Availability
                </TableCell>
                <TableCell sx={{ color: "#000000", width: "10%" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredientItems.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, height: "73px" }}
                >
                  <TableCell
                    sx={{ color: "#000000" }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {item.name}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }} align="center">
                    {item.price}
                  </TableCell>
                  <TableCell sx={{ color: "#000000" }} align="center">
                    <Box
                      onClick={() => handleUpdateStoke(item.id)}
                      sx={{
                        border: `1px solid ${item.inStock ? "green" : "red"}`,
                        borderRadius: "3px",
                        padding: "5px",
                        color: item.inStock ? "green" : "red",
                        textTransform: "uppercase",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: item.inStock ? "green" : "red",
                          color: "#fff",
                        },
                      }}
                    >
                      {item.inStock ? "In Stock" : "Out Stock"}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
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
                      onClick={() => alert(`Deleting`)}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientForm />
        </Box>
      </Modal>
    </Box>
  );
}
