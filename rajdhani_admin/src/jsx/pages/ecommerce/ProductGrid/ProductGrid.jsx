import React, { Fragment } from "react";
import Products from "./Products";

/// Data
import productData from "../productData";
import PageTitle from "../../../layouts/PageTitle";

const ProductGrid = () => {
   return (
      <Fragment>
         <PageTitle activeMenu="Product Grid" motherMenu="Shop" />
         <div className="row">
            {productData.map((product) => (
               <Products key={product.key} product={product} />
            ))}
         </div>
      </Fragment>
   );
};

export default ProductGrid;
