import RestaurantCard from 'component/Restaurant/RestaurantCard';
import React from 'react';
import { useSelector } from 'react-redux';
import FavouriteCard from 'component/Favourite/FavouriteCard';

export const Favorites = () => {
  const {auth} = useSelector(store=>store)
  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>

      <div className="flex flex-wrap gap-3 justify-center">

        {auth.favourites.map((item)=><FavouriteCard item={item}/>)}

      </div>
    </div>
  )
}
