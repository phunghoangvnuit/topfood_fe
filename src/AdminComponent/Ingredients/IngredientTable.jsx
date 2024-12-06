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
import { getIngredientsOfRestaurant, updateStockOfIngredient } from "component/State/Ingredients/Action";
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
export default function IngredientTable() {
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
    dispatch(updateStockOfIngredient({ id,jwt }));
  }
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon sx={{color:"#ED1C24"}}/>
            </IconButton>
          }
          title={"Ingredients"}
          sx={{ pt: 2, alignItems: "center", color:"#ED1C24" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{color:"#000000"}} align="left">Id</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Name</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Category</TableCell>
                <TableCell sx={{color:"#000000"}} align="right">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.ingredients.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{color:"#000000"}} component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell sx={{color:"#000000"}} align="right">{item.name}</TableCell>

                  <TableCell sx={{color:"#000000"}} align="right">{item.category.name}</TableCell>
                  <TableCell align="right">
                    <Button onClick={()=>handleUpdateStoke(item.id)}>{item.inStock?"in_stock":"out_of_stock"}</Button>
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
