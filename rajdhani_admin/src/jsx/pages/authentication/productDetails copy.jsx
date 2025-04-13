// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the productId from the URL
import { GetProductDetailsQrScannerApi } from '../../../services/apis/Product';
import rajdhanilogo from "../../../assets/images/cropped-Rparts-logo.png";


const ProductDetails = () => {
  const  productCode = useParams(); // Get productId from the URL
  console.log("productCode",productCode.id)
  const [productDetails, setProductDetails] = useState(null);
  console.log("productDetails",productDetails)


  const fetchProductDetailsQRScanner = async () => {
   
    try {
      const res = await GetProductDetailsQrScannerApi(productCode?.id);
      const resData = res?.data?.product;
      console.log("resData",resData)
    setProductDetails(resData);
    } catch (error) {
     
    } finally {
    
    }
  };

  useEffect(() => {
    fetchProductDetailsQRScanner();
  }, [productCode]);


  return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl">
            {/* Logo */}
            <div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
              <img
                src={rajdhanilogo}
                alt="Company Logo"
                style={{width: '130px',height: '40px'}}
              />
            </div>
    
            {/* Heading */}
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              Product Details
            </h2>
    
            {/* Key Info */}
            <div className="text-center text-gray-700 space-y-1 mb-6">
              <p className="text-sm font-semibold uppercase text-gray-500">{productDetails?.product_type}</p>
              <p className="text-lg font-medium">{productDetails?.desc_Code}</p>
              <p className="text-base">{productDetails?.fitting_Code}</p>
            </div>
    
            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
              <Detail label="Wire Type" value={productDetails?.wire_type} />
              <Detail label="Ferrule" value={productDetails?.ferrule} />
              <Detail label="Fitting Piece" value={productDetails?.fitting_piece} />
              <Detail label="Skive Type" value={productDetails?.skive_type} />
              <Detail label="Hose Dash Size" value={productDetails?.hose_dash_size} />
              <Detail label="Fitting Dash Size" value={productDetails?.fitting_dash_size} />
              <Detail label="Fitting Thread" value={productDetails?.fitting_thread} />
              <Detail label="Fitting Type" value={productDetails?.fitting_type} />
              <Detail label="Bend Angle" value={productDetails?.straight_bend_angle} />
              <Detail label="Drop Length" value={productDetails?.drop_length} />
              <Detail label="Neck Length" value={productDetails?.neck_length} />
              <Detail label="Design" value={productDetails?.design} />
            </div>
    
            {/* Price & GST */}
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-6 text-gray-800">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg font-semibold">₹{productDetails?.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">GST</p>
                <p className="text-lg font-semibold">{productDetails?.gst}%</p>
              </div>
            </div>
    
            {/* Product Image */}
            {/* {productDetails.image && (
              <div className="mb-4 flex justify-center">
                <img
                  src={require(`../../../assets/images/${productDetails.image}`)}
                  alt="Product"
                  className="max-w-xs w-full rounded-lg shadow"
                />
              </div>
            )} */}
    
            {/* QR Code */}
            {productDetails?.qr_code && (
              <div className="flex flex-col items-center mt-4">
                <div className="border-4 border-dashed border-gray-400 p-4 rounded-lg">
                  <img
                    src={productDetails?.qr_code}
                    alt="QR Code"
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Scan with your camera or any QR scanner to get product details.
                </p>
              </div>
            )}
          </div>
        </div>
  );
};

const Detail = ({ label, value }) => (
    <div className="flex justify-between border-b pb-1">
      <span className="font-medium">{label}</span>
      <span>{value}</span>
    </div>
  );




export default ProductDetails;
