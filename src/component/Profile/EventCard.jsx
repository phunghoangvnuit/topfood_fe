import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://images.pexels.com/photos/19347048/pexels-photo-19347048/free-photo-of-delicious-vietnamese-meals-on-plates-on-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />

        <CardContent>
          <Typography variant="h5">Vietnam Food Day</Typography>
          <Typography variant="body">50% off on your first order</Typography>
          <div className="py-2 space-y-2">
            <p>{"Hanoi"}</p>
            <p className="text-sm text-blue-500">{"November 18, 2024 04:00 PM"}</p>
            <p className="text-sm text-red-500">{"November 18, 2024 04:00 PM"}</p>
          </div>
        </CardContent>

        { false && <CardActions>
                  <IconButton>
                    <DeleteIcon/>
                  </IconButton>
                  </CardActions>}
      </Card>
    </div>
  );
};
