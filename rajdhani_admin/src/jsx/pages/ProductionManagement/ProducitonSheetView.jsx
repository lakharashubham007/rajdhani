import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Container, Dropdown } from "react-bootstrap";
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
import { GetSaleOrderItemsData, GetSaleOrderViewData } from "../../../services/apis/salesOrderApi";
import ProductionManagementTable from "../../components/ProductionManagement/ProductionManagementTable";
import pdfIcon from '../../../assets/images/pdf.png'
import ExportSheetModal from "../../components/ProductionSheet/ExportSheetModal";
import { getProductionSheetDetailsWithItemsByID } from "../../../services/apis/productionSheetApi";
import Loader from "../../components/Loader/Loader";


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
  { heading: "Product Name", sortingVale: "product_name" },
  { heading: "Fitting Code", sortingVale: "fitting_code" },
  { heading: "Code", sortingVale: "product_code" },
  { heading: "UOM", sortingVale: "uom" },
  { heading: "Weight(Kg)", sortingVale: "weight" },
  { heading: "QTY", sortingVale: "quantity" },
  { heading: "Price Per Unit", sortingVale: "price_per_unit" },
  { heading: "Discount Per Unit", sortingVale: "discount_per_unit" },
  { heading: "CGST", sortingVale: "cgst" },
  { heading: "SGST", sortingVale: "sgst" },
  { heading: "IGST", sortingVale: "igst" },
  { heading: "Amount", sortingVale: "amount" },
  { heading: "Created At", sortingVale: "created_at" },
];

