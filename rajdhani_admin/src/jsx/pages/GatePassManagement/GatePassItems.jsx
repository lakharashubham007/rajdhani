import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Container, Dropdown } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import uplodIcon from "../../../assets/images/upload-icon.png";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";
import moment from "moment";
import {
  GetPurchaseOrderCheckBill,
  GetPurchaseOrderItemsData,
  GetPurchaseOrderViewData,
  updatePurchaseOrderStatusApi,
} from "../../../services/apis/PurchaseOrder";
import rajdhanilogo from "../../../assets/images/cropped-Rparts-logo.png";
import "../../../assets/css/AddSupplierPurchaseOrder.css";
import { GetAllProductList } from "../../../services/apis/Product";
import { addBillDetailsApi, createBillItemsApi, DownloadBill, updatePoItemForBillsApi } from "../../../services/apis/purchaseOrderBillApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import "../../../assets/css/PurchaseOrder.css";
import { createBatchApi } from "../../../services/apis/BatchApi";
import { addProductsInInvntory, checkProductsInInventoryApi } from "../../../services/apis/InventoryApi";
import { addEntryInStock } from "../../../services/apis/StockMentainenaceApi";
import { GetSaleOrderItemsData, GetSaleOrderViewData, verifyBySOApi, verifyItemsInSalesOrderApi, verifySalesOrderApi, verifySOApi } from "../../../services/apis/salesOrderApi";
import { useSelector } from "react-redux";
import { getPackingItemsForApprovalApi, updateItemQuantityWithLogsInInventoryApi } from "../../../services/apis/InventoryItemLogsApi";
import { assign } from "lodash";

import { getInventoryRejectionItemsApi } from "../../../services/apis/inventoryRejectionItemsApi";
import { createPackingDetailsApi, createPackingItemsApi, getGatePassItemsApi, getPackingItemsApi, savePackingDetailsApi, savePackingItemsApi } from "../../../services/apis/PackingApi";
import LogActivityItemsModal from "../StoreManagement/StoreComponents/LogActivityItemsModal";
import { getAllOperatorListApi, searchOperatorApi } from "../../../services/apis/OperatorApi";
import GatePassPDF from "./component/GatePassPDF";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import moment from 'moment';
// import FinalizeGatePassModal from "./FinalizeGatePassModal";
import rlogo from '../../../assets/images/rlogo.png'


const billtheadData = [
  { heading: "PO Id", sortingVale: "purchase_order_id" },
  { heading: "Bill Id", sortingVale: "bill_id" },
  { heading: "Bill Name", sortingVale: "bill_doc" },
  // { heading: "Bill Amount", sortingVale: "bill_amount" },
  { heading: "Bill Date", sortingVale: "bill_date" },
  { heading: "Created At", sortingVale: "created_at" },
];

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Product Name", sortingVale: "name" },
  { heading: "Fitting code", sortingVale: "fitting_code" },
  { heading: "Product Code", sortingVale: "product_code" },
  { heading: "Quantity", sortingVale: "packed_quantity" },
  { heading: "UOM", sortingVale: "uom" },
  { heading: "Packing Type", sortingVale: "packing_type" },
  { heading: "Weight(kg)", sortingVale: "weight" },
  // { heading: "Price", sortingVale: "price" },
  // { heading: "Discount Per Unit", sortingVale: "discount_per_unit" },
  // { heading: "CGST", sortingVale: "cgst" },
  // { heading: "SGST", sortingVale: "sgst" },
  // { heading: "IGST", sortingVale: "igst" },
  // { heading: "Amount", sortingVale: "amount" },
  // { heading: "Action", sortingVale: "action" },

  // { heading: "Product Name", sortingVale: "name" },
  // { heading: "Order Quantity", sortingVale: "order_quantity" },
  // { heading: "Available Packing Quantity", sortingVale: "avail_packing_quantity" },
  // { heading: "Packed Quantity", sortingVale: "packed_quantity" },
  // { heading: "UOM", sortingVale: "uom" },
  // { heading: "Packing Type", sortingVale: "packing_type" },
  // { heading: "Packed By", sortingVale: "packed_by" },

  // { heading: "Fitting Code", sortingVale: "fitting_code" },
  // { heading: "Weight(kg)", sortingVale: "weight" },
  // { heading: "Ordered Quantity", sortingVale: "ordered_quantity" },
  // { heading: "Available Packing Quantity", sortingVale: "avail_packing_quantity" },
  // { heading: "Packing Quantity", sortingVale: "packing_quantity" },

  // { heading: "Requested Quantity", sortingVale: "requested_quantity" },
  // { heading: "Last Assigned Quantity", sortingVale: "last_asign_quantity" },
  // { heading: "Assign Quantity", sortingVale: "assign_quantity" },
  // { heading: "Reserve Quantity", sortingVale: "reserve_quantity" },
  // { heading: "Log Activity", sortingVale: "log_activity" },
  // { heading: "Price", sortingVale: "price" },
  // { heading: "Discount Per Unit", sortingVale: "discount_per_unit" },
  // { heading: "CGST", sortingVale: "cgst" },
  // { heading: "SGST", sortingVale: "sgst" },
  // { heading: "IGST", sortingVale: "igst" },
  // { heading: "Amount", sortingVale: "amount" },
  // { heading: "Verify", sortingVale: "verify" },
  // { heading: "Created At", sortingVale: "created_at" },
  // { heading: "Status", sortingVale: "status" },
  // { heading: "Action", sortingVale: "action" },
];

const itemsData = [
  {
    code: "20033",
    description: `BR BSP 1/2"X1/2" FEMALE STRAIGHT (SKIVE) THK-20 
                  -<b>KB2-SK-0808-B-FS-THK-20</b><br/>
                  SAP:<u>85849012</u>`,
    quantity: "50",
    uom: "SET"
  },
  {
    code: "40070",
    description: `SP M 1/4"XM12X1.5 FEMALE STRAIGHT (SKIVE) Without Ferrule WITHOUT ORING POD-06 
                  -<b>KS1-SK-0406-M-FS-WF</b><br/>
                  Pack With PO-0072450/098`,
    quantity: "30",
    uom: "SET"
  }
];



