import React, { useEffect } from 'react';
import "./Home.css";
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { Auth } from 'component/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from 'component/State/Restaurant/Action';
import { useNavigate } from 'react-router-dom';
import { findCart } from 'component/State/Cart/Action';
import banner_logo from '../../assets/Logo-Foody-w.webp';

const restaurants = [1,1,1,1,1,1,1,1]
const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const {restaurant} = useSelector(store=>store);
  const navigate = useNavigate();

  console.log("restaurant",restaurant);

  useEffect(() => {
    dispatch(getAllRestaurantsAction(jwt))
    
  },[])



  return (
    <div className="pb-10">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">

        <div className="w-[50vw] z-10 flex flex-col justify-center items-center">
          {/* <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>Foody</p> */}
          <img src={banner_logo} alt="" style={{width: "300px"}}/>
          <p className="z-10 text-gray-300 text-xl lg:text-4xl" style={{fontFamily: "serif"}}>Món gì cũng có, Foody ngay!</p>

        </div>
        <div className='cover absolute top-0 left-0 right-0'>


        </div>
        <div className='fadeout'>

        </div>

      </section>
      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl py-3 pb-10" style={{color: "#ED1C24", fontWeight: "500", fontSize: "28px"}}>For Today</p>
        <MultiItemCarousel/>
      </section>
      <section className="px-5 lg:px-20 pt-10" style={{color: "#ED1C24", fontWeight: "500", fontSize: "28px"}}>
        <h1 className="pb-8">Top Restaurants</h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {
            restaurant.restaurants.map((item) => <RestaurantCard item={item}/>)
          }
        </div>
      </section>
    </div>
  )
}

export default Home