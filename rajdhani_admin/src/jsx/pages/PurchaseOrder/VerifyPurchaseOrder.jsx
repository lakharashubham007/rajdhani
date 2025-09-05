import { useNavigate, useParams } from "react-router-dom";
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
import BillCard from "../../components/PurchaseOrder/BillCard";
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
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt, FaFileCsv } from "react-icons/fa"; // Icons from react-icons
// import ImageViewer from "./ImageViewer";
import PdfView from "./PdfViewer";
import * as XLSX from "xlsx";



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
  { heading: "Fitting Code", sortingVale: "fitting_Code" },
  { heading: "Product Code", sortingVale: "product_code" },
  { heading: "Quantity", sortingVale: "quantity" },
  { heading: "UOM", sortingVale: "uom" },
  { heading: "Weight(kg)", sortingVale: "weight" },
  { heading: "Price", sortingVale: "price" },
  { heading: "Discount Per Unit", sortingVale: "discount_per_unit" },
  { heading: "CGST", sortingVale: "cgst" },
  { heading: "SGST", sortingVale: "sgst" },
  { heading: "IGST", sortingVale: "igst" },
  { heading: "Cess", sortingVale: "Cess" },
  { heading: "Amount", sortingVale: "amount" },
  { heading: "Created At", sortingVale: "created_at" },
  // { heading: "Status", sortingVale: "status" },
  // { heading: "Action", sortingVale: "action" },
];

const supportedTypes = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "text/plain": "txt",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "text/csv": "csv",
};


