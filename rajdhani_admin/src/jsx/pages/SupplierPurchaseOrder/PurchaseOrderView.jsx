import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";
import moment from "moment";
import {
  GetPurchaseOrderCheckBill,
  GetPurchaseOrderItemsData,
  GetPurchaseOrderViewData,
} from "../../../services/apis/PurchaseOrder";
import rajdhanilogo from "../../../assets/images/cropped-Rparts-logo.png";
import "../../../assets/css/AddSupplierPurchaseOrder.css";
import BillCard from "../../components/PurchaseOrder/BillCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

const billtheadData = [
  { heading: "PO Id", sortingVale: "purchase_order_id" },
  { heading: "Bill Id", sortingVale: "bill_id" },
  { heading: "Bill Name", sortingVale: "bill_doc" },
  { heading: "Bill Amount", sortingVale: "bill_amount" },
  { heading: "Bill Date", sortingVale: "bill_date" },
  { heading: "Created At", sortingVale: "created_at" },
];


const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  // { heading: "Order Id", sortingVale: "_id" },
  { heading: "Product Name", sortingVale: "name" },
  { heading: "Variant", sortingVale: "variant" },
  { heading: "Unit", sortingVale: "unit" },
  { heading: "QTY", sortingVale: "quantity" },
  { heading: "Price", sortingVale: "price" },
  { heading: "CGST", sortingVale: "cgst" },
  { heading: "SGST", sortingVale: "sgst" },
  { heading: "IGST", sortingVale: "igst" },
  { heading: "Cess", sortingVale: "Cess" },
  { heading: "Per Item Tax Price", sortingVale: "Cess" },
  { heading: "Amount", sortingVale: "amount" },

  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Status", sortingVale: "status" },
  { heading: "Action", sortingVale: "action" },
];



