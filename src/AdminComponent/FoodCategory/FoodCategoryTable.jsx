import {
  Box,
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
import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsCategory } from "component/State/Restaurant/Action";
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

export default function FoodCategoryTable({ onSelectCategory }) {
  const { menu, restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(
      getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
  }, []);

  return (
    <Box sx={{}}>
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
            <AddCircleOutlineIcon sx={{ width: "18px", marginRight: "3px" }} />{" "}
            Create
          </IconButton>
          }
          title={"Food Categories"}
          sx={{ pt: 2, alignItems: "center", color:"#ED1C24"}}
        />

        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell sx={{color:"#000000"}} align="left">Id</TableCell> */}
                <TableCell sx={{color:"#000000"}} align="center">Name</TableCell>
                <TableCell sx={{color:"#000000"}} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, height: "73px" }}
                >
                  {/* <TableCell component="th" scope="row" sx={{color:"#000000"}}>
                    {item.id}
                  </TableCell> */}
                  <TableCell sx={{color:"#000000"}} align="center">{item.name}</TableCell>
                  <TableCell align="center" sx={{width: "40%"}}>
                    <IconButton
                      color="warning"
                      onClick={() => onSelectCategory(item.name)}
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
          <CreateFoodCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
}
