import React, { Fragment, useEffect, useState } from "react";
import Restaurants from "./Restaurants";
import PageTitle from "../../../layouts/PageTitle";
import { getRestaurantsApi } from "../../../../services/apis/RestaurantsApi";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const RestaurantGrid = () => {
   const[restaurantList,setRestaurantList] = useState();
   const [loading, setLoading] = useState(false);

   const fetchRestaurants = async () => {
      try {
         setLoading(true);  // Start loader
         const res = await getRestaurantsApi();
         setRestaurantList(res?.data?.restaurants);  // Set the restaurant list if the API call is successful
     } catch (error) {
         Swal.fire({     
                icon: 'error',                   
                title: "Restaurants Not Found!!",
                text: error || "An error occurred while fetching the restaurants.",
                showConfirmButton: true,
              })
        } finally {
         setLoading(false);  // Always stop loader regardless of success or failure
     }
  }

  useEffect(()=> {
    fetchRestaurants()
  },[])


   return (
      <Fragment>
          <Loader visible={loading} />
         <PageTitle activeMenu="Restaurants" motherMenu="Restaurant" />
         <div className="row">
            {restaurantList?.map((product) => (
               <Restaurants key={product.key} product={product} />
            ))}
         </div>
      </Fragment>
   );
};

export default RestaurantGrid;
