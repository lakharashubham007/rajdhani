import React, { useEffect, useRef, useState } from "react";
import { DatePicker } from "rsuite";
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
  SearchSimilarProductsApi,
} from "../../../services/apis/Product";
import moment from "moment";
import "../../../assets/css/AddSupplierPurchaseOrder.css";
import {
  addSupplierPurchaseOrderApi,
  createPoItemApi,
} from "../../../services/apis/PurchaseOrder";
import ProductionManagementTable from "../../components/ProductionManagement/ProductionManagementTable";

const ProductionManagement = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sheetErrors, setSheetErrors] = useState({});
  const [productOption, setProductOption] = useState(null);
  const [selectedHoseAssembly, setSelectedHoseAssembly] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const TodayDate = moment().format("YYYY-MM-DD");

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
  console.log("FormData is here: ---",formData)
  
  const [productionSheetData,setProductionSheetData]=useState({});
  const [isEdit,setIsEdit]=useState(false);
  const [editProductionId,setEditProductionId]=useState("");

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
  // console.log("Shipping Form", formShippingData)
  // console.log(formBillingData.state_name)
  // console.log(formShippingData.state_name)
  // console.log(formBillingData.state_name === formShippingData.state_name)

  //Rows Fields
  const [rows, setRows] = useState([]);
  const [draggedRow, setDraggedRow] = useState(null);
  // console.log("row data is here : --------->", rows);

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
      id: rows?.length,
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
    setSelectedHoseAssembly(null);
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
        value: product?.desc_Code,
        label: `[${product?.product_code}] ${product?.desc_Code}`,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
      }));
      console.log(
        "dropdownProductList dropdownProductList dropdownProductList",
        dropdownProductList
      );
      setProductOption(dropdownProductList);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
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

  const CreatePoItem = async (PO_id) => {
    const fDataProducts = rows?.map(({ id, selectedOption, ...rest }) => {
      return {
        ...rest,
        po_id: PO_id,
        // product_id: rest?.id
        // cess: parseFloat(rest.cess || 0),
        // cgst: parseFloat(rest.cgst || 0),
        // discount_per_unit: parseFloat(rest.discount_per_unit || 0),
        // igst: parseFloat(rest.igst || 0),
        // price_per_unit: parseFloat(rest.price_per_unit || 0),
        // uom_qty: parseFloat(rest.uom_qty || 0),
        // quantity: parseFloat(rest.quantity || 0),
        // total_discount: parseFloat(rest.total_discount || 0),
        // amount: parseFloat(rest.amount || 0),
        // sgst: parseFloat(rest.sgst || 0),
      };
    });

    try {
      const res = await createPoItemApi(fDataProducts);
      // console.log(res, "response is here");
      if (res.data?.success) {
        setLoading(false);
        resetForm();
        // Reset form after success
        // navigate('/productlist');
      } else {
        setLoading(false);
        Toaster.error(res.data?.message || "Failed to create PO Items");
        console.error("PO items creation error:", res);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const fData = {
      supplier_id: formData?.supplier_id,
      order_details: {
        date: formData?.date,
        due_date: formData?.due_date,
        note: formData?.note,
      },
      summary: summary,
    };

    try {
      const res = await addSupplierPurchaseOrderApi(fData);
      if (res.data?.success) {
        setLoading(false);

        CreatePoItem(res?.data?.purchaseOrder?._id);
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
    setSelectedHoseAssembly(selectedOption);
    setProductFormData(selectedOption);
  };

  // Function to update selected row when selecting a product
  const handleSelectProduct = (index) => {
    handleChangeRow(index, "quantity", selectedQuantity);
    handleChangeRow(index, "discount_per_unit", selectedDiscount);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimer = useRef(null);

  const fetchProductSearchResults = async (query) => {
    if (!query) return; // Prevent empty requests
    // setLoading(true);

    try {
      const res = await SearchProductsApi(query); // API should support search
      const dropdownProductList = res?.data?.products.map((product) => ({
        value: product?.desc_Code,
        label: `[${product?.product_code}]  [${product?.desc_Code}]  ${
          product?.fitting_Code ? ` ⇨[${product?.fitting_Code}]` : ""
        }`,
        id: product?._id,
        product_code: product?.product_code,
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

  // **Debounce Function (Delays API call until user stops typing)**
  const debounceSearch = (query) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchProductSearchResults(query);
    }, 500); // 500ms delay
  };

  const handleSearch = (inputValue) => {
    // console.log("input value is here", inputValue);
    setSearchTerm(inputValue);
    if (inputValue.length > 1) {
      debounceSearch(inputValue);
      // fetchProductSearchResults(inputValue); // Fetch matching products
    }
  };

  const [similarProducts, setSimilarProducts] = useState([]);
  // console.log("here are similarProducts", similarProducts)
  const fetchSimilarProducts = async (fittingCode) => {
    // setLoading(true);
    try {
      const res = await SearchSimilarProductsApi(fittingCode);
      // Transform the API response into dropdown format
      const dropdownProductList = res?.products?.map((product) => ({
        value: product?.desc_Code,
        label: `[${product?.product_code}]  [${product?.desc_Code}]  ⇨[${product?.fitting_Code}]`,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
        desc_Code: product?.desc_Code,
      }));

      setSimilarProducts(dropdownProductList);
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
    if (searchTerm == "") {
      setSimilarProducts("");
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

  const handleAddSheet=()=>{
    if (!sheetValidateForm()) {
      return;
    }
    const Fdata = formData;
    setProductionSheetData(Fdata);
    resetSheetForm();
  }


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
            <div className="card-header">
              <h4 className="card-title">Basic Info</h4>
            </div>
            <div className="card-body">
              {/* supplier Details */}
              <div className="mb-3">
                <h4 className="card-title">Sheet Detail</h4>
                <div className="mb-3 row">
                  <div className="col-md-3">
                    <label className="col-form-label">Sheet No.</label>
                    <input
                      name="sheet_no"
                      value={formData?.sheet_no}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Sheet No"
                    />
                    {sheetErrors?.sheet_no && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.sheet_no}
                      </span>
                    )}
                  </div>

                  <div className="col-md-3">
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

                  <div className="col-md-3">
                    <label className="col-form-label">Date & Time</label>
                    <input
                      name="date_time"
                      value={formData?.date_time}
                      onChange={handleChange}
                      onClick={(e) => e.target.showPicker()}
                      type="datetime-local"
                      className="form-control"
                      placeholder="Enter End"
                    />
                    {sheetErrors?.date_time && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.date_time}
                      </span>
                    )}
                  </div>

                  <div className="col-md-3">
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
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-md-3">
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
                  </div>

                  <div className="col-md-3">
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

                  <div className="col-md-3">
                    <label className="col-form-label">Part Name</label>
                    <input
                      name="part_name"
                      value={formData?.part_name}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Part Name"
                    />
                    {sheetErrors?.part_name && (
                      <span className="text-danger fs-12">
                        {sheetErrors?.part_name}
                      </span>
                    )}
                  </div>

                  <div className="col-md-3">
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
                
                <button onClick={handleAddSheet} className="btn btn-primary mt-4">
                  Add Sheet Detail
                </button>
              </div>

              <hr className="w-100" />
              <div>
                <h4 className="card-title">Production Sheet</h4>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label className="col-form-label">Hose Assembly</label>
                        {/* Search Button */}
                        <Select
                          options={searchTerm ? productOption : []}
                          placeholder="Search product by name or code ..."
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

                      {/* <div className="col-md-6">
                        <label className="col-form-label">
                          Discount Per Unit
                        </label>
                        <input
                          type="number"
                          placeholder="Discount Per Unit"
                          value={selectedDiscount}
                          onChange={(e) => setSelectedDiscount(e.target.value)}
                          className="form-control"
                        />
                      </div> */}
                    </div>
                    {/* Add button */}
                    <button onClick={addRow} className="btn btn-primary mt-4">
                      Add
                    </button>
                  </div>

                  <div className="col-md-6">
                    <label className="col-form-label">
                      Select Similar Products
                    </label>

                    <div className="product-sidebox p-3 bg-white  rounded">
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
                        <div
                          className="product-list"
                          style={{ maxHeight: "300px" }}>
                          {similarProducts?.map((product) => (
                            <div
                              key={product._id}
                              className="product-item p-2 mb-2 text-dark rounded cursor-pointer"
                              onClick={() => setSelectedHoseAssembly(product)}
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
                                  <div className="w-80">
                                    <strong>{product.product_code}</strong>
                                    <span> {product.desc_Code}</span>
                                    <br />
                                    <small className="text-muted">
                                      {product.fitting_Code}
                                    </small>
                                  </div>

                                  {/* <div className="w-20">
                                    <span>Quantity</span>
                                    <br />
                                    <small className="text-muted">0</small>
                                  </div> */}

                                  <div
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Production Sheet View</h4>
                  </div>
                  <ProductionManagementTable rows={rows} productionSheetData={productionSheetData} isEdit={isEdit} setIsEdit={setIsEdit}
                   editProductionId={editProductionId} setEditProductionId={setEditProductionId}/>
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
    </>
  );
};

export default ProductionManagement;
