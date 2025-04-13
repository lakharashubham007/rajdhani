// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the productId from the URL
import rajdhanilogo from "../../../assets/images/cropped-Rparts-logo.png";
import axios from "axios";
import { Button } from "react-bootstrap";

const ProductDetails = () => {
    const BASE_URL = 'https://api.i2rtest.in/v1';
    const productCode = useParams(); // Get productId from the URL
    console.log("productCode", productCode.id)
    const [productDetailData, setProductDetails] = useState(null);
    console.log("productDetails", productDetailData)

    const handleShareQRCode = (qrCode) => {
        if (navigator.share) {
            navigator.share({
                title: "QR Code",
                text: "Scan this QR Code",
                files: [dataURLtoFile(qrCode, "qrcode.png")], // Convert base64 to File
            })
                .catch((error) => console.log("Error sharing:", error));
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };



    // Function to download QR Code
    const handleDownloadQRCode = (qrCode) => {
        const link = document.createElement("a");
        link.href = qrCode;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Convert Base64 to File (needed for Web Share API)
    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(",");
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    //single prodcut details when user scan qr code
    const GetProductDetailsQrScannerApi = async (id) => {
        // const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
        try {
            const response = await axios.get(`${BASE_URL}/auth/get-product-details/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`,
                },
            });            
            return response;
        } catch (error) {
            console.error("Error creating facility:", error);
            throw error;
        }
    };


    const fetchProductDetailsQRScanner = async () => {

        try {
            const res = await GetProductDetailsQrScannerApi(productCode?.id);
            const resData = res?.data?.product;
            console.log("resData", resData)
            setProductDetails(resData);
        } catch (error) {

        } finally {

        }
    };

    useEffect(() => {
        fetchProductDetailsQRScanner();
    }, [productCode]);


    return (
        <div className="card">
            <div className="card-body">
                <div className="purchase-order-container ">

                    {/* Header Section */}
                    <div className="">
                        <div className="header-section mb-3">
                            <div className="row">
                                <div className="col-sm-6 col-xl-4">
                                    <img src={rajdhanilogo} alt="logo" height={60} />
                                </div>
                                <div className="col-sm-6 col-xl-4">
                                    <h2 className="header-title" style={{ display: 'inline', whiteSpace: 'nowrap' }}>
                                        Rajdhani - Product Details
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Product details Section */}
                    <div className='row'>

                        <div className="col-md-8 row border-end">

                            <div className="card-header px-0 mb-2">
                                <h4 className="card-title">Product Details</h4>
                            </div>

                            {["End Fittings", "Nut", "Nipple", "Cap", "Hose Pipe"].includes(productDetailData?.product_type) && (
                                <>
                                    <div className="col-md-6">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Type:</strong> {productDetailData?.product_type}</li>
                                            <li className="list-group-item"><strong>Code:</strong> {productDetailData?.product_code}</li>
                                            <li className="list-group-item"><strong>UOM:</strong> {productDetailData?.uom}</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Design:</strong> {productDetailData?.design ? productDetailData?.design : 'N/A'}</li>
                                            <li className="list-group-item"><strong>Wire Type:</strong> {productDetailData?.wire_type ? productDetailData?.wire_type : 'N/A'}</li>
                                            <li className="list-group-item"><strong>Fitting Type:</strong> {productDetailData?.fitting_type ? productDetailData?.fitting_type : 'N/A'}</li>
                                            <li className="list-group-item"><strong>Thread:</strong> {productDetailData?.fitting_thread ? productDetailData?.fitting_thread : 'N/A'}</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Fitting Code:</strong> {productDetailData?.fitting_Code}</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Desc Code:</strong> {productDetailData?.desc_Code}</li>
                                        </ul>
                                    </div>
                                </>
                            )}

                            {/*Hose Assembly */}
                            {["Hose Assembly"].includes(productDetailData?.product_type) && (
                                <>
                                    <div className="col-md-6">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Type:</strong> {productDetailData?.product_type}</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 mb-1">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Part No:</strong> {productDetailData?.part_no}</li>
                                        </ul>
                                    </div>
                                    {/* <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Assembly Length:</strong> {productDetailData?.cutting_length}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Weight :</strong> {productDetailData?.weight}</li>
                      </ul>
                    </div>

                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Fitting Length:</strong> {productDetailData?.assembly_length}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>UOM :</strong> {productDetailData?.uom}</li>
                      </ul>
                    </div> 

                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Cutting Length:</strong> {productDetailData?.cutting_length}</li>
                      </ul>
                    </div> */}

                                    <div className="col-md-12 mt-2 mb-2">
                                        <div className="list-group-item">
                                            <div><strong>Hose :</strong> {productDetailData?.hose}</div>
                                            <hr className="my-2" />
                                            <div><strong>Hose Fitting Code :</strong> {productDetailData?.hose_fitting_Code}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 mb-2">
                                        <div className="list-group-item">
                                            <div><strong>Fitting A:</strong> {productDetailData?.fitting_a_description}</div>
                                            <hr className="my-2" />
                                            <div><strong>Fitting Code:</strong> {productDetailData?.fitting_a_fitting_Code}</div>
                                        </div>

                                    </div>
                                    <div className="col-md-12 mt-2 mb-2">
                                        <div className="list-group-item">
                                            <div><strong>Fitting B:</strong> {productDetailData?.fitting_b_description}</div>
                                            <hr className="my-2" />
                                            <div><strong>Fitting Code:</strong> {productDetailData?.fitting_b_fitting_Code}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 mb-2">
                                        <div className="d-flex justify-content-between align-items-center list-group-item">
                                            <span><strong>Guard Type:</strong> {productDetailData?.guard_type}</span>
                                            <span><strong>Guard:</strong> {productDetailData?.guard}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/*Fitting Accessory*/}
                            {["Sleeve", "Packing", "Vinyl Cover", "Dust Cap", "O-ring", "Spring"].includes(productDetailData?.product_type) && (
                                <>
                                    <div className="col-md-6">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Type:</strong> {productDetailData?.product_type}</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 mb-1">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Product Code :</strong> {productDetailData?.product_code}</li>
                                        </ul>
                                    </div>

                                    <div className="col-md-12 mb-1">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Description :</strong> {productDetailData?.desc_Code}</li>
                                        </ul>
                                    </div>

                                    <div className="col-md-6">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Size:</strong> {productDetailData?.size ? productDetailData?.size : "N/A"}</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 mb-1">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>UOM :</strong> {productDetailData?.uom}</li>
                                        </ul>
                                    </div>

                                    {/* <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Assembly Length:</strong> {productDetailData?.cutting_length}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Weight :</strong> {productDetailData?.weight}</li>
                      </ul>
                    </div>

                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Fitting Length:</strong> {productDetailData?.assembly_length}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>UOM :</strong> {productDetailData?.uom}</li>
                      </ul>
                    </div> 

                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Cutting Length:</strong> {productDetailData?.cutting_length}</li>
                      </ul>
                    </div> */}

                                </>
                            )}

                            {/*Fitting Accessory*/}
                            {["Tube Fittings"].includes(productDetailData?.product_type) && (
                                <>
                                    <div className="col-md-6">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Type:</strong> {productDetailData?.product_type}</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 mb-1">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Product Code :</strong> {productDetailData?.product_code}</li>
                                        </ul>
                                    </div>

                                    <div className="col-md-12 mb-1">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Description :</strong> {productDetailData?.part_description}</li>
                                        </ul>
                                    </div>

                                    <div className="col-md-6">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Category :</strong> {productDetailData?.tube_fitting_category ? productDetailData?.tube_fitting_category : "N/A"}</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 mb-1">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong>Sub Category :</strong> {productDetailData?.tube_fitting_subcategory}</li>
                                        </ul>
                                    </div>

                                    {/* <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Assembly Length:</strong> {productDetailData?.cutting_length}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Weight :</strong> {productDetailData?.weight}</li>
                      </ul>
                    </div>

                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Fitting Length:</strong> {productDetailData?.assembly_length}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>UOM :</strong> {productDetailData?.uom}</li>
                      </ul>
                    </div> 

                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Cutting Length:</strong> {productDetailData?.cutting_length}</li>
                      </ul>
                    </div> */}

                                </>
                            )}
                        </div>

                        {/* QR Code Section */}
                        <div className="col-md-4 text-center">
                            <h5>QR Code</h5>
                            <img
                                src={productDetailData?.qr_code}
                                alt="QR Code"
                                className="img-fluid"
                                style={{ maxWidth: "200px", marginTop: "10px" }}
                            />
                            <div className="mt-3 d-flex justify-content-center gap-2">
                                {/* <Button variant="primary" onClick={() => handleShareQRCode(productDetailData?.qr_code)}>
                                    Share QR
                                </Button> */}

                            </div>
                        </div>


                    </div>


                </div>
            </div>
        </div>
    );
};




export default ProductDetails;