const VerifyPurchaseOrder = () => {
  const params = useParams()?.id;
  const navigate = useNavigate();
  const billTableRef = useRef(null);
  const [sort, setSortata] = useState(10);
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [purchaseOrderProdcutList, setPurchaseOrderProdcutList] = useState([]);
  console.log("purchaseOrderProdcutList", purchaseOrderProdcutList)
  const [billData, setBillData] = useState([]);
  const [errors, setErrors] = useState({});
  const [formBillingData, setFormBillingData] = useState({});
  console.log("formBillingData",formBillingData)
  const [formData, setFormData] = useState({});
  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const [currentPage, setCurrentPage] = useState(1);
  const [singleBillData, setSingleBillData] = useState({});
  const [contentModal, setContentModal] = useState(false);
  const [verifyShowModal, setVerifyShowModal] = useState(false);
  const [productOption, setProductOption] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const [files, setFiles] = useState([]);
  const [pdfSrc, setPdfSrc] = useState(null);
  const [fileType, setFileType] = useState(""); 
  const[openPdfModal,setOpenPdfModal]=useState(false);
  const [excelData, setExcelData] = useState([]);



  const [rows, setRows] = useState([
    {
      id: 1,
      _id: "",
      product_name: "",
      sku: "",
      unit: "",
      variant: "",
      variant_type: "",
      uom: "",
      uom_qty: "",
      quantity: "",
      price_per_unit: "",
      discount_per_unit: "",
      total_discount: "",
      cgst: "",
      sgst: "",
      igst: "",
      cess: "",
      amount: "",
      received_quantity: "",
      verified_quantity: "",
      ordered_quantity: "",
      is_short_close: ""
    },
  ]);
  console.log("rows rows rows rows ==========>", rows);
  console.log("formBillingData formBillingData==========>", formBillingData);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();
  console.log("selectedRowData selectedRowData selectedRowDataselectedRowData", selectedRowData)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  const handleBillingDetailChange = (e) => {
    const { name, value } = e.target;
    setFormBillingData((prevData) => ({
      ...prevData,
      [name]: value,
      purchase_order_id: params,
    }));
  };

  //pruducts dropdown
  const fetchProductAllList = async () => {
    setLoading(true);
    try {
      const res = await GetAllProductList();
      const dropdownProductList = res?.data?.products?.map((product) => ({
        value: product.desc_Code,
        label: product.desc_Code,
      }));
      setProductOption(dropdownProductList);
    } catch (error) {
      console.error("Error fetching data:", error);
      Toaster.error("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // Handle Short Close button click
  const handleShortClose = (id) => {
    Swal.fire({
      title: 'Are you sure you want to Short Close this item?',
      text: "Once Short Closed, you cannot reopen this item.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dd6b55',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, Short Close it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Update the is_short_close field to true for the specific row
        const updatedRows = rows.map((row) =>
          row.id === id ? { ...row, is_short_close: true } : row
        );
        setRows(updatedRows);

        Swal.fire(
          'Short Closed!',
          'This item has been marked as Short Closed.',
          'success'
        );
      }
    });
  };

  // const prefillRows = (data) => {
  //   return data.map((item, index) => ({
  //     id: index + 1, // Use index for SL
  //     product_name: item.product_name,
  //     sku: item.sku,
  //     unit: item.unit,
  //     variant: item.variant,
  //     variant_type: item.variant_type,
  //     uom: item.uom,
  //     uom_qty: item.uom_qty,
  //     quantity: item.quantity,
  //     price_per_unit: item.price_per_unit,
  //     discount_per_unit: item.discount_per_unit,
  //     total_discount: item.total_discount,
  //     cgst: item.cgst,
  //     sgst: item.sgst,
  //     igst: item.igst,
  //     cess: item.cess,
  //     amount: item.amount,
  //     received_quantity: item.received_quantity,
  //     verified_quantity: item.verified_quantity,
  //     ordered_quantity: item.ordered_quantity
  //   }));
  // };

  // Prefill rows function
  // const prefillRows = (data) => {
  //   return data.map((item, index) => {
  //     // Find the selected option based on product_name
  //     const selectedOption = productOption?.find(option => option?.value === item?.product_name);
  //     return {
  //       id: index + 1, // Use index for SL
  //       _id: item._id,
  //       product_name: item.product_name,
  //       selectedOption: selectedOption || null, // Set the selected option to the one found or null
  //       sku: item.sku,
  //       unit: item.unit,
  //       variant: item.variant,
  //       variant_type: item.variant_type,
  //       uom: item.uom,
  //       uom_qty: item.uom_qty,
  //       quantity: item.quantity,
  //       price_per_unit: item.price_per_unit,
  //       discount_per_unit: item.discount_per_unit,
  //       total_discount: item.total_discount,
  //       cgst: item.cgst,
  //       sgst: item.sgst,
  //       igst: item.igst,
  //       cess: item.cess,
  //       amount: item.amount,
  //       received_quantity: item.received_quantity,
  //       verified_quantity: item.verified_quantity,
  //       ordered_quantity: item.ordered_quantity
  //     };
  //   });
  // };

  const prefillRows = (data) => {
    console.log("data is here=========", data)
    return data
      .map((item, index) => {
        // Check the first condition: Exclude if ordered_quantity, received_quantity, and verified_quantity are equal
        const isQuantityMatched = item.ordered_quantity === item.received_quantity &&
          item.received_quantity === item.verified_quantity;

        // Check the second condition: Exclude if is_short_close is true
        const isShortClose = item.is_short_close;

        // Exclude row if any of the two conditions match
        if (isQuantityMatched || isShortClose) {
          return null; // Exclude this row (return null)
        }

        // Process the remaining rows
        const selectedOption = productOption?.find(option => option?.value === item?.product_name);
        return {
          id: index + 1,
          _id: item._id,
          product_name: item.product_name,
          product_code: item.product_code,
          fitting_Code: item?.fitting_Code,
          product_id: item?.product_id,
          product_unit: item?.product_unit,
          selectedOption: selectedOption || null,
          weight: item.weight,
          uom: item.uom,
          quantity: item.quantity,
          price: item.price,
          discount_per_unit: item.discount_per_unit,
          cgst: item.cgst,
          sgst: item.sgst,
          igst: item.igst,
          cess: item.cess,
          amount: item?.total_amount,
          received_quantity: item?.received_quantity,
          verified_quantity: item?.verified_quantity,
          ordered_quantity: item?.quantity,
        };
      })
      .filter(item => item !== null); // Remove the excluded rows (null values)
  };


  // useEffect(() => {
  //   if (purchaseOrderProdcutList.length > 0) {
  //     const formattedRows = prefillRows(purchaseOrderProdcutList); // Use the prefill function
  //     setRows(formattedRows); // Update the table rows
  //   }
  // }, [purchaseOrderProdcutList, contentModal]);

  useEffect(() => {
    console.log("(purchaseOrderProdcutList.length > 0 && rows.length === 1",purchaseOrderProdcutList, purchaseOrderProdcutList.length > 0, rows.length >= 1)
    if (purchaseOrderProdcutList.length > 0 && rows?.length >= 1) {
      const formattedRows = prefillRows(purchaseOrderProdcutList);
      console.log("useEffect calls successsfullyy------------->", formattedRows);
      setRows(formattedRows);
    }
  }, [purchaseOrderProdcutList, contentModal]);



  const calculateTotalAmount = () => {
    return rows.reduce((total, row) => {
      const quantity = parseFloat(row.quantity || 0);
      const pricePerUnit = parseFloat(row.price_per_unit || 0);
      const uomQty = parseFloat(row.uom_qty || 0); // Get the UOM Qty value
      return total + quantity * pricePerUnit * uomQty; // Include UOM Qty in the calculation
    }, 0);
  };


  // const handleProductChange = (selectedOption, index) => {
  //   const updatedRows = [...rows];
  //   updatedRows[index].selectedOption = selectedOption; // Update only the specific row's selectedOption
  //   updatedRows[index].product_name = selectedOption.value; // Update the product_name
  //   setRows(updatedRows);
  // };

  // Handle product change

  const handleProductChange = (selectedOption, index) => {
    // console.log(updatedRows[index].selectedOption,"updatedRows[index].selectedOptionupdatedRows[index].selectedOptionupdatedRows[index].selectedOptionupdatedRows[index].selectedOption");
    const updatedRows = [...rows];
    updatedRows[index].selectedOption = selectedOption; // Update only the specific row's selectedOption
    updatedRows[index].product_name = selectedOption ? selectedOption?.value : ''; // Update product_name based on selectedOption
    // updatedRows[index].product_id = selectedOption ? selectedOption?.id : '';
    setRows(updatedRows);
  };


  //to add a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        product_name: "",
        product_code: "",
        sku: "",
        unit: "",
        variant: "",
        variant_type: "",
        uom: "",
        uom_qty: "",
        quantity: "",
        price_per_unit: "",
        discount_per_unit: "",
        total_discount: "",
        cgst: "",
        sgst: "",
        igst: "",
        cess: "",
        amount: "",
      },
    ]);
  };

  const handleDeleteTableRow = (id) => {
    // Filter out the row with the matching id
    setRows(rows?.filter((row) => row.id !== id));
  };

  // Function to handle input changes
  const handleChangeRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

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
    fetchProductAllList();
  }, []);

  //For update bills on screen
  useEffect(() => {
    if (apiSuccess) {
      fetchPurchaseOrderCheckBill(); // Called only when `billData` changes
      setApiSuccess(false);
    }
  }, [apiSuccess]);

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
      preparedBy: "Rajdhani-SB Parts",
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
    console.log("getBillData", getBillData)

    if (billTableRef.current) {
      billTableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const styles = {
    container: {
      border: '2px dashed #ccc',
      borderRadius: '8px',
      width: '100%', // Size for image/file preview
      height: '70px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      backgroundColor: '#f9f9f9',
      position: 'relative',
      textAlign: 'center',
      overflow: 'hidden',
    },
    placeholder: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      textAlign: 'center',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '8px',
    },
    filePreview: {
      textAlign: 'center',
      color: '#888',
      position: 'relative',
      marginBottom: '10px',
    },
    previewContainer: {
      marginTop: '15px',
    },
    uploadIcon: {
      color: '#888',
      fontSize: '13px',
      fontWeight: 'semibold',
    },
    deleteIcon: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      backgroundColor: '#FF6D6D',
      color: 'white',
      borderRadius: '100%',
      padding: '4px 6px',
      cursor: 'pointer',
      zIndex: 2,
      fontSize: '8px',
      fontWeight: 'bold',
    },
  };

  // Handle the BILL logo image change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
      setFormBillingData({
        ...formBillingData,
        bill_doc: file, // Update the image field with the selected file
      });
      setErrors({
        ...errors,
        image: null, // Update the image field with the selected file
      });
    }
  };

  const handleDeleteLogo = () => {
    setLogo(null);
    document.getElementById("logoUpload").value = "";
  };


  //    //update purchase order item
  //   const UpdatePoItems = async(Bill_id,PO_ID)=>{

  //     const po_items_updated = rows?.map(({ id, selectedOption, ...rest }) => {
  //     return {
  //       ...rest,
  //       po_id: PO_ID,
  //       cess: parseFloat(rest.cess || 0),
  //       cgst: parseFloat(rest.cgst || 0),
  //       discount_per_unit: parseFloat(rest.discount_per_unit || 0),
  //       igst: parseFloat(rest.igst || 0),
  //       price_per_unit: parseFloat(rest.price_per_unit || 0),
  //       uom_qty: parseFloat(rest.uom_qty || 0),
  //       quantity: parseFloat(rest.quantity || 0),
  //       total_discount: parseFloat(rest.total_discount || 0),
  //       amount: parseFloat(rest.amount || 0),
  //       sgst: parseFloat(rest.sgst || 0),
  //     };
  //    });
  //      console.log("fDataProducts item for poi nd pobi" ,po_items_updated)
  //     try {
  //       const res = await updatePoItemForBillsApi(params, po_items_updated);
  //       console.log(res, "response is here");
  //       if (res.data?.success) {
  //         setLoading(false);
  //         // Show success message from backend
  //         // Toaster.success(res?.data?.message);
  //         Swal.fire({
  //           icon: "success",
  //           title: "Updated PO Items",
  //           text: res.data?.message,
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         // resetForm(); 
  //         // Reset form after success
  //         // navigate('/productlist');
  //       } else {
  //         setLoading(false);
  //         Toaster.error(res.data?.message || "Failed to create PO Items");
  //         console.error("PO items creation error:", res);
  //       }
  //     } catch (error) {
  //       // setLoading(false);
  //       // // Handle any errors during API request
  //       // Toaster.error(
  //       //   error.response?.data?.message ||
  //       //     "An error occurred while processing your request"
  //       // );
  //       // console.error("Error creating product:", error);
  //     }
  //   }

  //   //CreateBillItems
  // const CreateBillItems = async(Bill_id,PO_ID)=>{

  //     const bill_items_updated = rows?.map(({ id, selectedOption, ...rest }) => {
  //     return {
  //       ...rest,
  //       bill_id: Bill_id,
  //       po_id: PO_ID,
  //       cess: parseFloat(rest.cess || 0),
  //       cgst: parseFloat(rest.cgst || 0),
  //       discount_per_unit: parseFloat(rest.discount_per_unit || 0),
  //       igst: parseFloat(rest.igst || 0),
  //       price_per_unit: parseFloat(rest.price_per_unit || 0),
  //       uom_qty: parseFloat(rest.uom_qty || 0),
  //       quantity: parseFloat(rest.quantity || 0),
  //       total_discount: parseFloat(rest.total_discount || 0),
  //       amount: parseFloat(rest.amount || 0),
  //       sgst: parseFloat(rest.sgst || 0),
  //     };
  //    });
  //     //  console.log("fDataProducts item for poi nd pobi" ,bill_items_updated)
  //     try {
  //       const res = await createBillItemsApi(bill_items_updated);
  //       console.log(res, "response is here");
  //       if (res.data?.success) {
  //         setLoading(false);
  //         // Show success message from backend
  //         // Toaster.success(res?.data?.message);
  //         Swal.fire({
  //           icon: "success",
  //           title: "Bill Items Added Successflly!!!",
  //           text: res.data?.message,
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         // resetForm(); 
  //         // Reset form after success
  //         // navigate('/productlist');
  //       } else {
  //         setLoading(false);
  //         Toaster.error(res.data?.message);
  //       }
  //     } catch (error) {
  //       // setLoading(false);
  //       // // Handle any errors during API request
  //       // Toaster.error(
  //       //   error.response?.data?.message ||
  //       //     "An error occurred while processing your request"
  //       // );
  //       // console.error("Error creating product:", error);
  //     }
  //   }
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // if (!validateForm()) {
  //     //   return;
  //     // }
  //     // setLoading(true);
  //     try {
  //       const res = await addBillDetailsApi(formBillingData);
  //       if (res.data?.success) {
  //         setLoading(false);
  //         console.log("ress?.data",res?.data?.bill?._id);

  //         UpdatePoItems(res?.data?.bill?._id,params)
  //         CreateBillItems(res?.data?.bill)

  //         Swal.fire({
  //           icon: "success",
  //           title: "Bill",
  //           text: res.data?.message,
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         // resetForm(); // Reset form after success
  //         // navigate('/productlist');
  //       } else {
  //         setLoading(false);
  //         // Toaster.error(res.data?.message || "Failed to create product");
  //         console.error("Product creation error:", res);
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       // Handle any errors during API request
  //       // Toaster.error(
  //       //   error.response?.data?.message ||
  //       //     "An error occurred while processing your request"
  //       // );
  //       console.error("Error creating product:", error);
  //     }
  //   };



  // Helper function to parse numeric fields
  const parseFields = (item, additionalFields = {}) => ({
    ...item,
    ...additionalFields,
    cess: parseFloat(item.cess || 0),
    cgst: parseFloat(item.cgst || 0),
    discount_per_unit: parseFloat(item.discount_per_unit || 0),
    igst: parseFloat(item.igst || 0),
    price_per_unit: parseFloat(item.price_per_unit || 0),
    uom_qty: parseFloat(item.uom_qty || 0),
    quantity: parseFloat(item.quantity || 0),
    total_discount: parseFloat(item.total_discount || 0),
    amount: parseFloat(item.amount || 0),
    sgst: parseFloat(item.sgst || 0),
  });

  // Update Purchase Order Items
  const updatePoItems = async (billId, poId) => {
    const updatedPoItems = rows?.map(({ id, selectedOption, ...rest }) =>
      parseFields(rest, { po_id: poId })
    );
    try {
      const res = await updatePoItemForBillsApi(poId, updatedPoItems);
      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to update PO Items");
      }
    } catch (error) {
      console.error("Error updating PO items:", error);
      throw error; // Propagate the error
    }
  };

  // Create Bill Items
  const createBillItems = async (billId, poId, batchId) => {
    const updatedBillItems = rows?.map(({ id, selectedOption, _id, ...rest }) =>
      parseFields(rest, { bill_id: billId, po_id: poId, batch_id: batchId })
    );

    console.log("updatedBillItems,,,,,,,,,", updatedBillItems)

    try {
      const res = await createBillItemsApi(updatedBillItems);
      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to create Bill Items");
      }
      setApiSuccess(true);
      return res; // ✅ Return the API response
    } catch (error) {
      console.error("Error creating Bill items:", error);
      throw error; // Propagate the error
    }
  };

  // Handle Form Submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await addBillDetailsApi(formBillingData);

  //     if (res.data?.success) {
  //       const billId = res?.data?.bill?._id;
  //       const poId = params;

  //       // Update PO Items and Create Bill Items
  //       await updatePoItems(billId, poId);
  //       await createBillItems(billId, poId);

  //       // Show success alert only for Bill creation
  //       Swal.fire({
  //         icon: "success",
  //         title: "Bill Created Successfully",
  //         text: res.data?.message,
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       setContentModal(false);
  //     } else {
  //       throw new Error(res.data?.message || "Failed to create Bill");
  //     }
  //   } catch (error) {
  //     console.error("Error during form submission:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message || "An error occurred while processing your request.",
  //     });
  //   }
  // };

  // const handleSubmitDraft = async (e) => {
  //   e.preventDefault();

  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You are about to save this as a draft.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, save as draft",
  //     cancelButtonText: "Cancel",
  //   });

  //   if (result.isConfirmed) {
  //     const payload = { status: "In Pending" };

  //     try {
  //       const poId = params; // Replace `params` with the actual PO ID
  //       // First, submit the form (handleSubmit)
  //       const res = await handleSubmit(e); // Ensure it runs correctly

  //       const response = await updatePurchaseOrderStatusApi(poId, payload);

  //       if (response.data?.success) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Saved as Draft",
  //           text: response.data?.message,
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       } else {
  //         throw new Error(response.data?.message || "Failed to save as draft");
  //       }
  //     } catch (error) {
  //       console.error("Error saving as draft:", error);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error.message || "An error occurred while saving as draft.",
  //       });
  //     }
  //   }
  // };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //step 1 Create Bill High Level
      const res = await addBillDetailsApi(formBillingData);

      if (res.data?.success) {
        const billId = res?.data?.bill?._id;
        const poId = params;

        // Update PO Items
        //step 2 when bill created PO Items will updated with latest bill_id
        await updatePoItems(billId, poId);

        // ✅ Create Batch API
        const batchPayload = {
          batch_no: "Batch001",
          lot_no: "LOT101",
          po_id: poId,
          bill_id: billId,
        };

        //step 3 Batch Will create for a order
        const batchResponse = await createBatchApi(batchPayload);

        if (batchResponse.data?.success) {
          const batchId = batchResponse.data?.batch?._id;

          //step 4 All Bill items Saved with bill id , and batch id
          // ✅ Create Bill Items, now including batchId
          const billitems = await createBillItems(billId, poId, batchId);

          // console.log("billitems",billitems?.data?.bill_items[0]?.product_id)

          // ✅ Extract all product IDs from bill items
          const productIds = billitems?.data?.bill_items.map((item) => item?.product_id);

          //   // ✅ Check if products exist in the inventory
          // const inventoryCheckRes = await checkProductsInInventoryApi(billitems?.data?.bill_items[0]?.product_id);
          console.log("Checking inventory for product IDs:", productIds);

          // ✅ Check if products exist in the inventory
          const inventoryCheckRes = await checkProductsInInventoryApi({ product_ids: productIds });

          console.log("Inventory Check Response:", inventoryCheckRes?.data?.products);


          // console.log("inventoryCheckRes???????????????????",inventoryCheckRes?.data?.exists)

          // ✅ Separate products that exist and those that need to be added
          const missingProducts = inventoryCheckRes?.data?.products.filter((p) => !p.exists);
          const existingProducts = inventoryCheckRes?.data?.products.filter((p) => p.exists);

          console.log("Missing Products (Need to be added to Inventory):", missingProducts);
          console.log("Existing Products (Stock Maintenance Needed):", existingProducts);

          // ✅ Add missing products to inventory
          if (missingProducts.length > 0) {
            const missingProductIds = new Set(missingProducts.map((p) => p.product_id));

            const filteredBillItems = billitems?.data?.bill_items.filter(item =>
              missingProductIds.has(item.product_id)
            );
            const addProductsInInventory = await addProductsInInvntory(filteredBillItems);
            console.log("Added to Inventory:", addProductsInInventory);

            const stockEntries = filteredBillItems.map(item => ({
              batch_id: item?.batch_id,
              lot_id: item?.batch_id, // Assuming lot_id is same as batch_id, update if needed
              product_id: item?.product_id,
              bill_id: item?.bill_id,
              po_so_id: item?.po_id, // Replace with actual value
              order_type_ref: "PurchaseOrder",
              order_type: "PO",
              original_quantity: item?.quantity || 0,
              used_qty: 0,
              remaining_qty: item?.quantity || 0,
            }));

            console.log("Stock Entries Payload:", stockEntries);

            const res = await addEntryInStock(stockEntries);
            console.log("Stock Updated:", res);
          }


          // ✅ Maintain stock for existing products
          if (existingProducts.length > 0) {
            const existingProductIds = new Set(existingProducts.map((p) => p.product_id));

            const filteredExistingItems = billitems?.data?.bill_items.filter(item =>
              existingProductIds.has(item.product_id)
            );

            const stockEntries = filteredExistingItems.map(item => ({
              batch_id: item?.batch_id,
              lot_id: item?.batch_id, // Assuming lot_id is same as batch_id, update if needed
              product_id: item?.product_id,
              bill_id: item?.bill_id,
              po_so_id: item?.po_id, // Replace with actual value
              order_type_ref: "PurchaseOrder",
              order_type: "PO",
              original_quantity: item?.quantity || 0,
              used_qty: 0,
              remaining_qty: item?.quantity || 0,
            }));

            console.log("Stock Entries Payload:", stockEntries);

            const res = await addEntryInStock(stockEntries);
            console.log("Stock Updated:", res);
          }



          // if (inventoryCheckRes?.data?.exists === false) {
          //   console.log("billitems?.data?.bill_items-------> item array goes into inventoooooooooooooooory:->", billitems?.data?.bill_items)

          //   //create entry in invenotry
          //   const addProductsInInventory = addProductsInInvntory(billitems?.data?.bill_items);
          //   console.log("addProductsInInventory", addProductsInInventory)

          //   const stockEntries = billitems?.data?.bill_items.map(item => ({
          //     batch_id: item?.batch_id,
          //     lot_id: item?.batch_id, // Assuming lot_id is same as batch_id, update if needed
          //     product_id: item?.product_id,
          //     bill_id: item?.bill_id,
          //     po_so_id: item?.po_id, // Replace with actual value
          //     order_type_ref: "PurchaseOrder",
          //     order_type: "PO",
          //     original_quantity: item?.quantity || 0, // Adjust based on actual data
          //     used_qty: 0,
          //     remaining_qty: item?.quantity || 0,
          //   }));

          //   console.log("Stock Entries Payload:", stockEntries);

          //   const res = await addEntryInStock(stockEntries);
          //   console.log("addStockEntry addStockEntry addStockEntry addStockEntry", res)
          //   //
          // } else {
          //   //create entry in stock maintenanice table with details
          //   const stockEntries = billitems?.data?.bill_items.map(item => ({
          //     batch_id: item?.batch_id,
          //     lot_id: item?.batch_id, // Assuming lot_id is same as batch_id, update if needed
          //     product_id: item?.product_id,
          //     bill_id: item?.bill_id,
          //     po_so_id: item?.po_id, // Replace with actual value
          //     order_type_ref: "PurchaseOrder",
          //     order_type: "PO",
          //     original_quantity: item?.quantity || 0, // Adjust based on actual data
          //     used_qty: 0,
          //     remaining_qty: item?.quantity || 0,
          //   }));

          //   console.log("elseeeeee part ------ >>>>> Stock Entries Payload:", stockEntries);

          //   const res = await addEntryInStock(stockEntries);
          //   console.log("addStockEntry addStockEntry addStockEntry addStockEntry", res)
          // }

        } else {
          throw new Error(batchResponse.data?.message || "Failed to create batch");
        }

        // ✅ Show success alert only for Bill creation
        Swal.fire({
          icon: "success",
          title: "Bill Created Successfully",
          text: res.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });

        setContentModal(false);

        return res; // ✅ Return API response so it can be used in handleSubmitDraft
      } else {
        throw new Error(res.data?.message || "Failed to create Bill");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred while processing your request.",
      });

      return { data: { success: false } }; // ✅ Return failure response
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await addBillDetailsApi(formBillingData);


  //     if (res.data?.success) {
  //       const billId = res?.data?.bill?._id;
  //       const poId = params;

  //       // Update PO Items and Create Bill Items
  //       await updatePoItems(billId, poId);

  //       await createBillItems(billId, poId);

  //       // Show success alert only for Bill creation
  //       Swal.fire({
  //         icon: "success",
  //         title: "Bill Created Successfully",
  //         text: res.data?.message,
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       setContentModal(false);

  //       return res; // ✅ Return API response so it can be used in handleSubmitDraft
  //     } else {
  //       throw new Error(res.data?.message || "Failed to create Bill");
  //     }
  //   } catch (error) {
  //     console.error("Error during form submission:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message || "An error occurred while processing your request.",
  //     });

  //     return { data: { success: false } }; // ✅ Return failure response
  //   }
  // };

  // Handle Submit Draft
  const handleSubmitDraft = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to save this as a draft.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save as draft",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const payload = { status: "In Pending" };

      try {
        const poId = params; // Replace `params` with the actual PO ID
        // First, submit the form (handleSubmit)
        const res = await handleSubmit(e); // ✅ Await handleSubmit and check success

        if (res.data?.success) {
          // Only proceed if the bill creation was successful
          const response = await updatePurchaseOrderStatusApi(poId, payload);

          if (response.data?.success) {
            Swal.fire({
              icon: "success",
              title: "Saved as Draft",
              text: response.data?.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            throw new Error(response.data?.message || "Failed to save as draft");
          }
        } else {
          throw new Error("Bill creation failed, draft not saved.");
        }
      } catch (error) {
        console.error("Error saving as draft:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "An error occurred while saving as draft.",
        });
      }
    }
  };

  // Handle Submit Final
  const handleSubmitFinal = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to finalize the submission.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const payload = { status: "Completed" };

      try {
        const poId = params; // Replace `params` with the actual PO ID

        // First, submit the form (handleSubmit)
        const res = await handleSubmit(e); // ✅ Await and check success

        if (res.data?.success) {
          // Only proceed if the bill creation was successful
          const response = await updatePurchaseOrderStatusApi(poId, payload);

          if (response.data?.success) {
            Swal.fire({
              icon: "success",
              title: "Final Submission Completed",
              text: response.data?.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            throw new Error(response.data?.message || "Failed to finalize submission");
          }
        } else {
          throw new Error("Bill creation failed, final submission not completed.");
        }
      } catch (error) {
        console.error("Error during final submission:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "An error occurred during final submission.",
        });
      }
    }
  };




  // const handleSubmitFinal = async (e) => {
  //   e.preventDefault();

  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You are about to finalize the submission.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, submit",
  //     cancelButtonText: "Cancel",
  //   });

  //   if (result.isConfirmed) {
  //     const payload = { status: "Completed" };

  //     try {



  //       const poId = params; // Replace `params` with the actual PO ID

  //       // First, submit the form (handleSubmit)
  //       await handleSubmit(e); // Ensure it runs correctly

  //       const response = await updatePurchaseOrderStatusApi(poId, payload);

  //       if (response.data?.success) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Final Submission Completed",
  //           text: response.data?.message,
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       } else {
  //         throw new Error(response.data?.message || "Failed to finalize submission");
  //       }
  //     } catch (error) {
  //       console.error("Error during final submission:", error);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error.message || "An error occurred during final submission.",
  //       });
  //     }
  //   }
  // };


  const handleSeeMore = () => {
    setVisibleCount(billData.length); // Show all bills
  };

  const handleAddNewBill = () => {
    if (purchaseOrderData?.status == "Completed") {
      Swal.fire({
        text: "No New Bills Can Be Added to a Completed Purchase Order",
        icon: "warning",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    } else {
      setContentModal(true)
    }
  }

  const handleVerifyClick = (row) => {
    // setSelectedRowData(row);
    setSelectedRowData({ ...row }); // Set selected row data
    setVerifyShowModal(true);
  };

  const handleVerify = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedRowData?.id
          ? { ...row, received_quantity: selectedRowData.received_quantity, verified_quantity: selectedRowData.verified_quantity }
          : row
      )
    );
    setVerifyShowModal(false); // Close the modal
  };

  const getFileIcon = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <FaFilePdf size={50} color="red" />;
      case "doc":
      case "docx":
        return <FaFileWord size={50} color="blue" />;
      case "xls":
      case "xlsx":
        return <FaFileExcel size={50} color="green" />;
      case "txt":
        return <FaFileAlt size={50} color="gray" />;
      case "csv":
        return <FaFileCsv size={50} color="orange" />;
      default:
        return <FaFileAlt size={50} color="black" />;
    }
  };

  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Get selected files
  
    const newFiles = selectedFiles?.map(file => ({
      file,
      type: file.type.split('/')[0], // Extract file type (image/pdf)
      name: file.name,
      icon: getFileIcon(file),
    }));
  
    // Add new files to preview list
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  
    // Update the formBillingData with actual files
    setFormBillingData({
      ...formBillingData,
      bill_doc: [...(formBillingData?.bill_doc || []), ...selectedFiles] // if it's a list
      // bill_doc: selectedFiles[0] // if it's just one file
    });
  
    setErrors({
      ...errors,
      bill_doc: null,
    });
  };
  

  const openFileViewer = (file) => {
    setPdfSrc(file);
    const extension = file.name.split(".").pop().toLowerCase();

    if (extension === "xls" || extension === "xlsx") {
      readExcel(file.file);
      setFileType("xlsx");
    } else {
      setFileType(supportedTypes[file.file.type] || "txt");
    }

    setOpenPdfModal(true);
  };

  // Handle file deletion
  const handleDeleteFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // Read Excel files and convert to table format
  const readExcel = (file) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(data);
    };
  };



  return (
    <>
    {
     pdfSrc && <PdfView 
     openPdfModal={openPdfModal} 
     setOpenPdfModal={setOpenPdfModal} 
     fileType={fileType}
     fileUrl={URL.createObjectURL(pdfSrc?.file)}
     excelData={excelData}
     />
    }
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
                      Rajdhani -Verify Purchase Order
                    </h2>
                  </div>
                </div>
                <div className="addresses mt-3">
                  <div className="row">
                    <div className="col-md-6 col-xl-4 address-block">
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

                    <div className="col-md-6 col-xl-4 d-flex justify-content-xl-center mt-3 mt-xl-0 address-block">
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

                    <div className="col-md-6 col-xl-4 d-flex justify-content-xl-center mt-3 mt-xl-0  divider">
                      {/* Divider */}
                      <div className="order-info">
                        <h5>Supplier (Bill from)</h5>
                        <p className="po-view-p">
                          {purchaseOrderData?.supplier_id?.supplier_name}
                        </p>
                        <p className="po-view-p">
                          {purchaseOrderData?.supplier_id?.address}
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

            {/* Bill Cards */}
            <div className="">
              <div className="card-header pb-0 px-0" >
                <h4 className="card-title">Bill Details</h4>
              </div>
              {/* Bill Section Add New Bill */}
              <div className="">
                <div className="mt-3 px-0">
                  <div className="row card-main-div">
                    {billData?.length > 0 ? (<>
                      {billData?.slice(0, visibleCount)?.map((val, ind) => (<>
                        <div className="col-md-6 col-xl-3 pb-4">
                          <BillCard ind={ind} val={val} handleGetBillData={handleGetBillData} />
                        </div>
                      </>))}
                      {/* see more btn */}
                      {billData?.length > visibleCount && (
                        <div className="col-md-6 col-xl-3">
                          <button
                            className="add-new-bill-btn"
                            onClick={handleSeeMore}>
                            <div className="bill-cards" style={{ textAlign: "center" }} >
                              <p style={{ fontSize: "14px", margin: "0", color: "#007bff" }}>
                                See More
                              </p>
                            </div>
                          </button>
                        </div>
                      )}
                      {/* Add New Bill Button after bills */}
                      <div className="col-md-6 col-xl-3 mt-4 mt-md-0">
                        <button
                          className="add-new-bill-btn"
                          onClick={handleAddNewBill}>
                          <div className="bill-cards" style={{ textAlign: "center" }}>
                            <i
                              className="fa-solid fa-plus fa-2xl"
                              style={{ color: "#007bff", marginBottom: "10px" }}
                            ></i>
                            <p style={{ fontSize: "14px", margin: "0", color: "#007bff" }}>
                              Add New Bill
                            </p>
                          </div>
                        </button>
                      </div>
                    </>
                    ) : (
                      // Message and Add Button if no bills found
                      <div className="col-md-6 col-xl-3 text-center mt-3 mt-md-0">
                        <p className="pt-2">No bills found for this Purchase Order ID</p>
                        <button
                          className="add-new-bill-btn"
                          onClick={() => setContentModal(true)}>
                          <div className="bill-cards" style={{ textAlign: "center" }}>
                            <i
                              className="fa-solid fa-plus fa-2xl"
                              style={{ color: "#007bff", marginBottom: "10px" }}
                            ></i>
                            <p style={{ fontSize: "14px", margin: "0", color: "#007bff" }}>
                              Add New Bill
                            </p>
                          </div>
                        </button>
                      </div>
                    )
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Detail */}
            <div ref={billTableRef}>
              {Object.keys(singleBillData).length == 0 ? "" :
                <Row>
                  <Col lg={12}>
                    <div className="" >
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

                            <table id="example4" className="display dataTable no-footer w-100" >
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
                                            <i className="fa fa-sort ms-2 fs-12"
                                              style={{ opacity: "0.3" }}
                                            />
                                          )}
                                          {ind === iconData.ind &&
                                            (iconData.complete ? (
                                              <i className="fa fa-arrow-down ms-2 fs-12"
                                                style={{ opacity: "0.7" }}
                                              />
                                            ) : (
                                              <i className="fa fa-arrow-up ms-2 fs-12"
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
                                <tr>
                                  <td>{singleBillData?.purchase_order_id}</td>
                                  <td className="">{singleBillData?.bill_no}</td>
                                  <td className="">{singleBillData?.bill_doc}</td>
                                  {/* <td className="">{singleBillData?.bill_amount}</td> */}
                                  <td className="">{moment(singleBillData?.bill_date).format("DD MMM YYYY")}</td>
                                  <td>{moment(singleBillData?.created_at).format("DD MMM YYYY, h:mm:ss a")}</td>
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
            </div>
            {/* Product Table */}
            <Row>
              <Col lg={12}>
                <div className="">
                  <div className="card-header pb-0 px-0">
                    <h4 className="card-title">PO Product Details</h4>
                  </div>
                  <div className="card-body px-0">
                    <div className="table-responsive">
                      <div
                        id="holidayList"
                        className="dataTables_wrapper no-footer">
                        {/* <div className="justify-content-between d-sm-flex">
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
                        </div> */}

                        <table id="example4" className="display dataTable no-footer w-100">
                          {/* Table Headings */}
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
                                {/* Product Name */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={data?.product_name}
                                    onClick={() =>
                                      setFocusedInputIndex((prev) => (prev === ind ? null : ind))
                                    }
                                    // onChange={(e) =>
                                    //   handleChangeRow(index, "product_name", e.target.value)
                                    // }
                                    className="form-control row-input"
                                    style={{
                                      width: focusedInputIndex === ind ? "600px" : "300px",
                                      transition: "width 0.3s ease",
                                      cursor: "pointer",
                                    }}
                                  />
                                </td>
                                {/* Fitting Code */}
                                <td style={{
                                  whiteSpace: "nowrap",
                                }}>{data?.fitting_Code}</td>
                                {/* Product Code */}
                                <td className="">{data?.product_code}</td>
                                {/* Product Code */}
                                <td className="">{data?.quantity}</td>
                                {/* UOM */}
                                <td className="">{data?.uom}</td>
                                {/* Weight */}
                                <td className="">{data?.weight}</td>
                                {/* Price per unit */}
                                <td className="">{`${data?.price} ₹`}</td>
                                {/* Discount per unit */}
                                <td className="">{data?.discount_per_unit ? `${data.discount_per_unit} ₹` : "0 ₹"}</td>


                                <td className="">{data?.cgst}</td>

                                <td className="">{data?.sgst}</td>

                                <td className="">{data?.igst}</td>

                                <td className="">{data?.cess}</td>

                                {/* <td >
                                  {moment(data?.order_details?.due_date).format(
                                    "DD MMM YYYY"
                                  )}
                                </td> */}

                                <td className="">{data?.total_amount ? `${data.total_amount} ₹` : "0 ₹"}</td>


                                <td className="whitespace-nowrap">
                                  {moment(data?.created_at).format(
                                    "DD MMM YYYY, h:mm:ss a"
                                  )}
                                </td>

                                {/* <td>-</td> */}
                                {/* <td>
                                  <button
                                    className="btn btn-xs sharp btn-primary me-1"
                                  //   onClick={() => navigate(`/purchaseorderview/${data?._id}`)}
                                  >
                                    <i class="fa-solid fa-eye"></i>
                                  </button>
                                </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {/* <div>
                          
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
                          
                        </div> */}
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
                  <h3 className="p-2 mx-1">Summary</h3>

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

            {/* Buttons  */}
            {/* <div className="d-flex gap-3 justify-content-end text-end mt-3 mt-md-0">
              <button
                type="submit"
                onClick={handleSubmitDraft}
                className="btn btn-danger rounded-sm">
                Save as draft
              </button>

              <button
                type="submit"
                onClick={handleSubmitFinal}
                className="btn btn-primary rounded-sm">
                Final Submission
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* <!-- Modal Box Verify Bill Section--> */}
      <Modal className="fade card-body" show={contentModal} onHide={setContentModal} size="xl">
        <Modal.Header>
          <Modal.Title>Add Bill & Verify Bill Items</Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => setContentModal(false)}>

          </Button>
        </Modal.Header>
        {/* <!-- Modal Box Body Verify Bill Section--> */}
        <Modal.Body>
          <div className="">
            {/* Header Section */}
            <div className="">
              <div className="header-section mb-3">
                <div className="row ">
                  <div className="col-xl-3 d-flex justify-content-center justify-content-xl-start">
                    <img src={rajdhanilogo} alt="logo" height={60} />
                  </div>
                  <div className="col-xl-9 d-flex justify-content-center justify-content-xl-start">
                    <h2 className="header-title">Rajdhani - Add Bill & Verify Bill Items</h2>
                  </div>
                </div>
              </div>
            </div>
            {/* Body Section for verify bill */}
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  {/* First Column: Bill Info Part 1 */}
                  <div className="col-xl-8">
                    {/* Bill No. */}
                    <div className="mb-2">
                      <label className="form-label fs-6">Bill No.</label>
                      <input
                        name="bill_no"
                        value={formBillingData?.bill_no || ''}
                        onChange={handleBillingDetailChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Ex: B12345"
                      />
                      {errors.name && <span className="text-danger fs-12">{errors.name}</span>}
                    </div>

                    {/* Bill Date */}
                     {/*Due Date */}
                     <div className="mb-2">
                  <label className="form-label fs-6">Bill Date</label>
                    <input
                      name="bill_date"
                      value={formBillingData?.bill_date || ''}
                      onChange={handleBillingDetailChange}
                      onClick={(e) => e.target.showPicker()}
                      type="date"
                      className="form-control"
                      placeholder="Enter Date"
                    />
                    {errors?.billing_bill_date && (
                      <span className="text-danger fs-12">
                        {errors?.billing_bill_date}
                      </span>
                    )}
                  </div>
                    {/* Note */}
                    <div className="mb-2">
                      <label className="form-label fs-6">Note</label>
                      <textarea
                        name="note"
                        className="form-control form-control-sm"
                        rows="6"
                        placeholder="Ex: Add notes for bill"
                        value={formBillingData?.note}
                        onChange={handleBillingDetailChange}
                      ></textarea>
                      {errors.note && <span className="text-danger fs-12">{errors.note}</span>}
                    </div>
                  </div>

                  {/* Third Column: Bill Image/File in a Card */}
                  <div className="col-xl-4 ">
                    <div className="bill-img-fileupload-div">
                      <div className="mb-2">
                        <label className="form-label fs-6">Bill Image/File</label>
                        <div style={styles.container}>
                          <input
                            type="file"
                            accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.csv"
                            onChange={handleFileChange}
                            multiple // Enable multiple file selection
                            style={{ display: 'none' }}
                            id="fileUpload"
                          />
                          <label className="m-0" htmlFor="fileUpload" style={styles.placeholder}>
                            <div style={styles.uploadIcon} className="cursor-pointer">
                              <img width="25" src={uplodIcon} alt="Upload Icon" />
                              <p className="m-0 fw-semibold">Upload Image/File</p>
                            </div>
                          </label>
                        </div>

                        <p className="mt-2 text-center text-muted fs-7" style={{ marginBottom: '5px' }}>
                          Image / File
                        </p>
                      </div>

                      {/* Display existing files from API data and uploaded files */}

                      {files?.length > 0 && (
                        <>
                          <div className="bill-image-div">
                            {files?.map((file, index) => {
                              return (<>
                                <div key={index} style={styles.filePreview}>
                                  {file.type === 'image' ? (
                                    <img
                                      src={URL.createObjectURL(file?.file) || file?.url}
                                      alt="Uploaded"
                                      style={{ ...styles.img, width: '50px', height: '50px' }}
                                    // onClick={()=>handleImageClick(index)}
                                    />
                                  ) : (
                                    <div className="mb-0" style={styles?.filePreview}>
                                      {/* Display a PDF icon for PDFs */}
                                      {/* <img
                                 src={pdfIcon}
                                 alt="Uploaded"
                                 style={{ ...styles.img, width: '50px', height: '50px' }}
                                 onClick={()=>setPdfSrc(file)}
                                /> */}
                                      <div className="mb-0" onClick={() => { openFileViewer(file) }}>{file?.icon}</div>
                                      {/* <p>{file.name}</p> */}
                                    </div>
                                  )}
                                  <div style={styles.deleteIcon} onClick={() => handleDeleteFile(index)}>
                                    ⛌
                                  </div>
                                </div>
                              </>)
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>




                </div>
              </div>
            </div>

            {/* Purchase Order Item Table  */}
            <div className="col-xl-12 col-lg-12 mt-5">
              <div className="">
                <h4 className="">Purchased Order Items</h4>
                <div>
                  <div className="" style={{ overflow: "auto" }}>
                    {rows?.length > 0 && (
                      <table
                        id="dynamicTable"
                        className="display dataTable no-footer w-100">
                        <thead className="table-head">
                          <tr>
                            <th>SL</th>
                            <th>Product Name</th>
                            <th>Fitting Code</th>
                            <th>Code</th>
                            <th>UOM</th>
                            <th>Weight(Kg)</th>
                            <th>Quantity</th>
                            <th>Price Per Unit</th>
                            <th>Discount Per Unit</th>
                            <th>CGST</th>
                            <th>SGST</th>
                            <th>IGST</th>
                            <th>Amount</th>
                            <th>Ordered Quantity</th>
                            <th>Received Quantity</th>
                            <th>Verify Quantity</th>
                            <th>Short Close</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody >
                          {rows?.map((row, index) => (
                            console.log("Row ------------------>", row),
                            <tr key={row.id}
                              //  onClick={() => handleVerifyClick(row)} 
                              onClick={(e) => {
                                const target = e.target;

                                // Prevent modal from opening when clicking on an active input or button
                                if (target.tagName === "BUTTON") return;
                                if (target.tagName === "INPUT" && !target.disabled) return;

                                // Open modal if clicking on a disabled input or any other row area
                                handleVerifyClick(row);
                              }}
                              style={{ cursor: "pointer" }}>
                              <td>{row.id}</td>
                              {/* product Name */}
                              {/* <td>
                                <input
                                  type="text"
                                  placeholder="Product Name"
                                  value={row?.product_name}
                                  onChange={(e) =>
                                    handleChangeRow(
                                      index,
                                      "product_name",
                                      e.target.value
                                    )
                                  }
                                  className="form-control row-input"
                                  style={{ width: "390px" }}
                                  disabled
                                />
                              </td> */}
                              {/* <td>
                                <div
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: isExpanded ? "100%" : "100%", // Expands width on toggle
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    padding: "4px 8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    backgroundColor: "#f5f5f5",
                                    textAlign: "start",
                                    cursor: "pointer",
                                    transition: "width 0.3s ease", // Smooth transition
                                  }}
                                  onClick={toggleExpand}
                                >
                                  {row?.product_name}
                                  {!isExpanded && (
                                    <span
                                      style={{
                                        position: "absolute",
                                        right: "8px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "#007bff",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      ...
                                    </span>
                                  )}
                                </div>
                              </td> */}
                              {/* Product Name */}
                              <td>
                                  <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={row?.product_name}
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
                                {/* Fitting Code */}
                                <td style={{
                                  whiteSpace: "nowrap",
                                }}>{row?.fitting_Code}</td>
                              {/* product Code */}
                              <td>
                                <input
                                  type="text"
                                  placeholder="100001"
                                  value={row?.product_code}
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


                              {/* uom */}
                              <td>
                                <input
                                  type="text"
                                  placeholder="UOM"
                                  value={row?.uom}
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
                              {/* weight */}
                              <td>
                                <input
                                  type="number"
                                  placeholder="10 kg"
                                  value={row?.weight}
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
                              {/* quantity */}
                              <td>
                                <input
                                  type="number"
                                  placeholder="Quantity"
                                  value={row?.quantity}
                                  onChange={(e) =>
                                    handleChangeRow(
                                      index,
                                      "quantity",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              </td>
                              {/* price */}
                              <td>
                                <input
                                  type="number"
                                  placeholder="Price Per Unit"
                                  value={row?.price}
                                  onChange={(e) =>
                                    handleChangeRow(
                                      index,
                                      "price_per_unit",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              </td>
                              {/* discount */}
                              <td>
                                <input
                                  type="number"
                                  placeholder="Discount Per Unit"
                                  value={row.discount_per_unit}
                                  onChange={(e) =>
                                    handleChangeRow(
                                      index,
                                      "discount_per_unit",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                  style={{ width: "70px" }}
                                />
                              </td>



                              {/* cgst */}
                              <td>
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
                              </td>
                              {/* sgst */}
                              <td>
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
                              </td>
                              {/* igst */}
                              <td>
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
                              </td>
                              {/* amount */}
                              <td>
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
                              </td>
                              {/* amount */}
                              {/* <td>
                                {calculateTotalAmount()}
                              </td> */}

                              <td>
                                {/* Ordered Quantity */}
                                <input
                                  type="number"
                                  placeholder="Ordered Quantity"
                                  value={row?.ordered_quantity || ""}
                                  onChange={(e) => handleChangeRow(index, "ordered_quantity", e.target.value)}
                                  className="form-control row-input"
                                  disabled
                                />
                              </td>
                              <td>
                                {/* Received Quantity */}
                                <input
                                  type="number"
                                  placeholder="Received Quantity"
                                  value={row?.received_quantity || ""}
                                  onChange={(e) => handleChangeRow(index, "received_quantity", e.target.value)}
                                  className="form-control row-input"
                                />
                              </td>
                              <td>
                                {/* Verify Quantity */}
                                <input
                                  type="number"
                                  placeholder="Verify Quantity"
                                  value={row.verified_quantity || ""}
                                  onChange={(e) => handleChangeRow(index, "verified_quantity", e.target.value)}
                                  className="form-control row-input"
                                />
                              </td>
                              <td>
                                {(
                                  <button
                                    className="btn btn-warning mt-2"
                                    style={{
                                      whiteSpace: "nowrap",
                                      backgroundColor: row.is_short_close ? "#ff9900" : "#ffc107", // Change color if short closed
                                      borderColor: row.is_short_close ? "#cc7a00" : "#ffca2c",
                                    }}
                                    onMouseDown={() => setIsPressed(true)} // Detect button press
                                    onMouseUp={() => setIsPressed(false)} // Reset after release
                                    onMouseLeave={() => setIsPressed(false)} // Handle mouse exit
                                    onClick={() => handleShortClose(row.id)} // Handle short close
                                  >
                                    {row.is_short_close ? "Closed" : "Short Close"}
                                  </button>
                                )}
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary mt-2 ms-2"
                                  onClick={() => handleVerifyClick(row)}>
                                  Verify
                                </button>
                                {/* {index > 0 ? (
                                  <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => handleDeleteTableRow(row?.id)}>
                                    Delete
                                  </button>
                                ) : null} */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  {/* <button onClick={addRow} className="btn btn-primary mt-2">
                    Add New Row
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="row justify-content-end ">
            <div className="summary-section col-md-5">
              <table className="table table-bordered ">
                <h3 className="p-2 mx-1">Summary</h3>

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

          {/* Details Summry Section */}
          <div className="">
            <div className="header-section mb-3">
              <div className="row">
                {/* <h5>Bill Address Details</h5> */}
              </div>
              <hr style={{ borderTop: '2px solid #ccc', margin: '20px 0' }} />
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
                        {purchaseOrderData?.supplier_id?.supplier_name}
                      </p>
                      <p className="po-view-p">
                        {purchaseOrderData?.supplier_id?.address}
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
              <hr style={{ borderTop: '2px solid #ccc', margin: '20px 0' }} />
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


        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            variant="danger light"
            onClick={() => setContentModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button> */}
          <div className="d-flex gap-3 justify-content-end text-end mt-3 mt-md-0">
            <Button
              variant="danger light"
              onClick={() => setContentModal(false)}
            >
              Close
            </Button>
            <button
              type="submit"
              onClick={handleSubmitDraft}
              className="btn btn-warning rounded-sm">
              Save as draft
            </button>

            <button
              type="submit"
              onClick={handleSubmitFinal}
              className="btn btn-primary rounded-sm">
              Final Submission
            </button>
          </div>
        </Modal.Footer>
      </Modal>


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
          <Modal.Title>Verify Item</Modal.Title>
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

              {/* Table-like Grid with Borders */}
              <div style={{ display: "grid", gridTemplateColumns: "140px auto", fontSize: "13px", border: "1px solid #D3D3D3", borderRadius: "8px", padding: "5px", }}>
                {[
                  { label: "Product Name", value: selectedRowData?.product_name },
                  { label: "Product Code", value: selectedRowData?.product_code },
                  { label: "Ordered Qty", value: selectedRowData?.ordered_quantity },
                  { label: "Weight", value: selectedRowData?.weight || "N/A" },
                  { label: "UOM", value: selectedRowData?.uom || "N/A" },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>{item.label}:</div>
                    <div style={{ color: "#666", padding: "6px 0", borderBottom: "1px dotted #ccc" }}>{item.value}</div>
                  </React.Fragment>
                ))}
              </div>

              {/* Inputs Row */}
              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                {/* Received Quantity */}
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: "600", fontSize: "13px", color: "#333" }}>Received Qty</label>
                  <input
                    type="number"
                    placeholder="Received Quantity"
                    value={selectedRowData?.received_quantity || ""}
                    onChange={(e) => setSelectedRowData({ ...selectedRowData, received_quantity: e.target.value })}
                    className="form-control row-input"
                  />

                </div>
                <div style={{ flex: 1 }}>
                  {/* Verify Quantity */}
                  <label style={{ fontWeight: "600", fontSize: "13px", color: "#333" }}>Verified Qty</label>
                  <input
                    type="number"
                    placeholder="Verify Quantity"
                    value={selectedRowData?.verified_quantity || ""}
                    onChange={(e) => setSelectedRowData({ ...selectedRowData, verified_quantity: e.target.value })}
                    className="form-control row-input"
                  />
                </div>

              </div>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setVerifyShowModal(false)}>Close</Button>
          <Button variant="success" onClick={() => handleVerify()}>Verify</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VerifyPurchaseOrder;
