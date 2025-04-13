// HoseAssemblySection
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
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getAllSupplierListApi } from "../../../services/apis/Supplier";
import "../../../assets/css/AddSupplierPurchaseOrder.css";
import {
  addSupplierPurchaseOrderApi,
  createPoItemApi,
} from "../../../services/apis/PurchaseOrder";

const HoseAssemblySection = (props) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    supplierOption,
    setSupplierOption,
    allSupplier,
    setAllSupplier,
    orientationAngleFromParent,
    hoseOption,
    setHoseOption,
    fittingAOption,
    setFittingAOption,
    fittingBOption,
    setFittingBOption,
    guardOption,
    setGuardOption,
    selectedGuardOption,
    setSelectedGuardOption,
    selectedBillingStateOption,
    setSelectedBillingStateOption,
    selectedShippingStateOption,
    setSelectedShippingStateOption,
    selectedHose,
    setSelectedHose,
    selectedFittingA,
    setSelectedFittingA,
    selectedFittingB,
    setSelectedFittingB,
    selectedQuantity,
    setSelectedQuantity,
    selectedDiscount,
    setSelectedDiscount,
    guardTypeOption,
    setGuardTypeOption,
    selectedGuardTypeOption,
    setSelectedGuardTypeOption
  } = props;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFA, setSearchFA] = useState("");
  const [searchFB, setSearchFB] = useState("");
  const [searchGuard, setSearchGuard] = useState("");
  const [formErrors, setHoseFormErrors] = useState({});
  console.log(errors,"formErrors  is hrere ......")
  const [searchFittingCode, setSearchFittingCode] = useState({
    search: "",
    title: ""
  });
  const debounceTimer = useRef(null);
  const TodayDate = moment().format("YYYY-MM-DD");
  const [orientationAngle, setOrientationAngle] = useState(false);

  //Billing Form Details Fields
  const [formBillingData, setBillingFormData] = useState({
    name: "",
    email: "",
    mobile_no1: "",
    mobile_no2: "",
    country: "",
    state_name: "",
    city: "",
    state_tin_code: "",
    address: "",
    gstin: "",
    pin_code: "",
  });

  //Shipping Form Details Fields
  const [formShippingData, setShippingFormData] = useState({
    name: "",
    email: "",
    mobile_no1: "",
    mobile_no2: "",
    country: "",
    state_name: "",
    city: "",
    state_tin_code: "",
    address: "",
    gstin: "",
    pin_code: "",
  });

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
    newRows?.splice(index, 0, movedRow);
    setRows(newRows);
    setDraggedRow(null);
  };

  const resetForm = () => {
    setSelectedHose(null)
    setSelectedFittingA(null);
    setSelectedFittingB(null);
    setSelectedGuardOption(null);
    setSelectedGuardTypeOption(null);
    setFormData({
      ...formData,
      part_no: "",
      assembly_length: "",
      fitting_length: "",
      cutting_length: "",
      oa: "",
      quantity: ""
    })
  };

  const validateHoseAForm = () => {
    const newErrors = {};
    if (!formData.part_no) newErrors.part_no = "Part No is required.";
    if (!selectedHose) { newErrors.hose = "Hose is required." }
    if (!selectedFittingA) { newErrors.fitting_a = "Fitting A is required." }
    if (!selectedFittingB) { newErrors.fitting_b = "Fitting B is required." }
    if (!formData.assembly_length) newErrors.assembly_length = "Assembly Length is required.";
    if (!formData.fitting_length) newErrors.fitting_length = "Fitting Length is required.";
    if (!formData.cutting_length) newErrors.cutting_length = "Cut Length is required.";
    if (!selectedGuardTypeOption) { newErrors.guard_type = "Guard Type is required." }
    if (!selectedGuardOption) { newErrors.guard = "Guard is required." }
    if (!formData?.quantity) { newErrors.quantity = "Quantity is required." }
    setHoseFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addRow = () => {
    if (!validateHoseAForm()) {
      return;
    }
    const newRow = {
      ...selectedHose,
      id: rows?.length,
      part_no: formData?.part_no,
      hose: selectedHose?.value,
      fitting_a: selectedFittingA?.value,
      fitting_b: selectedFittingB?.value,
      assembly_length: formData?.assembly_length,
      fitting_length: formData?.fitting_length,
      cutting_length: formData?.cutting_length,
      oa: formData?.oa,
      guard_type: selectedGuardTypeOption?.value,
      guard: selectedGuardOption?.value,
      quantity: formData?.quantity,
    };
    setRows([...rows, newRow]);
    resetForm();
  };

  // console.log("selectedFittingA",selectedFittingA)

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
    const pricePerUnit = parseFloat(updatedRows[index].price_per_unit || 0);
    const uomQty = parseFloat(updatedRows[index].uom_qty || 1);
    const totalDiscount = parseFloat(updatedRows[index].total_discount || 0);
    const gstPercentage = parseFloat(updatedRows[index].gst) || 0;

    const price = parseFloat(updatedRows[index].price) || 0;
    const discount =
      parseFloat(updatedRows[index].discount_per_unit) || selectedDiscount || 0;
    const gst = parseFloat(updatedRows[index].gst) || 0;

    updatedRows[index].taxable_amount = (price - discount) * quantity;

    if (formBillingData.state_name && formShippingData.state_name) {
      const isInterState =
        formBillingData.state_name !== formShippingData.state_name;
      const taxableAmount = parseFloat(updatedRows[index].taxable_amount) || 0;

      if (isInterState) {
        updatedRows[index].igst = (taxableAmount * gstPercentage) / 100; // Example IGST Rate: 18%
        updatedRows[index].cgst = 0;
        updatedRows[index].sgst = 0;
      } else {
        updatedRows[index].cgst = (taxableAmount * (gstPercentage / 2)) / 100;
        updatedRows[index].sgst = (taxableAmount * (gstPercentage / 2)) / 100;
        updatedRows[index].igst = 0;
      }

      updatedRows[index].cess = (updatedRows[index].taxable_amount * 2) / 100; // Example Cess Rate: 2%
    }

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



  //Cutting Length AutoFill useEffect -> Calculation for cutttingh length
  useEffect(() => {
    if (formData?.fitting_length) {
      setFormData((data) => ({
        ...data,
        cutting_length: (formData?.assembly_length && formData?.fitting_length) ? (formData?.assembly_length - formData?.fitting_length) : ""
      }))
      if ((formData.assembly_length - formData.fitting_length) < 0) {
        setErrors((errors) => ({
          ...errors,
          // cutting_length: "Cutting length cannot be negative."
        }));
        setErrors({
          ...errors,
          cutting_length: null,
          cutting_length: "Cutting length cannot be negative."
        })
      } else {
        setHoseFormErrors((errors) => ({
          ...errors,
          cutting_length: ""
        }));
        setErrors({
          ...errors,
          cutting_length: null,
        })
      }
    }
    // If either value is missing, reset cutting_length
    if (!formData?.fitting_length || !formData?.assembly_length) {
      setFormData((data) => ({
        ...data,
        cutting_length: "",
      }));
      return;
    }
  }, [formData?.fitting_length, formData?.assembly_length]);

  // Orientation Angle ---> useEffect hook
  useEffect(() => {
    if (selectedFittingA && selectedFittingB) {
      const isFittingABend = selectedFittingA.bendAngle && selectedFittingA.bendAngle.toLowerCase() !== "straight";
      const isFittingBBend = selectedFittingB.bendAngle && selectedFittingB.bendAngle.toLowerCase() !== "straight";

      if (isFittingABend && isFittingBBend) {
        setOrientationAngle(true);
      } else {
        setOrientationAngle(false);
        setFormData({
          ...formData,
          oa: null
        });
      }
    } else {
      setOrientationAngle(false);
      setFormData({
        ...formData,
        oa: null
      });
    }
  }, [selectedFittingA, selectedFittingB]);

  // Handle the logo image change

  const handleGuardChange = (option) => {
    setFormData({ ...formData, guard_id: option?.value });
    setSelectedGuardOption(option);
  };

  const handleProductChange = (selectedOption, index) => {
    const updatedRows = [...rows];
    // updatedRows[index].selectedOption = selectedOption;
    // Update only the specific row's selectedOption
    updatedRows[index].product_name = selectedOption.value; // Update the product_name

    // Find the selected product from hoseOption array
    const selectedHose = hoseOption.find(
      (product) => product.id === selectedOption.id
    );

    updatedRows[index].product_code = selectedHose
      ? selectedHose?.product_code
      : "";
    updatedRows[index].uom = selectedHose ? selectedHose?.uom : "";
    updatedRows[index].weight = selectedHose ? selectedHose?.weight : "";
    updatedRows[index].price = selectedHose ? selectedHose?.price : "";
    updatedRows[index].gst = selectedHose ? selectedHose?.gst : "";
    updatedRows[index].product_id = selectedHose ? selectedHose?.id : "";

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return;
    // }
    setLoading(true);

    const fData = {
      supplier_id: formData?.supplier_id,
      order_details: {
        date: formData?.date,
        due_date: formData?.due_date,
        note: formData?.note,
      },
      billing_details: {
        name: formBillingData?.name,
        email: formBillingData?.email,
        mobile_no1: formBillingData?.mobile_no1,
        mobile_no2: formBillingData?.mobile_no2,
        country: formBillingData?.country,
        state_name: formBillingData?.state_name,
        city: formBillingData?.city,
        state_tin_code: formBillingData?.state_tin_code,
        address: formBillingData?.address,
        gstin: formBillingData?.gstin,
      },
      shipping_details: {
        name: formShippingData?.name,
        email: formShippingData?.email,
        mobile_no1: formShippingData?.mobile_no1,
        mobile_no2: formShippingData?.mobile_no2,
        country: formShippingData?.country,
        state_name: formShippingData?.state_name,
        city: formShippingData?.city,
        state_tin_code: formShippingData?.state_tin_code,
        address: formShippingData?.address,
        gstin: formShippingData?.gstin,
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

  const handleBillingDetailChange = (e) => {
    const { name, value } = e.target; // Destructure the input's name and value
    setBillingFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  const handleHoseDataChange = (selectedOption) => {
    setSelectedHose(selectedOption);
    setSearchFittingCode({
      title: "hose",
      search: selectedOption?.fitting_Code || ""
    });
    // setProductFormData(selectedOption);
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

  const handleFittingADataChange = (selectedOption) => {
    setSelectedFittingA(selectedOption);
    setSimilarProducts("");
    setSearchFittingCode({
      title: "fitting_a",
      search: selectedOption?.fitting_Code || ""
    });
    setFormData({
      ...formData,
      fitting_a_description: selectedOption?.value,
      fitting_a_fitting_Code: selectedOption?.fitting_Code,
      fitting_a_product_Code: selectedOption?.product_code,
      fitting_a_label: selectedOption?.label
    });
    setErrors({
      ...errors,
      fitting_a_description: null,
    });
    
  };

  const handleFittingBDataChange = (selectedOption) => {
    setSelectedFittingB(selectedOption);
    setSimilarProducts("");
    setSearchFittingCode({
      title: "fitting_b",
      search: selectedOption?.fitting_Code || ""
    });
    setFormData({
      ...formData,
      fitting_b_description: selectedOption?.value,
      fitting_b_fitting_Code: selectedOption?.fitting_Code,
      fitting_b_product_Code: selectedOption?.product_code,
      fitting_b_label: selectedOption?.label
    });
    setErrors({
      ...errors,
      fitting_b_description: null,
    });
    
  };

  const handleGuardDataChange = (selectedOption) => {
    setSelectedGuardOption(selectedOption);
    setSimilarProducts("");
    setSearchFittingCode({
      title: "guard",
      search: selectedOption?.fitting_Code || ""
    });
    setFormData({
      ...formData,
      guard: selectedOption?.value,
      guard_prodcut_code: selectedOption?.product_code,
      guard_label: selectedOption?.label,
    });
    setErrors({
      ...errors,
      guard: null,
    })
  };

  const fetchProductSearchResults = async (query) => {
    // if (!query) return; 
    // setLoading(true); 
    try {
      const res = await SearchProductsApi(query);
      console.log("inside is here", res);
      const dropdownProductList = res?.data?.products?.map((product) => ({
        value: product?.desc_Code,
        label: `[${product?.product_code}] [${product?.desc_Code}] ${product?.fitting_Code ? `⇨ [${product?.fitting_Code}]` : ""
          }`,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code,
        bendAngle: product?.straight_bend_angle
      }));
      setHoseOption(dropdownProductList);
      setFittingAOption(dropdownProductList);
      setFittingBOption(dropdownProductList);
      setGuardOption(dropdownProductList);
    } catch (error) {
      console.error("Error fetching products:", error);
      Toaster.error("Failed to load. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce Function for Delayed API Calls
  const debounceSearch = (query) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchProductSearchResults(query);
    }, 500);
  };

  const handleSearch = (inputValue) => {
    setSearchTerm(inputValue);
    if (inputValue?.length > 1) {
      setSimilarProducts("");
      debounceSearch(inputValue);
    }
  };

  const handleSearchFittingA = (inputValue) => {
    setSearchFA(inputValue);
    if (inputValue?.length > 1) {
      setSimilarProducts("");
      debounceSearch(inputValue);
    }
  };

  const handleSearchFittingB = (inputValue) => {
    setSearchFB(inputValue);
    if (inputValue?.length > 1) {
      setSimilarProducts("");
      debounceSearch(inputValue);
    }
  };

  const handleSearchGuard = (inputValue) => {
    setSearchGuard(inputValue);
    if (inputValue?.length > 1) {
      setSimilarProducts("");
      debounceSearch(inputValue);
    }
  };


  const [similarProducts, setSimilarProducts] = useState([]);

  // console.log("here are similarProducts", similarProducts);
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
        quantity: product?.total_quantity
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
    if (searchFittingCode?.search) {
      fetchSimilarProducts(searchFittingCode?.search);
    }
    if (searchTerm == "") {
      setSimilarProducts("");
    }
  }, [searchFittingCode?.search]);

  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />

      <div className="row">
        {/* SECTION 1ST */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {/* Basic Info */}
                Hose Assembly
              </h4>
            </div>
            <div className="card-body">
              {/* supplier Details */}
              <div>
                {/* <h4 className="card-title">Hose Assembly</h4> */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label className="col-form-label">Part No.</label>
                        <input
                          name="part_no"
                          value={formData?.part_no}
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

                      <div className="col-md-8">
                        <label className="col-form-label">Hose</label>
                        {/* Search Button */}
                        <Select
                          options={searchTerm ? hoseOption : []}
                          placeholder="Search Hose by name or code..."
                          isLoading={loading}
                          value={selectedHose}
                          onChange={handleHoseDataChange}
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

                    <div className="mb-3">
                      <div className="">
                        <label className="col-form-label">Fitting A</label>
                        {/* Search Button */}
                        <Select
                          options={searchFA ? fittingAOption : []}
                          placeholder="Search Fitting A by name or code ..."
                          isLoading={loading}
                          value={selectedFittingA}
                          onChange={handleFittingADataChange}
                          onInputChange={handleSearchFittingA}
                          noOptionsMessage={() => "No matching fitting a found"}
                          isClearable
                          menuIsOpen={!!searchFA}
                        />
                        {errors?.fitting_a_description && (
                          <span className="text-danger fs-12">
                            {errors?.fitting_a_description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="">
                        <label className="col-form-label">Fitting B</label>
                        {/* Search Button */}
                        <Select
                          options={searchFB ? fittingBOption : []}
                          placeholder="Search Fitting A by name or code ..."
                          isLoading={loading}
                          value={selectedFittingB}
                          onChange={handleFittingBDataChange}
                          onInputChange={handleSearchFittingB}
                          noOptionsMessage={() => "No matching fitting a found"}
                          isClearable
                          menuIsOpen={!!searchFB}
                        />
                        {errors?.fitting_b_description && (
                          <span className="text-danger fs-12">
                            {errors?.fitting_b_description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-3">
                        <label className="col-form-label">Assembly Length</label>
                        <input
                          type="number"
                          placeholder="Assembly Length"
                          name="assembly_length"
                          value={formData?.assembly_length}
                          onChange={handleChange}
                          className="form-control row-input"
                        />
                        {errors?.assembly_length && (
                          <span className="text-danger fs-12">
                            {errors?.assembly_length}
                          </span>
                        )}
                      </div>

                      <div className="col-md-3">
                        <label className="col-form-label">
                          Fitting Length
                        </label>
                        <input
                          type="number"
                          placeholder="Fitting Length"
                          name="fitting_length"
                          value={formData?.fitting_length}
                          onChange={handleChange}
                          className="form-control"
                        />
                        {errors?.fitting_length && (
                          <span className="text-danger fs-12">
                            {errors?.fitting_length}
                          </span>
                        )}
                      </div>

                      <div className="col-md-3">
                        <label className="col-form-label">Cutting Length</label>
                        <input
                          type="number"
                          placeholder="Cutting Length"
                          name="cutting_length"
                          value={formData?.cutting_length}
                          onChange={handleChange}
                          className="form-control"
                          disabled
                        />
                        {errors?.cutting_length && (
                          <span className="text-danger fs-12">
                            {errors?.cutting_length}
                          </span>
                        )}
                      </div>

                      {orientationAngle || orientationAngleFromParent && (
                        <div className="col-md-3">
                          <label className="col-form-label">
                            OA
                          </label>
                          <input
                            type="number"
                            placeholder="OA"
                            name="oa"
                            value={formData?.oa}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row mb-3">
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
                          }}
                          defaultValue={selectedGuardTypeOption}
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

                      <div className="col-md-6">
                        <label className="col-form-label">Select Guard</label>
                        {/* Search Button */}
                        <Select
                          options={searchGuard ? guardOption : []}
                          placeholder="Search Fitting A by name or code ..."
                          isLoading={loading}
                          value={selectedGuardOption}
                          onChange={handleGuardDataChange}
                          onInputChange={handleSearchGuard}
                          noOptionsMessage={() => "No matching fitting a found"}
                          isClearable
                          menuIsOpen={!!searchGuard}
                        />
                        {errors?.guard && (
                          <span className="text-danger fs-12">
                            {errors?.guard}
                          </span>
                        )}
                      </div>
                    </div>

                    
                    {/* Add button */}
                    {/* <div className="d-flex gap-2">
                      <button onClick={addRow} className="btn btn-primary mt-4">
                        Add Hose Assembly
                      </button>
                    </div> */}
                  </div>


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
                            const isSelected =
                              (searchFittingCode?.title === "hose" && selectedHose?.id === product?.id) ||
                              (searchFittingCode?.title === "fitting_a" && selectedFittingA?.id === product?.id) ||
                              (searchFittingCode?.title === "fitting_b" && selectedFittingB?.id === product?.id) ||
                              (searchFittingCode?.title === "guard" && selectedGuardOption?.id === product?.id);
                            return (
                              <div key={product?._id}
                                className="product-item p-2 mb-2 text-dark rounded cursor-pointer"
                                onClick={() => {
                                  if (searchFittingCode?.title == "hose") {
                                    setSelectedHose(product);
                                  } else if (searchFittingCode?.title == "fitting_a") {
                                    setSelectedFittingA(product);
                                  } else if (searchFittingCode?.title == "fitting_b") {
                                    setSelectedFittingB(product);
                                  } else if (searchFittingCode?.title == "guard") {
                                    setSelectedGuardOption(product);
                                  }
                                }}
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

              {/* Table  */}
              <div className="col-xl-12 col-lg-12 mt-5">
                <div>
                  <div>
                    <div className="" style={{ overflow: "auto" }}>
                      {rows?.length > 0 && (
                        <table
                          id="dynamicTable"
                          className="display dataTable no-footer w-100">
                          {/* Table Headings */}
                          <thead className="table-head">
                            <tr>
                              <th>SL</th>
                              <th>Part No</th>
                              <th>Hose</th>
                              <th>Fitting A</th>
                              <th>Fitting B</th>
                              <th>Assembly Length</th>
                              <th>Fitting Length</th>
                              <th>Cut Length</th>
                              <th>OA</th>
                              <th>Guard Type</th>
                              <th>Guard</th>
                              <th>Quantity</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          {/* Table Body */}
                          <tbody>
                            {rows?.map((row, index) => {
                              return (
                                <tr
                                  key={row?.id}
                                  draggable
                                  onDragStart={() => handleDragStart(index)}
                                  onDragOver={handleDragOver}
                                  onDrop={() => handleDrop(index)}
                                  style={{
                                    cursor: "grab",
                                    background: "#f8f9fa",
                                  }}>
                                  <td>{row?.id + 1}</td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Part No"
                                      value={row?.part_no} // Auto-fill product code
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "part_no",
                                          e.target.value
                                        )}
                                      className="form-control row-input"
                                      style={{ width: "150px" }}
                                    />
                                  </td>
                                  {/* Hose */}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Hose"
                                      value={row?.hose} // Auto-fill product code
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "hose",
                                          e.target.value
                                        )}
                                      className="form-control row-input"
                                      style={{ width: "180px" }}
                                    />
                                  </td>
                                  {/* fitting_a */}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Fitting A"
                                      value={row?.fitting_a}
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "fitting_a",
                                          e.target.value
                                        )}
                                      className="form-control row-input"
                                      style={{ width: "180px" }}
                                    />
                                  </td>
                                  {/* Fitting B */}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Fitting B"
                                      value={row?.fitting_b} // Auto-fill product code
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "fitting_b",
                                          e.target.value
                                        )}
                                      className="form-control row-input"
                                      style={{ width: "180px" }}
                                    />
                                  </td>
                                  {/* Assembly Length */}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Assembly Length"
                                      value={row?.assembly_length} // Auto-fill product code
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "assembly_length",
                                          e.target.value
                                        )}
                                      className="form-control row-input"
                                      style={{ width: "100px" }}
                                    />
                                  </td>
                                  {/* Fitting Length */}
                                  <td>
                                    <input
                                      type="number"
                                      placeholder="Fitting Length"
                                      value={row?.fitting_length}
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "fitting_length",
                                          e.target.value
                                        )}
                                      className="form-control"
                                    />
                                  </td>
                                  {/* Cut Length */}
                                  <td>
                                    <input
                                      type="number"
                                      placeholder="Cut Length"
                                      value={row?.cutting_length}
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "cutting_length",
                                          e.target.value
                                        )}
                                      className="form-control"
                                    />
                                  </td>
                                  {/*oa*/}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="AO"
                                      value={row?.oa}
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "ao",
                                          e.target.value
                                        )}
                                      className="form-control"
                                      style={{ width: "80px" }}
                                    />
                                  </td>
                                  {/*Guard Type */}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Guard Type"
                                      value={row?.guard_type}
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "guard_type",
                                          e.target.value
                                        )}
                                      className="form-control"
                                      style={{ width: "100px" }}
                                    />
                                  </td>
                                  {/* Guard */}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Guard"
                                      value={row?.guard}
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "guard",
                                          e.target.value
                                        )}
                                      className="form-control"
                                      style={{ width: "150px" }}
                                    />
                                  </td>
                                  {/* Quantity */}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Quantity"
                                      value={row?.quantity}
                                      onChange={(e) =>
                                        handleChangeRow(
                                          index,
                                          "quantity",
                                          e.target.value
                                        )}
                                      className="form-control"
                                      style={{ width: "70px" }}
                                    />
                                  </td>
                                  {/* Delete */}
                                  <td>
                                    <button
                                      className="btn btn-danger mt-2"
                                      onClick={() =>
                                        handleDeleteTableRow(row?.id)
                                      }>
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              )
                            })}
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
          </div>
        </div>

      </div>
    </>
  );
};

export default HoseAssemblySection;