const GatePassItems = () => {
  const params = useParams()?.id;
  const navigate = useNavigate();
  const location = useLocation();
  const soDetails = location.state?.soDetails;
  console.log("soDetails=-=-=-=-=-------val", soDetails)
  const authData = useSelector((state) => state.auth.auth);
  const billTableRef = useRef(null);
  const [sort, setSortata] = useState(10);
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [purchaseOrderProdcutList, setPurchaseOrderProdcutList] = useState([]);
  const [saleOrderItems, setSaleOrderItems] = useState([]);
  const [billData, setBillData] = useState([]);
  const [errors, setErrors] = useState({});
  const [formBillingData, setFormBillingData] = useState({});
  const [formData, setFormData] = useState({});
  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const [currentPage, setCurrentPage] = useState(1);
  const [singleBillData, setSingleBillData] = useState({});
  const [contentModal, setContentModal] = useState(false);
  const [productOption, setProductOption] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [verifyShowModal, setVerifyShowModal] = useState(false);
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState();
  console.log("selectedRowData", selectedRowData)
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState();
  console.log("selectedRowIndex", selectedRowIndex)
  const [handleSubmitClick, setHandleSubmitClick] = useState(false)
  const [rowOperatorOptions, setRowOperatorOptions] = useState({});
  const [focusedRowIndex, setFocusedRowIndex] = useState(null);
  const [operatorsOption, setOpertorsOption] = useState();
  const [finalizeModal, setFinalizeModal] = useState(false);



  const debounceTimer = useRef(null);




  const [rows, setRows] = useState([]);

  console.log("rows-=-=-=-=-=-=---->", rows)

  const [isExpanded, setIsExpanded] = useState(false);

  const [searchTerms, setSearchTerms] = useState({});



  const fetchAllOperatorsList = async () => {
    // setLoading(true);
    try {
      const res = await getAllOperatorListApi();
      const dopdownData = res?.data?.map((operator) => ({
        value: operator?._id,
        label: `${operator?.fname} ${operator?.lname}`,
      }));
      setOpertorsOption(dopdownData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchOperatorSearchResults = async (query, index) => {
    if (!query) return;

    try {
      const res = await searchOperatorApi(query);
      const dropdownData = res?.data?.operator?.map((operator) => ({
        value: operator?._id,
        label: `${operator?.fname} ${operator?.lname}`,
      }));

      setRowOperatorOptions((prev) => ({
        ...prev,
        [index]: dropdownData, // save options for this row only
      }));
    } catch (error) {
      console.error("Error fetching operator:", error);
    } finally {
      // setLoading(false);
    }
  };


  const debounceOperatorSearch = (query, index) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchOperatorSearchResults(query, index);
    }, 500);
  };


  const handleOperatorNameSearch = (inputValue, index) => {
    setSearchTerms((prev) => ({ ...prev, [index]: inputValue }));
    setFocusedRowIndex(index);
    if (inputValue.length > 1) {
      debounceOperatorSearch(inputValue, index);
    }
  };

  const gatePassDetails = { soDetails };
  const gatePassItems = { rows };

  // const exportPDF = async (gatePassDetails, gatePassItems) => {
  //   setLoading(true);
  //   try {
  //     const pdf = new jsPDF("p", "pt", "a4");
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const rowsPerPage = 10; // max rows per page

  //     const filteredItems = gatePassItems || [];
  //     const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  //     for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
  //       const startIndex = pageIndex * rowsPerPage;
  //       const endIndex = startIndex + rowsPerPage;
  //       const paginatedItems = filteredItems.slice(startIndex, endIndex);

  //       const container = document.createElement("div");
  //       container.style.padding = "15px";
  //       container.style.background = "#fff";
  //       container.style.width = "780px"; // fit to A4 width
  //       document.body.appendChild(container);

  //       // Header & Info only on first page
  //       if (pageIndex === 0) {
  //         container.innerHTML = `
  //           <div style="font-size: 10pt; font-family: Arial;">
  //             <!-- Title -->
  //             <h2 style="text-align: center; font-weight: bold; margin-bottom: 8px;">GATE PASS</h2>

  //             <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 9pt;">
  //               <tr>




  //                 <!-- Left Column -->
  //     <td style="border: 1px solid #000; width: 50%; vertical-align: top; padding: 0;">
  //       <table style="width: 100%; border-collapse: collapse; font-size: 8pt;">

  //         <!-- Invoice To -->
  //         <tr>
  //           <td style="border-bottom: 1px solid #000; padding: 4px;">
  //             <b>Invoice To:</b><br/>
  //             ${gatePassDetails?.base_company_address?.name || ""}, 
  //             ${gatePassDetails?.base_company_address?.address || ""}, 
  //             ${gatePassDetails?.base_company_address?.city || ""}, 
  //             ${gatePassDetails?.base_company_address?.state_name || ""}, 
  //             ${gatePassDetails?.base_company_address?.country || ""}<br/>
  //             GST: ${gatePassDetails?.base_company_address?.gstNumber || ""}
  //           </td>
  //         </tr>

  //         <!-- Consignee -->
  //         <tr>
  //           <td style="border-bottom: 1px solid #000; padding: 4px;">
  //             <b>Consignee (Ship To):</b><br/>
  //             ${gatePassDetails?.shipping_details?.address || ""}, 
  //             ${gatePassDetails?.shipping_details?.city || ""}, 
  //             ${gatePassDetails?.shipping_details?.state_name || ""}, 
  //             ${gatePassDetails?.shipping_details?.country || ""}<br/>
  //             Mob: ${gatePassDetails?.shipping_details?.mobile_no1 || ""}, 
  //             ${gatePassDetails?.shipping_details?.mobile_no2 || ""}
  //           </td>
  //         </tr>

  //         <!-- Buyer -->
  //         <tr>
  //           <td style="padding: 4px;">
  //             <b>Buyer (Bill To):</b><br/>
  //             ${gatePassDetails?.customer_id?.company_name || ""} - 
  //             ${gatePassDetails?.customer_id?.fname || ""} ${gatePassDetails?.customer_id?.lname || ""}<br/>
  //             ${gatePassDetails?.customer_id?.address || ""}, 
  //             ${gatePassDetails?.customer_id?.city || ""}, 
  //             ${gatePassDetails?.customer_id?.state || ""}, 
  //             ${gatePassDetails?.customer_id?.country || ""}<br/>
  //             Email: ${gatePassDetails?.customer_id?.email || ""}, 
  //             Mob: ${gatePassDetails?.customer_id?.mobile_no1 || ""}, 
  //             ${gatePassDetails?.customer_id?.mobile_no2 || ""}
  //           </td>
  //         </tr>

  //       </table>
  //     </td>

  //                 <!-- Right Column -->
  //                 <td style="border: 1px solid #000; width: 50%; vertical-align: top; padding: 0;">
  //   <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">

  //  <!-- Voucher No & Date in one line (with vertical separator) -->
  // <tr>
  //   <td style="border-bottom: 1px solid #000; border-right: 1px solid #000; padding: 4px; width: 50%;">
  //     <b>Voucher No:</b> ${gatePassDetails?.voucher_no || ""}
  //   </td>
  //   <td style="border-bottom: 1px solid #000; padding: 4px; width: 50%;">
  //     <b>Date:</b> ${moment(gatePassDetails?.date).format("DD-MMM-YYYY")}
  //   </td>
  // </tr>

  // <!-- Reference No & Other Reference -->
  // <tr>
  //   <td style="border-bottom: 1px solid #000; border-right: 1px solid #000; padding: 4px; width: 50%;">
  //     <b>Reference No:</b> ${gatePassDetails?.reference_no || ""}
  //   </td>
  //   <td style="border-bottom: 1px solid #000; padding: 4px; width: 50%;">
  //     <b>Other Ref:</b> ${gatePassDetails?.other_reference || ""}
  //   </td>
  // </tr>

  // <!-- Dispatched Through & Destination -->
  // <tr>
  //   <td style="border-bottom: 1px solid #000; border-right: 1px solid #000; padding: 4px; width: 50%;">
  //     <b>Dispatched Through:</b> ${gatePassDetails?.dispatch_through || ""}
  //   </td>
  //   <td style="border-bottom: 1px solid #000; padding: 4px; width: 50%;">
  //     <b>Destination:</b> ${gatePassDetails?.destination || ""}
  //   </td>
  // </tr>

  // <!-- Mode/Terms of Payment -->
  // <tr>
  //   <td colspan="2" style="border-bottom: 1px solid #000; padding: 4px;">
  //     <b>Mode/Terms of Payment:</b> ${gatePassDetails?.payment_terms || ""}
  //   </td>
  // </tr>

  // <!-- Terms of Delivery -->
  // <tr>
  //   <td colspan="2" style="padding: 4px;">
  //     <b>Terms of Delivery:</b> ${gatePassDetails?.delivery_terms || ""}
  //   </td>
  // </tr>



  //   </table>
  // </td>






  //               </tr>
  //             </table>
  //           </div>
  //         `;
  //       }

  //       // Items Table (always show)
  //       container.innerHTML += `

  //         <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin-top: 8px;">
  //   <thead>
  //     <tr style="background: #e0e0e0; font-weight: bold; text-align: center;">
  //       <th style="border: 1px solid #000; padding: 4px; width: 40px;">Sl</th>
  //       <th style="border: 1px solid #000; padding: 4px;">Description of Goods</th>
  //       <th style="border: 1px solid #000; padding: 4px; width: 120px;">Quantity & UOM</th>
  //       <th style="border: 1px solid #000; padding: 4px; width: 100px;">Due On</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     ${paginatedItems.map((data, idx) => `
  //       <tr style="background: ${idx % 2 === 0 ? "#fff" : "#f9f9f9"};">
  //         <td style="border: 1px solid #000; padding: 4px; text-align: center;">
  //           ${startIndex + idx + 1}
  //         </td>
  //         <td style="border: 1px solid #000; padding: 4px;">
  //           <div style="font-weight: bold;">${data?.product_id?.desc_Code || ""}</div>
  //           <div style="font-size: 8.5pt; font-weight: 500; color: #333;">
  //             ${data?.product_id?.fitting_Code || ""}
  //           </div>


  //           ${data.Additional
  //           ? `<div style="font-size: 8pt; background: #e0e0e0; color: #000; padding: 2px 4px; display: inline-block; margin-top: 2px; border-radius: 3px;">
  //               ${data.Additional}
  //               </div>`                
  //           : ""}

  //         </td>
  //         <td style="border: 1px solid #000; padding: 4px; text-align: center;">
  //           ${data.packing_quantity || ""} ${data?.product_id?.uom || ""}
  //         </td>
  //         <td style="border: 1px solid #000; padding: 4px; text-align: center;">
  //           ${gatePassDetails.order_details?.due_date ? moment(gatePassDetails.order_details?.due_date).format("DD-MMM-YYYY") : ""}
  //         </td>
  //       </tr>
  //     `).join("")}
  //   </tbody>
  // </table>

  //       `;

  //       // Footer only on last page
  //       if (pageIndex === totalPages - 1) {
  //         container.innerHTML += `
  //           <div style="margin-top: 15px; font-size: 9pt;">
  //             <p style="font-size: 8pt;">E. & O.E</p>
  //             <div style="display: flex; justify-content: space-between; margin-top: 25px; font-size: 9pt;">
  //               <span>Prepared by</span>
  //               <span>Verified by</span>
  //               <span>Authorised Signatory</span>
  //             </div>
  //             <p style="margin-top: 15px; font-size: 8pt; text-align:center;">This is a Computer Generated Document</p>
  //           </div>
  //         `;
  //       }

  //       // Convert to image
  //       const canvas = await html2canvas(container, { scale: 1.5, useCORS: true });
  //       const imgData = canvas.toDataURL("image/jpeg", 0.7);
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const imgWidth = pageWidth;
  //       const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  //       if (pageIndex > 0) pdf.addPage();
  //       pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

  //       document.body.removeChild(container);
  //     }

  //     pdf.save(`GatePass_${gatePassDetails?.gatepass_no || "GP"}.pdf`);
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const exportPDF = async (gatePassDetails) => {
  //   setLoading(true);
  //   try {
  //     const pdf = new jsPDF("p", "pt", "a4");
  //     const pageWidth = pdf.internal.pageSize.getWidth();

  //     const container = document.createElement("div");
  //     container.style.padding = "10px";
  //     container.style.background = "#fff";
  //     container.style.width = "780px"; // A4 fit
  //     document.body.appendChild(container);


  //     container.innerHTML = `
  //       <div style="font-family: Arial, sans-serif; font-size: 10pt; color: #000;">

  //         <!-- Top Grey Title -->
  //         <div style="text-align: center; background: #f0f0f0; padding: 6px; border: 1px solid #000; font-size: 12pt; font-weight: bold; color:#000;">
  //           GATE PASS
  //         </div>

  //         <!-- Logo + Company Info in same row -->
  //         <table style="width: 100%; border: 1px solid #000; border-top: none; border-collapse: collapse;">
  //           <tr>
  //             <!-- Logo -->
  //             <td style="width: 30%; padding: 4px; text-align: center; vertical-align: middle;">
  //               <img src='${rlogo}' style="max-width:250px; height:auto;" />
  //             </td>

  //             <!-- Company Info -->
  //             <td style="width: 70%; padding: 4px; text-align: center; vertical-align: middle; color:#000;">
  //               <div style="font-size: 18pt; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 2px;">
  //                 ${"S.B. PARTS PRIVATE LIMITED"}
  //               </div>
  //               <div style="font-size: 10pt; margin-top: 6px; font-weight: 600; color:#000;">
  //                 ${"117, Hawa Magri Opp. Durga Marble, Sukher, Udaipur (Raj.) 313004"}
  //               </div>
  //             </td>
  //           </tr>
  //         </table>
  //       </div>
  //     `;

  //     // Convert DOM to canvas & add to PDF
  //     const canvas = await html2canvas(container, { scale: 1.5, useCORS: true });
  //     const imgData = canvas.toDataURL("image/jpeg", 0.7);
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const imgWidth = pageWidth;
  //     const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  //     pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

  //     document.body.removeChild(container);

  //     pdf.save(`GatePass_Header.pdf`);
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const exportPDF = async (gatePassDetails) => {
  //   setLoading(true);
  //   try {
  //     const pdf = new jsPDF("p", "pt", "a4");
  //     const pageWidth = pdf.internal.pageSize.getWidth();

  //     const container = document.createElement("div");
  //     container.style.padding = "10px";
  //     container.style.background = "#fff";
  //     container.style.width = "780px"; // A4 fit
  //     document.body.appendChild(container);

  //     container.innerHTML = `
  //     <div style="font-family: Arial, sans-serif; font-size: 10pt; color: #000;">

  //       <!-- Top Grey Title -->
  //       <div style="text-align: center; background: #f0f0f0; padding: 6px; border: 1px solid #000; font-size: 12pt; font-weight: bold; color:#000;">
  //         GATE PASS
  //       </div>

  //       <!-- Logo + Company Info -->
  //       <table style="width: 100%; border: 1px solid #000; border-top: none; border-collapse: collapse;">
  //         <tr>
  //           <!-- Logo -->
  //           <td style="width: 30%; padding: 4px; text-align: center; vertical-align: middle;">
  //             <img src='${rlogo}' style="max-width:250px; height:auto;" />
  //           </td>

  //           <!-- Company Info -->
  //           <td style="width: 70%; padding: 4px; text-align: center; vertical-align: middle; color:#000;">
  //             <div style="font-size: 18pt; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 2px;">
  //               ${"S.B. PARTS PRIVATE LIMITED"}
  //             </div>
  //             <div style="font-size: 10pt; margin-top: 6px; font-weight: 600; color:#000;">
  //               ${"117, Hawa Magri Opp. Durga Marble, Sukher, Udaipur (Raj.) 313004"}
  //             </div>
  //           </td>
  //         </tr>
  //       </table>

  //       <!-- Gate Pass Details Row -->
  //           <!-- Details row with double top border that visually merges with header box -->
  //       <table style="width: 100%; border: 1px solid #000; border-top: 3px double #000; border-collapse: collapse; font-size: 10pt;">
  //         <tr>
  //           <!-- LEFT -->
  //           <td style="width: 50%; padding: 6px; border-right: 1px solid #000; vertical-align: top;">
  //             Gate Pass No.: <b>${gatePassDetails?.gatepass_no || "SB/GP/001"}</b><br/>
  //             Gate Pass Date: <b>${gatePassDetails?.date || "29/08/2025"}</b><br/>
  //             Order No.: <b>${gatePassDetails?.order_no || "SB/SO/001"}</b><br/>
  //             Order Date: <b>${gatePassDetails?.order_date || "28/08/2025"}</b>
  //           </td>

  //           <!-- RIGHT (nested table to create a separator line that spans the full right column only) -->
  //           <td style="width: 50%; padding: 0; vertical-align: top;">
  //             <table style="width: 100%; border-collapse: collapse; font-size: 10pt;">
  //               <tr>
  //                 <td style="padding: 6px;">
  //                   <b>No. of Parcels:</b> ${gatePassDetails?.no_of_parcels || "1 Bag & 1 Roll"}<br/>
  //                   <b>Total Weight:</b> ${gatePassDetails?.total_weight || "96.500 Kg"}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <!-- This border-top creates the separator line connected to the right column edges -->
  //                 <td style="border-top: 1px solid #000; padding: 6px;">
  //                   <b>Terms of Delivery:</b> ${gatePassDetails?.delivery_terms || ""}
  //                 </td>
  //               </tr>
  //             </table>
  //           </td>
  //         </tr>
  //       </table>


  //     </div>
  //   `;

  //     // Convert DOM to canvas & add to PDF
  //     const canvas = await html2canvas(container, { scale: 1.5, useCORS: true });
  //     const imgData = canvas.toDataURL("image/jpeg", 0.7);
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const imgWidth = pageWidth;
  //     const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  //     pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

  //     document.body.removeChild(container);

  //     pdf.save(`GatePass_Header.pdf`);
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const exportPDF = async (gatePassDetails) => {
  setLoading(true);
  try {
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    const container = document.createElement("div");
    container.style.padding = "10px";
    container.style.background = "#fff";
    container.style.width = "780px"; // A4 fit
    document.body.appendChild(container);

    container.innerHTML = `
      <div style="font-family: Arial, sans-serif; font-size: 10pt; color: #000;">

       
        

     
        <!-- Gate Pass Details -->
        <table style="width: 100%;  border: 1px solid #000;  font-size: 10pt;">

            <tr>
              <div style="text-align: center; background: #f0f0f0; padding: 6px; font-size: 12pt; font-weight: bold; border-top: 1px solid #000; border-right: 1px solid #000; border-left: 1px solid #000;">
                GATE PASS
              </div>
            </tr>

            <!-- Logo Box -->
          <tr>
            <!-- Logo (30%) -->
            <td style="width: 20%; text-align: left; vertical-align: middle; padding: 1px;">
              <img src='${rlogo}' style="max-width: 220px; height: auto;" />
            </td>

            <!-- Company Info (70%) -->
            <td style="width: 80%; text-align: center; vertical-align: middle; padding: 1px;">
              <div style="font-size: 14pt; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 2px;">
                ${"S.B. PARTS PRIVATE LIMITED"}
              </div>
              <div style="font-size: 8pt; margin-top: 6px; font-weight: 600;">
                ${"117, Hawa Magri Opp. Durga Marble , Sukher, Udaipur (Raj.) 313004"}
              </div>
            </td>
          </tr>

         <tr>
            <td colspan="2" style="height: 10px; border-top: 1px solid #000;"></td>
          </tr>
        
          <tr style="border-top: 1px solid #000; ">
            <td style="width: 50%; padding: 6px; border-right: 1px solid #000; vertical-align: top;">
              Gate Pass No.: <b>${gatePassDetails?.gatepass_no || "SB/GP/001"}</b><br/>
              Gate Pass Date: <b>${gatePassDetails?.date || "29/08/2025"}</b><br/>
              Order No.: <b>${gatePassDetails?.order_no || "SB/SO/001"}</b><br/>
              Order Date: <b>${gatePassDetails?.order_date || "28/08/2025"}</b>
            </td>
            <td style="width: 50%; padding: 0; vertical-align: top;">
              <table style="width: 100%; border-collapse: collapse; font-size: 10pt;">
                <tr>
                  <td style="padding: 6px;">
                    <b>No. of Parcels:</b> ${gatePassDetails?.no_of_parcels || "1 Bag & 1 Roll"}<br/>
                    <b>Total Weight:</b> ${gatePassDetails?.total_weight || "96.500 Kg"}
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #000; padding: 6px;">
                    <b>Terms of Delivery:</b> ${gatePassDetails?.delivery_terms || ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>


          <tr>
            <td colspan="2" style="height: 10px; border-top: 1px solid #000;"></td>
          </tr>

          <tr style="background: #f0f0f0; font-weight: bold; text-align: center;">
            <!-- Left column: border only on left & top & bottom -->
            <td style="width: 50%; border-top: 1px solid #000; border-left: 1px solid #000; border-right: 1px solid #000;  border-bottom: 1px solid #000; padding: 2px;font-size: 8pt;">
              BILL TO
            </td>

            <!-- Right column: border on top, right & bottom + left border for separator -->
            <td style="width: 50%; border-top: 1px solid #000; border-right: 1px solid #000; border-bottom: 1px solid #000;  padding: 2px;font-size: 8pt;">
              SHIP TO
            </td>
          </tr>
          <tr>
            <td style="width: 50%; border-right: 1px solid #000; padding: 6px; vertical-align: top;">
              <b>${gatePassDetails?.bill_to?.name || "XYZ Trade Pvt. Ltd."}</b><br/>
              ${gatePassDetails?.bill_to?.address || "76/E, Jagdishpura Complex Vastuviher Naroda Ahmedabad, Gujarat-384758"}<br/><br/>
              GSTIN: ${gatePassDetails?.bill_to?.gst || "241CSPP9377PIZB"}
            </td>
            <td style="width: 50%; padding: 6px; vertical-align: top;">
              <b>${gatePassDetails?.ship_to?.name || "XYZ Trade Pvt. Ltd."}</b><br/>
              ${gatePassDetails?.ship_to?.address || "76/E, Jagdishpura Complex Vastuviher Naroda Ahmedabad, Gujarat-384758"}<br/>
                <br/>
                GSTIN: ${gatePassDetails?.ship_to?.gst || "241CSPP9377PIZB"}
              
            </td>
          </tr>
        </table>



<!-- Items Table -->
<table style="width: 100%; border: 1px solid #000; border-collapse: collapse; font-size: 9pt; margin-top: 8px; text-align: left;">
  <thead>
    <tr style="background: #f0f0f0; font-weight: bold; text-align: center;">
      <th style="width: 5%; border: 1px solid #000; padding: 4px;">S.N.</th>
      <th style="width: 10%; border: 1px solid #000; padding: 4px;">CODE</th>
      <th style="width: 69%; border: 1px solid #000; padding: 4px;">ITEM</th>
      <th style="width: 8%; border: 1px solid #000; padding: 4px;">QUANTITY</th>
      <th style="width: 8%; border: 1px solid #000; padding: 4px;">UOM</th>
    </tr>
  </thead>
  <tbody>
    ${(() => {
      // Show at least 10 rows
      const items = itemsData || [];
      let rows = "";

      for (let i = 0; i < Math.max(10, items.length); i++) {
        const item = items[i] || {};
        rows += `
          <tr>
            <td style="border: 1px solid #000; text-align: center; padding: 4px;">${i + 1}</td>
            <td style="border: 1px solid #000; text-align: center; padding: 4px; font-weight: bold;">${item.code || ""}</td>
            <td style="border: 1px solid #000; padding: 4px;">${item.description || ""}</td>
            <td style="border: 1px solid #000; text-align: center; padding: 4px; font-weight: bold;">${item.quantity || ""}</td>
            <td style="border: 1px solid #000; text-align: center; padding: 4px;">${item.uom || ""}</td>
          </tr>
        `;
      }
      return rows;
    })()}
  </tbody>
</table>

 
        


      </div>
    `;

    const canvas = await html2canvas(container, { scale: 1.5, useCORS: true });
    const imgData = canvas.toDataURL("image/jpeg", 0.7);
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
    document.body.removeChild(container);
    pdf.save(`GatePass_Header.pdf`);
  } catch (error) {
    console.log("error", error);
  } finally {
    setLoading(false);
  }
};




  useEffect(() => {
    if (saleOrderItems?.length > 0 && rows.length === 1) {
      // const formattedRows = prefillRows(saleOrderItems);
      // setRows(formattedRows);
    }
  }, [saleOrderItems, contentModal]);


  useEffect(() => {
    if (!saleOrderItems) return;

    const verifiedIds = saleOrderItems?.filter((row) => row?.isVerified).map((row) => row._id);

    setSelectedProducts((prev) => { const updated = [...new Set([...prev, ...verifiedIds])]; return updated; });

  }, [saleOrderItems]);




  // Function to handle input changes
  // const handleChangeRow = (index, field, value) => {
  //   const updatedRows = [...rows];
  //   updatedRows[index][field] = value;
  //   setRows(updatedRows);

  // };

  // const handleChangeRow = (index, field, value) => {
  //   const updatedRows = [...rows];

  //   if (!updatedRows[index]) {
  //     updatedRows[index] = {};
  //   }

  //   let fieldsToUpdate = {};

  //   // ✅ Support both: single field or multiple fields via object
  //   if (typeof field === 'object') {
  //     fieldsToUpdate = field;
  //   } else {
  //     const isNumberField = ['quantity_accepted', 'line_number', 'quantity_rejected'].includes(field);
  //     const parsedValue =
  //       value === '' ? '' : isNaN(Number(value)) ? value : Number(value);

  //     fieldsToUpdate[field] = isNumberField ? parsedValue : value;
  //   }

  //   const newRow = {
  //     ...updatedRows[index],
  //     ...fieldsToUpdate
  //   };


  //   updatedRows[index] = newRow;
  //   setRows(updatedRows);
  // };

  const handleChangeRow = (index, field, value, packIndex = 0) => {
    const updatedRows = [...rows];

    if (!updatedRows[index]) {
      updatedRows[index] = {};
    }

    // Normal field update
    if (field !== "packing") {
      let fieldsToUpdate = {};

      if (typeof field === "object") {
        fieldsToUpdate = field;
      } else {
        const isNumberField = ["quantity_accepted", "line_number", "quantity_rejected"].includes(field);
        const parsedValue =
          value === "" ? "" : isNaN(Number(value)) ? value : Number(value);

        fieldsToUpdate[field] = isNumberField ? parsedValue : value;
      }

      updatedRows[index] = {
        ...updatedRows[index],
        ...fieldsToUpdate
      };
    } else {
      // ✅ Special case: packing array
      const packingList = [...(updatedRows[index].packing || [])];
      packingList[packIndex] = {
        ...packingList[packIndex],
        ...value, // expects { packed_quantity: "10" } or { packing_type: "Box" }
      };

      updatedRows[index] = {
        ...updatedRows[index],
        packing: packingList,
      };
    }

    setRows(updatedRows);
  };


  //Handele log activity
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedSOId, setSelectedSOId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenLogModal = (itemId, SaleOrderId) => {
    setSelectedItemId(itemId);
    setSelectedSOId(SaleOrderId);
    setModalOpen(true);
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
  const [inventoryRejectedItemData, setInventoryRejectedItemData] = useState();
  console.log("inventoryRejectedItemData", inventoryRejectedItemData)
  //   getSubCategoriesApi
  const fetchSaleorders = async (sortValue) => {
    // Set loading to true when the API call starts
    setLoading(true);
    try {
      const res = await getGatePassItemsApi(
        params,
        currentPage,
        sort,
        sortValue,
        searchInputValue
      );
      console.log(res, "-*/-/-*/-/-*/-*/-*/-*/854654654*-/-*/5465-*-*/5445-*")

      setSaleOrderItems(res?.data?.data);
      setInventoryRejectedItemData(res?.data?.data)
      setRows(res?.data?.data)

    } catch (error) {
      // Catch and handle errors
      console.error("Error fetching data:", error);
      Toaster.error("Failed to load data. Please try again.");
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      setLoading(false);
    }
  }

  // const fetchSaleorders = async () => {
  //   try {
  //     const res = await GetSaleOrderItemsData(params);
  //     const data = res?.data?.item;
  //     setSaleOrderItems(data);
  //     setRows(data); //data in table set from here
  //   } catch (err) {
  //     console.log("errror", err);
  //   }
  // };

  useEffect(() => {
    fetchSaleorders();
    fetchAllOperatorsList();
  }, [handleSubmitClick]);


  useEffect(() => {
    const fetchInventory = async () => {
      if (saleOrderItems?.length > 0) {
        try {
          const productIds = saleOrderItems?.map(item => item.product_id);
          // Remove duplicates
          const uniqueProductIds = [...new Set(productIds)];
          const inventoryCheckRes = await checkProductsInInventoryApi({
            product_ids: uniqueProductIds,
          });

          setInventoryData(inventoryCheckRes?.data?.products)



        } catch (error) {
          console.error("Error fetching inventory:", error);
        }
      }
    };
    fetchInventory();
  }, [saleOrderItems, handleSubmitClick]);

  // Merge available_quantity into rows once both data sets are loaded
  useEffect(() => {
    if (saleOrderItems?.length > 0 && inventoryData.length > 0) {
      // Create a quick lookup map for inventory data
      const inventoryMap = new Map(
        inventoryData.map(inv => [
          inv.product_id,
          {
            available_quantity: inv.inventoryDetails?.available_quantity || 0,
            lastAssignQuantity: inv.inventoryDetails?.lastAssignQuantity || 0,
            inventory_id: inv.inventoryDetails?._id
          }
        ])
      );

      // Merge both available_quantity and inventory_id into each row
      const mergedRows = saleOrderItems.map(item => {
        const invData = inventoryMap.get(item.product_id) || {};
        console.log("invData", invData)
        return {
          ...item,
          available_quantity: invData.available_quantity ?? 0,
          lastAssignQuantity: invData?.lastAssignQuantity,
          inventory_id: invData.inventory_id || null
        };
      });

      setRows(mergedRows);
    }
  }, [saleOrderItems, inventoryData, handleSubmitClick]);


  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };






  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setHandleSubmitClick(true);

  //   try {
  //     // 1️⃣ Filter rows that have packing_quantity
  //     const payloadItems = rows?.flatMap((item) => {
  //       if (item.packing_quantity) {
  //         return { ...item };
  //       }
  //       return [];
  //     });

  //     // 2️⃣ Payload for Packing Details
  //     // const payloadDetails = {
  //     //   soDetails
  //     // };

  //     // const payloadDetails = {
  //     //   so_id: soDetails._id,
  //     //   date: soDetails.order_details?.date,
  //     //   voucher_no: soDetails.voucher_no,
  //     //   created_by: soDetails.createdBy,
  //     // };

  //     // 3️⃣ Validation
  //     if (payloadItems.length === 0) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Note",
  //         text: "No items with packing quantity!",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       // setHandleSubmitClick(false);
  //       return;
  //     }

  //     // console.log("Packing Details Payload:", payloadDetails);



  //     // 4️⃣ Call Packing Details API first
  //     const packingDetailsRes = await createPackingDetailsApi(payloadDetails);
  //     // Replace with your actual API call function
  //     console.log("Packing Details Response:", packingDetailsRes);

  //     const packingDetailsId = packingDetailsRes?.data?.data?._id; // Extract ID

  //     if (!packingDetailsId) {
  //       throw new Error("Packing Details ID not returned from API");
  //     }

  //     // 5️⃣ Add packingDetails_id to each item
  //     // const payloadWithPackingId = payloadItems.map((item) => ({
  //     //   ...item,
  //     //   packingDetails_id: packingDetailsId,
  //     // }));
  //     const payloadWithPackingId = payloadItems.map((item) => ({
  //       // item,
  //       packingDetails_id: packingDetailsId,      // 1️⃣ from previous API response
  //       so_id: soDetails._id,                     // 2️⃣ from Sales Order
  //       product_id: item.product_id,              // 3️⃣ product reference
  //       packing_quantity: item.packing_quantity,  // 4️⃣ user input
  //       ordered_quantity: item.ordered_quantity,  // 5️⃣ from SO
  //     }));



  //     console.log("Payload for Packing Items API:", payloadWithPackingId);

  //     // 6️⃣ Call Packing Items API
  //     const packingItemsRes = await createPackingItemsApi(payloadWithPackingId);
  //     // Replace with your actual API call function
  //     console.log("Packing Items Response:", packingItemsRes);

  //     // ✅ Success feedback
  //     Swal.fire({
  //       icon: "success",
  //       title: "Success",
  //       text: "Packing details and items saved successfully!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });

  //     setHandleSubmitClick(false);
  //   } catch (error) {
  //     console.error("Error during form submission:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message || "Something went wrong",
  //       showConfirmButton: true,
  //     });
  //     setHandleSubmitClick(false);
  //   }
  // };


  const handleSaveAsDraft = async (e) => {
    e.preventDefault();
    exportPDF(soDetails, rows)
    // Swal.fire({
    //   icon: "success",
    //   title: "Gate Pass",
    //   text: "Gate Pass is verfied and Genrated successfully!",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    // try {
    //   // 1️⃣ Filter rows that have packing_quantity
    //   const payloadItems = rows?.flatMap((item) => {
    //     if (item.packing.length > 0) {
    //       return { ...item };
    //     }
    //     return [];
    //   });

    //   // 2 Validation
    //   if (payloadItems?.length === 0) {
    //     Swal.fire({
    //       icon: "warning",
    //       title: "Note",
    //       text: "No items with packed quantity!",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     return;
    //   }

    //   console.log("payloadItems", payloadItems)

    //   //3 Call Packing Items API
    //   setLoading(true);
    //   const savePackedItems = await savePackingItemsApi(payloadItems);
    //   setLoading(false);
    //   console.log("savePackedItems", savePackedItems)
    //   if (savePackedItems) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Save",
    //       text: "Items Saved Successfully!",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     return;
    //   }


    // } catch (error) {
    //   console.log(error)
    // }
  };

  const handleFinalizeGatePass = async (packingDetailsData) => {
    console.log("packingDetailsData", packingDetailsData)

    const payloadPackingDetails = {
      ...packingDetailsData,
      party_id: soDetails?.customer_id?._id,
      party_name: `${soDetails?.customer_id?.fname} ${soDetails?.customer_id?.lname}`,
      isFinalize: true,
      isFinalizeBy: soDetails?.customer_id?._id,
      so_id: soDetails?._id,
      packingDetails_id: params

    }

    console.log("payloadPackingDetails", payloadPackingDetails)

    try {
      setLoading(true);
      const savePackingDetails = savePackingDetailsApi(payloadPackingDetails);
      console.log(savePackingDetails)
      if (savePackingDetails) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Something went wrong",
          showConfirmButton: true,
        });
        setLoading(false);
      }
      setLoading(false);

    } catch (error) {
      console.log(error)
    }
  };

  const handleVerifyClick = (row, index) => {
    // setSelectedRowData(row);
    setSelectedRowData({ ...row }); // Set selected row data
    setSelectedRowIndex(index);
    setVerifyShowModal(true);
  };






  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />
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
                  {/* <div className="col-sm-8">
                    <h2 className="header-title">Rajdhani - Verify Order</h2>
                  </div> */}
                  <div className="col-sm-4">
                    <h2 className="header-title" style={{ display: 'inline', whiteSpace: 'nowrap' }}>
                      Rajdhani - Gate Pass Items
                    </h2>
                  </div>
                </div>

                <div className="addresses mt-3">
                  <hr />
                  <div className="row">

                    <div className="col-md-6 col-xl-4 address-block">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ margin: 0 }}>Voucher No.</h5>
                        {/* <p style={{ margin: 0 }}>{inventoryRejectedItemData[0]?.inventoryrejectiondetails_id?.so_id?.voucher_no}</p> */}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ margin: 0 }}>Buyer’s Ref./Order No.</h5>
                        {/* <p style={{ margin: 0 }}>{inventoryRejectedItemData[0]?.inventoryrejectiondetails_id?.so_id?.voucher_no}</p> */}
                      </div>
                    </div>

                    <div className="col-md-6 col-xl-4 address-block">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ margin: 0 }}>Dated</h5>
                        <p style={{ margin: 0 }}>
                          {/* {new Date(inventoryRejectedItemData[0]?.inventoryrejectiondetails_id?.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })} */}
                        </p>
                      </div>
                      {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ margin: 0 }}>Mode/Terms of Payment</h5>
                        <p style={{ margin: 0 }}>-</p>
                      </div> */}
                    </div>

                    <div className="col-md-6 col-xl-4 address-block">
                      {/* Terms of Delivery */}
                      <div className="order-info">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h5 style={{ margin: 0 }}>Terms of Delivery</h5>
                          <p style={{ margin: 0 }}></p>
                        </div>

                        {/* <p className="po-view-p">{purchaseOrderData?.customer_id?.company_name}</p>


                        <p className="po-view-p">
                          {purchaseOrderData?.customer_id?.address}
                        </p>
                        <p className="po-view-p">
                          {purchaseOrderData?.customer_id?.state}, {purchaseOrderData?.customer_id?.city}, {purchaseOrderData?.customer_id?.country}
                        </p>
                    
                        <p className="po-view-p">
                          Email: {purchaseOrderData?.customer_id?.email}
                        </p> */}

                      </div>
                    </div>

                  </div>
                  <hr />
                </div>





              </div>
            </div>








            {/* Product Table */}
            <Row>
              <Col lg={12}>
                <div className="">
                  <div className="card-header pb-0 px-0">
                    <h4 className="card-title">Gate Pass Items</h4>
                    <div className="mb-3">
                      {/* Analytics Badge Boxes */}
                      <div class="d-flex flex-wrap gap-2 mt-2">
                        <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#e7f3ff" }}>
                          Total Items: {purchaseOrderData?.total_quantity ? purchaseOrderData?.total_quantity : 0}
                        </div>
                        {/* <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#e8f5e9" }}>
                                    Total Verified Items: {purchaseOrderData?.total_amount ? purchaseOrderData?.total_amount : 0} INR
                                </div> */}
                        {/* <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#e0f7fa" }} >
                                    Total Unverified Items: {purchaseOrderData?.total_products ? purchaseOrderData?.total_products : 0}
                                </div> */}
                      </div>

                    </div>
                  </div>
                  <div className="card-body px-0">
                    <div className="table-responsive">
                      <div
                        id="holidayList"
                        className="dataTables_wrapper no-footer">
                        <div className="justify-content-between d-sm-flex">
                          {/* <div className="dataTables_length">
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
                          </div> */}


                        </div>

                        <table id="example4" className="display dataTable no-footer w-100">
                          {/* Table Headings */}
                          <thead>
                            <tr>
                              {theadData?.map((item, ind) => {
                                return (
                                  <>
                                    {item.sortingVale === "verify" ? (
                                      <th
                                        key={ind}
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column', // stack text and checkbox vertically
                                          alignItems: 'center',    // center horizontally
                                          justifyContent: 'center', // center vertically if needed
                                          padding: '10px',
                                          userSelect: 'none',
                                        }}
                                      >
                                        <span style={{ fontWeight: '600', marginBottom: '6px' }}>
                                          {item.heading}
                                        </span>

                                        <label
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '15px',
                                            height: '15px',
                                            borderRadius: '50%',
                                            transition: 'background-color 0.2s ease, transform 0.2s ease',
                                            cursor: 'pointer',
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={(e) => {
                                              const checked = e.target.checked;
                                              setSelectAll(checked);

                                              if (checked) {
                                                const allIds = purchaseOrderProdcutList.map((item) => item._id);
                                                setSelectedProducts(allIds);
                                              } else {
                                                setSelectedProducts([]);
                                              }
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                              width: '20px',
                                              height: '20px',
                                              borderRadius: '50%',
                                              accentColor: '#007bff',
                                              cursor: 'pointer',
                                              transition: 'transform 0.2s ease',
                                            }}
                                            onMouseDown={(e) => {
                                              e.target.style.transform = 'scale(0.9)';
                                            }}
                                            onMouseUp={(e) => {
                                              e.target.style.transform = 'scale(1)';
                                            }}
                                          />
                                        </label>
                                      </th>
                                    ) : (
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
                                            <i className="fa fa-sort ms-2 fs-12" style={{ opacity: "0.3" }} />
                                          )}
                                          {ind === iconData.ind &&
                                            (iconData.complete ? (
                                              <i className="fa fa-arrow-down ms-2 fs-12" style={{ opacity: "0.7" }} />
                                            ) : (
                                              <i className="fa fa-arrow-up ms-2 fs-12" style={{ opacity: "0.7" }} />
                                            ))}
                                        </span>
                                      </th>
                                    )}

                                  </>


                                );
                              })}
                            </tr>
                          </thead>

                          <tbody >
                            {rows?.map((row, index) => (
                              console.log("row's data is here----->", rows),
                              <tr key={row.id}
                                //  onClick={() => handleVerifyClick(row)} 
                                onClick={(e) => {
                                  const target = e.target;

                                  // Prevent modal from opening when clicking on an active input or button
                                  if (target.tagName === "BUTTON") return;
                                  if (target.tagName === "INPUT" && !target.disabled) return;


                                  // Open modal if clicking on a disabled input or any other row area
                                  handleVerifyClick(row, index);
                                }}
                                style={{ cursor: "pointer" }}>
                                {/* S.no. */}
                                <td><strong>{index + 1}</strong> </td>

                                {/* Product Name */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={row?.product_id?.desc_Code}
                                    onClick={() =>
                                      setFocusedInputIndex((prev) => (prev === index ? null : index))
                                    }
                                    // onChange={(e) =>
                                    //   handleChangeRow(index, "product_name", e.target.value)
                                    // }
                                    className="form-control row-input"
                                    style={{
                                      width: focusedInputIndex === index ? "600px" : "300px",
                                      transition: "width 0.3s ease",
                                      cursor: "pointer",
                                    }}
                                  />
                                </td>
                                {/* product fitting Code */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="100001"
                                    value={row?.product_id?.fitting_Code}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "product_code",
                                        e.target.value
                                      )
                                    }
                                    className="form-control row-input"
                                    style={{ width: "220px" }}
                                  />
                                </td>
                                {/* product Code */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="100001"
                                    value={row?.product_id?.product_code}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "product_code",
                                        e.target.value
                                      )
                                    }
                                    className="form-control row-input"
                                    style={{ width: "90px" }}
                                  />
                                </td>
                                {/* Packed quantity */}
                                <td>
                                  <input
                                    type="number"
                                    placeholder="Packed Quantity"
                                    value={row?.packing_quantity || ""}
                                    disabled
                                    // value={row?.packed_quantity}
                                    onChange={(e) =>
                                      handleChangeRow(index, "packing", { packed_quantity: e.target.value }, 0)

                                      // handleChangeRow(
                                      //   index,
                                      //   "packed_quantity",
                                      //   e.target.value
                                      // )
                                    }
                                    className="form-control"
                                  />
                                </td>
                                {/* uom */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="UOM"
                                    value={row?.product_id?.uom}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "uom",
                                        e.target.value
                                      )
                                    }
                                    className="form-control row-input"
                                    style={{ width: "70px" }}
                                  />
                                </td>
                                {/* Packing type */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="EX : Box, Roll, Bag"
                                    value={`${row?.packing?.[0]?.packing_type}-${row?.packing?.[0]?.packed_quantity} , ${row?.packing?.[1]?.packing_type}-${row?.packing?.[1]?.packed_quantity}` || ""}
                                    // onChange={(e) =>
                                    //   handleChangeRow(index, "packing", { packing_type: e.target.value }, 0)

                                    //   // handleChangeRow(
                                    //   //   index,
                                    //   //   "packing_type",
                                    //   //   e.target.value
                                    //   // )
                                    // }
                                    className="form-control"
                                    style={{ width: "150px" }}
                                  />
                                </td>
                                {/* weight */}
                                <td>
                                  <input
                                    type="number"
                                    placeholder="10 kg"
                                    value={row?.product_id?.weight}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "weight",
                                        e.target.value
                                      )
                                    }
                                    className="form-control row-input"
                                    style={{ width: "70px" }}
                                  />
                                </td>
                                {/* price */}
                                {/* <td>
                                  <input
                                    type="number"
                                    placeholder="Price Per Unit"
                                    value={row?.product_id?.price}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "price_per_unit",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "120px" }}
                                  />
                                </td> */}
                                {/* discount */}
                                {/* <td>
                                  <input
                                    type="number"
                                    placeholder="Discount Per Unit"
                                    value={row?.product_id?.discount_per_unit}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "discount_per_unit",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "170px" }}
                                  />
                                </td> */}
                                {/* cgst */}
                                {/* <td>
                                  <input
                                    type="text"
                                    placeholder="CGST"
                                    value={row.cgst}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "cgst",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "70px" }}
                                  />
                                </td> */}
                                {/* sgst */}
                                {/* <td>
                                  <input
                                    type="text"
                                    placeholder="SGST"
                                    value={row.sgst}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "sgst",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "70px" }}
                                  />
                                </td> */}
                                {/* igst */}
                                {/* <td>
                                  <input
                                    type="text"
                                    placeholder="IGST"
                                    value={row.igst}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "igst",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "70px" }}
                                  />
                                </td> */}
                                {/* amount */}
                                {/* <td>
                                  <input
                                    type="text"
                                    placeholder="100"
                                    value={row?.amount}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "total_amount",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "90px" }}
                                    disabled
                                  />
                                </td> */}






                                {/* Ordered quantity */}
                                {/* <td>
                                  <input
                                    type="number"
                                    placeholder="Ordered Quantity"
                                    value={row?.ordered_quantity}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "ordered_quantity",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                  />
                                </td> */}

                                {/* Packed quantity */}
                                {/* <td>
                                  <input
                                    type="number"
                                    placeholder="Packed Quantity"
                                    value={row?.packing?.[0]?.packed_quantity || ""}
                                    // value={row?.packed_quantity}
                                    onChange={(e) =>
                                      handleChangeRow(index, "packing", { packed_quantity: e.target.value }, 0)

                                      // handleChangeRow(
                                      //   index,
                                      //   "packed_quantity",
                                      //   e.target.value
                                      // )
                                    }
                                    className="form-control"
                                  />
                                </td>
                                 */}
                                {/* Packing type */}
                                {/* <td>
                                  <input
                                    type="text"
                                    placeholder="EX : Box, Roll, Bag"
                                    value={row?.packing?.[0]?.packing_type || ""}
                                    onChange={(e) =>
                                      handleChangeRow(index, "packing", { packing_type: e.target.value }, 0)

                                      // handleChangeRow(
                                      //   index,
                                      //   "packing_type",
                                      //   e.target.value
                                      // )
                                    }
                                    className="form-control"
                                  />
                                </td> */}


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



            {/* Footer Section */}

            {/* Buttons  */}
            {/* <div className="d-flex gap-3 justify-content-end text-end mt-3 mt-md-0">
              <button
                type="submit"
                // onClick={handleVerify}
                onClick={handleSaveAsDraft}
                className="btn btn-primary rounded-sm">
                Save Items
              </button>

              <button
                type="submit"
                onClick={handleSaveAsDraft}
                className="btn btn-warning rounded-sm">
                Finalize for Gate Pass
              </button>
            </div> */}
            <div className="d-flex gap-3 justify-content-end text-end mt-3 mt-md-0">
              {/* Save Items Button */}
              <button
                type="button"
                onClick={handleSaveAsDraft}
                style={{
                  background: "linear-gradient(90deg, #2196F3, #1565C0)", // blue shades
                  color: "white",
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "linear-gradient(90deg, #1E88E5, #0D47A1)";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0px 6px 12px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "linear-gradient(90deg, #2196F3, #1565C0)";
                  e.target.style.transform = "translateY(0px)";
                  e.target.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.15)";
                }}
              >
                Generate GatePass
              </button>



              <button
                type="submit"
                onClick={handleSaveAsDraft}
                style={{
                  background: "linear-gradient(90deg, #4CAF50, #2E7D32)",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "linear-gradient(90deg, #43A047, #1B5E20)";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0px 6px 12px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "linear-gradient(90deg, #4CAF50, #2E7D32)";
                  e.target.style.transform = "translateY(0px)";
                  e.target.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.15)";
                }}
              >
                Verify
              </button>

              {/* Finalize for Gate Pass Button */}
              {/* <button
                type="submit"
                onClick={() => setFinalizeModal(true)}
                // onClick={handleFinalizeGatePass}
                style={{
                  background: "linear-gradient(90deg, #FF9800, #F57C00)",
                  color: "white",
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "linear-gradient(90deg, #FB8C00, #E65100)";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0px 6px 12px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "linear-gradient(90deg, #FF9800, #F57C00)";
                  e.target.style.transform = "translateY(0px)";
                  e.target.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.15)";
                }}
              >
                Verify and Genrate GatePass
              </button> */}
            </div>


            {/* 
            <GatePassPDF
              gatePassDetails={soDetails}
              gatePassItems={rows}

            // rowsPerPage={rowsPerPage}
            // currentPage={currentPage}

            /> */}

          </div>
        </div>
      </div>


      {/* Verify Modal */}
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background effect
        }}
        centered
        show={verifyShowModal} onHide={() => setVerifyShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Packing Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {selectedRowData && (
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0)", // Fully transparent background
                borderRadius: "8px",
                padding: "12px",
                // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)", // Semi-transparent border
                width: "100%",
                fontSize: "13px",
                backdropFilter: "blur(5px)", // Optional: Glassmorphism effect
              }}
            >
              <h6 style={{ fontWeight: "600", marginBottom: "8px", color: "#222", textAlign: "center" }}>
                Product Details
              </h6>
              {/* Product Details Table-like Grid with Borders */}
              <div style={{ display: "grid", gridTemplateColumns: "140px auto", fontSize: "13px", border: "1px solid #D3D3D3", borderRadius: "8px", padding: "5px", }}>
                {[
                  { label: "Product Name", value: selectedRowData?.product_id?.desc_Code },
                  { label: "Product Code", value: selectedRowData?.product_id?.product_code },
                  { label: "Ordered Qty", value: selectedRowData?.ordered_quantity },
                  { label: "Weight", value: selectedRowData?.product_id?.weight },
                  { label: "UOM", value: selectedRowData?.product_id?.uom },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>{item.label}:</div>
                    <div style={{ color: "#666", padding: "6px 0", borderBottom: "1px dotted #ccc" }}>{item.value}</div>
                  </React.Fragment>
                ))}
              </div>
              {/* Available Quantity */}
              <td style={{ minWidth: "420px", }}>
                <div className="d-flex align-items-center gap-2" style={{ marginTop: '15px' }}>
                  {/* Total Assign Quantity */}

                  <span className="text-muted">{`Available Packing Quantity : ${selectedRowData?.packing_quantity}` || 0}</span>

                  {/* Small Progress Bar */}
                  <div
                    className="progress flex-grow-1"
                    style={{
                      height: "6px",
                      borderRadius: "3px",
                      backgroundColor: "#28a745", // light gray background
                      overflow: "hidden", // ensure bar fills correctly
                    }}
                  >

                  </div>
                </div>
              </td>
              {/* Packed By Selectors */}

              {/* <td onClick={(e) => e.stopPropagation()}>
                <Select
                  isMulti
                  options={searchTerms[selectedRowIndex] ? operatorsOption : []}
                  placeholder="Search operators"
                  isLoading={loading}
                  value={
                    Array.isArray(rows[0]?.operator_name)
                      ? rows[0].operator_name
                        .map((name) =>
                          operatorsOption?.find((item) => item.label === name)
                        )
                        .filter(Boolean)
                      : []
                  }
                  onChange={(selectedOptions) => {
                    const selectedNames = selectedOptions.map((opt) => opt.label);
                    const selectedIds = selectedOptions.map((opt) => opt.value);

                    handleChangeRow(selectedRowIndex, {
                      operator_name: selectedNames,
                      operator_id: selectedIds,
                    });
                  }}
                  onInputChange={(inputValue) =>
                    handleOperatorNameSearch(inputValue, selectedRowIndex)
                  }
                  onFocus={() => setFocusedRowIndex(selectedRowIndex)}
                  onMenuClose={() =>
                    setSearchTerms((prev) => ({ ...prev, [selectedRowIndex]: "" }))
                  }
                  menuIsOpen={
                    focusedRowIndex === selectedRowIndex &&
                    !!searchTerms[selectedRowIndex]
                  }
                  isClearable
                  menuPortalTarget={document.body}
                  noOptionsMessage={() => "No matching operators found"}
                  styles={{
                    container: (base) => ({
                      ...base,
                      minWidth: "210px",
                      width: "auto",
                      display: "inline-block",
                    }),
                    control: (base, state) => ({
                      ...base,
                      minHeight: "30px",
                      height: "34px",
                      fontSize: "12px",
                      padding: "0 4px",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "nowrap",
                      borderColor: state.isFocused ? "#007bff" : "#ccc",
                      boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
                      width: "fit-content",
                      minWidth: "210px",
                      maxWidth: "100%",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: "5px",
                      alignItems: "center",
                      padding: "2px 6px",
                      flex: "1 1 auto",
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#e7f1ff",
                      borderRadius: "12px",
                      padding: "0 6px",
                      display: "flex",
                      alignItems: "center",
                      height: "22px",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      fontSize: "11px",
                      color: "#0056b3",
                      fontWeight: 500,
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#0056b3",
                      ":hover": {
                        backgroundColor: "#d0e7ff",
                        color: "#003d80",
                      },
                    }),
                    indicatorsContainer: (base) => ({
                      ...base,
                      height: "28px",
                      paddingLeft: "4px",
                      alignItems: "center",
                      flexShrink: 0,
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      padding: "2px",
                      marginTop: "2px",
                    }),
                    indicatorSeparator: (base) => ({
                      ...base,
                      height: "32px",
                      margin: "0 4px",
                    }),
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                />
              </td> */}


              {/* Packing Rows */}
              <div style={{ marginTop: "15px" }}>
                <h6 style={{ fontWeight: "600", color: "#333" }}>Packing Splits</h6>

                {(Array.isArray(selectedRowData?.packing) &&
                  selectedRowData.packing.length > 0
                  ? selectedRowData.packing
                  : [{ packed_quantity: "", packing_type: "" }]
                ).map((pack, idx) => (
                  <div key={idx} className="d-flex gap-2 align-items-center mb-2">
                    {/* Quantity */}
                    <input
                      type="number"
                      placeholder="Packing Quantity"
                      value={pack.packed_quantity}
                      onChange={(e) => {

                        setSelectedRowData((prev) => {
                          const list = [...(prev.packing || [])];
                          list[idx] = { ...list[idx], packed_quantity: e.target.value };
                          return { ...prev, packing: list };
                        })

                        handleChangeRow(selectedRowIndex, "packing", { packed_quantity: e.target.value }, idx);
                      }



                      }

                      className="form-control"
                      min="0"
                      style={{ width: 150 }}
                      onClick={(e) => e.stopPropagation()}
                    />

                    {/* Type */}
                    <input
                      type="text"
                      placeholder="Packing Type (Box/Bag/Roll)"
                      value={pack.packing_type}
                      onChange={(e) => {
                        setSelectedRowData((prev) => {
                          const list = [...(prev.packing || [])];
                          list[idx] = { ...list[idx], packing_type: e.target.value };
                          return { ...prev, packing: list };
                        })

                        handleChangeRow(selectedRowIndex, "packing", { packing_type: e.target.value }, idx);
                      }
                      }
                      className="form-control"
                      style={{ width: 200 }}
                      onClick={(e) => e.stopPropagation()}
                    />

                    {/* Remove (except first row) */}
                    {idx > 0 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRowData((prev) => {
                            const list = [...(prev.packing || [])];
                            list.splice(idx, 1);
                            return { ...prev, packing: list };
                          });
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                {/* Add New Row */}
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRowData((prev) => ({
                      ...prev,
                      packing: [
                        ...(prev.packing || []),
                        { packed_quantity: "", packing_type: "" },
                      ],
                    }));
                    // ✅ update rows also
                    setRows((prevRows) => {
                      const updatedRows = [...prevRows];
                      updatedRows[selectedRowIndex] = {
                        ...updatedRows[selectedRowIndex],
                        packing: [
                          ...(updatedRows[selectedRowIndex]?.packing || []),
                          { packed_quantity: "", packing_type: "" },
                        ],
                      };
                      return updatedRows;
                    });

                  }}
                >
                  + Add Packing Split
                </button>
              </div>


            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setVerifyShowModal(false)}>Close</Button>
          <Button variant="success" onClick={() => setVerifyShowModal(false)}>Save</Button>
        </Modal.Footer>
      </Modal>


      {/* Item wise log activity modal box */}
      <LogActivityItemsModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        itemId={selectedItemId}
        saleOrderID={selectedSOId}
        stage="Assign And Reserve Quantity Activity"
      // productionProcessID={producitonProcessDetails?._id}
      />



      {/* <FinalizeGatePassModal
        show={finalizeModal}
        onHide={() => setFinalizeModal(false)}
        onSubmit={handleFinalizeGatePass}
        selectedRowData={selectedRowData}
      /> */}

    </>
  );
};

export default GatePassItems;



