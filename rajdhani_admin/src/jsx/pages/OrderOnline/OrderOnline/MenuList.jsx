import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import apis from "../../../../services/apis/index"
import Loader from '../../../components/Loader/Loader';

const MenuList = () => {
    const location = useLocation();
    // const [loading, setLoading] = useState(true);

    const { filteredData } = location.state || {};

    // useEffect(() => {
    //     if (filteredData) {
    //         // Simulate a delay to demonstrate the loader, remove this in production
    //         setTimeout(() => {
    //             setLoading(false);  // Set loading to false after data is available
    //         }, 200); // Adjust this time as per your needs
    //     } else {
    //         setLoading(false); // No data case
    //     }
    // }, [filteredData]);

    // Group items by subcategory
    const groupBySubCategory = (data) => {
        return data.reduce((acc, item) => {
            const subCategoryName = item.subCategory?.name || 'Others'; // Handle cases with missing subcategory
            if (!acc[subCategoryName]) {
                acc[subCategoryName] = [];
            }
            acc[subCategoryName].push(item);
            return acc;
           
        }, {});
    };

    const groupedData = filteredData ? groupBySubCategory(filteredData) : {};

    return (
        <> 
        {/* <Loader visible={loading} /> */}
        
        <div>
            {Object.keys(groupedData).map((subCategory, index) => (
                <div key={index} className="subcategory-section">
                    <h3>{subCategory}</h3>
                    <div className="food-items row">
                        {groupedData[subCategory].map((item) => (
                            <div key={item._id} className="col-xl-2 col-xxl-3 col-md-4 col-sm-6">
                                <div className="card product-grid-card">
                                    <div className="card-body">
                                        <div className="new-arrival-product">
                                            <div className="new-arrivals-img-content">
                                                <img
                                                    className="img-fluid"
                                                    style={{
                                                        borderRadius: '5px',
                                                        width: '250px', // fixed width
                                                        height: '150px', // fixed height
                                                        objectFit: 'cover', // ensures the image maintains aspect ratio
                                                    }}
                                                    src={item.image ? `${apis.baseurl.Baseimageurl}${item.image}` : 'https://www.shutterstock.com/image-vector/restaurant-logo-template-260nw-1254530365.jpg'}
                                                    alt="Food item"
                                                />
                                            </div>
                                            <div className="new-arrival-content text mt-3">
                                                <h5>
                                                    {item.name}
                                                </h5>
                                                <div className="small-text">
                                                    {item.shortDescription.split(' ').slice(0, 10).join(' ')}...
                                                </div>                        
                                                <p className='price'>Price: ₹{item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default MenuList;



// import React from 'react'
// import { Link } from "react-router-dom";
// import { useLocation } from 'react-router-dom';

// const MenuList = () => {
//     const location = useLocation();
//   const { filteredData } = location.state || {};


//   console.log("filtered data is here",filteredData);

//   return (
//     <div className="col-xl-2 col-xxl-3 col-md-4 col-sm-6">
//       <div className="card product-grid-card">
//         <div className="card-body">
//           <div className="new-arrival-product">
//             <div className="new-arrivals-img-contnent">
//               <Link to={`/menus` }> <img className="img-fluid" style={{
//                 borderRadius: '5px',
//                 width: '250px', // fixed width
//                 height: '150px', // fixed height
//                 objectFit: 'cover' // ensures the image maintains aspect ratio
//               }}
//               src={'https://www.shutterstock.com/image-vector/restaurant-logo-template-260nw-1254530365.jpg'}
//                 // src={product?.product?.logo ? `${apis.baseurl.Baseimageurl}${product?.product?.logo}` : 'https://www.shutterstock.com/image-vector/restaurant-logo-template-260nw-1254530365.jpg'}
//                  alt="logo" />
//                 </Link>
//             </div>
//             <div className="new-arrival-content text mt-3">
//               <h5>
//                 <Link to={`/menus`}>New Restaurant</Link>
//               </h5>
//               <p className="">udaipur Rajasthan</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MenuList