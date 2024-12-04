import { Card, Chip, IconButton } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourite } from 'component/State/Authentication/Action';
import { isPresentInFavourites } from 'component/config/logic';

const RestaurantFavouriteCard = ({item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store);

  const handleAddToFavourite=()=>{
    dispatch(addToFavourite({restaurantId:item.id,jwt}))
  }

  const handleNavigateToRestaurant= () => {
    if(item.open){
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
    }
  }
  return (
    <Card className="w-[18rem]">
      <div 
        className={`${true?'cursor-pointer':'cursor-not-allowed'} relative`}
      >
        <img 
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item.images[0]} 
          alt="" 
        />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p onClick={handleNavigateToRestaurant} className="text-lg cursor-pointer" style={{color: "#ED1C24", fontWeight: "500"}}>{item.name}</p>
          <p style={{color:"#000000", fontWeight: "300", fontSize: "14px"}}>
            {item.description}
          </p>

        </div>
        <div>
          <IconButton onClick={handleAddToFavourite}>
            {isPresentInFavourites(auth.favourites,item)?<FavoriteIcon sx={{ fontSize: "1.5rem", color: "#ED1C24"}} />:<FavoriteBorderIcon sx={{ fontSize: "1.5rem", color: "#ED1C24"}} />}
          </IconButton>
        </div>

      </div>
    </Card>
  )
}

export default RestaurantFavouriteCard