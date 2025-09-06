import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";
import { Toaster } from "../../components/Toaster/Toster";
import { deleteProductApi } from "../../../services/apis/Product";
import { Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";



const ProductDetailModal = ({
  productDetailData,
  showProductDetailModal,
  setShowProductDetailModal,
  categoryMap,
  fetchHoseAssemblyProductList,
  fetchEndFittingsPartsProductList,
  fetchFittingAccessoriesProductList,
  fetchTubeFittingProductList

}) => {
  console.log("productDetailData", productDetailData)
  const [showDeleteMdl, setShowDeleteMdl] = useState(false);
  const [deleteTableDataId, setDeleteTableDataId] = useState("");
  const navigate = useNavigate()

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


  const handleEditThread = async (id) => {
    navigate(`/editproductdata/${id}`)

  };

  const handleDeleteProduct = (id) => {
    setDeleteTableDataId(id);
    setShowDeleteMdl(true)


  }

  // Function to handle download
  const handleDownloadQRCode = (qrCodeUrl, productCode, withDescription) => {
    if (!qrCodeUrl || !productCode) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;

    const suffix = withDescription ? "_with_description" : "";
    link.download = `${productCode}${suffix}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadQRCodeWithDescription = async (qrUrl, descCode, fittingCode) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = 512;
    const height = 600;
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // QR Title
    ctx.fillStyle = "#000000";
    ctx.font = "bold 26px Arial";
    ctx.textAlign = "center";
    ctx.fillText("QR Code", width / 2, 40);

    // Product Description (descCode)
    ctx.fillStyle = "#333";
    ctx.font = "bold 18px Arial";
    const lines = wrapText(ctx, descCode || "Product Description", 440);
    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2, 80 + i * 25);
    });

    const descHeight = lines.length * 25;

    // Capsule-style code (fittingCode)
    const codeY = 85 + descHeight;
    const padding = 20;
    const capsuleWidth = ctx.measureText(fittingCode).width + padding * 2;
    const capsuleHeight = 36;
    const capsuleX = (width - capsuleWidth) / 2;

    ctx.fillStyle = "#6c63ff";
    ctx.beginPath();
    ctx.roundRect(capsuleX, codeY, capsuleWidth, capsuleHeight, 20);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Arial";
    ctx.fillText(fittingCode || "CODE", width / 2, codeY + 24);

    // Load and draw QR code
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.onload = () => {
      ctx.drawImage(qrImg, (width - 200) / 2, codeY + 60, 200, 200);

      // Download
      const link = document.createElement("a");
      link.download = `${fittingCode || "QR"}_with_description.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    qrImg.src = qrUrl;
  };


  // 🧠 Helper: wraps long description into multiple lines
  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line.trim());
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    return lines;
  };



  useEffect(() => {
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
        if (typeof radius === 'number') {
          radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
          const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
          for (const side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }

        this.beginPath();
        this.moveTo(x + radius.tl, y);
        this.lineTo(x + width - radius.tr, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        this.lineTo(x + width, y + height - radius.br);
        this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        this.lineTo(x + radius.bl, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        this.lineTo(x, y + radius.tl);
        this.quadraticCurveTo(x, y, x + radius.tl, y);
        this.closePath();
        return this;
      };
    }

  }, [])


  const handleDeleteSubmit = async () => {
    try {
      const res = await deleteProductApi(deleteTableDataId);
      //   console.log("response",res);
      if (res.status === 200) {
        Toaster.success(res?.data?.message); // Display success message
        // refreshProductList();
        const part = productDetailData?.part || productDetailData?.product_type;

        // Check which category this part belongs to
        if (categoryMap["Fitting Accessories"].includes(part)) {
          fetchFittingAccessoriesProductList(0, categoryMap["Fitting Accessories"]);
        } else if (categoryMap["End Fittings and Parts"].includes(part)) {
          fetchEndFittingsPartsProductList(0, categoryMap["End Fittings and Parts"]);
        } else if (categoryMap["Hose Assembly"].includes(part)) {
          fetchHoseAssemblyProductList(0, categoryMap["Hose Assembly"]);
        } else if (categoryMap["Tube Fittings"].includes(part)) {
          fetchTubeFittingProductList(0, categoryMap["Tube Fittings"]);
        }
        setDeleteTableDataId("");
        setShowDeleteMdl(false);
        setShowProductDetailModal(false);
      } else {
        Toaster.error(
          res?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DeleteWarningMdl title={"table data"} showDeleteMdl={showDeleteMdl} setShowDeleteMdl={setShowDeleteMdl}
        setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit} />
      <Modal
        className="fade card-body"
        show={showProductDetailModal}
        onHide={() => setShowProductDetailModal(false)}
        size="xl"
        centered>
        <Modal.Header>
          <Modal.Title>Product</Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => setShowProductDetailModal(false)}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          {/* Header Section */}
          <div className="header-section mb-3">
            <div className="row d-flex align-items-center">
              {/* Product Details  section */}
              <div className="col-md-8 row border-end">
                {/* heading */}
                <div
                  className="d-flex align-items-center justify-content-between w-100 mb-3"
                  style={{ padding: '0 12px' }}
                >
                  {/* Empty space for left alignment */}
                  <div style={{ width: '50px' }} />

                  {/* Centered heading */}
                  <h5 className="text-center m-0 flex-grow-1">Product Information</h5>

                  {/* Right-aligned buttons */}
                  <div>
                    <button
                      className="btn btn-xs sharp btn-primary me-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditThread(productDetailData?._id);
                      }}
                    >
                      <i className="fa fa-pencil" />
                    </button>

                    <button
                      className="btn btn-xs sharp btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProduct(productDetailData?._id);
                      }}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                </div>
                {/* End Fittings and parts details */}
                {["End Fittings", "Nut", "Nipple", "Cap"].includes(productDetailData?.product_type) && (
                  <>
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Type:</strong> {productDetailData?.product_type}</li>
                        <li className="list-group-item"><strong>Code:</strong> {productDetailData?.product_code}</li>
                        <li className="list-group-item"><strong>Skive Type:</strong> {productDetailData?.skive_type}</li>
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
                        <li className="list-group-item"><strong>Description:</strong> {productDetailData?.desc_Code}</li>
                      </ul>
                    </div>
                  </>
                )}

                {/* End Fittings and parts details */}
                {["Hose Pipe"].includes(productDetailData?.product_type) && (
                  <>
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Type:</strong> {productDetailData?.product_type}</li>
                        <li className="list-group-item"><strong>Code:</strong> {productDetailData?.product_code}</li>
                        {/* <li className="list-group-item"><strong>Skive Type:</strong> {productDetailData?.skive_type}</li> */}
                        <li className="list-group-item"><strong>UOM:</strong> {productDetailData?.uom}</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Brand Lay Line:</strong> {productDetailData?.brand_lay_line ? productDetailData?.brand_lay_line : 'N/A'}</li>
                        <li className="list-group-item"><strong>Hose Dash Size:</strong> {productDetailData?.hose_dash_size ? productDetailData?.hose_dash_size : 'N/A'}</li>
                        <li className="list-group-item"><strong>Hose Type:</strong> {productDetailData?.hose_type ? productDetailData?.hose_type : 'N/A'}</li>
                        {/* <li className="list-group-item"><strong>Thread:</strong> {productDetailData?.fitting_thread ? productDetailData?.fitting_thread : 'N/A'}</li> */}
                      </ul>
                    </div>
                    <div className="col-md-12 mt-2">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Fitting Code:</strong> {productDetailData?.fitting_Code}</li>
                      </ul>
                    </div>
                    <div className="col-md-12 mt-2">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Description:</strong> {productDetailData?.desc_Code}</li>
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
                        <span><strong>Assembly Length:</strong> {productDetailData?.assembly_length ? productDetailData?.assembly_length : 'N/A'}</span>
                        <span><strong>Fitting Length:</strong> {productDetailData?.fitting_length ? productDetailData?.fitting_length : 'N/A'}</span>
                        <span><strong>Cutting Length:</strong> {productDetailData?.cutting_length ? productDetailData?.cutting_length : 'N/A'}</span>
                        <span><strong>OA:</strong> {productDetailData?.oa ? productDetailData?.oa : 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-md-12 mt-2 mb-2">
                      <div className="d-flex justify-content-between align-items-center list-group-item">
                        <span><strong>Guard Type:</strong> {productDetailData?.guard_type ? productDetailData?.guard_type : 'N/A'}</span>
                        <span><strong>Guard:</strong> {productDetailData?.guard ? productDetailData?.guard : 'N/A'}</span>
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
                    <div className="col-md-4">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Type:</strong> {productDetailData?.product_type}</li>
                      </ul>
                    </div>
                    <div className="col-md-4 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Product Code :</strong> {productDetailData?.product_code}</li>
                      </ul>
                    </div>
                    <div className="col-md-4 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Part Code :</strong> {productDetailData?.part_code ? productDetailData?.part_code : ''}</li>
                      </ul>
                    </div>

                    <div className="col-md-12 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Description :</strong> {productDetailData?.part_description}</li>
                      </ul>
                    </div>

                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Category :</strong> {productDetailData?.tube_fitting_thread ? productDetailData?.tube_fitting_thread : "N/A"}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Sub Category :</strong> {productDetailData?.tube_fitting_category ? productDetailData?.tube_fitting_category : 'N/A'}</li>
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


                {/*Hose Assembly */}
                {["Adaptor"].includes(productDetailData?.product_type) && (
                  <>
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Type:</strong> {productDetailData?.adaptor_type}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Product Code:</strong> {productDetailData?.product_code}</li>
                      </ul>
                    </div>
                    <div className="col-md-12 mt-1">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Product:</strong> {productDetailData?.desc_Code}</li>
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
                    {/* {Object.keys(productDetailData.part_a).length > 0 && 
                      <div className="col-md-12 mt-2 mb-2">
                      <div className="list-group-item">
                        <div><strong>Part A</strong></div>
                        <hr className="my-2" />
                        <div><strong>MFC :</strong> {productDetailData?.part_a?.mfc}</div><br/>
                        <div><strong>Size :</strong> {productDetailData?.part_a?.size}</div><br/>
                        <div><strong>Thread :</strong> {productDetailData?.part_a?.fitting_thread}</div><br/>
                        <div><strong>MALE/FEMALE Type :</strong> {productDetailData?.part_a?.male_female_type}</div><br/>
                        <div><strong>Additional :</strong> {productDetailData?.part_a?.additional_option}</div><br/>
                      </div>
                    </div>
                    } */}
                    {Object.keys(productDetailData.part_a || {}).length > 0 && (
                      <div className="col-md-12 mt-2 mb-2">
                        <div className="list-group-item">

                          {/* Badge Label */}
                          <div className="text-start mb-2">
                            <span
                              style={{
                                display: "inline-block",
                                backgroundColor: "#4abbe4ff", // light gray (neutral industrial look)
                                color: "#333",              // dark text for contrast
                                fontWeight: "bold",
                                textTransform: "uppercase", // ALL CAPS
                                padding: "4px 12px",
                                borderRadius: "20px",       // rounded pill-like badge
                                border: "1px solid #ccc",   // subtle border for industry feel
                                fontSize: "13px",
                                letterSpacing: "1px",
                              }}
                            >
                              Part A
                            </span>
                          </div>

                          <hr className="my-2" />

                          {/* First Row: MFC, Size, Thread, Male/Female */}
                          <div className="d-flex flex-wrap justify-content-between">
                            <div><strong>MFC:</strong> {productDetailData?.part_a?.mfc || "N/A"}</div>
                            <div><strong>Size:</strong> {productDetailData?.part_a?.size || "N/A"}</div>
                            <div><strong>Thread:</strong> {productDetailData?.part_a?.fitting_thread || "N/A"}</div>
                            <div><strong>Male/Female Type:</strong> {productDetailData?.part_a?.male_female_type || "N/A"}</div>
                          </div>

                          {/* Additional Option - only show if available */}
                          {productDetailData?.part_a?.additional_option && (
                            <>
                              <hr className="my-2" />
                              <div>
                                <strong>Additional:</strong> {productDetailData.part_a.additional_option}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                    {Object.keys(productDetailData.part_b || {}).length > 0 && (
                      <div className="col-md-12 mt-2 mb-2">
                        <div className="list-group-item">

                          {/* Badge Label */}
                          <div className="text-start mb-2">
                            <span
                              style={{
                                display: "inline-block",
                                backgroundColor: "#52e0a5ff", // light gray (neutral industrial look)
                                color: "#333",              // dark text for contrast
                                fontWeight: "bold",
                                textTransform: "uppercase", // ALL CAPS
                                padding: "4px 12px",
                                borderRadius: "20px",       // rounded pill-like badge
                                border: "1px solid #ccc",   // subtle border for industry feel
                                fontSize: "13px",
                                letterSpacing: "1px",
                              }}
                            >
                              Part B
                            </span>
                          </div>

                          <hr className="my-2" />

                          {/* First Row: MFC, Size, Thread, Male/Female */}
                          <div className="d-flex flex-wrap justify-content-between">
                            <div><strong>MFC:</strong> {productDetailData?.part_b?.mfc || "N/A"}</div>
                            <div><strong>Size:</strong> {productDetailData?.part_b?.size || "N/A"}</div>
                            <div><strong>Thread:</strong> {productDetailData?.part_b?.fitting_thread || "N/A"}</div>
                            <div><strong>Male/Female Type:</strong> {productDetailData?.part_b?.male_female_type || "N/A"}</div>
                          </div>

                          {/* Additional Option - only show if available */}
                          {productDetailData?.part_b?.additional_option && (
                            <>
                              <hr className="my-2" />
                              <div>
                                <strong>Additional:</strong> {productDetailData.part_b.additional_option}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                    {Object.keys(productDetailData.part_c || {}).length > 0 && (
                      <div className="col-md-12 mt-2 mb-2">
                        <div className="list-group-item">

                          {/* Badge Label */}
                          <div className="text-start mb-2">
                            <span
                              style={{
                                display: "inline-block",
                                backgroundColor: "#dbca69ff", // light gray (neutral industrial look)
                                color: "#333",              // dark text for contrast
                                fontWeight: "bold",
                                textTransform: "uppercase", // ALL CAPS
                                padding: "4px 12px",
                                borderRadius: "20px",       // rounded pill-like badge
                                border: "1px solid #ccc",   // subtle border for industry feel
                                fontSize: "13px",
                                letterSpacing: "1px",
                              }}
                            >
                              Part C
                            </span>
                          </div>

                          <hr className="my-2" />

                          {/* First Row: MFC, Size, Thread, Male/Female */}
                          <div className="d-flex flex-wrap justify-content-between">
                            <div><strong>MFC:</strong> {productDetailData?.part_c?.mfc || "N/A"}</div>
                            <div><strong>Size:</strong> {productDetailData?.part_c?.size || "N/A"}</div>
                            <div><strong>Thread:</strong> {productDetailData?.part_c?.fitting_thread || "N/A"}</div>
                            <div><strong>Male/Female Type:</strong> {productDetailData?.part_c?.male_female_type || "N/A"}</div>
                          </div>

                          {/* Additional Option - only show if available */}
                          {productDetailData?.part_c?.additional_option && (
                            <>
                              <hr className="my-2" />
                              <div>
                                <strong>Additional:</strong> {productDetailData.part_c.additional_option}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}






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
                  <Button variant="primary" onClick={() => handleShareQRCode(productDetailData?.qr_code)}>
                    Share QR
                  </Button>
                  <DropdownButton
                    as={ButtonGroup}
                    variant="success"
                    title="Download QR"
                  >
                    {/* <Dropdown.Item
                      onClick={() =>
                        handleDownloadQRCode(
                          productDetailData?.qr_code,
                          productDetailData?.product_code,
                          true // with description
                        )
                      }
                    >
                      With Description
                    </Dropdown.Item> */}
                    <Dropdown.Item
                      onClick={() =>
                        downloadQRCodeWithDescription(
                          productDetailData?.qr_code,
                          productDetailData?.desc_Code,
                          productDetailData?.fitting_Code,
                        )
                      }
                    >
                      With Description
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleDownloadQRCode(
                          productDetailData?.qr_code,
                          productDetailData?.product_code,
                          productDetailData?.product_name,
                          false // without description
                        )
                      }
                    >
                      Without Description
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductDetailModal;
