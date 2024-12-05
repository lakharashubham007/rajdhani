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
import { addBillDetailsApi, createBillItemsApi, updatePoItemForBillsApi } from "../../../services/apis/purchaseOrderBillApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "../../components/Toaster/Toster";
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
  { heading: "Order Id", sortingVale: "_id" },
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

const VerifyPurchaseOrder = () => {
  const params = useParams()?.id;
  const navigate = useNavigate();
  const [sort, setSortata] = useState(10);
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [purchaseOrderProdcutList, setPurchaseOrderProdcutList] = useState([]);
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
        value: product.name,
        label: product.name,
      }));
      setProductOption(dropdownProductList);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
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
          selectedOption: selectedOption || null,
          sku: item.sku,
          unit: item.unit,
          variant: item.variant,
          variant_type: item.variant_type,
          uom: item.uom,
          uom_qty: item.uom_qty,
          quantity: item.quantity,
          price_per_unit: item.price_per_unit,
          discount_per_unit: item.discount_per_unit,
          total_discount: item.total_discount,
          cgst: item.cgst,
          sgst: item.sgst,
          igst: item.igst,
          cess: item.cess,
          amount: item.amount,
          received_quantity: item.received_quantity,
          verified_quantity: item.verified_quantity,
          ordered_quantity: item.ordered_quantity,
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
    if (purchaseOrderProdcutList.length > 0 && rows.length === 1) {
      const formattedRows = prefillRows(purchaseOrderProdcutList);
      setRows(formattedRows);
    }
  }, [purchaseOrderProdcutList, contentModal,rows]);



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
    const updatedRows = [...rows];
    updatedRows[index].selectedOption = selectedOption; // Update only the specific row's selectedOption
    updatedRows[index].product_name = selectedOption ? selectedOption.value : ''; // Update product_name based on selectedOption
    setRows(updatedRows);
  };





  //to add a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
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
    console.log(updatedRows[index][field] = value)
    setRows(updatedRows);

    // Calculate total discount if quantity or discount_per_unit changes
    if (field === "quantity" || field === "discount_per_unit") {
      const quantity = parseFloat(updatedRows[index].quantity || 0);
      const discountPerUnit = parseFloat(
        updatedRows[index].discount_per_unit || 0
      );
      updatedRows[index].total_discount = quantity * discountPerUnit;
    }

    // Calculate amount with discount applied
    const quantity = parseFloat(updatedRows[index].quantity || 0);
    const pricePerUnit = parseFloat(updatedRows[index].price_per_unit || 0);
    const uomQty = parseFloat(updatedRows[index].uom_qty || 1); // Default UOM Qty to 1
    const totalDiscount = parseFloat(updatedRows[index].total_discount || 0);

    // Adjust the amount to subtract the total discount
    updatedRows[index].amount =
      quantity * pricePerUnit * uomQty - totalDiscount;

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

  // Inline styles
  const styles = {
    container: {
      border: "2px dashed #ccc",
      borderRadius: "8px",
      width: "150px", // Logo size
      height: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "#f9f9f9",
      position: "relative",
      textAlign: "center",
      overflow: "hidden",
      marginLeft: '110px'
    },
    coverContainer: {
      border: "2px dashed #ccc",
      borderRadius: "8px",
      width: "250px", // Cover size (2:1 ratio)
      height: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "#f9f9f9",
      position: "relative",
      textAlign: "center",
      overflow: "hidden",
    },
    placeholder: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      textAlign: "center",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "8px",
    },
    hover: {
      borderColor: "#007bff",
      backgroundColor: "#e9f4ff",
    },
    uploadIcon: {
      color: "#888",
      fontSize: "16px",
      fontWeight: "bold",
    },
    deleteIcon: {
      position: "absolute",
      top: "0px",
      right: "0px",
      backgroundColor: "#FF6D6D",
      color: "white",
      borderRadius: "100%",
      padding: "5px 10px",
      cursor: "pointer",
      zIndex: 2,
      fontSize: "10px",
      fontWeight: "bold",
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
  const createBillItems = async (billId, poId) => {
    const updatedBillItems = rows?.map(({ id, selectedOption, _id, ...rest }) =>
      parseFields(rest, { bill_id: billId, po_id: poId })
    );

    try {
      const res = await createBillItemsApi(updatedBillItems);
      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to create Bill Items");
      }
      setApiSuccess(true);
    } catch (error) {
      console.error("Error creating Bill items:", error);
      throw error; // Propagate the error
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addBillDetailsApi(formBillingData);

      if (res.data?.success) {
        const billId = res?.data?.bill?._id;
        const poId = params;

        // Update PO Items and Create Bill Items
        await updatePoItems(billId, poId);
        await createBillItems(billId, poId);

        // Show success alert only for Bill creation
        Swal.fire({
          icon: "success",
          title: "Bill Created Successfully",
          text: res.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setContentModal(false);
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
    }
  };

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
                      Rajdhani -Verify Purchase Order
                    </h2>
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



            {/* Bill Cards */}
            <div className="">
              <div className="card-header pb-0 px-0" >
                <h4 className="card-title">Bill Details</h4>
              </div>

              <div className="d-flex">
                <div className="mt-0 px-0">
                  <div className="row">
                    {
                      billData?.length > 0 ? (
                        <>
                          {billData.map((val, ind) => (
                           
                              <BillCard ind={ind} val={val} handleGetBillData={handleGetBillData} />
                             
                          ))}
                          {/* Add New Bill Button after bills */}
                          <div className="col-md-3">
                            <button
                              className="bill-card-btn"
                              onClick={() => setContentModal(true)}
                              style={{
                                width: "195px",
                                height: "130px",
                                border: "1px dashed #007bff",
                                borderRadius: "5px",
                                backgroundColor: "#f8f9fa",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                marginTop: "12px",
                                marginLeft: "0px"
                              }}
                            >
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
                        <div className="col-md-12 text-center">
                          <p>No bills found for this Purchase Order ID</p>
                          <button
                            className="btn btn-primary mt-2"
                            onClick={() => setContentModal(true)}
                          >
                            Add New Bill
                          </button>
                        </div>
                      )
                    }
                  </div>
                </div>
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
                  <div className="card-header pb-0 px-0">
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

                                <td>{data?._id}</td>

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

            {/* Buttons  */}
            <div className="d-flex gap-3 justify-content-end text-end">
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
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <Modal className="fade" show={contentModal} onHide={setContentModal}>
        <Modal.Header>
          <Modal.Title>Add Bill & Verify Bill Items</Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => setContentModal(false)}
          >

          </Button>
        </Modal.Header>
        <Modal.Body>

          {/* Header Section */}
          <div className="">
            <div className="header-section mb-3">
              <div className="row">
                <div className="col-sm-4">
                  <img src={rajdhanilogo} alt="logo" height={60} />
                </div>
                <div className="col-sm-8">
                  <h2 className="header-title">Rajdhani - Add Bill & Verify Bill Items</h2>
                </div>
              </div>
            </div>
          </div>

          {/* First Two sections for bill */}
          {/* <div className="row">
            
            <div className="col-xl-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Bill Info</h4>
                </div>
                <div className="card-body">
                  <div>

                    <div className="mb-3 row">
                      <div className="col-sm-12">
                        <label className="col-sm-3 col-form-label">
                          Bill No.
                        </label>
                        <input
                          name="bill_no"
                          value={formBillingData?.bill_no || ''}
                          onChange={handleBillingDetailChange}
                          type="text"
                          className="form-control"
                          placeholder="Ex: B12345"
                        />
                        {errors.name && <span className="text-danger fs-12">{errors.name}</span>}
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="col-sm-12">
                        <label className="col-sm-3 col-form-label">
                          Bill Amount
                        </label>
                        <input
                          name="bill_amount"
                          value={formBillingData?.bill_amount || ''}
                          onChange={handleBillingDetailChange}
                          type="number"
                          className="form-control"
                          placeholder="Ex: 1000"
                        />
                        {errors.billing_bill_amount && (
                          <span className="text-danger fs-12">{errors.billing_bill_amount}</span>
                        )}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="col-sm-12">
                        <label className="col-sm-3 col-form-label">
                          Bill Date
                        </label>
                        <input
                          name="bill_date"
                          value={formBillingData?.bill_date || ''}  // Displays the selected date, or an empty string if not available
                          onChange={handleBillingDetailChange}  // Updates the state when a new date is selected
                          type="date"  // Specifies the input type as date, enabling the date picker
                          className="form-control"
                        />
                        {errors.billing_bill_date && (
                          <span className="text-danger fs-12">{errors.billing_bill_date}</span>
                        )}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="col-sm-12">
                        <label className="col-sm-3 col-form-label">
                          Note
                        </label>
                        
                        <textarea
                          name="note"
                          className="form-control"
                          rows="3"
                          id="comment"
                          placeholder="Ex: Add notes for bill"
                          value={formBillingData?.note}
                          onChange={handleBillingDetailChange}
                        ></textarea>
                        {errors.note && <span className="text-danger fs-12">{errors.note}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


           
            <div className="col-xl-6 col-lg-6 flex ">
              <div className="card">
                <div className="card-header mb-4">
                  <h4 className="card-title">Bill Image/File</h4>
                </div>
                <div className="col-sm-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <label className="col-form-label">Bill Image/File</label>
                  <div style={styles.container}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      style={{ display: 'none' }}
                      id="logoUpload"
                    />
                    {logo ? (
                      <>
                        
                        <div style={styles.deleteIcon} onClick={handleDeleteLogo}>
                          ⛌
                        </div>
                        <img src={logo} alt="Logo" style={styles.img} />
                      </>
                    ) : (
                      <label htmlFor="logoUpload" style={styles.placeholder}>
                        <div style={styles.uploadIcon} className='flex flex-col cursor-pointer'>
                          <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                          <p>Upload Image/File</p>
                        </div>
                      </label>
                    )}
                  </div>
                  <p className='mt-2'>Image format - jpg png jpeg gif<br />Image Size - maximum size 2 MB<br />Image Ratio - 1:1</p>
                  {errors.image && <span className="text-danger fs-12">{errors.image}</span>}
                </div>


              </div>
            </div>

          </div> */}

          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                {/* First Column: Bill Info Part 1 */}
                <div className="col-sm-4">
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

                  {/* <div className="mb-2">
                    <label className="form-label fs-6">Bill Amount</label>
                    <input
                      name="bill_amount"
                      value={formBillingData?.bill_amount || ''}
                      onChange={handleBillingDetailChange}
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Ex: 1000"
                    />
                    {errors.billing_bill_amount && <span className="text-danger fs-12">{errors.billing_bill_amount}</span>}
                  </div> */}

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

                {/* Second Column: Bill Info Part 2 */}
                <div className="col-sm-4">
                  <div className="mb-2">
                    <label className="form-label fs-6">Bill Date</label>
                    <input
                      name="bill_date"
                      value={formBillingData?.bill_date || ''}
                      onChange={handleBillingDetailChange}
                      type="date"
                      className="form-control form-control-sm"
                    />
                    {errors.billing_bill_date && <span className="text-danger fs-12">{errors.billing_bill_date}</span>}
                  </div>
                  {/* 
                  <div className="mb-2">
                    <label className="form-label fs-6">Note</label>
                    <textarea
                      name="note"
                      className="form-control form-control-sm"
                      rows="2"
                      placeholder="Ex: Add notes for bill"
                      value={formBillingData?.note}
                      onChange={handleBillingDetailChange}
                    ></textarea>
                    {errors.note && <span className="text-danger fs-12">{errors.note}</span>}
                  </div>
                   */}
                </div>

                {/* Third Column: Bill Image/File in a Card */}
                <div className="col-sm-4">
                  <div className="mb-2 text-center">
                    <label className="form-label fs-6">Bill Image/File</label>
                    <div style={styles.container}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        style={{ display: 'none' }}
                        id="logoUpload"
                      />
                      {logo ? (
                        <>
                          <div style={styles.deleteIcon} onClick={handleDeleteLogo}>⛌</div>
                          <img src={logo} alt="Logo" style={{ ...styles.img, width: '80px', height: '80px' }} />
                        </>
                      ) : (
                        <label htmlFor="logoUpload" style={styles.placeholder}>
                          <div style={styles.uploadIcon} className="cursor-pointer">
                            <img width="30" src={uplodIcon} alt="Upload Icon" />
                            <p>Upload Image/File</p>
                          </div>
                        </label>
                      )}
                    </div>
                    <p className="mt-2 text-muted fs-7" style={{ marginBottom: '5px' }}>
                      Image format - jpg png jpeg gif<br />
                      Max size - 2 MB<br />
                      Ratio - 1:1
                    </p>
                    {errors.image && <span className="text-danger fs-12">{errors.image}</span>}
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
                          <th>Sku</th>
                          <th>Unit</th>
                          <th>Variant</th>
                          <th>Variant Type</th>
                          <th>UOM</th>
                          <th>UOM Qty</th>
                          <th>Quantity</th>
                          <th>Price Per Unit</th>
                          <th>Discount Per Unit</th>
                          <th>Total Discount</th>
                          <th>CGST</th>
                          <th>SGST</th>
                          <th>IGST</th>
                          <th>Cess</th>
                          <th>Amount</th>
                          <th>Ordered Quantity</th>
                          <th>Received Quantity</th>  {/* New Column */}
                          <th>Verify Quantity</th>    {/* New Column */}
                          <th>Short Close</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows?.map((row, index) => (

                          <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>
                              <Select
                                //value={row.selectedOption}
                                // onChange={(selectedOption) =>
                                //   handleProductChange(selectedOption, index)
                                // }
                                // defaultValue={row.selectedOption}

                                value={row.selectedOption} // Prefill selected option
                                onChange={(selectedOption) => handleProductChange(selectedOption, index)}

                                options={productOption} // Ensure productOption is properly defined
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    width: '200px', // Adjust the width as needed
                                    lineHeight: "20px",
                                    color: "#7e7e7e",
                                    paddingLeft: "15px",
                                  }),
                                  menuPortal: (provided) => ({
                                    ...provided,
                                    zIndex: 9999, // Ensures dropdown appears on top of other content
                                  }),
                                  menu: (provided) => ({
                                    ...provided,
                                    top: '-100%', // Positions the dropdown above the select input
                                  }),
                                }}
                                menuPortalTarget={document.body}
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                placeholder="Sku"
                                value={row.sku}
                                onChange={(e) =>
                                  handleChangeRow(
                                    index,
                                    "sku",
                                    e.target.value
                                  )
                                }
                                className="form-control row-input"
                                style={{ width: "90px" }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder="Unit"
                                value={row.unit}
                                onChange={(e) =>
                                  handleChangeRow(
                                    index,
                                    "unit",
                                    e.target.value
                                  )
                                }
                                className="form-control row-input"
                                style={{ width: "70px" }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder="Variant"
                                value={row.variant}
                                onChange={(e) =>
                                  handleChangeRow(
                                    index,
                                    "variant",
                                    e.target.value
                                  )
                                }
                                className="form-control"
                                style={{ width: "120px" }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder="Variant Type"
                                value={row.variant_type}
                                onChange={(e) =>
                                  handleChangeRow(
                                    index,
                                    "variant_type",
                                    e.target.value
                                  )
                                }
                                className="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder="UOM"
                                value={row.uom}
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
                            <td>
                              <input
                                type="number"
                                placeholder="UOM Qty"
                                value={row.uom_qty}
                                onChange={(e) =>
                                  handleChangeRow(
                                    index,
                                    "uom_qty",
                                    e.target.value
                                  )
                                }
                                className="form-control row-input"
                              // style={{ width: "70px" }}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                placeholder="Quantity"
                                value={row.quantity}
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
                            <td>
                              <input
                                type="number"
                                placeholder="Price Per Unit"
                                value={row.price_per_unit}
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
                            <td>
                              <input
                                type="number"
                                placeholder="Total Discount"
                                value={row.total_discount}
                                onChange={(e) =>
                                  handleChangeRow(
                                    index,
                                    "total_discount",
                                    e.target.value
                                  )
                                }
                                className="form-control"
                                disabled
                              />
                            </td>
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
                            <td>
                              <input
                                type="text"
                                placeholder="Cess"
                                value={row.cess}
                                onChange={(e) =>
                                  handleChangeRow(
                                    index,
                                    "cess",
                                    e.target.value
                                  )
                                }
                                className="form-control"
                                style={{ width: "70px" }}
                              />
                            </td>
                            <td>
                              {calculateTotalAmount()}
                              {/* This will show the total amount for all rows */}
                            </td>
                            <td>
                              {/* Ordered Quantity */}
                              <input
                                type="number"
                                placeholder="Ordered Quantity"
                                value={row.ordered_quantity || ""}
                                onChange={(e) => handleChangeRow(index, "ordered_quantity", e.target.value)}
                                className="form-control row-input"
                              />
                            </td>
                            <td>
                              {/* Received Quantity */}
                              <input
                                type="number"
                                placeholder="Received Quantity"
                                value={row.received_quantity || ""}
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
                              {index > 0 ? (
                                <button
                                  className="btn btn-danger mt-2"
                                  onClick={() => handleDeleteTableRow(row?.id)}>
                                  Delete
                                </button>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <button onClick={addRow} className="btn btn-primary mt-2">
                  Add New Row
                </button>
              </div>
            </div>
          </div>

          {/* Summary Section */}
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
          <Button
            variant="danger light"
            onClick={() => setContentModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VerifyPurchaseOrder;