const ProducitonSheetView = () => {
  const productionSheetID = useParams()?.id;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const billTableRef = useRef(null);
  const [sort, setSortata] = useState(10);
  const [saleOrderData, setSaleOrderData] = useState([])
  const [salesOrderProdcutList, setSalesOrderProdcutList] = useState([]);
  const [billData, setBillData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const [currentPage, setCurrentPage] = useState(1);
  const [singleBillData, setSingleBillData] = useState({});
  const [visibleCount, setVisibleCount] = useState(5);
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [exportPDFShowModal, setExportPDFShowModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10); // default 10 rows
  const [selectedSaleOrderItems, setSelectedSaleOrderItems] = useState(null);


  const [producitonSheetDetailsWithItems, setProductionSheetDetailsWithItem] = useState();
  console.log("producitonSheetDetailsWithItems", producitonSheetDetailsWithItems)

  const fetchProductionSheetDetailsWithItemsById = async (productionSheetID, sortValue) => {
    setLoading(true);
    try {
      const res = await getProductionSheetDetailsWithItemsByID(
        productionSheetID,
        currentPage,
        rowsPerPage,
        sortValue,
        searchInputValue
      );
      setProductionSheetDetailsWithItem(res?.data);
    } catch (error) {
      // Catch and handle errors
      // console.error("Error fetching data:", error);
      // Toaster.error("Failed to load data. Please try again.");
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductionSheetDetailsWithItemsById(productionSheetID)
  }, [productionSheetID, rowsPerPage, currentPage])



  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
      preparedBy: "Rajdhani",
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

    if (billTableRef.current) {
      billTableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const handleSeeMore = () => {
    setVisibleCount(billData.length); // Show all bills
  };


  //--------------------------------------------Pagination Logic Section ------------------------------/

  const hoseAssemblyRows = selectedSaleOrderItems?.filter(
    (data) => data.product_type === "Hose Assembly"
  ) || [];

  const totalRows = producitonSheetDetailsWithItems?.totalItems;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const paginatedData = hoseAssemblyRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <Loader visible={loading} />
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
                      Rajdhani - Production Sheet
                    </h2>
                  </div>
                  <div className="col-sm-6 col-xl-4 d-flex justify-content-xl-end mt-3 mt-xl-0 mb-2" style={{ height: '40px' }}>
                    <button onClick={exportToPDF} className="btn btn-primary me-2">
                      Export to PDF
                    </button>
                    <button onClick={exportToExcel} className="btn btn-success">
                      Export to Excel
                    </button>
                  </div>
                </div>

              </div>
            </div>



            {/* Production Sheet View  */}
            <div className="mt-3">
              <div className="">
                <div className="card-header">
                  {/* <h4 className="card-title">Production Sheet View</h4> */}
                  {/* <div onClick={() => setExportPDFShowModal(true)} className="text-center cursor-pointer"
                    style={{
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      border: "1px solid red",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}


                  >
                    <img src={pdfIcon} alt="Export PDF" width="40" height="40"

                    />
                    <div style={{ fontSize: '12px', color: '#000' }}>PDF</div>
                  </div> */}
                </div>

                <div className="d-flex justify-content-between align-items-center pl-4 pt-4 pr-4">
                  <div>
                    <label>Rows: </label>
                    <select
                      className="form-select d-inline w-auto ms-2"
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value));
                        setCurrentPage(1); // Reset to first page
                      }}
                    >
                      {[5, 10, 20, 30, 40, 50].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {/* <span className="mx-2">Total Items: {totalRows}</span> */}
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "#ebf8ff",        // Light blue background (like bg-blue-50)
                        color: "#2b6cb0",                  // Darker blue text (like text-blue-700)
                        fontSize: "0.875rem",              // Equivalent to text-sm
                        fontWeight: "500",                 // Medium font weight
                        padding: "4px 12px",               // Similar to py-1 px-3
                        borderRadius: "12px",              // Rounded corners
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // Light shadow
                        border: "1px solid #bee3f8",       // Light border (like border-blue-200)
                        margin: "0 8px"
                      }}
                    >
                      Total Items: {totalRows}
                    </span>
                  </div>
                </div>



                <div className='p-4'>
                  <div style={{ overflowX: 'auto' }}>
                    <div style={{ transform: 'scale(1)', }}>
                      <table className="display dataTable no-footer w-100">
                        <thead className="thead-dark">
                          {currentPage === 1 && (
                            <>
                              <tr>
                                <td className="table-td-border" colSpan="2" style={{ fontWeight: 'bold', fontSize: '16px' }}>SHEET NO. : <span style={{ fontWeight: 'normal' }}>{producitonSheetDetailsWithItems?.productionSheetDetails?.sheet_no}</span></td>
                                <td className="table-td-border" colSpan="1" style={{ fontWeight: 'bold', fontSize: '16px' }}>MAKE:  <span style={{ fontWeight: 'normal' }}>{producitonSheetDetailsWithItems?.productionSheetDetails?.make}</span></td>
                                <td className="table-td-border" colSpan="3" style={{ fontWeight: 'bold', fontSize: '16px' }}>DATE & TIME:  <span style={{ fontWeight: 'normal' }}>{moment(producitonSheetDetailsWithItems?.productionSheetDetails?.date_time).format('DD MMM YYYY, h:mm:ss a')}</span></td>
                                <td className="table-td-border text-capitalize" colSpan="6" style={{ fontWeight: 'bold', fontSize: '16px' }}>CREATED BY:  <span style={{ fontWeight: 'normal' }}>{producitonSheetDetailsWithItems?.productionSheetDetails?.created_by}</span></td>
                              </tr>

                              <tr>
                                <td className="table-td-border" colSpan="2" style={{ fontWeight: 'bold', fontSize: '16px' }}>ORDER NO.:  <span style={{ fontWeight: 'normal' }}>{producitonSheetDetailsWithItems?.productionSheetDetails?.order_no}</span></td>
                                <td className="table-td-border" colSpan="4" style={{ fontWeight: 'bold', fontSize: '16px' }}>ORDER DATE:  <span style={{ fontWeight: 'normal' }}>{moment(producitonSheetDetailsWithItems?.productionSheetDetails?.order_date).format('DD MMM YYYY')}</span> </td>
                                <td className="table-td-border" colSpan="7" rowSpan="3"
                                  style={{
                                    verticalAlign: "top",     // Align content to the top
                                    textAlign: "left",        // Align text to the left
                                    padding: "1rem",          // Optional: add padding
                                    fontWeight: 'bold', fontSize: '18px',
                                    // color: 'white',
                                    // fontStyle: 'italic',
                                    background: '#EAEAEA'
                                  }}
                                >SPECIAL NOTE:  <span style={{ fontWeight: 'normal', fontSize: '19px', fontStyle: 'italic', fontWeight: 'bold' }}>{producitonSheetDetailsWithItems?.productionSheetDetails?.note}</span></td>
                              </tr>

                              <tr>
                                <td className="table-td-border" colSpan="6" style={{ fontWeight: 'bold', fontSize: '16px' }}>PARTY NAME:  <span style={{ fontWeight: 'normal' }}>{producitonSheetDetailsWithItems?.productionSheetDetails?.party_name}</span></td>
                              </tr>

                              <tr>
                                <td className="table-td-border" colSpan="6" style={{ fontWeight: 'bold', fontSize: '16px' }}>ADDRESS:  <span style={{ fontWeight: 'normal' }}>{producitonSheetDetailsWithItems?.productionSheetDetails?.address}</span></td>
                              </tr>

                            </>
                          )}

                          <tr style={{ background: 'rgb(164 164 164)' }}>
                            <th className="table-td-border " style={{ width: '80px', fontWeight: 'bold' }}>PART NUMBER</th>
                            <th className="table-td-border " style={{ width: '120px', fontWeight: 'bold' }}>HOSE</th>
                            <th className="table-td-border w-[180px] text-sm" style={{ fontWeight: 'bold' }}>FITTING A</th>
                            <th className="table-td-border w-[180px] text-sm" style={{ fontWeight: 'bold' }}>FITTING B</th>
                            <th className="table-td-border w-[80px]" style={{ fontWeight: 'bold' }}>OA</th>
                            <th className="table-td-border  text-xs leading-tight break-words" style={{ width: '40px', fontWeight: 'bold' }}>
                              <span style={{ display: "flex", justifyContent: 'center' }}>A Len</span>
                            </th>
                            <th className="table-td-border  text-xs"><span style={{ display: "flex", justifyContent: 'center', fontWeight: 'bold' }}>F Len</span></th>
                            <th className="table-td-border  text-xs"><span style={{ display: "flex", justifyContent: 'center', fontWeight: 'bold' }}>C Len</span></th>
                            <th className="table-td-border "><span style={{ display: "flex", justifyContent: 'center', fontWeight: 'bold' }}>QTY</span></th>
                            <th className="table-td-border " style={{ width: '120px' }}><span style={{ display: "flex", justifyContent: 'center', fontWeight: 'bold' }}>GUARD</span></th>
                            {/* <th className="table-td-border w-[100px]" style={{ fontWeight: 'bold' }}>Action</th> */}
                          </tr>
                        </thead>

                        <tbody>
                          {producitonSheetDetailsWithItems?.productionSheetItems?.map((data, index) => {
                            return (
                              <>
                                <tr
                                  key={index}
                                  style={{
                                    background: index % 2 === 0 ? "#ffffff" : "#f3f3f3"
                                  }}
                                >
                                  <td className="table-td-border" style={{ width: '80px', fontSize: '18px' }}>{data?.part_no ? data?.part_no : ""}</td>
                                  {/* <td className="table-td-border" style={{ width: '120px' }}>{data?.product_id?.hose ? data?.product_id?.hose : ""}</td> */}
                                  <td className="table-td-border" style={{ width: '180px', whiteSpace: 'normal', wordBreak: 'break-word', fontSize: '18px' }}>
                                    {data?.hose
                                      ? data.hose.match(/.{1,10}/g)?.map((chunk, i) => (
                                        <span key={i}>
                                          {chunk}
                                          <br />
                                        </span>
                                      ))
                                      : ""}
                                  </td>
                                  <td className="table-td-border" style={{ width: '450px', fontSize: '18px' }}>
                                    <div className='d-flex flex-column gap-2' >
                                      <div style={{ fontWeight: "bold", display: "inline", whiteSpace: 'nowrap', }}>{data?.fitting_a_fitting_Code ? data?.fitting_a_fitting_Code : ""}</div>
                                      <div>{data?.fitting_a_description ? data?.fitting_a_description : ""}</div>
                                    </div>
                                  </td>
                                  <td className="table-td-border" style={{ width: '450px', fontSize: '18px' }}>
                                    <div className='d-flex flex-column gap-2'>
                                      <div style={{ fontWeight: "bold", display: "inline", whiteSpace: 'nowrap' }}>{data?.fitting_b_fitting_Code ? data?.fitting_b_fitting_Code : ""}</div>
                                      <div>{data?.fitting_b_description ? data?.fitting_b_description : ""}</div>
                                    </div>
                                  </td>
                                  <td className="table-td-border"
                                    style={
                                      data?.oa
                                        ? { background: '#686D76', color: 'white', width: '40px', alignItems: 'center', fontSize: '18px', fontWeight: 'bold' }
                                        : { alignItems: 'center', width: '40px', fontSize: '18px', fontWeight: 'bold' }
                                    }
                                  ><span style={{ display: "flex", justifyContent: 'center', }}>{data?.oa ? data?.oa : "-"}</span></td>
                                  <td className="table-td-border" style={{ width: '40px', fontSize: '18px', fontWeight: 'bold' }}><span style={{ display: "flex", justifyContent: 'center' }}>{data?.assembly_length ? data?.assembly_length : "-"}</span></td>
                                  <td className="table-td-border" style={{ width: '40px', fontSize: '18px', fontWeight: 'bold' }}><span style={{ display: "flex", justifyContent: 'center' }}>{data?.fitting_length ? data?.fitting_length : "-"}</span></td>
                                  <td className="table-td-border" style={{ background: '#B6CBBD', width: '40px', fontSize: '18px', fontWeight: 'bold' }}><span style={{ display: "flex", justifyContent: 'center' }}>{data?.cutting_length ? data?.cutting_length : "-"}</span></td>
                                  <td className="table-td-border" style={{ width: '40px', fontSize: '18px', fontWeight: 'bold' }}><span style={{ display: "flex", justifyContent: 'center' }}>{data?.quantity ? data?.quantity : "0"}</span></td>
                                  <td className="table-td-border" style={
                                    data?.guard
                                      ? { background: '#4A4947', color: 'white', width: '140px', fontSize: '18px', }
                                      : { width: '140px', fontSize: '18px', }
                                  }>{data?.guard ? data?.guard : "-"}</td>



                                  {/* <td className="table-td-border" style={{ width: '40px' }}>
                                    <div className="d-flex">
                                      <button className="btn btn-xs sharp btn-primary me-1"
                                        // onClick={() => handleEditClick(index, data)}
                                      >
                                        <i className="fa fa-pencil" /></button>
                                      <button className="btn btn-xs sharp btn-danger"
                                        // onClick={() => handleDeleteProduction(data?._id)}
                                        >
                                        <i className="fa fa-trash" /></button>
                                    </div>
                                  </td> */}
                                </tr>
                              </>)
                          })}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>



                <div className="d-flex justify-content-end align-items-center pt-2 pb-4 pr-4">
                  <div>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                      Prev
                    </button>
                    {/* <span>Page {currentPage} of {totalPages}</span> */}
                    {/* Page numbers */}
                    {Number.isInteger(totalPages) && totalPages > 0 && (
                      [...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        const visiblePages = 3;
                        const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
                        const endPage = Math.min(totalPages, startPage + visiblePages - 1);

                        if (page >= startPage && page <= endPage) {
                          return (
                            <button
                              key={page}
                              className={`btn btn-sm me-1 ${currentPage === page ? 'btn-primary' : 'btn-light'}`}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          );
                        }
                        return null;
                      })
                    )}
                    <button
                      className="btn btn-sm btn-secondary ms-1"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>


            {/* Summary Section */}
            {/* summary */}
            {/* <div className="row justify-content-end ">
              <div className="summary-section col-md-5">
                <table className="table table-bordered ">
                  <h3 className="p-2 mx-1">Summary</h3>

                  <tbody>
                    <tr>
                      <td>Total Quantity</td>
                      <td>{saleOrderData?.summary?.total_quantity}</td>
                    </tr>
                    <tr>
                      <td>Sub Total</td>
                      <td>{saleOrderData?.summary?.sub_total?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>{saleOrderData?.summary?.total_discount?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Total GST Amount</td>
                      <td>{saleOrderData?.summary?.total_gst_amount?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>{saleOrderData?.summary?.total_gst_amount?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Grand Total</td>
                      <td>{saleOrderData?.summary?.grand_total?.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}

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


      {/* Export button pdf */}
      <Modal
        size="md"
        centered
        show={exportPDFShowModal}
        onHide={() => setExportPDFShowModal(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Download PDF Options</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ExportSheetModal
            // productionSheetDetailsData={formData}
            productionSheetItemsDetailsData={selectedSaleOrderItems}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}

          />
        </Modal.Body>


      </Modal>
    </>
  );
};

export default ProducitonSheetView;