const PurchaseOrderView = () => {
  const params = useParams()?.id;
  const navigate = useNavigate();
  const [sort, setSortata] = useState(10);
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [purchaseOrderProdcutList, setPurchaseOrderProdcutList] = useState([]);
  const [billData, setBillData] = useState([]);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const [currentPage, setCurrentPage] = useState(1);
  const [singleBillData, setSingleBillData] = useState({});
  // console.log("purchaseOrderData",purchaseOrderData)

  // const exportToPDF = () => {
  //   const input = document.querySelector(".purchase-order-container"); // Target the main container
  //   html2canvas(input, { scale: 2 }).then((canvas) => {
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const imgData = canvas.toDataURL("image/png");
  //     const imgWidth = 210; // A4 width in mm
  //     const pageHeight = 297; // A4 height in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //     pdf.save("PurchaseOrder.pdf");
  //   });
  // };
  const exportToPDF = () => {
    const input = document.querySelector(".purchase-order-container"); // Target the container
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const margin = 10; // Margin for content
    const pageHeight = pdfHeight - 2 * margin;
  
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdfWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let heightLeft = imgHeight;
      let position = margin;
  
      // Add first page
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // Move position
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save("PurchaseOrder.pdf");
    });
  };
  

  const exportToExcel = () => {
    const table = document.querySelector("table"); // Target your table
    const workbook = XLSX.utils.table_to_book(table, { sheet: "PurchaseOrder" });
    XLSX.writeFile(workbook, "PurchaseOrder.xlsx");
  };


  function SotingData(name, ind) {
    if (iconData.complete) {
      const sortValue = { value: name, type: "asc" };
      // fetchPurchaseOrderData(sortValue);
    } else {
      const sortValue = { value: name, type: "dsc" };
      // fetchPurchaseOrderData(sortValue);
    }
  }

  const fetchPurchaseOrderViewData = async () => {
    try {
      const res = await GetPurchaseOrderViewData(params);
      const data = res?.data?.purchaseOrder;
      setPurchaseOrderData(data);
    } catch (err) {
      console.log("errror", err);
    }
  };

  const fetchPurchaseOrderItemsData = async () => {
    try {
      const res = await GetPurchaseOrderItemsData(params);
      const data = res?.data?.item;
      setPurchaseOrderProdcutList(data);
      // console.log("daaata",data)
      //console.log("resss",data)
      // setPurchaseOrderData(data);
      // setPurchaseOrderProdcutList(data?.products);
    } catch (err) {
      console.log("errror", err);
    }
  };

  const fetchPurchaseOrderCheckBill = async () => {
    try {
      const res = await GetPurchaseOrderCheckBill(params);
      const data = res?.data;
      if (data?.success) {
        setBillData(data?.bills)
      }
      //console.log("resss",data)
      // setPurchaseOrderData(data);
      // setPurchaseOrderProdcutList(data?.products);
    } catch (err) {
      console.log("errror", err);
    }
  };

  useEffect(() => {
    fetchPurchaseOrderViewData();
    fetchPurchaseOrderItemsData();
    fetchPurchaseOrderCheckBill();
  }, []);

  const orderDetails = {
    warehouse: {
      name: "Warehouse",
      address: "309/7, Delhi",
      phone: "9876543210",
      email: "warehouse@example.com",
      gst: "09ABCDE1234FZ5",
    },
    store: {
      name: "Malviya Nagar",
      address: "South Extn, Malviya Nagar, Delhi, 110017",
      phone: "9322465589",
      email: "store@example.com",
      gst: "09A2B569F3093ZN",
    },
    order: {
      number: "SO-01114569",
      date: "19-11-2024",
      dueDate: "20-11-2024",
    },
    products: [
      {
        name: "Onion/Pyaj/Kanda",
        variant: "kg",
        unitPrice: 21,
        quantity: 25,
        price: 525,
        cgst: 2.5,
        sgst: 2.5,
        igst: 0,
        cess: 0,
        totalTax: 22.05,
        amount: 645.05,
      },
      {
        name: "Mango Sindhri",
        variant: "kg",
        unitPrice: 150,
        quantity: 50,
        price: 7500,
        cgst: 6,
        sgst: 6,
        igst: 0,
        cess: 0,
        totalTax: 168,
        amount: 8680,
      },
      {
        name: "Maggi Masala Instant Noodles",
        variant: "140 gm",
        unitPrice: 30,
        quantity: 30,
        price: 900,
        cgst: 9,
        sgst: 9,
        igst: 0,
        cess: 0,
        totalTax: 59.4,
        amount: 1059.4,
      },
    ],
    summary: {
      totalQuantity: 110,
      subTotal: 8925,
      gstTotal: 1249.45,
      discount: 0,
      shipping: 80,
      grandTotal: 10254.45,
    },
    notes: {
      type: "Urgent",
      verify: "Verify Order Note",
    },
    footer: {
      preparedBy: "Malviya Nagar",
      terms: [
        "Delivery quantity should be as per SO only.",
        "Goods delivered beyond the expiry date will not be accepted.",
        "SO copy should be sent along with the delivery challan.",
        "Invoice copy should be sent along with SO/PO and delivery challan.",
      ],
    },
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleGetBillData = (id) => {
    const getBillData = billData?.find((val) => val?._id == id)
    // singleBillData,
    setSingleBillData(getBillData);
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="purchase-order-container ">

            {/* Header Section */}
            <div className="">
              <div className="header-section mb-3">
                <div className="row">
                  <div className="col-sm-4">
                    <img src={rajdhanilogo} alt="logo" height={60} />
                  </div>
                  <div className="col-sm-4">
                    <h2 className="header-title">Rajdhani - Purchase Order</h2>
                  </div>
                  <div className="col-sm-4 d-flex justify-content-end mb-3">
                    <button onClick={exportToPDF} className="btn btn-primary me-2">
                      Export to PDF
                    </button>
                    <button onClick={exportToExcel} className="btn btn-success">
                      Export to Excel
                    </button>
                  </div>
                </div>
                <div className="addresses mt-3">
                  <div className="row">
                    <div className="col-md-4  address-block">
                      <h5>Invoice To</h5>
                      <p className="po-view-p">
                        {purchaseOrderData?.billing_details?.name}
                      </p>
                      <p className="po-view-p">
                        {purchaseOrderData?.billing_details?.address}
                      </p>
                      <p className="po-view-p">
                        State: {purchaseOrderData?.billing_details?.state_name}{" "}
                        {purchaseOrderData?.billing_details?.state_code}
                      </p>
                      <p className="po-view-p">
                        Email: {purchaseOrderData?.billing_details?.email}
                      </p>
                    </div>

                    <div className="col-md-4 d-flex justify-content-center address-block">
                      <div className="divider">
                        {/* Divider */}
                        <h5>Consignee (Ship to)</h5>
                        <p className="po-view-p">
                          {purchaseOrderData?.shipping_details?.name}
                        </p>
                        <p className="po-view-p">
                          {purchaseOrderData?.shipping_details?.address}
                        </p>
                        <p className="po-view-p">
                          State: {purchaseOrderData?.shipping_details?.state_name}{" "}
                          {purchaseOrderData?.shipping_details?.state_code}
                        </p>
                        <p className="po-view-p">
                          Email: {purchaseOrderData?.shipping_details?.email}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-4 d-flex justify-content-center  divider">
                      {/* Divider */}
                      <div className="order-info">
                        <h5>Supplier (Bill from)</h5>
                        <p className="po-view-p">
                          {purchaseOrderData?.supplier_id?.name}
                        </p>
                        <p className="po-view-p">
                          {purchaseOrderData?.supplier_id?.city}
                        </p>
                        <p className="po-view-p">
                          State: {purchaseOrderData?.supplier_id?.state}
                        </p>
                        <p className="po-view-p">
                          Email: {purchaseOrderData?.supplier_id?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Details show */}
            <div className="">
              <div className="card-header px-0" >
                <h4 className="card-title" style={{ marginBottom: "-15px"}}>Bills</h4>
              </div>

              <div className="card-body px-0">
                {
                  billData?.length > 0 ?
                    <div className="row">
                      {
                        billData?.map((val, ind) => {
                          return (<>
                            <div className="col-md-3"
                             style={{ marginTop: "-25px"}}
                            key={ind}>
                              <BillCard ind={ind} val={val} handleGetBillData={handleGetBillData} />
                            </div>
                          </>)
                        })
                      }
                    </div>
                    :
                    <p>No bills found for this Purchase Order ID</p>
                }
              </div>
            </div>

            {/* Bill Detail */}
            {Object.keys(singleBillData).length == 0 ? "" :
              <Row>
                <Col lg={12}>
                  <div className="">
                    <div className="card-header px-0">
                      <h4 className="card-title">Bill Details</h4>
                      <button className="table-close-btn" onClick={() => setSingleBillData({})}><i class="fa-solid fa-xmark fa-xl"></i></button>
                    </div>
                    <div className="card-body px-0">
                      <div className="table-responsive">
                        <div
                          id="holidayList"
                          className="dataTables_wrapper no-footer">
                          <div className="justify-content-between d-sm-flex">
                            <div className="dataTables_length">
                              <label className="d-flex align-items-center">
                                Show
                                <Dropdown className="search-drop">
                                  <Dropdown.Toggle
                                    as="div"
                                    className="search-drop-btn">
                                    {sort}
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() => setSortata("2")}>
                                      2
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setSortata("5")}>
                                      5
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setSortata("10")}>
                                      10
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setSortata("15")}>
                                      15
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setSortata("20")}>
                                      20
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                                entries
                              </label>
                            </div>
                            <div className="dataTables_filter">
                              <label>
                                Search :
                                <input
                                  type="search"
                                  className=""
                                  placeholder=""
                                  onChange={(e) =>
                                    setSearchInputValue(e.target.value)
                                  }
                                />
                              </label>
                            </div>
                          </div>

                          <table id="example4" className="display dataTable no-footer w-100">
                            <thead>
                              <tr>
                                {billtheadData?.map((item, ind) => {
                                  return (
                                    <th
                                      key={ind}
                                      onClick={() => {
                                        SotingData(item?.sortingVale, ind);
                                        setIconDate((prevState) => ({
                                          complete: !prevState.complete,
                                          ind: ind,
                                        }));
                                      }}>
                                      {item.heading}
                                      <span>
                                        {ind !== iconData.ind && (
                                          <i
                                            className="fa fa-sort ms-2 fs-12"
                                            style={{ opacity: "0.3" }}
                                          />
                                        )}
                                        {ind === iconData.ind &&
                                          (iconData.complete ? (
                                            <i
                                              className="fa fa-arrow-down ms-2 fs-12"
                                              style={{ opacity: "0.7" }}
                                            />
                                          ) : (
                                            <i
                                              className="fa fa-arrow-up ms-2 fs-12"
                                              style={{ opacity: "0.7" }}
                                            />
                                          ))}
                                      </span>
                                    </th>
                                  );
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              <tr >

                                <td>{singleBillData?.purchase_order_id}</td>
                                <td className="">
                                  {singleBillData?.bill_id}
                                </td>
                                <td className="">{singleBillData?.bill_doc}</td>
                                <td className="">{singleBillData?.bill_amount}</td>
                                <td className="">
                                  {moment(singleBillData?.bill_date).format(
                                    "DD MMM YYYY")}
                                </td>
                                <td>
                                  {moment(singleBillData?.created_at).format(
                                    "DD MMM YYYY, h:mm:ss a")}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div>
                            {/* {brandList?.data?.length < brandList?.total && ( */}
                            <div className="d-sm-flex text-center justify-content-end align-items-center mt-3">
                              <div className="pagination-container">
                                <ReactPaginate
                                  pageCount={Math.ceil(
                                    purchaseOrderData?.totalRecords /
                                    purchaseOrderData?.rowsPerPage
                                  )}
                                  pageRangeDisplayed={1}
                                  marginPagesDisplayed={2}
                                  onPageChange={handlePageClick}
                                  containerClassName="pagination"
                                  activeClassName="selected"
                                  disabledClassName="disabled"
                                />
                              </div>
                            </div>
                            {/* )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            }
            {/* Product Table */}
            <Row>
              <Col lg={12}>
                <div className="">
                  <div className="card-header px-0">
                    <h4 className="card-title">PO Product Details</h4>
                  </div>
                  <div className="card-body px-0">
                    <div className="table-responsive">
                      <div
                        id="holidayList"
                        className="dataTables_wrapper no-footer">
                        <div className="justify-content-between d-sm-flex">
                          <div className="dataTables_length">
                            <label className="d-flex align-items-center">
                              Show
                              <Dropdown className="search-drop">
                                <Dropdown.Toggle
                                  as="div"
                                  className="search-drop-btn">
                                  {sort}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() => setSortata("2")}>
                                    2
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => setSortata("5")}>
                                    5
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => setSortata("10")}>
                                    10
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => setSortata("15")}>
                                    15
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => setSortata("20")}>
                                    20
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              entries
                            </label>
                          </div>
                          <div className="dataTables_filter">
                            <label>
                              Search :
                              <input
                                type="search"
                                className=""
                                placeholder=""
                                onChange={(e) =>
                                  setSearchInputValue(e.target.value)
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <table id="example4" className="display dataTable no-footer w-100">
                          <thead>
                            <tr>
                              {theadData?.map((item, ind) => {
                                return (
                                  <th
                                    key={ind}
                                    onClick={() => {
                                      SotingData(item?.sortingVale, ind);
                                      setIconDate((prevState) => ({
                                        complete: !prevState.complete,
                                        ind: ind,
                                      }));
                                    }}
                                  >
                                    {item.heading}
                                    <span>
                                      {ind !== iconData.ind && (
                                        <i
                                          className="fa fa-sort ms-2 fs-12"
                                          style={{ opacity: "0.3" }}
                                        />
                                      )}
                                      {ind === iconData.ind &&
                                        (iconData.complete ? (
                                          <i
                                            className="fa fa-arrow-down ms-2 fs-12"
                                            style={{ opacity: "0.7" }}
                                          />
                                        ) : (
                                          <i
                                            className="fa fa-arrow-up ms-2 fs-12"
                                            style={{ opacity: "0.7" }}
                                          />
                                        ))}
                                    </span>
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {purchaseOrderProdcutList?.map((data, ind) => (
                              <tr key={ind}>
                                <td>
                                  <strong>{ind + 1}</strong>{" "}
                                </td>

                                {/* <td>{data?._id}</td> */}

                                <td className="">
                                  {data?.product_name}
                                </td>

                                <td className="">{data?.variant}</td>

                                <td className="">{data?.unit}</td>

                                <td className="">{data?.quantity}</td>

                                <td className="">{data?.price_per_unit}</td>

                                <td className="">{data?.cgst}</td>

                                <td className="">{data?.sgst}</td>

                                <td className="">{data?.igst}</td>

                                <td className="">{data?.cess}</td>

                                <td className="">
                                  {moment(data?.order_details?.due_date).format(
                                    "DD MMM YYYY"
                                  )}
                                </td>

                                <td className="">{data?.amount}</td>

                                <td>
                                  {moment(data?.created_at).format(
                                    "DD MMM YYYY, h:mm:ss a"
                                  )}
                                </td>

                                <td>-</td>
                                <td>
                                  <button
                                    className="btn btn-xs sharp btn-primary me-1"
                                  //   onClick={() => navigate(`/purchaseorderview/${data?._id}`)}
                                  >
                                    <i class="fa-solid fa-eye"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div>
                          {/* {brandList?.data?.length < brandList?.total && ( */}
                          <div className="d-sm-flex text-center justify-content-end align-items-center mt-3">
                            <div className="pagination-container">
                              <ReactPaginate
                                pageCount={Math.ceil(
                                  purchaseOrderData?.totalRecords /
                                  purchaseOrderData?.rowsPerPage
                                )}
                                pageRangeDisplayed={1}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                activeClassName="selected"
                                disabledClassName="disabled"
                              />
                            </div>
                          </div>
                          {/* )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Summary Section */}
            {/* summary */}
            <div className="row justify-content-end ">
              <div className="summary-section col-md-5">
                <table className="table table-bordered ">
                  <h3>Summary</h3>

                  <tbody>
                    <tr>
                      <td>Total Quantity</td>
                      <td>{purchaseOrderData?.summary?.total_quantity}</td>
                    </tr>
                    <tr>
                      <td>Sub Total</td>
                      <td>{purchaseOrderData?.summary?.sub_total?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>{purchaseOrderData?.summary?.total_discount?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Total GST Amount</td>
                      <td>{purchaseOrderData?.summary?.total_gst_amount?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>
                        <td>{purchaseOrderData?.summary?.total_gst_amount?.toFixed(2)}</td>
                      </td>
                    </tr>
                    <tr>
                      <td>Grand Total</td>
                      <td>{purchaseOrderData?.summary?.grand_total?.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Section */}
            <div className="footer-section">
              <p>
                Prepared By: <b>{orderDetails.footer.preparedBy}</b>
              </p>
              <h4>Terms and Conditions:</h4>
              <ul>
                {orderDetails.footer.terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrderView;
