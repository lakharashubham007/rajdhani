import React, { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import {
  addProductApi,
  GetAllProductList,
} from "../../../services/apis/Product";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getAllSupplierListApi } from "../../../services/apis/Supplier";
import "../../../assets/css/AddSupplierPurchaseOrder.css";
import { addSupplierPurchaseOrderApi, createPoItemApi } from "../../../services/apis/PurchaseOrder";
import { getStateListApi } from "../../../services/apis/CommonApi";

const options = [
  { value: "veg", label: "Veg" },
  { value: "non-veg", label: "Non Veg" },
];

const discountOptions = [
  { value: "percentage", label: "Percentage ( % ) " },
  { value: "inr", label: "INR " },
];

const AddSupplierPurchaseOrder = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [states, setStates] = useState([]);
  //drop option list
  const [supplierOption, setSupplierOption] = useState(null);
  const [allSupplier, setAllSupplier] = useState(null);
  const [productOption, setProductOption] = useState(null);
  const [statesOption, setStatesOption] = useState(null);

  // selected
  const [selectedSupplierOption, setSelectedSupplierOption] = useState(null);
  const [selectedProductOption, setSelectedProductOption] = useState(null);

  const [selectedBillingStateOption, setSelectedBillingStateOption] = useState(null);
  const [selectedShippingStateOption, setSelectedShippingStateOption] = useState(null);


  const TodayDate = moment().format("YYYY-MM-DD");
  const [supplierDetail, setSupplierDetail] = useState({});

  const [formData, setFormData] = useState({
    supplier_id: "",
    date: TodayDate,
    due_date: "",
    note: "",
  });

  const [formBillingData, setBillingFormData] = useState({
    name: '',
    address: '',
    gstin: '',
    state_name: '',
    state_code: '',
    email: ''
  });

  const [formShippingData, setShippingFormData] = useState({
    name: '',
    address: '',
    gstin: '',
    state_name: '',
    state_code: '',
    email: ''
  });

  const [rows, setRows] = useState([
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

  // Function to add a new row
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

    // if (field === 'quantity' || field === 'discount_per_unit') {
    //  const quantity = parseFloat(updatedRows[index].quantity || 0);
    //  const discountPerUnit = parseFloat(updatedRows[index].discount_per_unit || 0);
    //  updatedRows[index].total_discount = quantity * discountPerUnit;
    // }

    // const quantity = parseFloat(updatedRows[index].quantity || 0);
    // const pricePerUnit = parseFloat(updatedRows[index].price_per_unit || 0);
    // const uomQty = parseFloat(updatedRows[index].uom_qty || 1); // Default UOM Qty to 1
    // updatedRows[index].amount = quantity * pricePerUnit * uomQty;
    // setRows(updatedRows);
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

  const handleSelectChange = (name) => (selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption.value });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSelectChangeLabel = (name) => (selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption.label });

    // Remove error if one exists for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const resetForm = () => {
    setBillingFormData({
      name: '',
      address: '',
      gstin: '',
      state_name: '',
      state_code: '',
      email: ''
    });

    setShippingFormData({
      name: '',
      address: '',
      gstin: '',
      state_name: '',
      state_code: '',
      email: ''
    });

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

    setSupplierDetail({});
    setSelectedBillingStateOption(null);
    setSelectedShippingStateOption(null);
    setLogo(null);
    setSelectedSupplierOption(null);
    setSelectedProductOption(null);
  };

  const validateForm = () => {
    const newErrors = {};
    // Required field validation
    if (!formData.supplier_id) newErrors.supplier_id = "Supplier is required.";
    if (!formData.note) newErrors.note = "Note is required.";
    if (!formData.due_date) newErrors.due_date = "Due Date Id is required.";

    // Validate Billing Details
    if (!formBillingData.name) {
      newErrors.billing_name = "Billing name is required.";
    }
    if (!formBillingData.email || !/\S+@\S+\.\S+/.test(formBillingData.email)) {
      newErrors.billing_email = "Valid email is required for billing.";
    }
    if (!selectedBillingStateOption) {
      newErrors.billing_state_name = "Billing state is required.";
    }
    if (!formBillingData.state_code || !/^\d{1,2}$/.test(formBillingData.state_code)) {
      newErrors.billing_state_code = "Valid billing state code is required.";
    }
    if (!formBillingData.gstin
      // || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/.test(formBillingData.gstin)
    ) {
      newErrors.billing_gstin = "Valid GSTIN is required for billing.";
    }

    if (!formBillingData.address) {
      newErrors.billing_address = "Address is required for billing.";
    }

    // Validate Shipping Details
    if (!formShippingData.name) {
      newErrors.shipping_name = "Shipping name is required.";
    }
    if (!formShippingData.email || !/\S+@\S+\.\S+/.test(formShippingData.email)) {
      newErrors.shipping_email = "Valid email is required for shipping.";
    }
    if (!selectedShippingStateOption) {
      newErrors.shipping_state_name = "Shipping state is required.";
    }
    if (!formShippingData.state_code || !/^\d{1,2}$/.test(formShippingData.state_code)) {
      newErrors.shipping_state_code = "Valid shipping state code is required.";
    }
    if (!formShippingData.gstin
      // || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/.test(formShippingData.gstin)
    ) {
      newErrors.shipping_gstin = "Valid GSTIN is required for shipping.";
    }

    if (!formShippingData.address) {
      newErrors.shipping_address = "Address required for billing.";
    }


    // Set errors to the state
    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleDeleteLogo = () => {
    setLogo(null);
    document.getElementById("logoUpload").value = "";
  };

  const fetchSupplierAllList = async () => {
    setLoading(true);
    try {
      const res = await getAllSupplierListApi();
      const dropdownSupplierList = res?.data?.suppliers?.map((supplier) => ({
        value: supplier._id,
        label: supplier.name,
      }));
      setSupplierOption(dropdownSupplierList);
      setAllSupplier(res?.data?.suppliers);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  const fetchStatesList = async () => {
    setLoading(true);
    try {
      const res = await getStateListApi();
      const data = res?.data?.states;
      const dropdownStateList = data?.map((state) => ({
        value: state?.state_name,
        label: state?.state_name,
        code: state?.state_code
      }));
      //statesOption, setStatesOption
      setStates(data)
      setStatesOption(dropdownStateList);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSupplierAllList();
    fetchProductAllList();
    fetchStatesList();
  }, []);

  // Handle the logo image change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        image: file, // Update the image field with the selected file
      });
      setErrors({
        ...errors,
        image: null, // Update the image field with the selected file
      });
    }
  };

  const handleSupplierChange = (option) => {
    setFormData({ ...formData, supplier_id: option?.value });

    setSelectedSupplierOption(option);
    const suppDetail = allSupplier?.find((val) => val?._id == option?.value);
    setSupplierDetail(suppDetail);
  };

  //   console.log("row",rows)
  const calculateTotalAmount = () => {
    return rows.reduce((total, row) => {
      const quantity = parseFloat(row.quantity || 0);
      const pricePerUnit = parseFloat(row.price_per_unit || 0);
      const uomQty = parseFloat(row.uom_qty || 0); // Get the UOM Qty value
      return total + quantity * pricePerUnit * uomQty; // Include UOM Qty in the calculation
    }, 0);
  };

  const handleProductChange = (selectedOption, index) => {
    const updatedRows = [...rows];
    updatedRows[index].selectedOption = selectedOption; // Update only the specific row's selectedOption
    updatedRows[index].product_name = selectedOption.value; // Update the product_name
    setRows(updatedRows);
  };

  const calculateSummary = () => {
    let total_quantity = 0;
    let sub_total = 0;
    let total_discount = 0;
    let total_gst_amount = 0; // Includes CGST, SGST, IGST
    let shipping = parseFloat(formData?.shipping || 0); // Get shipping value from formData or set to 0

    rows?.forEach((row) => {
      const quantity = parseFloat(row.quantity || 0);
      const pricePerUnit = parseFloat(row.price_per_unit || 0);
      const discountPerUnit = parseFloat(row.discount_per_unit || 0);
      const cgst = parseFloat(row.cgst || 0);
      const sgst = parseFloat(row.sgst || 0);
      const igst = parseFloat(row.igst || 0);

      total_quantity += quantity;
      sub_total += quantity * pricePerUnit;
      total_discount += quantity * discountPerUnit;
      total_gst_amount += quantity * (cgst + sgst + igst); // Sum of all GST components
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
        cess: parseFloat(rest.cess || 0),
        cgst: parseFloat(rest.cgst || 0),
        discount_per_unit: parseFloat(rest.discount_per_unit || 0),
        igst: parseFloat(rest.igst || 0),
        price_per_unit: parseFloat(rest.price_per_unit || 0),
        uom_qty: parseFloat(rest.uom_qty || 0),
        quantity: parseFloat(rest.quantity || 0),
        total_discount: parseFloat(rest.total_discount || 0),
        amount: parseFloat(rest.amount || 0),
        sgst: parseFloat(rest.sgst || 0),
      };
    });

    try {
      const res = await createPoItemApi(fDataProducts);
      // console.log(res, "response is here");
      if (res.data?.success) {
        setLoading(false);
        // Show success message from backend
        // Toaster.success(res?.data?.message);
        // Swal.fire({
        //   icon: "success",
        //   title: "Purchase Order Items",
        //   text: res.data?.message || "PO Items created successfully",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
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
  }

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
      billing_details: {
        name: formBillingData.name,
        address: formBillingData.address,
        gstin: formBillingData.gstin,
        state_name: formBillingData.state_name,
        state_code: formBillingData.state_code,
        email: formBillingData.email

      },
      shipping_details: {
        name: formShippingData.name,
        address: formShippingData.address,
        gstin: formShippingData.gstin,
        state_name: formShippingData.state_name,
        state_code: formShippingData.state_code,
        email: formShippingData.email
      },
      summary: summary,
    };
    try {
      const res = await addSupplierPurchaseOrderApi(fData);
      if (res.data?.success) {
        setLoading(false);
        console.log("ress?.data", res?.data?.purchaseOrder?._id);

        CreatePoItem(res?.data?.purchaseOrder?._id)
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

  // console.log("summary",summary)

  const handleBillingDetailChange = (e) => {
    const { name, value } = e.target; // Destructure the input's name and value
    setBillingFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  const handleShippingDetailChange = (e) => {
    const { name, value } = e.target; // Destructure the input's name and value
    setShippingFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  const handleBillingDetailStateChange = (option) => {
    const findState = states?.find((val) => val?.state_name == option?.value)
    setSelectedBillingStateOption(option);
    setBillingFormData({
      ...formBillingData,
      state_name: option?.value,
      state_code: findState?.tin_number
    })
  }

  const handleShippingDetailStateChange = (option) => {
    const findState = states?.find((val) => val?.state_name == option?.value)
    setSelectedShippingStateOption(option);
    setShippingFormData({
      ...formShippingData,
      state_name: option?.value,
      state_code: findState?.tin_number
    })
  }


  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle
        activeMenu={"Add New Purchase Order"}
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
              <div className="mb-3">
                <h4 className="card-title">Supplier Detail</h4>
                <div className="mb-3 row">
                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">Supplier</label>
                    <Select
                      value={selectedSupplierOption}
                      onChange={handleSupplierChange}
                      defaultValue={selectedSupplierOption}
                      options={supplierOption}
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
                  </div>

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-sm-3 col-form-label">Date</label>
                    <input
                      disabled
                      name="date"
                      value={TodayDate}
                      onChange={handleChange}
                      type="date"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.date && (
                      <span className="text-danger fs-12">{errors.date}</span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">Due Date</label>
                    <input
                      name="due_date"
                      value={formData?.due_date}
                      onChange={handleChange}
                      type="date"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />

                    {errors.due_date && (
                      <span className="text-danger fs-12">
                        {errors.due_date}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">
                      Supplier Details
                    </label>
                    <hr className="w-100" />
                    <div className="supplier-detail-div">
                      <p className="p-0 m-0"
                        style={{ color: "#000000", fontWeight: "400" }}>
                        {supplierDetail?.name}
                      </p>
                      <p className="p-0 m-0 d-flex"
                        style={{ color: "#000000", fontWeight: "400" }}>
                        {supplierDetail?.city} {supplierDetail?.state}
                        {supplierDetail?.pincode}
                      </p>
                      <p className="p-0 m-0"
                        style={{ color: "#000000", fontWeight: "400" }}
                      ></p>

                      {supplierDetail?.phone && (
                        <div className="d-flex gap-1">
                          <p className="p-0 m-0">Phone: </p>
                          <p className="p-0 m-0"
                            style={{ color: "#000000", fontWeight: "400" }}>
                            {supplierDetail?.phone}
                          </p>
                        </div>
                      )}

                      {supplierDetail?.email && (
                        <div className="d-flex gap-1">
                          <p className="p-0 m-0">Email: </p>
                          <p className="p-0 m-0" style={{ color: "#000000", fontWeight: "400" }}>
                            {supplierDetail?.email}
                          </p>
                        </div>
                      )}

                      {supplierDetail?.gstNumber && (
                        <div className="d-flex gap-1">
                          <p className="p-0 m-0">GST: </p>
                          <p className="p-0 m-0" style={{ color: "#000000", fontWeight: "400" }}>
                            {supplierDetail?.gstNumber}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-12 col-sm-8">
                    <label className="col-form-label">Note</label>
                    <textarea
                      name="note"
                      className="form-control"
                      rows="3"
                      id="comment"
                      placeholder="Note"
                      value={formData.note}
                      onChange={handleChange}
                    ></textarea>
                    {errors.note && (
                      <span className="text-danger fs-12">{errors.note}</span>
                    )}
                  </div>
                </div>
              </div>
              <hr className="w-100" />
              {/* Billing Details */}
              <div className="mb-3">
                <h4 className="card-title">Billing Detail</h4>
                <div className="row mb-3">
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Name</label>
                    <input
                      name="name"
                      value={formBillingData?.name}
                      onChange={handleBillingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />

                    {errors.billing_name && (
                      <span className="text-danger fs-12">
                        {errors.billing_name}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Email</label>
                    <input
                      name="email"
                      value={formBillingData?.email}
                      onChange={handleBillingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC@gmail.com"
                    />

                    {errors.billing_email && (
                      <span className="text-danger fs-12">
                        {errors.billing_email}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">State Name</label>
                    <Select
                      value={selectedBillingStateOption}
                      onChange={handleBillingDetailStateChange}
                      defaultValue={selectedBillingStateOption}
                      options={statesOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.billing_state_name && (
                      <span className="text-danger fs-12">
                        {errors.billing_state_name}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">State Code</label>
                    <input
                      name="state_code"
                      value={formBillingData?.state_code}
                      onChange={handleBillingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 0123"
                    />

                    {errors.billing_state_code && (
                      <span className="text-danger fs-12">
                        {errors.billing_state_code}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-6">
                    <label className="col-sm-3 col-form-label">Address</label>
                    <input
                      name="address"
                      value={formBillingData?.address}
                      onChange={handleBillingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />

                    {errors.billing_address && (
                      <span className="text-danger fs-12">
                        {errors.billing_address}
                      </span>
                    )}
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">GSTIN</label>
                    <input
                      name="gstin"
                      value={formBillingData?.gstin}
                      onChange={handleBillingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 22AAAAA0000A1Z5"
                    />

                    {errors.billing_gstin && (
                      <span className="text-danger fs-12">
                        {errors.billing_gstin}
                      </span>
                    )}
                  </div>
                </div>

              </div>
              <hr className="w-100" />
              {/* Shipping Details */}
              <div className="">
                <h4 className="card-title">Shipping Detail</h4>
                <div className="row mb-3">
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">Name</label>
                    <input
                      name="name"
                      value={formShippingData?.name}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.shipping_name && (
                      <span className="text-danger fs-12">
                        {errors.shipping_name}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">Email</label>
                    <input
                      name="email"
                      value={formShippingData?.email}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC@gmail.com"
                    />
                    {errors.shipping_email && (
                      <span className="text-danger fs-12">
                        {errors.shipping_email}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">State Name</label>
                    <Select
                      value={selectedShippingStateOption}
                      onChange={handleShippingDetailStateChange}
                      defaultValue={selectedShippingStateOption}
                      options={statesOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.shipping_state_name && (
                      <span className="text-danger fs-12">
                        {errors.shipping_state_name}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">State Code</label>
                    <input
                      name="state_code"
                      value={formShippingData?.state_code}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />

                    {errors.shipping_state_code && (
                      <span className="text-danger fs-12">
                        {errors.shipping_state_code}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Address</label>
                    <input
                      name="address"
                      value={formShippingData?.address}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />

                    {errors.shipping_address && (
                      <span className="text-danger fs-12">
                        {errors.shipping_address}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">GSTIN</label>
                    <input
                      name="gstin"
                      value={formShippingData?.gstin}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 22AAAAA0000A1Z5"
                    />

                    {errors.shipping_gstin && (
                      <span className="text-danger fs-12">
                        {errors.shipping_gstin}
                      </span>
                    )}
                  </div>
                </div>
              </div>



              {/* Table  */}
              <div className="col-xl-12 col-lg-12 mt-5">
                <div className="">

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
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows?.map((row, index) => (

                              <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>
                                  <Select
                                    value={row.selectedOption} // Prefill selected option
                                    onChange={(selectedOption) => handleProductChange(selectedOption, index)}
                                    options={productOption} // Ensure productOption is properly defined
                                    styles={{
                                      control: (provided) => ({
                                        ...provided,
                                        width: "200px", // Adjust width as needed
                                        lineHeight: "20px",
                                        color: "#7e7e7e",
                                        paddingLeft: "15px",
                                      }),
                                      menuPortal: (provided) => ({
                                        ...provided,
                                        zIndex: 9999, // Ensures dropdown appears on top
                                      }),
                                      menu: (provided) => ({
                                        ...provided,
                                        top: "-100%", // Positions the dropdown above
                                      }),
                                    }}
                                    menuPortalTarget={document.body} // Ensures the dropdown is rendered in the body
                                  />
                                </td>

                                {/* <td>
                                  <Select value={row.selectedOption}
                                    onChange={(selectedOption) =>
                                      handleProductChange(selectedOption, index)
                                    }
                                    defaultValue={row.selectedOption}
                                    options={productOption} // Ensure productOption is properly defined
                                    styles={{
                                      control: (provided) => ({
                                        ...provided,
                                        lineHeight: "20px",
                                        color: "#7e7e7e",
                                        paddingLeft: "15px",
                                      }),
                                    }}
                                  />
                                </td> */}

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
                                    style={{ width: "70px" }}
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

              {/* summary */}
              <div className="row justify-content-end ">
                <div className="summary-section col-md-5">
                  <table className="table table-bordered ">
                    <h3>Summary</h3>

                    <tbody>
                      <tr>
                        <td>Total Quantity</td>
                        <td>{summary.total_quantity}</td>
                      </tr>
                      <tr>
                        <td>Sub Total</td>
                        <td>{summary.sub_total.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <td>{summary.total_discount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Total GST Amount</td>
                        <td>{summary.total_gst_amount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td>
                          <input
                            type="number"
                            value={formData?.shipping || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                shipping: e.target.value,
                              })
                            }
                            className="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Grand Total</td>
                        <td>{summary.grand_total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
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
            className="btn btn-primary rounded-sm"
          >
            Save Information
          </button>
        </div>
      </div>
    </>
  );
};

export default AddSupplierPurchaseOrder;
