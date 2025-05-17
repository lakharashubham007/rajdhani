import React, { useEffect, useRef, useState } from "react";
import { DatePicker } from "rsuite";
import { Row, Card, Col, Button, Modal, Container, Dropdown } from "react-bootstrap";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import {
  GetAllProductList,
  SearchProductsApi,
  SearchSimilarHoseAssemblyApi,
  SearchSimilarProductsApi,
} from "../../../services/apis/Product";
import moment from "moment";
import "../../../assets/css/AddSupplierPurchaseOrder.css";
import {
  addSupplierPurchaseOrderApi,
  createPoItemApi,
} from "../../../services/apis/PurchaseOrder";
import ProductionManagementTable from "../../components/ProductionManagement/ProductionManagementTable";
import { getAllCusotmerListApi, SearchPartyApi } from "../../../services/apis/CustomerApi";
import { saleOrderItemsBySOIdApi, saleOrdersByCustomerIdApi } from "../../../services/apis/salesOrderApi";
import { useSelector } from "react-redux";
import { createProductionSheetDetailsApi, createProductionSheetItemsApi, getLastCreatedSheetNoApi, SearchLastFiveProductsFromProductionSheetApi } from "../../../services/apis/productionSheetApi";




const ProductionManagement = () => {
  const authData = useSelector((state) => state.auth.auth);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sheetErrors, setSheetErrors] = useState({});
  const [productOption, setProductOption] = useState(null);
  const [selectedHoseAssembly, setSelectedHoseAssembly] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const TodayDate = moment().format("YYYY-MM-DD");
  const [selectedSupplierOption, setSelectedSupplierOption] = useState(null);
  const [selectedorderByClientOption, setSelectedorderByClientOption] = useState(null);
  const [customerOption, setCustomerOption] = useState(null);
  const [saleOrdersByParty, setSaleOrdersByParty] = useState(null);
  const [allSalesOrdersBySingleParty, setAllSalesOrdersBySingleParty] = useState(null)
  const [selectedSaleOrderDetails, setSelectedSaleOrderDetails] = useState(null);
  const [selectedCustomerOption, setSelectedCustomerOption] = useState(null);
  const [selectedSaleOrderItems, setSelectedSaleOrderItems] = useState(null);
  const [allSupplier, setAllSupplier] = useState(null);
  const [allCustomers, setAllCustomers] = useState(null);
  const [supplierDetail, setSupplierDetail] = useState({});
  const [customerDetails, setCustomerDetails] = useState();
  const [latestSheetNumber, setLatestSheetNumber] = useState();
  const [productShowModal, setProductShowModal] = useState(false);
  const [selectedHoseAssemblyItem, setSelectedHoseAssemblyItem] = useState();
  const [editHoseAssemblyShowModal, setEditHoseAssemblyShowModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();
  const [guardTypeOption, setGuardTypeOption] = useState([
    {
      value: "sleeve",
      label: "Sleeve",
    },
    {
      value: "spring",
      label: "Spring",
    },
    {
      value: "vinyl cover",
      label: "Vinyl Cover",
    }]);



  console.log("selected order items==============================================================================>", selectedSaleOrderItems, selectedRowData)

  const formattedProductionSheetItemData = selectedSaleOrderItems
    ?.filter((data) => data.product_type === "Hose Assembly")
    .map((data) => ({
      product_id: data?.product_id?._id,
      part_no: data?.product_id?.part_no,
      product_code: data?.product_id?.product_code,
      uom: data?.product_id?.uom,
      weight: data?.product_id?.weight,
      price: data?.product_id?.price,
      gst: data?.product_id?.gst,
      hose: data?.product_id?.hose,
      hose_product_Code: data?.product_id?.hose_product_Code,
      hose_fitting_Code: data?.product_id?.hose_fitting_Code,
      hose_label: data?.product_id?.hose_label,
      fitting_a_description: data?.product_id?.fitting_a_description,
      fitting_a_fitting_Code: data?.product_id?.fitting_a_fitting_Code,
      fitting_a_product_Code: data?.product_id?.fitting_a_product_Code,
      fitting_a_label: data?.product_id?.fitting_a_label,
      fitting_b_description: data?.product_id?.fitting_b_description,
      fitting_b_fitting_Code: data?.product_id?.fitting_b_fitting_Code,
      fitting_b_product_Code: data?.product_id?.fitting_b_product_Code,
      fitting_b_label: data?.product_id?.fitting_b_label,
      assembly_length: data?.product_id?.assembly_length,
      fitting_length: data?.product_id?.fitting_length,
      cutting_length: data?.product_id?.cutting_length,
      guard_type: data?.product_id?.guard_type,
      guard: data?.product_id?.guard,
      guard_prodcut_code: data?.product_id?.guard_prodcut_code,
      guard_label: data?.product_id?.guard_label,
    }));

  console.log("formattedProductionSheetItemData", formattedProductionSheetItemData)

  const fetchAllCustomerList = async () => {
    setLoading(true);
    try {
      const res = await getAllCusotmerListApi();
      const dopdownData = res?.data?.map((customer) => ({
        value: customer?._id,
        label: `${customer?.fname} ${customer?.lname}  ${customer?.company_name ? `(${customer?.company_name})` : ""}`,
      }));
      setCustomerOption(dopdownData);
      setAllCustomers(res?.data);
      // setAllSupplier(res?.data?.suppliers);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLastCreatedSheetNo = async () => {
    try {
      const res = await getLastCreatedSheetNoApi();
      setLatestSheetNumber(Number(res?.data?.sheet_no) + 1);
    } catch (error) {
      console.log("getting error while fetching last sheet number", error);
    }
  }


  useEffect(() => {
    fetchAllCustomerList();
    fetchLastCreatedSheetNo();
  }, []);


  const getLocalDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset(); // in minutes
    const localTime = new Date(now.getTime() - offset * 60 * 1000); // adjust for timezone offset
    return localTime.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
  };



  const handleSupplierChange = (option) => {
    setFormData({ ...formData, supplier_id: option?.value });

    setSelectedSupplierOption(option);
    const suppDetail = allSupplier?.find((val) => val?._id == option?.value);
    setSupplierDetail(suppDetail);

    setSelectedCustomerOption(option);
    const customerSelectedDetails = allCustomers?.find((val) => val?._id == option?.value);
    setCustomerDetails(customerSelectedDetails)


    // const countryData = countriesList?.filter((val) => val?.label == "India");
    // const stateData = stateList?.filter(
    //   (val) => val?.label == suppDetail?.state
    // );
    // const cityData = cityList?.filter((val) => val?.label == suppDetail?.city);


    // if (customerSelectedDetails?.customer_billing_details) {
    //   setBillingFormData({
    //     // ...baseDetails?.genralbillingDetails,
    //     ...customerSelectedDetails?.customer_billing_details
    //   });
    // } else {
    //   setBillingFormData({
    //     ...customerSelectedDetails,
    //   });
    // }


    // if (customerSelectedDetails?.customer_shipping_details) {
    //   setShippingFormData({
    //     ...customerSelectedDetails?.customer_shipping_details
    //   });
    // } else {
    //   setShippingFormData({
    //     ...customerSelectedDetails,
    //   });
    // }


  };

  const handleOrderSelection = (option) => {
    setFormData({ ...formData });
    setSelectedorderByClientOption(option);
  };



  //All Form Data is here
  const [formData, setFormData] = useState({
    sheet_no: "",
    make: "",
    date_time: null,
    created_by: "",
    order_no: "",
    order_date: "",
    party_name: "",
    address: "",
    note: "",
  });

  console.log("Production sheet deta is here: ---", formData)

  const [productionSheetData, setProductionSheetData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editProductionId, setEditProductionId] = useState("");

  const [productformData, setProductFormData] = useState({
    product_code: "",
    quantity: "",
    uom: "",
    weight: "",
    price: "",
    discount_per_unit: "",
    total_discount: "",
    cgst: "",
    sgst: "",
    igst: "",
    cess: "",
    amount: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermFittingA, setSearchTermFittingA] = useState("");
  const [searchTermFittingB, setSearchTermFittingB] = useState("");
  const [searchTermGuard, setSearchTermGuard] = useState("");









  const [searchPartyNameTerm, setSearchPartyNameTerm] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarProductsInLastFiveSheets, setSimilarProductsInLastFiveSheets] = useState([]);

  // console.log("Shipping Form", formShippingData)
  // console.log(formBillingData.state_name)
  // console.log(formShippingData.state_name)
  // console.log(formBillingData.state_name === formShippingData.state_name)

  //Rows Fields
  const [rows, setRows] = useState([]);
  const [draggedRow, setDraggedRow] = useState(null);
  console.log("row  rows rows rows rows rows rows rows rows rowsdata is here : --------->", rows);

  const handleDragStart = (index) => {
    setDraggedRow(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedRow === null) return;
    const newRows = [...rows];
    const [movedRow] = newRows?.splice(draggedRow, 1);
    newRows.splice(index, 0, movedRow);

    setRows(newRows);
    setDraggedRow(null);
  };

  const validateForm = () => {
    const newErrors = {};
    // Sheet No - Required + Format (e.g., 123-AB)
    if (!selectedHoseAssembly) {
      newErrors.hose_assembly = "Hose Assembly is required.";
    }
    // Set errors to the state
    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Function to add a new row
  const addRow = () => {
    // if (!selectedHoseAssembly) return;

    if (!validateForm()) {
      return;
    }

    //calculation to add taxable amount
    const newRow = {
      ...selectedHoseAssembly,
      row: rows?.length + 1,
      id: selectedSaleOrderItems?.length,
      hose_assembly: selectedHoseAssembly?.value,
      product_code: selectedHoseAssembly?.product_code,
      quantity: selectedHoseAssembly?.quantity || selectedQuantity,
      uom: selectedHoseAssembly?.uom || "",
      weight: selectedHoseAssembly?.weight || "",
      price: selectedHoseAssembly?.price || 0,
      discount_per_unit: 0 || selectedDiscount,
      // taxable_amount: taxableAmount || 0,
      gst: selectedHoseAssembly?.gst || 0,
      // cgst: cgst || 0,
      // sgst: sgst || 0,
      // igst: igst || 0,
    };

    setRows([...rows, newRow]);
    setSelectedSaleOrderItems(prevItems => [...prevItems, newRow]);
    setSelectedHoseAssembly(null);
    setSelectedQuantity("");
  };

  // console.log("aaa",errors)
  // console.log("rows---------",rows)

  //Funciton to Delete Row
  const handleDeleteTableRow = (id) => {
    setRows(rows?.filter((row) => row.id !== id));
  };

  // Function to handle input changes
  const handleChangeRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    if (field === "quantity" || field === "discount_per_unit") {
      const quantity = parseFloat(updatedRows[index].quantity || 0);
      const discountPerUnit = parseFloat(
        updatedRows[index].discount_per_unit || selectedDiscount || 0
      );
      updatedRows[index].total_discount = quantity * discountPerUnit;
    }
    const quantity = parseFloat(
      updatedRows[index].quantity || selectedQuantity || 0
    );
    const price = parseFloat(updatedRows[index].price) || 0;
    const discount =
      parseFloat(updatedRows[index].discount_per_unit) || selectedDiscount || 0;
    const gst = parseFloat(updatedRows[index].gst) || 0;
    updatedRows[index].taxable_amount = (price - discount) * quantity;
    updatedRows[index].total_amount = parseFloat(
      updatedRows[index].taxable_amount +
      updatedRows[index].cgst +
      updatedRows[index].sgst +
      updatedRows[index].igst +
      updatedRows[index].cess
    );

    setRows(updatedRows);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };


  const handleEditChange = (e) => {
    const { name, value } = e.target;


    setFormData({ ...formData, [name]: value });



    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleEditAssemblyLengthChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    // Update selectedAssemblyLength with the new value
    setSelectedAssemblyLength(value);
    setSelectedSaleOrderItems((prevItems) =>
      prevItems.map((item, index) =>
        index === selectedRowData?.id ?
          {
            ...item,
            product_id: {
              ...item.product_id,
              assembly_length: value
            },
          }
          : item
      ),
    );
  }
  const handleEditFittingLengthChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    // Update selectedAssemblyLength with the new value
    setSelectedFittingLength(value);
    setSelectedSaleOrderItems((prevItems) =>
      prevItems.map((item, index) =>
        index === selectedRowData?.id ?
          {
            ...item,
            product_id: {
              ...item.product_id,
              fitting_length: value
            },
          }
          : item
      ),
    );
  }
  const handleEditCuttingLengthChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    // Update selectedAssemblyLength with the new value
    setSelectedCuttingLength(value);
    setSelectedSaleOrderItems((prevItems) =>
      prevItems.map((item, index) =>
        index === selectedRowData?.id ?
          {
            ...item,
            product_id: {
              ...item.product_id,
              cutting_length: value
            },
          }
          : item
      ),
    );
  }
  const handleEditOAChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    // Update selectedAssemblyLength with the new value
    setSelectedOA(value);
    setSelectedSaleOrderItems((prevItems) =>
      prevItems.map((item, index) =>
        index === selectedRowData?.id ?
          {
            ...item,
            product_id: {
              ...item.product_id,
              oa: value
            },
          }
          : item
      ),
    );
  }




  const resetForm = () => {
    setFormData({
      supplier_id: "",
      date: TodayDate,
      due_date: "",
      note: "",
    });

    setRows([
      {
        id: 1,
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

    // setSelectedSupplierOption(null);
    setSelectedHoseAssembly(null);
  };

  const fetchProductAllList = async () => {
    setLoading(true);
    try {
      const res = await GetAllProductList();
      // console.log("res dropdownProductList res",res)
      const dropdownProductList = res?.data?.products?.map((product) => ({
        // ...product,
        product_id: { ...product },
        value: product?.desc_Code,
        label: `[${product?.product_code}] ${product?.desc_Code}`,
        id: product?._id,
        product_code: product?.product_code,
        product_type: product?.product_type,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
      }));

      setProductOption(dropdownProductList);
    } catch (error) {
      console.error("Error fetching data:", error);
      Toaster.error("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductAllList();
  }, []);

  const calculateSummary = () => {
    let total_quantity = 0;
    let sub_total = 0;
    let total_discount = 0;
    let total_gst_amount = 0; // Includes CGST, SGST, IGST
    let shipping = parseFloat(formData?.shipping || 0); // Get shipping value from formData or set to 0

    rows?.forEach((row) => {
      const quantity = parseFloat(row.quantity || 0);
      const pricePerUnit = parseFloat(row.price || 0);
      const discountPerUnit = parseFloat(row.discount_per_unit || 0);
      const cgst = parseFloat(row.cgst || 0);
      const sgst = parseFloat(row.sgst || 0);
      const igst = parseFloat(row.igst || 0);

      const totalamount = parseFloat(row?.total_amount);

      total_quantity += quantity;
      sub_total += totalamount;
      total_discount += quantity * discountPerUnit;
      // total_gst_amount += quantity * (cgst + sgst + igst); // Sum of all GST components
    });

    const grand_total =
      sub_total - total_discount + total_gst_amount + shipping;

    return {
      total_quantity,
      sub_total,
      total_discount,
      total_gst_amount,
      shipping,
      grand_total,
    };
  };

  const summary = calculateSummary();

  const CreateProductionItems = async (ProductionSheet_id, party_id, order_id) => {


    // Add production_sheet_id and party_id to each item
    const productionSheetItems = formattedProductionSheetItemData.map((item) => ({
      ...item,
      production_sheet_id: ProductionSheet_id,
      party_id: party_id,
      order_id: order_id
    }));

    try {
      const res = await createProductionSheetItemsApi(productionSheetItems);
      if (res.data?.success) {
        setLoading(false);
        resetForm();
        // Reset form after success
        // navigate('/productlist');
      } else {
        setLoading(false);
        Toaster.error(res.data?.message);
      }
    } catch (error) {
      setLoading(false);
      // Handle any errors during API request
      Toaster.error(
        error.response?.data?.message
      );
      console.error("Error creating produciton sheet items:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return;
    // }
    setLoading(true);

    // const fData = {
    //   supplier_id: formData?.supplier_id,
    //   order_details: {
    //     date: formData?.date,
    //     due_date: formData?.due_date,
    //     note: formData?.note,
    //   },
    //   summary: summary,
    // };

    try {
      const res = await createProductionSheetDetailsApi(formData);
      if (res.data?.success) {
        setLoading(false);
        //Validation from backend already sheet created for the pertocualar order id 
        if (res?.data?.productionSheetDetails?.alreadyExists) {
          Toaster.error(res?.data?.productionSheetDetails?.message)
          return;
        }
        CreateProductionItems(res?.data?.productionSheetDetails?._id, res?.data?.productionSheetDetails?.party_id, res?.data?.productionSheetDetails?.order_id);
        Swal.fire({
          icon: "success",
          title: "Purchase Order",
          text: res.data?.message || "PurchaseOrder created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // resetForm(); // Reset form after success
        // navigate('/productlist');
      } else {
        setLoading(false);
        Toaster.error(res.data?.message || "Failed to create product");
        console.error("Product creation error:", res);
      }
    } catch (error) {
      setLoading(false);
      // Handle any errors during API request
      Toaster.error(
        error.response?.data?.message ||
        "An error occurred while processing your request"
      );
      console.error("Error creating product:", error);
    }
  };

  const handleProductDataChange = (selectedOption) => {
    console.log("selected hose assemblye wheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeenn selected", selectedOption)
    setSelectedHoseAssembly(selectedOption);
    setProductFormData(selectedOption);
  };
  const handlePartyNameChange = (selectedOption) => {
    setSelectedCustomerOption(selectedOption);
    // setProductFormData(selectedOption);
  };

  // Function to update selected row when selecting a product
  const handleSelectProduct = (index) => {
    handleChangeRow(index, "quantity", selectedQuantity);
    handleChangeRow(index, "discount_per_unit", selectedDiscount);
  };



  const debounceTimer = useRef(null);

  const fetchProductSearchResults = async (query) => {
    if (!query) return; // Prevent empty requests
    // setLoading(true);

    try {
      const res = await SearchProductsApi(query); // API should support search
      const dropdownProductList = res?.data?.products.map((product) => ({
        // ...product,
        product_id: { ...product },
        value: product?.desc_Code,
        // label: `[${product?.product_code}]  [${product?.desc_Code}]  ${product?.fitting_Code ? ` ⇨[${product?.fitting_Code}]` : ""
        //   }`,
        label: product?.product_type === "Hose Assembly"
          ? `${product?.product_code}`
          : `[${product?.product_code}]  [${product?.desc_Code}]${product?.fitting_Code ? ` ⇨[${product?.fitting_Code}]` : ""}`,

        id: product?._id,
        product_code: product?.product_code,
        product_type: product?.product_type,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
      }));

      setProductOption(dropdownProductList);

    } catch (error) {
      console.error("Error fetching products:", error);
      Toaster.error("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPartySearchResults = async (query) => {
    if (!query) return; // Prevent empty requests
    // setLoading(true);

    try {
      const res = await SearchPartyApi(query); // API should support search
      const dopdownData = res?.data?.cutomer?.map((customer) => ({
        value: customer?._id,
        label: `${customer?.fname} ${customer?.lname}  ${customer?.company_name ? `(${customer?.company_name})` : ""}`,
      }));
      setCustomerOption(dopdownData);
    } catch (error) {
      console.error("Error fetching party:", error);
      // Toaster.error("Failed to load customers. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // **Debounce Function (Delays API call until user stops typing)**
  const debounceSearch = (query) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchProductSearchResults(query);
    }, 500); // 500ms delay
  };

  //search funciton for party clients name
  const debouncePartySearch = (query) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchPartySearchResults(query);
    }, 500); // 500ms delay
  };


  const handleSearch = (inputValue) => {
    console.log("handleSearch Successfully called!!!!!!!", inputValue)
    // console.log("input value is here", inputValue);
    setSearchTerm(inputValue);
    if (inputValue.length > 1) {
      debounceSearch(inputValue);
      // fetchProductSearchResults(inputValue); // Fetch matching products
    }
  };

  const handleFittingASearch = (inputValue) => {
    setSearchTermFittingA(inputValue);
    if (inputValue.length > 1) {
      debounceSearch(inputValue);
      // fetchProductSearchResults(inputValue); // Fetch matching products
    }
  };

  const handleFittingBSearch = (inputValue) => {
    setSearchTermFittingB(inputValue);
    if (inputValue.length > 1) {
      debounceSearch(inputValue);
      // fetchProductSearchResults(inputValue); // Fetch matching products
    }
  };

  const handleSearchGuard = (inputValue) => {
    setSearchTermGuard(inputValue);
    if (inputValue.length > 1) {
      debounceSearch(inputValue);
      // fetchProductSearchResults(inputValue); // Fetch matching products
    }
  };









  //handle search for party name 
  const handlePartyNameSearch = (inputValue) => {
    // console.log("input value is here", inputValue);
    setSearchPartyNameTerm(inputValue);
    if (inputValue.length > 1) {
      debouncePartySearch(inputValue);
      // fetchProductSearchResults(inputValue); // Fetch matching products
    }
  };




  const fetchSimilarProducts = async (fittingCode) => {
    console.log("fittingCode ------------------------------------------->", fittingCode)
    // setLoading(true);
    try {
      const res = await SearchSimilarProductsApi(fittingCode);
      // Transform the API response into dropdown format
      const dropdownProductList = res?.products?.map((product) => ({
        value: product?.desc_Code,
        label: `[${product?.product_code}]  [${product?.desc_Code}]  ⇨[${product?.fitting_Code}]`,
        id: product?._id,
        product_code: product?.product_code,
        product_type: product?.product_type,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
        desc_Code: product?.desc_Code,
      }));
      console.log("fittingCode +++++ dropdownProductList ------------------------------------------->", dropdownProductList, fittingCode)
      setSimilarProducts(dropdownProductList);
    } catch (error) {
      console.error("Error fetching similar products:", error);
      Toaster.error("Failed to load similar products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarHoseAssembly = async (hoseAssemblyProductCode) => {
    // setLoading(true);
    try {
      const res = await SearchSimilarHoseAssemblyApi(hoseAssemblyProductCode);
      // Transform the API response into dropdown format
      const dropdownProductList = res?.products?.map((product) => ({
        value: product?.desc_Code,
        label: `[${product?.product_code}]  [${product?.desc_Code}]  ⇨[${product?.fitting_Code}]`,
        id: product?._id,
        product_code: product?.product_code,
        product_type: product?.product_type,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
        desc_Code: product?.desc_Code,

        part_no: product?.part_no,
        hose: product?.hose,
        hose_fitting_Code: product?.hose_fitting_Code,
        hose_label: product?.hose_label,
        hose_product_Code: product?.hose_product_Code,

        fitting_a_description: product?.fitting_a_description,
        fitting_a_fitting_Code: product?.fitting_a_fitting_Code,
        fitting_a_label: product?.fitting_a_label,
        fitting_a_product_Code: product?.fitting_a_product_Code,

        fitting_b_description: product?.fitting_b_description,
        fitting_b_fitting_Code: product?.fitting_b_fitting_Code,
        fitting_b_product_Code: product?.fitting_b_product_Code,
        fitting_b_label: product?.fitting_b_label,

        assembly_length: product?.assembly_length,
        fitting_length: product?.fitting_length,
        cutting_length: product?.cutting_length,

        guard: product?.guard,
        guard_label: product?.guard_label,
        guard_prodcut_code: product?.guard_prodcut_code,
        guard_type: product?.guard_type,

        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,

      }));

      setSimilarProducts(dropdownProductList);
    } catch (error) {
      console.error("Error fetching similar products:", error);
      Toaster.error("Failed to load similar products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // fetchLastFiveProductsFromProductionSheetItems
  const fetchLastFiveProductsFromProductionSheetItems = async (product_id, party_id) => {
    // setLoading(true);
    try {
      const res = await SearchLastFiveProductsFromProductionSheetApi(product_id, party_id);
      console.log("response is here from last 5 sheet data for that product", res?.items)
      // Transform the API response into dropdown format
      const dropdownProductList = res?.items?.map((product) => ({
        product_type: product?.product_id?.product_type,

        part_no: product?.part_no,
        hose: product?.hose,
        hose_fitting_Code: product?.hose_fitting_Code,
        hose_label: product?.hose_label,
        hose_product_Code: product?.hose_product_Code,

        fitting_a_description: product?.fitting_a_description,
        fitting_a_fitting_Code: product?.fitting_a_fitting_Code,
        fitting_a_label: product?.fitting_a_label,
        fitting_a_product_Code: product?.fitting_a_product_Code,

        fitting_b_description: product?.fitting_b_description,
        fitting_b_fitting_Code: product?.fitting_b_fitting_Code,
        fitting_b_product_Code: product?.fitting_b_product_Code,
        fitting_b_label: product?.fitting_b_label,

        assembly_length: product?.assembly_length,
        fitting_length: product?.fitting_length,
        cutting_length: product?.cutting_length,

        guard: product?.guard,
        guard_label: product?.guard_label,
        guard_prodcut_code: product?.guard_prodcut_code,
        guard_type: product?.guard_type,

        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,



        value: product?.product_code,
        label: `[${product?.product_code}]  [${product?.hose}]  ⇨[${product?.fitting_Code}]`,




        // value: product?.desc_Code,
        // label: `[${product?.product_code}]  [${product?.desc_Code}]  ⇨[${product?.fitting_Code}]`,
        // id: product?._id,
        product_code: product?.product_code,
        fitting_Code: product?.production_sheet_id?.sheet_no,
        desc_Code: product?.production_sheet_id?.order_date,




        orderDate: product?.production_sheet_id?.order_date,
        orderNumber: product?.production_sheet_id?.order_no,
        sheetNumber: product?.production_sheet_id?.sheet_no,
      }));

      setSimilarProductsInLastFiveSheets(dropdownProductList);
    } catch (error) {
      console.error("Error fetching similar products:", error);
      Toaster.error("Failed to load similar products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedHoseAssembly?.fitting_Code) {
      fetchSimilarProducts(selectedHoseAssembly?.fitting_Code);
    }

    if (selectedHoseAssembly?.id && selectedHoseAssembly?.product_type === "Hose Assembly") {
      fetchSimilarHoseAssembly(selectedHoseAssembly?.product_code)
      fetchLastFiveProductsFromProductionSheetItems(selectedHoseAssembly?.id, formData?.party_id);
    }

    if (searchTerm == "") {
      setSimilarProducts("");
      setSimilarProductsInLastFiveSheets("");
    }
  }, [selectedHoseAssembly, searchTerm]);

  const sheetValidateForm = () => {
    const newErrors = {};
    // Sheet No - Required + Format (e.g., 123-AB)
    if (!formData?.sheet_no) {
      newErrors.sheet_no = "Sheet No is required.";
    }
    if (!formData?.make?.trim()) {
      newErrors.make = "Make is required.";
    }
    // Date & Time - Required + Valid Date
    if (!formData?.date_time) {
      newErrors.date_time = "Date & Time is required.";
    }
    // else if (isNaN(new Date(formData.date_time).getTime())) {
    //     newErrors.date_time = "Invalid Date & Time format.";
    // }
    if (!formData?.created_by?.trim()) {
      newErrors.created_by = "Created By is required.";
    }
    if (!formData?.order_no) {
      newErrors.order_no = "Order No is required.";
    }
    if (!formData?.order_date) {
      newErrors.order_date = "Order Date is required.";
    }
    if (!formData?.part_name?.trim()) {
      newErrors.part_name = "Part Name is required.";
    }
    if (!formData?.address?.trim()) {
      newErrors.address = "Address is required.";
    }
    // Set errors to the state
    setSheetErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetSheetForm = () => {
    setFormData({
      sheet_no: "",
      make: "",
      date_time: null,
      created_by: "",
      order_no: "",
      order_date: "",
      part_name: "",
      address: "",
      note: "",
    });
  };

  const handleAddSheet = () => {
    if (!sheetValidateForm()) {
      return;
    }
    const Fdata = formData;
    setProductionSheetData(Fdata);
    resetSheetForm();
  }

  //fetch funtion for orders by customer id 
  const fetchOrdersByCustomer = async (customer_id) => {
    try {
      const res = await saleOrdersByCustomerIdApi(customer_id);
      const dropdownSaleOrdersList = res?.data?.saleOrders?.map((order) => ({
        value: order?.voucher_no,
        label: order?.voucher_no,
        so_id: order?._id
      }));
      setSaleOrdersByParty(dropdownSaleOrdersList)
      setAllSalesOrdersBySingleParty(res?.data?.saleOrders);
    } catch (error) {
      console.error("Error fetching sell orders:", error);
      Toaster.error("Failed to load sell orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  //useeffect hook for fetch order based on party/Customer selected
  useEffect(() => {
    if (selectedCustomerOption?.value) {
      fetchOrdersByCustomer(selectedCustomerOption?.value)
    }
  }, [selectedCustomerOption])

  //filter out selected sale order deaitls  
  useEffect(() => {
    let filterdSelsectedSaleOrderDetails = [];
    if (selectedorderByClientOption) {
      filterdSelsectedSaleOrderDetails = allSalesOrdersBySingleParty.filter((orders) => {
        return orders?.voucher_no === selectedorderByClientOption?.value;
      });
    }
    setSelectedSaleOrderDetails(filterdSelsectedSaleOrderDetails[0]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sheet_no: latestSheetNumber,
      date_time: getLocalDateTime(),
      created_by: `${authData?.user?.firstName} ${authData?.user?.lastName}`,
      order_no: filterdSelsectedSaleOrderDetails[0]?.voucher_no,
      order_id: filterdSelsectedSaleOrderDetails[0]?._id,
      order_date: filterdSelsectedSaleOrderDetails[0]?.order_details?.date,
      party_name: `${filterdSelsectedSaleOrderDetails[0]?.customer_id?.fname} ${filterdSelsectedSaleOrderDetails[0]?.customer_id?.lname}`,
      party_id: filterdSelsectedSaleOrderDetails[0]?.customer_id?._id,
      address: filterdSelsectedSaleOrderDetails[0]?.shipping_details?.address,
      note: filterdSelsectedSaleOrderDetails[0]?.notes
    }));
  }, [selectedorderByClientOption])


  const fetchSaleOrderItems = async (so_id) => {
    try {
      const res = await saleOrderItemsBySOIdApi(so_id);
      setSelectedSaleOrderItems(res?.data?.saleOrders)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if (selectedSaleOrderDetails?._id) {
      fetchSaleOrderItems(selectedSaleOrderDetails?._id)
    }
  }, [selectedSaleOrderDetails])



  const [selectedHose, setSelectedHose] = useState();
  const [selectedProduct, setSelectedProduct] = useState();


  console.log("-*-*-*-selectedProduct*-*-*-*-*-*-*selectedProduct*-*-*-*-*-*-*", selectedProduct)

  const [hoseOption, setHoseOption] = useState();
  const [searchFirstTime, setSearchFirstTime] = useState(false);
  const [searchFirstTimeFittingA, setSearchFirstTimeFittingA] = useState(false);
  const [searchFirstTimeFittingB, setSearchFirstTimeFittingB] = useState(false);
  const [searchFirstTimeGuard, setSearchFirstTimeGuard] = useState(false);



  console.log("selectedHose", selectedHose)

  const handleHoseDataChange = (selectedOption) => {
    console.log("handleHoseDataChange Successfully called!!!!!!!", selectedOption)
    setSelectedHose(selectedOption);
    setSearchFirstTime(true)



    // setSearchFittingCode({
    //   title: "hose",
    //   search: selectedOption?.fitting_Code || ""
    // });

    setFormData({
      ...formData,
      hose: selectedOption?.value,
      hose_fitting_Code: selectedOption?.fitting_Code,
      hose_product_Code: selectedOption?.product_code,
      hose_label: selectedOption?.label
    });
    setErrors({
      ...errors,
      hose: null,
    });
  };

  const handleHoseEditDataChange = (selectedOption) => {
    setSelectedHose(selectedOption);
    setSearchFirstTime(true)
    //update only selected row and update hose related fields only 
    setSelectedSaleOrderItems((prevItems) =>
      prevItems.map((item, index) =>
        index === selectedRowData?.id ?
          {
            ...item,
            product_id: {
              ...item.product_id,
              hose: selectedOption?.value,
              hose_fitting_Code: selectedOption?.fitting_Code,
              hose_product_Code: selectedOption?.product_code,
              hose_label: selectedOption?.label,
            },
          }
          : item
      ),
    );
    setFormData({
      ...formData,
      hose: selectedOption?.value,
      hose_fitting_Code: selectedOption?.fitting_Code,
      hose_product_Code: selectedOption?.product_code,
      hose_label: selectedOption?.label
    });
    setErrors({
      ...errors,
      hose: null,
    });
  };

  const handleFittingAEditDataChange = (selectedOption) => {
    console.log("selectedOption 0000000000000000000000000000000 selectedOption selectedOption =====+++++++++>", selectedOption)
    setSelectedFittingA(selectedOption) //This is for isClearable needed
    setSearchFirstTimeFittingA(true)
    //update only selected row and update hose related fields only 
    setSelectedSaleOrderItems((prevItems) =>
      prevItems.map((item, index) =>
        index === selectedRowData?.id ?
          {
            ...item,
            product_id: {
              ...item.product_id,
              fitting_a_description: selectedOption?.product_id?.desc_Code,
              fitting_a_fitting_Code: selectedOption?.product_id?.fitting_Code,
              fitting_a_label: selectedOption?.label,
              fitting_a_product_Code: selectedOption?.product_code,
              label: selectedOption?.label,
            },
          }
          : item
      ),
    );
    setFormData({
      ...formData,
      hose: selectedOption?.value,
      hose_fitting_Code: selectedOption?.fitting_Code,
      hose_product_Code: selectedOption?.product_code,
      hose_label: selectedOption?.label
    });
    setErrors({
      ...errors,
      hose: null,
    });
  };


  const handleFittingBEditDataChange = (selectedOption) => {
    setSelectedFittingB(selectedOption) //This is for isClearable needed
    setSearchFirstTimeFittingB(true)
    //update only selected row and update hose related fields only 
    setSelectedSaleOrderItems((prevItems) =>
      prevItems.map((item, index) =>
        index === selectedRowData?.id ?
          {
            ...item,
            product_id: {
              ...item.product_id,
              fitting_b_description: selectedOption?.product_id?.desc_Code,
              fitting_b_fitting_Code: selectedOption?.product_id?.fitting_Code,
              fitting_b_label: selectedOption?.label,
              fitting_b_product_Code: selectedOption?.product_code,
              label: selectedOption?.label,
            },
          }
          : item
      ),
    );
    setFormData({
      ...formData,
      hose: selectedOption?.value,
      hose_fitting_Code: selectedOption?.fitting_Code,
      hose_product_Code: selectedOption?.product_code,
      hose_label: selectedOption?.label
    });
    setErrors({
      ...errors,
      hose: null,
    });
  };

  const handleGuardDataChange = (selectedOption) => {
    console.log("*/-*/-*/-/-/-*/-*/-*selectedOption*/-*selectedOptionselectedOptionselectedOption999898989898989898989898989898989898", selectedOption);
    setSelectedGuardOption(selectedOption) //This is for isClearable needed
    setSearchFirstTimeGuard(true)
    //update only selected row and update hose related fields only 
    setSelectedSaleOrderItems((prevItems) =>
      prevItems.map((item, index) =>
        index === selectedRowData?.id ?
          {
            ...item,
            product_id: {
              ...item.product_id,
              guard: selectedOption?.product_id?.desc_Code,
              guard_label: selectedOption?.label,
              guard_prodcut_code: selectedOption?.product_code,
              guard_type: selectedOption?.product_type,
              label: selectedOption?.label,
            },
          }
          : item
      ),
    );
    setFormData({
      ...formData,
      hose: selectedOption?.value,
      hose_fitting_Code: selectedOption?.fitting_Code,
      hose_product_Code: selectedOption?.product_code,
      hose_label: selectedOption?.label
    });
    setErrors({
      ...errors,
      hose: null,
    });
  };





  const [selectedFittingA, setSelectedFittingA] = useState();
  const [selectedFittingB, setSelectedFittingB] = useState();
  const [selectedGuardOption, setSelectedGuardOption] = useState();
  const [selectedGuardTypeOption, setSelectedGuardTypeOption] = useState();
  const [selectedAssemblyLength, setSelectedAssemblyLength] = useState();
  const [selectedFittingLength, setSelectedFittingLength] = useState();
  const [selectedCuttingLength, setSelectedCuttingLength] = useState();
  const [selectedOA, setSelectedOA] = useState();








  const fetchAndPrefillHose = async (code) => {
    try {
      const res = await SearchProductsApi(code);
      const product = res?.data?.products?.[0];

      if (!product) return;

      const formattedOption = {
        value: product?.desc_Code,
        label: `[${product?.product_code}] [${product?.desc_Code}] ${product?.fitting_Code ? `⇨ [${product?.fitting_Code}]` : ""}`,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
        bendAngle: product?.straight_bend_angle
      };

      setSelectedHose(formattedOption);
      // setSelectedFittingA(formattedOption);
      setSelectedProduct(formattedOption);

    } catch (err) {
      console.error("Failed to prefill hose:", err);
    }
  };
  const fetchAndPrefillFittingA = async (code) => {
    try {
      const res = await SearchProductsApi(code);
      const product = res?.data?.products?.[0];

      if (!product) return;

      const formattedOption = {
        value: product?.desc_Code,
        label: `[${product?.product_code}] [${product?.desc_Code}] ${product?.fitting_Code ? `⇨ [${product?.fitting_Code}]` : ""}`,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
        bendAngle: product?.straight_bend_angle
      };

      setSelectedFittingA(formattedOption)


    } catch (err) {
      console.error("Failed to prefill hose:", err);
    }
  };

  const fetchAndPrefillFittingB = async (code) => {
    try {
      const res = await SearchProductsApi(code);
      const product = res?.data?.products?.[0];

      if (!product) return;

      const formattedOption = {
        value: product?.desc_Code,
        label: `[${product?.product_code}] [${product?.desc_Code}] ${product?.fitting_Code ? `⇨ [${product?.fitting_Code}]` : ""}`,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
        bendAngle: product?.straight_bend_angle
      };

      setSelectedFittingB(formattedOption)


    } catch (err) {
      console.error("Failed to prefill hose:", err);
    }
  };

  const fetchAndPrefillGuard = async (code) => {
    try {
      const res = await SearchProductsApi(code);
      const product = res?.data?.products?.[0];

      if (!product) return;

      const formattedOption = {
        value: product?.desc_Code,
        label: `[${product?.product_code}] [${product?.desc_Code}] ${product?.fitting_Code ? `⇨ [${product?.fitting_Code}]` : ""}`,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
        bendAngle: product?.straight_bend_angle
      };

      setSelectedGuardOption(formattedOption)


    } catch (err) {
      console.error("Failed to prefill hose:", err);
    }
  };

  useEffect(() => {
    console.log("selectedRowData?.hose_product_Code", selectedRowData)
    if (selectedRowData?.product_id?.hose_product_Code) {
      fetchAndPrefillHose(selectedRowData?.product_id?.hose_product_Code);
    }

    //Prefetch Fitting A
    if (selectedRowData?.product_id?.fitting_a_product_Code) {
      fetchAndPrefillFittingA(selectedRowData?.product_id?.fitting_a_product_Code);
    }

    //Prefetch Fitting B
    if (selectedRowData?.product_id?.fitting_a_product_Code) {
      fetchAndPrefillFittingB(selectedRowData?.product_id?.fitting_b_product_Code);
    }

    //Prefetch Guard Type Spring, Sleeve, Vinyl Cover
    if (selectedRowData?.product_id?.guard_type) {
      const matchedOption = guardTypeOption.find(
        (opt) =>
          opt.value.toLowerCase() === selectedRowData.product_id.guard_type.toLowerCase()
      );
      setSelectedGuardTypeOption(matchedOption);
    }

    //Prefetch Guard
    if (selectedRowData?.product_id?.guard_prodcut_code) {
      fetchAndPrefillGuard(selectedRowData?.product_id?.guard_prodcut_code);
    }

    //prefetch Aseembly Length 
    if (selectedRowData?.product_id?.assembly_length) {
      setSelectedAssemblyLength(selectedRowData?.product_id?.assembly_length)
    }

    //prefetch Fetting Length 
    if (selectedRowData?.product_id?.fitting_length) {
      setSelectedFittingLength(selectedRowData?.product_id?.fitting_length)
    }

    //prefetch Cutting Length 
    if (selectedRowData?.product_id?.cutting_length) {
      setSelectedCuttingLength(selectedRowData?.product_id?.cutting_length)
    }

    //prefetch Orientation angle
    if (selectedRowData?.product_id?.oa) {
      setSelectedOA(selectedRowData?.product_id?.oa)
    }



  }, [editHoseAssemblyShowModal])

  //This useEffect is triggered during edit mode to prefill form fields by fetching and setting related similar items based on the current selection.
  useEffect(() => {
    console.log("call comes here=--=-=-=-=-=-=-=-=-=-=---> ", selectedGuardOption)
    //In modal box search and set the value first time initially it shows empty
    if (selectedHose?.fitting_Code && searchFirstTime) {
      fetchSimilarProducts(selectedHose?.fitting_Code);
      setSearchFirstTime(false);
    }

    if (selectedFittingA?.fitting_Code && searchFirstTimeFittingA) {
      fetchSimilarProducts(selectedFittingA?.fitting_Code);
      setSearchFirstTimeFittingA(false);
    }

    if (selectedFittingB?.fitting_Code && searchFirstTimeFittingB) {
      fetchSimilarProducts(selectedFittingB?.fitting_Code);
      setSearchFirstTimeFittingB(false);
    }

    if (selectedGuardOption?.product_code && searchFirstTimeGuard) {
      fetchSimilarProducts(selectedGuardOption?.product_code);
      setSearchFirstTimeGuard(false);
    }

    if (searchTerm == "") {
      setSimilarProducts("");
      setSimilarProductsInLastFiveSheets("");
    }
  }, [selectedHose, selectedFittingA, selectedFittingB, selectedGuardOption, searchTerm, searchFirstTimeFittingA, searchFirstTimeFittingB, searchFirstTimeGuard])


  const handleSelectedItemFromSimilarBox = (item) => {
    console.log("item item item item item item item item item item item ", item);
    setSelectedHoseAssembly({
      product_type: item?.product_type,
      label: item?.product_code,
      value: item?.product_code,
      product_code: item?.product_code,
      product_id: {
        ...item
      }
    })
  }


  //pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // default 10 rows


  const hoseAssemblyRows = selectedSaleOrderItems?.filter(
    (data) => data.product_type === "Hose Assembly"
  ) || [];

  const totalRows = hoseAssemblyRows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const paginatedData = hoseAssemblyRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle
        activeMenu={"Production Management"}
        motherMenu={"Home"}
        motherMenuLink={"/dashboard"}
      />
      <div className="row">
        {/* SECTION 1ST */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">

            <div className="card-body">
              {/* Sheet Details */}
              <div className="mb-3">
                <h4 className="card-title">Production Sheet Detail</h4>
                <div className="mb-3 row">
                  {/* Sheet No. */}
                  <div className="col-md-4">
                    <label className="col-form-label">Sheet No.</label>
                    <input
                      name="sheet_no"
                      value={latestSheetNumber}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="SheetNo-101"
                      disabled
                    />
                    {sheetErrors?.sheet_no && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.sheet_no}
                      </span>
                    )}
                  </div>
                  {/* Make */}
                  <div className="col-md-4">
                    <label className="col-form-label">Make</label>
                    <input
                      name="make"
                      value={formData?.make}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Make"
                    />
                    {sheetErrors?.make && (
                      <span className="text-danger fs-12">{sheetErrors?.make}</span>
                    )}
                  </div>
                  {/* Date & Time */}
                  <div className="col-md-4">
                    <label className="col-form-label">Date & Time</label>
                    <input
                      name="date_time"
                      value={formData?.date_time}
                      // value={new Date().toISOString().slice(0, 16)} // default current date & time
                      onChange={handleChange}
                      onClick={(e) => e.target.showPicker()}
                      type="datetime-local"
                      className="form-control"
                      placeholder="Enter End"
                      disabled
                    />
                    {sheetErrors?.date_time && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.date_time}
                      </span>
                    )}
                  </div>
                  {/* Created By */}
                  {/* <div className="col-md-3">
                    <label className="col-form-label">Created By</label>
                    <input
                      name="created_by"
                      value={formData?.created_by}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Size"
                    />
                    {sheetErrors?.created_by && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.created_by}
                      </span>
                    )}
                  </div> */}
                </div>

                <div className="mb-3 row">
                  {/* Order No. */}
                  {/* <div className="col-md-3">
                    <label className="col-form-label">Order No.</label>
                    <input
                      name="order_no"
                      value={formData?.order_no}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Material"
                    />
                    {sheetErrors?.order_no && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.order_no}
                      </span>
                    )}
                  </div> */}

                  {/* Order Date */}

                  {/* <div className="col-md-3">
                    <label className="col-form-label">Order Date</label>
                    <input
                      name="order_date"
                      value={formData?.order_date}
                      onChange={handleChange}
                      onClick={(e) => e.target.showPicker()}
                      type="date"
                      className="form-control"
                      placeholder="Enter Date"
                    />
                    {sheetErrors?.order_date && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.order_date}
                      </span>
                    )}
                  </div> */}

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">Party Name</label>
                    {/* Search Button */}
                    <Select
                      options={searchPartyNameTerm ? customerOption : []}
                      placeholder="Search party by name"
                      isLoading={loading}
                      value={selectedCustomerOption}
                      onChange={handlePartyNameChange}
                      onInputChange={handlePartyNameSearch}
                      noOptionsMessage={() => "No matching products found"}
                      isClearable
                      menuIsOpen={!!searchPartyNameTerm}
                    />
                    {errors?.hose_assembly && (
                      <span className="text-danger fs-12">{errors?.hose_assembly}</span>
                    )}

                  </div>

                  {/* <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">Party Name<span className="text-danger">*</span></label>
                    <Select
                      value={selectedSupplierOption}
                      onChange={handleSupplierChange}
                      defaultValue={selectedSupplierOption}
                      options={customerOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.supplier_id && (
                      <span className="text-danger fs-12">
                        {errors.supplier_id}
                      </span>
                    )}
                  </div> */}

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">Select Order<span className="text-danger">*</span></label>
                    <Select
                      value={selectedorderByClientOption}
                      onChange={handleOrderSelection}
                      defaultValue={selectedorderByClientOption}
                      options={saleOrdersByParty}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                      isClearable
                    />
                    {errors.supplier_id && (
                      <span className="text-danger fs-12">
                        {errors.supplier_id}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Created By</label>
                    <input
                      name="created_by"
                      value={`${authData?.user?.firstName} ${authData?.user?.lastName}`}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Size"
                      disabled
                    />
                    {sheetErrors?.created_by && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.created_by}
                      </span>
                    )}
                  </div>


                  {/* <div className="col-md-3">
                    <label className="col-form-label">Party Name</label>
                    <input
                      name="party_name"
                      value={formData?.party_name}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Party Name"
                    />
                    {sheetErrors?.part_name && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.part_name}
                      </span>
                    )}
                  </div> */}


                  {/* <div className="col-md-3">
                    <label className="col-form-label">Address</label>
                    <input
                      name="address"
                      value={formData?.address}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Part Name"
                    />
                    {sheetErrors?.address && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.address}
                      </span>
                    )}
                  </div> */}

                </div>

                <div className=" row">
                  {/* Order No. */}
                  <div className="col-md-4">
                    <label className="col-form-label">Order No.</label>
                    <input
                      name="order_no"
                      value={formData?.order_no}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Order Number"
                    />
                    {sheetErrors?.order_no && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.order_no}
                      </span>
                    )}
                  </div>
                  {/* Order Date */}
                  <div className="col-md-4">
                    <label className="col-form-label">Order Date</label>
                    <input
                      name="order_date"
                      value={formData?.order_date}
                      onChange={handleChange}
                      onClick={(e) => e.target.showPicker()}
                      type="date"
                      className="form-control"
                      placeholder="Enter Date"
                    />
                    {sheetErrors?.order_date && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.order_date}
                      </span>
                    )}
                  </div>
                  {/* Address */}
                  <div className="col-md-4">
                    <label className="col-form-label">Address</label>
                    <input
                      name="address"
                      value={formData?.address}
                      onChange={handleChange}
                      type="address"
                      rows="4"
                      className="form-control"
                      placeholder="Plot No 73, Sector 6, Faridabad, Haryana 121006"
                    />
                    {sheetErrors?.address && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.address}
                      </span>
                    )}
                  </div>
                </div>

                <div className=" row">
                  <div className="col-md-6">
                    <label className="col-form-label">
                      Note
                      {/* <span className="text-danger">*</span> */}
                    </label>
                    <textarea
                      name="note"
                      className="form-control"
                      rows="3"
                      id="comment"
                      placeholder="Note"
                      value={formData.note}
                      onChange={handleChange}
                    ></textarea>
                    {sheetErrors.note && (
                      <span className="text-danger fs-12">{sheetErrors.note}</span>
                    )}
                  </div>
                </div>

                {/* <button onClick={handleAddSheet} className="btn btn-primary mt-4">
                  Add Sheet Detail
                </button> */}
              </div>
              <hr className="w-100" />
              {/* Hose Assembly Search Box   */}
              <div>
                <h4 className="card-title">🔍 Search Production Sheet Items</h4>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label className="col-form-label">Hose Assembly</label>
                        {/* Search Button */}
                        <Select
                          options={searchTerm ? productOption : []}
                          placeholder="Search product by code ..."
                          isLoading={loading}
                          value={selectedHoseAssembly}
                          onChange={handleProductDataChange}
                          onInputChange={handleSearch}
                          noOptionsMessage={() => "No matching products found"}
                          isClearable
                          menuIsOpen={!!searchTerm}
                        />
                        {errors?.hose_assembly && (
                          <span className="text-danger fs-12">{errors?.hose_assembly}</span>
                        )}

                      </div>
                    </div>
                    {/* Qty and Discount */}
                    <div className="row">
                      <div className="col-md-6">
                        <label className="col-form-label">Add Quantity</label>
                        <input
                          type="number"
                          placeholder="Qty"
                          value={selectedQuantity}
                          onChange={(e) => setSelectedQuantity(e.target.value)}
                          className="form-control row-input"
                        />
                      </div>

                    </div>
                    {/* Add button */}
                    <button onClick={addRow} className="btn btn-primary mt-4">
                      Add
                    </button>
                  </div>

                  {/* Search Box  */}
                  <div className="col-md-6">
                    <label className="col-form-label">
                      Select Similar Products
                    </label>

                    <div className="productionsheet-sidebox p-3 bg-white  rounded ">
                      <div>
                        {similarProducts?.length === 0 ? (
                          <div
                            className="d-flex flex-column align-items-center justify-content-center"
                            style={{ minHeight: "200px" }}>
                            <div
                              style={{
                                fontSize: "5rem",
                                color: "#6c757d",
                                animation: "bounce 1.5s infinite",
                              }}>
                              🔍
                            </div>
                            <p className="text-center text-muted fw-bold">
                              No Data Found. Start Searching for a Product!
                            </p>
                          </div>
                        ) : (
                          <div className="product-list" style={{ maxHeight: "300px" }}>
                            {similarProducts
                              ?.filter((product) => product.product_type !== "Hose Assembly")
                              .map((product) => (
                                <div
                                  key={product._id}
                                  className="product-item p-2 mb-2 text-dark rounded cursor-pointer"
                                  onClick={() => setSelectedHoseAssembly(product)}
                                  style={{
                                    border:
                                      selectedHoseAssembly?.id === product?.id
                                        ? "3px solid #5b11e1"
                                        : "1px solid #ddd",
                                    backgroundColor: "#E0CFFF",
                                    cursor: "pointer",
                                  }}>
                                  <div className="col">
                                    <div className="d-flex justify-content-between">
                                      <div className="w-80">
                                        <strong>{product.product_code}</strong>
                                        <span> {product.desc_Code}</span>
                                        <br />
                                        <small className="text-muted">
                                          {product.fitting_Code}
                                        </small>
                                      </div>
                                      <div
                                        className="w-20 d-flex align-items-center justify-content-center text-white rounded  px-3 py-1 shadow-sm"
                                        style={{
                                          minWidth: "60px",
                                          fontSize: "12px",
                                          background:
                                            "linear-gradient(135deg, #C3A4FC, #C3A4FC , #9A67F8)",
                                          border: "1px solid transparent",
                                        }}>
                                        <span className="text-black font-bold">Qty:</span>
                                        <span className="ms-1 text-black font-bold">0</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}

                            {/* Special UI for "Hose Assembly" Hose Assembly Hose Assemblyv Hose Assembly Hose Assembly Hose Assembly Hose Assembly Hose Assembly Hose Assemblyproducts */}
                            {similarProducts
                              ?.filter((product) => product.product_type === "Hose Assembly")
                              .map((product) => (
                                <>
                                  <h5 >Selected Product</h5>
                                  <hr style={{ marginBottom: '10px', marginTop: '5px' }} />
                                  <div
                                    key={product._id}
                                    className="product-item p-2 mb-3 text-dark rounded cursor-pointer"
                                    onClick={() => handleSelectedItemFromSimilarBox(product)}
                                    // onClick={() => setSelectedHoseAssembly(product)}
                                    style={{
                                      border:
                                        selectedHoseAssembly?.id == product?.id
                                          ? "3px solid #5b11e1"
                                          : "1px solid #ddd",
                                      backgroundColor: "#E0CFFF",
                                      cursor: "pointer",
                                    }}
                                  // style={containerStyle}
                                  // onMouseEnter={() => setShowDetails(true)}
                                  // onMouseLeave={() => setShowDetails(false)}
                                  >
                                    <div className="col">
                                      <div className="d-flex justify-content-between">
                                        <div className="w-80 ">
                                          {/* border p-2 rounded */}
                                          <strong>{product.product_code}</strong> &nbsp;|&nbsp;

                                          <strong> Hose: </strong><span> {product?.hose}</span> &nbsp;

                                          {/* <span>
                                            <button
                                              className="btn btn-xs sharp btn-primary"
                                              onClick={() => setShowDetails(true)}>
                                              <i className="fa-solid fa-eye"></i>
                                            </button>
                                          </span> */}

                                          {/* <span >
                                            <small
                                              style={{
                                                backgroundColor: '#AFDDFF',
                                                border: '1px solid black',
                                                padding: '2px 8px',
                                                borderRadius: '999px',
                                                color: 'black',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                              }}
                                            >
                                              Assembly Length: {product.assembly_length}
                                            </small>
                                            <small
                                              style={{
                                                backgroundColor: '#DDEB9D',
                                                border: '1px solid black',
                                                padding: '2px 8px',
                                                borderRadius: '999px',
                                                color: 'black',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                              }}
                                            >
                                              Fitting Length: {product.fitting_length}
                                            </small>
                                            <small
                                              style={{
                                                backgroundColor: 'lightsalmon',
                                                border: '1px solid black',
                                                padding: '2px 8px',
                                                borderRadius: '999px',
                                                color: 'black',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                              }}
                                            >
                                              Cutting Length: {product.cutting_length}
                                            </small>
                                          </span> */}

                                          <br />
                                          <small>
                                            <strong>Fitting A:</strong> {product.fitting_a_fitting_Code}  &nbsp;|&nbsp;
                                            <strong>Fitting B:</strong> {product.fitting_b_fitting_Code}

                                          </small>
                                          {/* <br />      */}
                                          {/* <small>
                                            
                                            <strong>Guard :</strong> {product.guard} 
                                          </small>                                */}
                                        </div>
                                        {/* Product Display Eye Button */}
                                        <div className="d-flex align-items-center">
                                          <span>
                                            <button
                                              className="btn btn-xs sharp btn-primary"
                                              onClick={(e) => {
                                                e.stopPropagation(); // 👈 Prevents the div's onClick
                                                setProductShowModal(true);
                                                setSelectedHoseAssemblyItem(product);
                                              }}>
                                              <i className="fa-solid fa-eye"></i>
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))}
                          </div>
                        )}
                      </div>


                      {similarProductsInLastFiveSheets?.length === 0 ? (
                        <></>
                        // <div
                        //   className="d-flex flex-column align-items-center justify-content-center"
                        //   style={{ minHeight: "200px" }}>
                        //   {/* <div
                        //     style={{
                        //       fontSize: "5rem",
                        //       color: "#6c757d",
                        //       animation: "bounce 1.5s infinite",
                        //     }}>
                        //     🔍
                        //   </div>
                        //   <p className="text-center text-muted fw-bold">
                        //     No Data Found. Start Searching for a Product!
                        //   </p> */}
                        // </div>
                      ) : (
                        <>
                          <h5>Previously used assemblies for this client – Last 5 client sheet records</h5>
                          <hr style={{ marginBottom: '10px', marginTop: '5px' }} />
                          <div
                            className="product-list"
                            style={{ maxHeight: "300px" }}>
                            {similarProductsInLastFiveSheets?.map((product) => (
                              <div
                                key={product._id}
                                className="product-item p-2 mb-2 text-dark rounded cursor-pointer"
                                // onClick={() => setSelectedHoseAssembly(product)}
                                onClick={() => handleSelectedItemFromSimilarBox(product)}

                                style={{
                                  border:
                                    selectedHoseAssembly?.id == product?.id
                                      ? "3px solid #5b11e1"
                                      : "1px solid #ddd",
                                  backgroundColor: "#E0CFFF",
                                  cursor: "pointer",
                                }}>

                                {/* <strong>{product.product_code}</strong>
                              <span> {product.desc_Code}</span>
                              <br />
                              <small className="text-muted">{product.fitting_Code}</small> */}
                                <div className="col">
                                  <div className="d-flex justify-content-between">
                                    <div className="w-80 ">
                                      {/* border p-2 rounded */}
                                      <strong>{product.product_code}</strong> &nbsp;|&nbsp;

                                      <strong>Sheet No. {product.sheetNumber}</strong> &nbsp;|&nbsp;
                                      <strong>Order Date {product.orderDate}</strong> &nbsp;|&nbsp;
                                      <strong> Hose: </strong><span> {product?.hose}</span> &nbsp;

                                      {/* <span >
                                            <small
                                              style={{
                                                backgroundColor: '#AFDDFF',
                                                border: '1px solid black',
                                                padding: '2px 8px',
                                                borderRadius: '999px',
                                                color: 'black',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                              }}
                                            >
                                              Assembly Length: {product.assembly_length}
                                            </small>
                                            <small
                                              style={{
                                                backgroundColor: '#DDEB9D',
                                                border: '1px solid black',
                                                padding: '2px 8px',
                                                borderRadius: '999px',
                                                color: 'black',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                              }}
                                            >
                                              Fitting Length: {product.fitting_length}
                                            </small>
                                            <small
                                              style={{
                                                backgroundColor: 'lightsalmon',
                                                border: '1px solid black',
                                                padding: '2px 8px',
                                                borderRadius: '999px',
                                                color: 'black',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                              }}
                                            >
                                              Cutting Length: {product.cutting_length}
                                            </small>
                                          </span> */}

                                      <br />
                                      <small>
                                        <strong>Fitting A:</strong> {product.fitting_a_fitting_Code}  &nbsp;|&nbsp;
                                        <strong>Fitting B:</strong> {product.fitting_b_fitting_Code} &nbsp;|&nbsp;
                                        {/* <strong>Guard :</strong> {product.guard} */}
                                      </small>
                                      {/* <br /> */}
                                      {/* <small>
                                            <strong>Fitting B:</strong> {product.fitting_b_fitting_Code}
                                          </small> */}

                                      {/* <small>
                                            <strong>Guard :</strong> {product.guard}
                                          </small>
                                          */}
                                      {/* <br />
                                           */}

                                    </div>

                                    {/* <div className="w-20">
                                    <span>Quantity</span>
                                    <br />
                                    <small className="text-muted">0</small>
                                  </div> */}

                                    {/* <div
                                      className="w-20 d-flex align-items-center justify-content-center text-white rounded  px-3 py-1 shadow-sm"
                                      style={{
                                        minWidth: "60px",
                                        fontSize: "12px",
                                        // background: "#C3A4FC",
                                        background:
                                          "linear-gradient(135deg, #C3A4FC, #C3A4FC , #9A67F8)",
                                        border: "1px solid transparent",
                                        // borderImage: "linear-gradient(135deg, #9A67F8, #C3A4FC , #7B32FF) 1", // Gradient border
                                      }}>
                                      <span className="text-black font-bold">
                                        Qty:
                                      </span>
                                      <span className="ms-1 text-black font-bold">
                                        0
                                      </span>
                                    </div> */}

                                    <div className="d-flex align-items-center">
                                      <span>
                                        <button
                                          className="btn btn-xs sharp btn-primary"
                                          onClick={(e) => {
                                            e.stopPropagation(); // 👈 Prevents the div's onClick
                                            setProductShowModal(true);
                                            setSelectedHoseAssemblyItem(product);
                                          }}>
                                          <i className="fa-solid fa-eye"></i>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Production Sheet View  */}
              <div className="mt-3">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Production Sheet View</h4>
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


                  <ProductionManagementTable
                    rows={rows} productionSheetData={productionSheetData}
                    isEdit={isEdit} setIsEdit={setIsEdit}
                    editProductionId={editProductionId}
                    setEditProductionId={setEditProductionId}
                    productionSheetDetailsData={formData}
                    productionSheetItemsDetailsData={selectedSaleOrderItems}
                    setProductionSheetItemsDetailsData={setSelectedSaleOrderItems}
                    setEditHoseAssemblyShowModal={setEditHoseAssemblyShowModal}
                    setSelectedRowData={setSelectedRowData}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                  />

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
                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        const visiblePages = 3; // Show 3 at a time
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
                      })}

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
            </div>
          </div>
        </div>

        {/* Section Submit button */}
        <div className="text-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary rounded-sm">
            Save Information
          </button>
        </div>
      </div>


      {/* Hose Assembly details Modal Box*/}
      <Modal
        size="lg"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background effect

        }}
        centered
        show={productShowModal} onHide={() => setProductShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hose Assembly Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedHoseAssemblyItem && (
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

              {selectedHoseAssemblyItem?.sheetNumber && selectedHoseAssemblyItem?.orderDate && (
                <div style={{ marginBottom: "10px", fontSize: "14px", color: "#444", display: 'flex', justifyContent: 'center' }}>
                  <strong>Sheet No. {selectedHoseAssemblyItem.sheetNumber}</strong>&nbsp;|&nbsp;
                  {/* <strong>Order Date {selectedHoseAssemblyItem.orderDate}</strong>&nbsp;|&nbsp; */}
                  <strong>
                    Order Date{": "}
                    {new Date(selectedHoseAssemblyItem.orderDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </strong>
                  &nbsp;|&nbsp;
                  <strong>
                    Time: {(() => {
                      const orderDate = new Date(selectedHoseAssemblyItem.orderDate);
                      const today = new Date();
                      const diffTime = today - orderDate;
                      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                      if (diffDays === 0) return "Today";
                      if (diffDays === 1) return "1 day ago";
                      return `${diffDays} days ago`;
                    })()}
                  </strong>
                </div>
              )}

              {/* Table-like Grid with Borders */}
              <div style={{ display: "grid", gridTemplateColumns: "140px auto", fontSize: "13px", border: "1px solid #D3D3D3", borderRadius: "8px", padding: "5px", }}>
                {[
                  { label: "Product Code", value: selectedHoseAssemblyItem?.product_code },
                  { label: "Hose", value: selectedHoseAssemblyItem?.hose },
                  { label: "Fitting A ", value: selectedHoseAssemblyItem?.fitting_a_description },
                  { label: "Fitting B ", value: selectedHoseAssemblyItem?.fitting_b_description },
                  { label: "Orientation Angle", value: selectedHoseAssemblyItem?.oa ? selectedHoseAssemblyItem?.oa : 'N/A' },
                  { label: "Guard Type", value: selectedHoseAssemblyItem?.guard_type },
                  { label: "Guard", value: selectedHoseAssemblyItem?.guard },
                  { label: "Asssembly Length", value: selectedHoseAssemblyItem?.assembly_length },
                  { label: "Fitting Length", value: selectedHoseAssemblyItem?.fitting_length },
                  { label: "Cutting Length", value: selectedHoseAssemblyItem?.cutting_length },
                  { label: "Weight", value: selectedHoseAssemblyItem?.weight || "N/A" },
                  { label: "UOM", value: selectedHoseAssemblyItem?.uom || "N/A" },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>{item.label}:</div>
                    <div style={{ color: "#666", padding: "6px 0", borderBottom: "1px dotted #ccc" }}>{item.value}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="danger" onClick={() => setProductShowModal(false)}>Close</Button>
          <Button variant="success" onClick={() => setProductShowModal()}>Verify</Button>
        </Modal.Footer> */}
      </Modal>



      {/*  Edit Selected hose Assembly Modal Box*/}
      <Modal
        size="xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background effect
        }}
        centered
        show={editHoseAssemblyShowModal} onHide={() => setEditHoseAssemblyShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item Details</Modal.Title>
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

              <div className="col-xl-12 col-lg-12 ">
                <div className="card" >

                  {/* <div className="card-header">
                    <h4 className="card-title">
                      
                      Product Details
                    </h4>
                  </div> */}


                  {/* <h6 style={{ fontWeight: "600", marginBottom: "8px", color: "#222", textAlign: "center",marginTop: '4px' }}>
                    Product Details
                  </h6> */}

                  {/* Table-like Grid with Borders */}
                  <div style={{ display: "grid", gridTemplateColumns: "140px auto", fontSize: "13px", border: "1px solid #D3D3D3", borderRadius: "8px", padding: "15px", }}>
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

                </div>
              </div>





              {/* Product Details and serach box section */}
              <div className="col-xl-12 col-lg-12 mt-3">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">
                      {/* Basic Info */}
                      Hose Assembly
                    </h4>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      {/* Hose Assembly Input boxes */}
                      <div className="col-md-6">
                        {/* 1 First Row */}
                        <div className="row mb-3">
                          {/* Part Number */}
                          <div className="col-md-4">
                            <label className="col-form-label">Part No.</label>
                            <input
                              name="part_no"
                              value={selectedRowData?.product_code}
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              placeholder="Enter Part No."
                            />
                            {errors?.part_no && (
                              <span className="text-danger fs-12">
                                {errors?.part_no}
                              </span>
                            )}
                          </div>
                          {/* Search Box For Hose */}
                          <div className="col-md-8">
                            <label className="col-form-label">Hose</label>
                            <Select
                              options={searchTerm ? productOption : []}
                              placeholder="Search Hose by name or code..."
                              isLoading={loading}
                              value={selectedHose}
                              onChange={handleHoseEditDataChange}
                              onInputChange={handleSearch}
                              noOptionsMessage={() => "No matching hose found"}
                              isClearable
                              menuIsOpen={!!searchTerm}
                            />
                            {errors?.hose && (
                              <span className="text-danger fs-12">
                                {errors?.hose}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* 2 Second Row */}
                        {/* Search Fitting A Input Box */}
                        <div className="mb-3">
                          <div className="">
                            <label className="col-form-label">Fitting A</label>
                            <Select
                              options={searchTermFittingA ? productOption : []}
                              placeholder="Search Fitting A by name or code ..."
                              isLoading={loading}
                              value={selectedFittingA}
                              onChange={handleFittingAEditDataChange}
                              onInputChange={handleFittingASearch}
                              noOptionsMessage={() => "No matching fitting a found"}
                              isClearable
                              menuIsOpen={!!searchTermFittingA}
                            />
                            {errors?.fitting_a_description && (
                              <span className="text-danger fs-12">
                                {errors?.fitting_a_description}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* 3 Third Row */}
                        {/* Search Fitting B Input Box */}
                        <div className="mb-3">
                          <div className="">
                            <label className="col-form-label">Fitting B</label>
                            {/* Search Button */}
                            <Select
                              options={searchTermFittingB ? productOption : []}
                              placeholder="Search Fitting A by name or code ..."
                              isLoading={loading}
                              value={selectedFittingB}
                              onChange={handleFittingBEditDataChange}
                              onInputChange={handleFittingBSearch}
                              noOptionsMessage={() => "No matching fitting a found"}
                              isClearable
                            // menuIsOpen={!!searchFB}
                            />
                            {errors?.fitting_b_description && (
                              <span className="text-danger fs-12">
                                {errors?.fitting_b_description}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* 4 Fourth Row */}
                        {/* Assembly || Fiitting || Cutting - Length with OA */}
                        <div className="row mb-3">
                          {/* Assembly Length */}
                          <div className="col-md-3">
                            {/* <label className="col-form-label">Assembly Length</label> */}
                            <label className="col-form-label text-truncate d-block" style={{ maxWidth: '100%' }}>
                              Assembly Length
                            </label>
                            <input
                              type="number"
                              placeholder="AL"
                              name="assembly_length"
                              value={selectedAssemblyLength}
                              onChange={handleEditAssemblyLengthChange}
                              className="form-control row-input"
                            />
                            {errors?.assembly_length && (
                              <span className="text-danger fs-12">
                                {errors?.assembly_length}
                              </span>
                            )}
                          </div>
                          {/* Fitting Length */}
                          <div className="col-md-3">
                            <label className="col-form-label">
                              Fitting Length
                            </label>
                            <input
                              type="number"
                              placeholder="FL"
                              name="fitting_length"
                              value={selectedFittingLength}
                              onChange={handleEditFittingLengthChange}
                              className="form-control"
                            />
                            {errors?.fitting_length && (
                              <span className="text-danger fs-12">
                                {errors?.fitting_length}
                              </span>
                            )}
                          </div>
                          {/* Cutting Length */}
                          <div className="col-md-3">
                            <label className="col-form-label text-truncate d-block" style={{ maxWidth: '100%' }}>Cutting Length</label>
                            <input
                              type="number"
                              placeholder="CL"
                              name="cutting_length"
                              value={selectedCuttingLength}
                              onChange={handleEditCuttingLengthChange}
                              className="form-control"
                              disabled
                            />
                            {errors?.cutting_length && (
                              <span className="text-danger fs-12">
                                {errors?.cutting_length}
                              </span>
                            )}
                          </div>
                          {/* orientationAngle */}
                          {/* {orientationAngle || orientationAngleFromParent && ( */}
                          <div className="col-md-3">
                            <label className="col-form-label">
                              OA
                            </label>
                            <input
                              type="number"
                              placeholder="OA"
                              name="oa"
                              value={selectedOA}
                              onChange={handleEditOAChange}
                              className="form-control"
                            />
                          </div>
                          {/* )} */}
                        </div>
                        {/* 5 Fifth Row */}
                        {/* Selection Guard */}
                        <div className="row mb-3">
                          {/* Guard Type */}
                          <div className="col-md-6">
                            <label className="col-form-label">Guard Type</label>
                            <Select
                              value={selectedGuardTypeOption}
                              onChange={(option) => {
                                setSelectedGuardTypeOption(option);
                                setFormData({
                                  ...formData,
                                  guard_type: option.value,
                                });
                                setErrors({
                                  ...errors,
                                  guard_type: null,
                                });
                                //This is for edit in tbale for perticular field for producito sheet.
                                setSelectedSaleOrderItems((prevItems) =>
                                  prevItems.map((item, index) =>
                                    index === selectedRowData?.id ?
                                      {
                                        ...item,
                                        product_id: {
                                          ...item.product_id,
                                          guard_type: option?.value,
                                        },
                                      }
                                      : item
                                  ),
                                );
                              }}
                              options={guardTypeOption}
                              style={{
                                lineHeight: "40px",
                                color: "#7e7e7e",
                                paddingLeft: " 15px",
                              }}
                            />
                            {errors?.guard_type && (
                              <span className="text-danger fs-12">
                                {errors?.guard_type}
                              </span>
                            )}
                          </div>
                          {/* Select Guard */}
                          <div className="col-md-6">
                            <label className="col-form-label">Select Guard</label>
                            {/* Search Button */}
                            <Select
                              options={searchTermGuard ? productOption : []}
                              placeholder="Search guard  ..."
                              isLoading={loading}
                              value={selectedGuardOption}
                              onChange={handleGuardDataChange}
                              onInputChange={handleSearchGuard}
                              noOptionsMessage={() => "No matching guard a found"}
                              isClearable
                              menuIsOpen={!!searchTermGuard}
                            />
                            {errors?.guard && (
                              <span className="text-danger fs-12">
                                {errors?.guard}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Hose Assembly Search boxes */}
                      <div className="col-md-6">
                        <label className="col-form-label">
                          Select Similar Product
                        </label>
                        <div className="hose-sidebox p-3 bg-white  rounded">
                          {similarProducts?.length === 0 ? (
                            <div
                              className="d-flex flex-column align-items-center justify-content-center"
                              style={{ minHeight: "300px" }}>
                              <div
                                style={{
                                  fontSize: "5rem",
                                  color: "#6c757d",
                                  animation: "bounce 1.5s infinite",
                                }}>
                                🔍
                              </div>
                              <p className="text-center text-muted fw-bold">
                                No Data Found. Start Searching for a Hose!
                              </p>
                            </div>
                          ) : (
                            <div
                              className="product-list"
                              style={{ maxHeight: "300px" }}>
                              {similarProducts?.map((product) => {
                                const isSelected = ""
                                // (searchFittingCode?.title === "hose" && selectedHose?.id === product?.id) ||
                                // (searchFittingCode?.title === "fitting_a" && selectedFittingA?.id === product?.id) ||
                                // (searchFittingCode?.title === "fitting_b" && selectedFittingB?.id === product?.id) ||
                                // (searchFittingCode?.title === "guard" && selectedGuardOption?.id === product?.id);
                                return (
                                  <div key={product?._id}
                                    className="product-item p-2 mb-2 text-dark rounded cursor-pointer"
                                    // onClick={() => {
                                    //   if (searchFittingCode?.title == "hose") {
                                    //     setSelectedHose(product);
                                    //   } else if (searchFittingCode?.title == "fitting_a") {
                                    //     setSelectedFittingA(product);
                                    //   } else if (searchFittingCode?.title == "fitting_b") {
                                    //     setSelectedFittingB(product);
                                    //   } else if (searchFittingCode?.title == "guard") {
                                    //     setSelectedGuardOption(product);
                                    //   }
                                    // }}
                                    style={{
                                      border: isSelected ? "3px solid #5b11e1" : "1px solid #ddd",
                                      backgroundColor: "#E0CFFF",
                                      cursor: "pointer",
                                    }}>
                                    <div className="col">
                                      <div className="d-flex justify-content-between">
                                        <div className="w-80">
                                          <strong>{product?.product_code}</strong>
                                          <span> {product?.desc_Code}</span>
                                          <br />
                                          <small className="text-muted">
                                            {product?.fitting_Code}
                                          </small>
                                        </div>
                                        <div
                                          className="w-20 d-flex align-items-center justify-content-center text-white rounded  px-3 py-1 shadow-sm"
                                          style={{
                                            minWidth: "60px",
                                            fontSize: "12px",
                                            background:
                                              "linear-gradient(135deg, #C3A4FC, #C3A4FC , #9A67F8)",
                                            border: "1px solid transparent"
                                          }}>
                                          <span className="text-black font-bold">
                                            Qty:
                                          </span>
                                          <span className="ms-1 text-black font-bold">
                                            {product?.quantity}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setEditHoseAssemblyShowModal(false)}>Close</Button>
          <Button variant="success" onClick={() => setEditHoseAssemblyShowModal(false)}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductionManagement;



