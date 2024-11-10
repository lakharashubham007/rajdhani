import React from "react";
import { Link } from "react-router-dom";
import apis from "../../../../services/apis/index"

const Restaurants = (product) => {
  return (
    <div className="col-xl-2 col-xxl-3 col-md-4 col-sm-6">
      <div className="card product-grid-card">
        <div className="card-body">
          <div className="new-arrival-product">
            <div className="new-arrivals-img-contnent">
              <Link to={`/restaurant-detail/${product?.product?._id}` }> <img className="img-fluid" style={{
                borderRadius: '5px',
                width: '250px', // fixed width
                height: '150px', // fixed height
                objectFit: 'cover' // ensures the image maintains aspect ratio
              }}
                src={product?.product?.logo ? `${apis.baseurl.Baseimageurl}${product?.product?.logo}` : 'https://www.shutterstock.com/image-vector/restaurant-logo-template-260nw-1254530365.jpg'} alt="logo" /></Link>
            </div>
            <div className="new-arrival-content text mt-3">
              <h5>
                <Link to={`/restaurant-detail/${product?.product?._id}`}>{product?.product?.restaurantName}</Link>
              </h5>
              <p className="">{product?.product?.restaurantAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
