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
  addProductApi,
  GetAllProductList,
  getCityApi,
  getCountryApi,
  getStateApi,
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
import {
  getCountryListApi,
  getStateListApi,
  getStateListTinApi,
} from "../../../services/apis/CommonApi";
import BillingDetail from "../../components/PurchaseOrder/BillingDetail";
import ShippingDetail from "../../components/PurchaseOrder/Shippingdetail";
import BillingDetailFormMdl from "../../components/PurchaseOrder/BillingDetailFormMdl";
import ShippingDetailFormMdl from "../../components/PurchaseOrder/ShippingDetailFormMdl";
import { getBaseAddress } from "../../../services/apis/options";



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
  const [supplierOption, setSupplierOption] = useState(null);
  const [allSupplier, setAllSupplier] = useState(null);
  const [productOption, setProductOption] = useState(null);
  const [statesOption, setStatesOption] = useState(null);
  const [countryOption, setCountryOption] = useState(null);
  const [selectedSupplierOption, setSelectedSupplierOption] = useState(null);
  const [selectedProductOption, setSelectedProductOption] = useState(null);
  const [selectedBillingCountryOption, setSelectedBillingCountryOption] = useState();
  const [selectedBillingStateOption, setSelectedBillingStateOption] = useState(null);
  const [selectedBillingCityOption, setSelectedBillingCityOption] = useState(null);
  const [selectedShippingCountryOption, setSelectedShippingCountryOption] = useState();
  const [selectedShippingStateOption, setSelectedShippingStateOption] = useState(null);
  const [selectedShippingCityOption, setSelectedShippingCityOption] = useState(null);
  const [stateTIN, setStateTIN] = useState();
  const [countriesList, setCountriesList] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();
  const [supplierDetail, setSupplierDetail] = useState({});
  const [openBillingMdl, setOpenBillingMdl] = useState(false);
  const [openShippingMdl, setOpenShippingMdl] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [baseDetails, setBaseDetails] = useState();
  const [baseDetailsData, setBaseDetailsData] = useState(false);
  const [baseAddressState, setBaseAddressState] = useState("");
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);

  const TodayDate = moment().format("YYYY-MM-DD");

  //All Form Data is here
  const [formData, setFormData] = useState({
    supplier_id: "",
    date: TodayDate,
    due_date: "",
    note: "",
  });
  console.log(formData, "FormData is here")

  //Billing Form Details Fields
  const [formBillingData, setBillingFormData] = useState({
    name: "",
    email: "",
    mobile_no1: "",
    mobile_no2: "",
    country: "",
    state: "",
    city: "",
    state_tin_code: "",
    address: "",
    gstin: "",
    pin_code: "",
  });

  console.log("formBillingData", formBillingData)

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
  console.log("formShippingData", formShippingData)


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

  //Rows Fields
  const [rows, setRows] = useState([]);
  console.log(rows, "rows data is here")
  const [draggedRow, setDraggedRow] = useState(null);

  const handleDragStart = (index) => {
    setDraggedRow(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedRow === null) return;

    // Reorder rows
    const updatedRows = [...rows];
    const draggedRows = updatedRows?.splice(draggedRow, 1)[0]; // Remove dragged row
    updatedRows.splice(index, 0, draggedRows); // Insert at new position

    // Reassign sequence numbers
    const reorderedRows = updatedRows.map((row, idx) => ({ ...row, id: idx }));

    setRows(reorderedRows);
    setDraggedRow(null);
  };


  const addRow = () => {
    if (!selectedSupplierOption) {
      Toaster.warning("Please select a supplier to continue.👨‍💼")
      return;
    }
    if (!selectedProduct) return; // Prevent adding empty rows
    //calculation to add taxable amount 
    const taxableAmount = (selectedProduct?.price - selectedDiscount) * selectedQuantity;
    let cgst = 0,
      sgst = 0,
      igst = 0;


    if (supplierDetail?.state && baseAddressState) {
      const isInterState =
        supplierDetail?.state !== baseAddressState;

      const taxableAmount = (selectedProduct?.price - selectedDiscount) * selectedQuantity;



      if (isInterState) {
        igst = (taxableAmount * selectedProduct?.gst) / 100; // Example IGST Rate: 18%
        cgst = 0;
        sgst = 0;
      } else {
        cgst = (taxableAmount * (selectedProduct?.gst / 2)) / 100;
        sgst = (taxableAmount * (selectedProduct?.gst / 2)) / 100;
        igst = 0;
      }

    }


    const TotalAmount = taxableAmount + cgst + sgst + igst;



    const newRow = {
      ...selectedProduct,
      id: rows.length,
      product_name: selectedProduct.value,
      product_code: selectedProduct.product_code,
      quantity: selectedProduct?.quantity || selectedQuantity,
      uom: selectedProduct.uom || "",
      weight: selectedProduct.weight || "",
      price: selectedProduct.price || 0,
      discount_per_unit: 0 || selectedDiscount,
      taxable_amount: taxableAmount || 0,
      gst: selectedProduct.gst || 0,
      cgst: cgst || 0,
      sgst: sgst || 0,
      igst: igst || 0,
      total_amount: TotalAmount || 0,
      product_id: selectedProduct?.id


    };
    setRows([...rows, newRow]);
    setSelectedProduct(null);
    setSelectedDiscount("");
    setSelectedQuantity("");
  };

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

    const quantity = parseFloat(updatedRows[index].quantity || selectedQuantity || 0);
    const pricePerUnit = parseFloat(updatedRows[index].price_per_unit || 0);
    const uomQty = parseFloat(updatedRows[index].uom_qty || 1);
    const totalDiscount = parseFloat(updatedRows[index].total_discount || 0);
    const gstPercentage = parseFloat(updatedRows[index].gst) || 0;


    const price = parseFloat(updatedRows[index].price) || 0;
    const discount = parseFloat(updatedRows[index].discount_per_unit) || selectedDiscount || 0;
    const gst = parseFloat(updatedRows[index].gst) || 0;


    updatedRows[index].taxable_amount = (price - discount) * quantity;

    if (supplierDetail?.state && baseAddressState) {
      const isInterState =
        supplierDetail?.state !== baseAddressState;
      const taxableAmount = parseFloat(updatedRows[index].taxable_amount) || 0;

      if (isInterState) {
        console.log("inside this condtion isInterState")
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
      name: "",
      address: "",
      gstin: "",
      state_name: "",
      state_code: "",
      email: "",
    });

    setShippingFormData({
      name: "",
      address: "",
      gstin: "",
      state_name: "",
      state_code: "",
      email: "",
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
    // if (!formData.note) newErrors.note = "Note is required.";
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
    // if (
    //   !formBillingData.state_code ||
    //   !/^\d{1,2}$/.test(formBillingData.state_code)
    // ) {
    //   newErrors.billing_state_code = "Valid billing state code is required.";
    // }
    if (
      !formBillingData.gstNumber
      // || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/.test(formBillingData.gstin)
    ) {
      newErrors.gstNumber = "Valid GSTIN is required for billing.";
    }

    if (!formBillingData.address) {
      newErrors.billing_address = "Address is required for billing.";
    }

    // Validate Shipping Details
    if (!formShippingData.name) {
      newErrors.shipping_name = "Shipping name is required.";
    }
    if (
      !formShippingData.email ||
      !/\S+@\S+\.\S+/.test(formShippingData.email)
    ) {
      newErrors.shipping_email = "Valid email is required for shipping.";
    }
    if (!selectedShippingStateOption) {
      newErrors.shipping_state_name = "Shipping state is required.";
    }
    // if (
    //   !formShippingData.state_tin_code ||
    //   !/^\d{1,2}$/.test(formShippingData.state_code)
    // ) {
    //   newErrors.state_tin_code = "Valid shipping state code is required.";
    // }
    if (
      !formShippingData.gstin
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


  // console.log("base address is here", baseDetails);

  const fetchBaseAddress = async () => {
    try {
      // setLoading(true);
      const res = await getBaseAddress();
      const data = res?.data?.data;
      setBaseAddressState(baseDetails?.baseAddress?.state)
      setBaseDetails(data)
      setBaseDetailsData(true)
    } catch (error) {
      Toaster.error("Failed to load data. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchBaseAddress();
  }, [])

  useEffect(() => {
    if (formBillingData?.state_code) {
      fetchStatesListTIN(formBillingData?.state_code)
    }

  }, [])

  const fetchSupplierAllList = async () => {
    setLoading(true);
    try {
      const res = await getAllSupplierListApi();
      const dropdownSupplierList = res?.data?.suppliers?.map((supplier) => ({
        value: supplier?._id,
        label: `${supplier?.supplier_name}`,
      }));
      setSupplierOption(dropdownSupplierList);
      setAllSupplier(res?.data?.suppliers);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
    } finally {
      setLoading(false);
    }
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
        fitting_Code: product?.fitting_Code
      }));

      setProductOption(dropdownProductList);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  //Fetch State TIN Number
  const fetchStatesListTIN = async (state_code) => {
    try {
      const res = await getStateListTinApi(state_code);
      const StateTinNumber = res?.data?.stateTin[0]?.tin_number;
      setBillingFormData({
        ...formBillingData,
        state_tin_code: StateTinNumber,
      });
      setStateTIN(StateTinNumber);
    } catch (error) {
      Toaster.error("Failed to load tin number. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Fetch State TIN Number
  const fetchShippingStatesListTIN = async (state_code) => {
    try {
      const res = await getStateListTinApi(state_code);
      const StateTinNumber = res?.data?.stateTin[0]?.tin_number;
      setShippingFormData({
        ...formShippingData,
        state_tin_code: StateTinNumber,
      });
      setStateTIN(StateTinNumber);
    } catch (error) {
      Toaster.error("Failed to load tin number. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Fetch Countries List
  const fetchCountryList = async () => {
    setLoading(true);
    try {
      const res = await getCountryListApi();

      const data = res?.data?.countries;
      const dropdownCountryList = data?.map((country) => ({
        value: country?.name,
        label: country?.name,
        code: country?.state_code,
      }));
      //statesOption, setStatesOption
      // setStates(data)
      setCountryOption(dropdownCountryList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Fetch Countries List
  const fetchCountryData = async () => {
    try {
      const countriesResponse = await getCountryApi();
      const dropdownCountryList = countriesResponse?.data?.countries?.map(
        (country) => ({
          value: country?.name,
          label: country?.name,
          id: country?.id,
        })
      );

      setCountriesList(dropdownCountryList);
      return dropdownCountryList;
    } catch (error) {
      console.log(error.message);
    }
  };
  //Fetch state List
  const fetchStatesData = async (id) => {
    if (id) {
      try {
        const stateData = await getStateApi(id);
        const dropdownStateList = stateData?.data?.states?.map((state) => ({
          value: state?.name,
          label: state?.name,
          id: state?.id,
          state_code: state?.state_code,
        }));

        setStateList(dropdownStateList);
        return dropdownStateList;
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  //Fetch Cities List
  const fetchCitiesData = async (id) => {
    if (id) {
      try {
        const cityData = await getCityApi(id);
        const dropdownCityList = cityData?.data?.cities?.map((city) => ({
          value: city?.name,
          label: city?.name,
          id: city?.id,
        }));
        setCityList(dropdownCityList);
        return dropdownCityList;
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSupplierAllList();
    fetchProductAllList();
    fetchCountryList();
    fetchCountryData();
  }, []);
  console.log("selectedBillingStateOption", selectedBillingStateOption)

  useEffect(() => {
    if (selectedBillingCountryOption?.value) {
      fetchStatesData(selectedBillingCountryOption?.id);
    }
    if (selectedBillingStateOption?.value) {
      fetchStatesListTIN(selectedBillingStateOption?.state_code);
      fetchCitiesData(selectedBillingStateOption?.id);
    }
  }, [selectedBillingCountryOption, selectedBillingStateOption]);

  useEffect(() => {
    if (selectedShippingCountryOption?.value) {
      fetchStatesData(selectedShippingCountryOption?.id);
    }
    if (selectedShippingStateOption?.value) {
      fetchShippingStatesListTIN(selectedShippingStateOption?.state_code);
      fetchCitiesData(selectedShippingStateOption?.id);
    }
  }, [selectedShippingCountryOption, selectedShippingStateOption]);




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

    const countryData = countriesList?.filter((val) => val?.label == "India");
    const stateData = stateList?.filter(
      (val) => val?.label == suppDetail?.state
    );
    const cityData = cityList?.filter((val) => val?.label == suppDetail?.city);


    setBillingFormData({
      ...baseDetails?.genralbillingDetails,

    });

    setShippingFormData({
      ...baseDetails?.genralshippingDetails,
    });
  };


  //Billing Genral address prefilled selection
  useEffect(() => {
    const initializeLocationData = async () => {
      if (formBillingData?.country) {
        // 1. Set Country
        const country = countriesList?.find(
          (c) => c?.value === formBillingData?.country
        );
        if (country) {
          setSelectedBillingCountryOption({
            label: country?.value,
            value: country?.value,
            id: country?.id,
          });

          // 2. Fetch States
          const fetchedStates = await fetchStatesData(country?.id); // should return states list
          console.log("fetchedStates", fetchedStates)

          if (formBillingData?.state) {
            const state = fetchedStates?.find(
              (s) => s?.value === formBillingData?.state
            );
            if (state) {
              setSelectedBillingStateOption({
                label: state?.value,
                value: state?.value,
                state_code: formBillingData?.state_code,
                id: state?.id,
              });

              // 3. Fetch Cities
              const fetchedCities = await fetchCitiesData(state?.id); // should return cities list

              if (formBillingData?.city) {
                const city = fetchedCities?.find(
                  (c) => c?.value === formBillingData?.city
                );
                if (city) {
                  setSelectedBillingCityOption({
                    label: city?.value,
                    value: city?.value,
                    id: city?.id,
                  });
                }
              }
            }
          }
        }
      }
    };

    initializeLocationData();
  }, [formBillingData?.country]);

  //Shipping Genral address prefilled selection
  useEffect(() => {
    const initializeLocationData = async () => {
      if (formShippingData?.country) {
        // 1. Set Country
        const country = countriesList?.find(
          (c) => c?.value === formShippingData?.country
        );
        if (country) {
          setSelectedShippingCountryOption({
            label: country?.value,
            value: country?.value,
            id: country?.id,
          });

          // 2. Fetch States
          const fetchedStates = await fetchStatesData(country?.id); // should return states list
          console.log("fetchedStates", fetchedStates)

          if (formBillingData?.state) {
            const state = fetchedStates?.find(
              (s) => s?.value === formShippingData?.state
            );
            if (state) {

              setSelectedShippingStateOption({
                label: state?.value,
                value: state?.value,
                state_code: formShippingData?.state_code,
                id: state?.id,
              });

              // 3. Fetch Cities
              const fetchedCities = await fetchCitiesData(state?.id); // should return cities list

              if (formShippingData?.city) {
                const city = fetchedCities?.find(
                  (c) => c?.value === formShippingData?.city
                );
                if (city) {
                  setSelectedShippingCityOption({
                    label: city?.value,
                    value: city?.value,
                    id: city?.id,
                  });
                }
              }
            }
          }
        }
      }
    };

    initializeLocationData();
  }, [formShippingData?.country]);




  const calculateTotalAmount = () => {
    return rows.reduce((total, row) => {
      const quantity = parseFloat(row.taxableAmount || 0);
      const cgst = parseFloat(row?.cgst || 0);
      const sgst = parseFloat(row?.sgst || 0);
      const igst = parseFloat(row?.igst || 0);
      const cess = parseFloat(row?.cess || 0);
      const uomQty = parseFloat(row.uom_qty || 0); // Get the UOM Qty value
      return quantity + cgst + sgst + igst + cess; // Include UOM Qty in the calculation
    }, 0);
  };

  const handleProductChange = (selectedOption, index) => {
    const updatedRows = [...rows];
    // updatedRows[index].selectedOption = selectedOption;
    // Update only the specific row's selectedOption
    updatedRows[index].product_name = selectedOption.value; // Update the product_name

    // Find the selected product from productOption array
    const selectedProduct = productOption.find(
      (product) => product.id === selectedOption.id
    );

    updatedRows[index].product_code = selectedProduct
      ? selectedProduct?.product_code
      : "";
    updatedRows[index].uom = selectedProduct ? selectedProduct?.uom : "";
    updatedRows[index].weight = selectedProduct ? selectedProduct?.weight : "";
    updatedRows[index].price = selectedProduct ? selectedProduct?.price : "";
    updatedRows[index].gst = selectedProduct ? selectedProduct?.gst : "";
    updatedRows[index].product_id = selectedProduct ? selectedProduct?.id : "";

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
      total_gst_amount +=  (cgst + sgst + igst); // Sum of all GST components
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
        // product_id: id
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

  //Billing...........................................................................................................................

  const handleBillingDetailCountryChange = (option) => {
    setSelectedBillingCountryOption(option);
    setBillingFormData({
      ...formBillingData,
      country: option?.value,
    });
    setSelectedBillingStateOption('')
    setSelectedBillingCityOption('')
  };

  const handleBillingDetailStateChange = (option) => {
    setSelectedBillingStateOption(option);
    setBillingFormData({
      ...formBillingData,
      state: option?.value,
      state_code: option?.state_code
    });
    setSelectedBillingCityOption('')
  };

  const handleBillingDetailCityChange = (option) => {
    setSelectedBillingCityOption(option);
    setBillingFormData({
      ...formBillingData,
      city: option?.value,
    });
  };

  //shipping....................................................

  const handleShippingDetailCountryChange = (option) => {
    setSelectedShippingCountryOption(option);
    setShippingFormData({
      ...formShippingData,
      country: option?.value,
    });
    setSelectedShippingStateOption('')
    setSelectedShippingCityOption('')
  };

  const handleShippingDetailStateChange = (option) => {
    setSelectedShippingStateOption(option);
    setShippingFormData({
      ...formShippingData,
      state: option?.value,
      state_code: option?.state_code
    });
    setSelectedShippingCityOption('')
  };

  const handleShippingDetailCityChange = (option) => {
    setSelectedShippingCityOption(option);
    setShippingFormData({
      ...formShippingData,
      city: option?.value,
    });
  };

  const handleBillingPhoneDetailChange = (value, field) => {
    setBillingFormData((prev) => ({
      ...prev,
      [field]: value, // Dynamically update the correct field
    }));
  };

  const handleShippingPhoneDetailChange = (value, field) => {
    setShippingFormData((prevState) => ({
      ...prevState,
      [field]: value, // Dynamically update the corresponding field
    }));
  };

  const handleProductDataChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
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
        label: `[${product?.product_code}]  [${product?.desc_Code}]  ${product?.fitting_Code ? ` ⇨[${product?.fitting_Code}]` : ""}`,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst,
        fitting_Code: product?.fitting_Code
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
    setSearchTerm(inputValue);
    if (inputValue.length > 1) {
      debounceSearch(inputValue)
      // fetchProductSearchResults(inputValue); // Fetch matching products
    }
  };

  const [similarProducts, setSimilarProducts] = useState([]);

  const fetchSimilarProducts = async (fittingCode) => {
    // setLoading(true);
    try {
      const res = await SearchSimilarProductsApi(fittingCode);
      // Transform the API response into dropdown format
      const dropdownProductList = res?.products.map((product) => ({
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
      // console.error("Error fetching similar products:", error);
      Toaster.error("Failed to load similar products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedProduct?.fitting_Code) {
      fetchSimilarProducts(selectedProduct?.fitting_Code);
    }
    if (searchTerm == "") {
      setSimilarProducts("")
    }

  }, [selectedProduct, searchTerm]);

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
        state_name: formBillingData?.state,
        city: formBillingData?.city,
        state_tin_code: formBillingData?.state_tin_code,
        address: formBillingData?.address,
        gstin: formBillingData?.gstNumber,
      },
      shipping_details: {
        name: formShippingData?.name,
        email: formShippingData?.email,
        mobile_no1: formShippingData?.mobile_no1,
        mobile_no2: formShippingData?.mobile_no2,
        country: formShippingData?.country,
        state_name: formShippingData?.state,
        city: formShippingData?.city,
        state_tin_code: formShippingData?.state_tin_code,
        address: formShippingData?.address,
        gstin: formShippingData?.gstNumber,
      },
      summary: summary,
    };

    try {
      console.log(fData,"Data before api")
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

  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />

      <BillingDetailFormMdl
        openBillingMdl={openBillingMdl}
        setOpenBillingMdl={setOpenBillingMdl}
        formBillingData={formBillingData}
        handleBillingDetailChange={handleBillingDetailChange}
        selectedBillingCountryOption={selectedBillingCountryOption}
        handleBillingDetailCountryChange={handleBillingDetailCountryChange}
        countriesList={countriesList}
        selectedBillingStateOption={selectedBillingStateOption}
        handleBillingDetailStateChange={handleBillingDetailStateChange}
        stateList={stateList}
        selectedBillingCityOption={selectedBillingCityOption}
        handleBillingDetailCityChange={handleBillingDetailCityChange}
        cityList={cityList}
        handleBillingPhoneDetailChange={handleBillingPhoneDetailChange}
        errors={errors}
      />

      <ShippingDetailFormMdl
        openShippingMdl={openShippingMdl}
        setOpenShippingMdl={setOpenShippingMdl}
        formShippingData={formShippingData}
        handleShippingDetailChange={handleShippingDetailChange}
        handleShippingPhoneDetailChange={handleShippingPhoneDetailChange}
        selectedShippingCountryOption={selectedShippingCountryOption}
        handleShippingDetailCountryChange={handleShippingDetailCountryChange}
        countriesList={countriesList}
        selectedShippingStateOption={selectedShippingStateOption}
        handleShippingDetailStateChange={handleShippingDetailStateChange}
        stateList={stateList}
        selectedShippingCityOption={selectedShippingCityOption}
        handleShippingDetailCityChange={handleShippingDetailCityChange}
        cityList={cityList}
      />

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
              {/* supplier Details */}
              <div className="mb-3">
                <h4 className="card-title">Supplier Detail</h4>
                <div className="mb-3 row">
                  {/* Supplier */}
                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">Supplier<span className="text-danger">*</span></label>
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
                  {/* Date */}
                  <div className="col-sm-6 col-xl-4">
                    <label className="col-sm-3 col-form-label">Date<span className="text-danger">*</span></label>
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
                  {/*Due Date */}
                  <div className="col-md-3">
                    <label className="col-form-label">Due Date</label>
                    <input
                      name="due_date"
                      value={formData?.due_date}
                      onChange={handleChange}
                      onClick={(e) => e.target.showPicker()}
                      type="date"
                      className="form-control"
                      placeholder="Enter Date"
                    />
                    {errors?.due_date && (
                      <span className="text-danger fs-12">
                        {errors?.due_date}
                      </span>
                    )}
                  </div>
                </div>
                {/* supplier details card */}
                {supplierDetail && Object.keys(supplierDetail).length !== 0 && (
                  <div className="mb-3 row">
                    <div className="col-sm-6 col-xl-4">
                      <div className="supplier-card">
                        <label className="col-form-label">
                          Supplier Details
                        </label>
                        <hr className="w-100" />
                        <div className="supplier-detail-div">
                          <p
                            className="p-0 m-0"
                            style={{ color: "#000000", fontWeight: "400" }}
                          >
                            {supplierDetail?.supplier_name}
                          </p>
                          <p
                            className="p-0 m-0 d-flex"
                            style={{ color: "#000000", fontWeight: "400" }}
                          >
                            {supplierDetail?.city} {supplierDetail?.state} {supplierDetail?.country}
                          </p>
                          <p
                            className="p-0 m-0"
                            style={{ color: "#000000", fontWeight: "400" }}
                          ></p>

                          {supplierDetail?.mobile_no1 && (
                            <div className="d-flex gap-1">
                              <p className="p-0 m-0 fw-bold "
                                style={{ color: "black", fontWeight: "400" }} >Mobile No :</p>
                              <p
                                className="p-0 m-0 "
                                style={{ color: "black", fontWeight: "400" }} >
                                +91-{supplierDetail?.mobile_no1}
                              </p>
                            </div>
                          )}

                          {supplierDetail?.email && (
                            <div className="d-flex gap-1">
                              <p className="p-0 m-0 fw-bold "
                                style={{ color: "black", fontWeight: "400" }} >Email :</p>

                              <p
                                className="p-0 m-0"
                                style={{ color: "#000000", fontWeight: "400" }}
                              >
                                {supplierDetail?.email}
                              </p>
                            </div>
                          )}

                          {supplierDetail?.gstNumber && (
                            <div className="d-flex gap-1">
                              <p className="p-0 m-0 fw-bold "
                                style={{ color: "black", fontWeight: "400" }} >GST :</p>
                              <p
                                className="p-0 m-0"
                                style={{ color: "#000000", fontWeight: "400" }}
                              >
                                {supplierDetail?.gstNumber}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Billing Details card */}
                    <BillingDetail
                      billingDetail={formBillingData}
                      setOpenBillingMdl={setOpenBillingMdl}
                    />
                    {/* Shipping Details card */}
                    <ShippingDetail
                      shippingDetail={formShippingData}
                      setOpenShippingMdl={setOpenShippingMdl}
                    />

                    <div className=" col-sm-8">
                      <label className="col-form-label">Note<span className="text-danger">*</span></label>
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
                )}
              </div>

              <hr className="w-100" />

              {/* Product Details and serach box section */}
              <div >
                <h4 className="card-title">Product Detail</h4>
                <div className="row mt-3">

                  <div className="col-md-6">
                    <label className="col-form-label">Product</label>
                    {/* Search Button */}
                    <Select
                      options={searchTerm ? productOption : []}
                      placeholder="Search product by name or code ..."
                      isLoading={loading}
                      value={selectedProduct}
                      onChange={handleProductDataChange}
                      onInputChange={handleSearch}
                      noOptionsMessage={() => "No matching products found"}
                      isClearable
                      menuIsOpen={!!searchTerm}
                    />
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

                      <div className="col-md-6">
                        <label className="col-form-label">Discount Per Unit</label>
                        <input
                          type="number"
                          placeholder="Discount Per Unit"
                          value={selectedDiscount}
                          onChange={(e) => setSelectedDiscount(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    {/* Add button */}
                    <button onClick={addRow} className="btn btn-primary mt-4">
                      Add Product
                    </button>
                  </div>

                  <div className="col-md-6">
                    <label className="col-form-label ">Select Similar Products by Brand</label>

                    <div className="product-sidebox p-3 bg-white  rounded">
                      {similarProducts.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "200px" }}>
                          <div
                            style={{
                              fontSize: "5rem",
                              color: "#6c757d",
                              animation: "bounce 1.5s infinite"
                            }}
                          >
                            🔍
                          </div>
                          <p className="text-center text-muted fw-bold">
                            No Data Found. Start Searching for a Product!
                          </p>
                        </div>
                      ) : (
                        <div className="product-list" style={{ maxHeight: "300px", }}>
                          {similarProducts.map((product) => (
                            <div
                              key={product._id}
                              className="product-item p-2 mb-2 text-dark rounded cursor-pointer"
                              onClick={() => setSelectedProduct(product)}
                              style={{
                                border: (selectedProduct?.id == product?.id) ? "3px solid #5b11e1" : "1px solid #ddd",
                                backgroundColor: "#E0CFFF",
                                cursor: "pointer"
                              }}
                            >

                              {/* <strong>{product.product_code}</strong>
                              <span> {product.desc_Code}</span>
                              <br />
                              <small className="text-muted">{product.fitting_Code}</small> */}
                              <div className="col">
                                <div className="d-flex justify-content-between">
                                  <div className="w-80">
                                    <strong>{product?.product_code}</strong>
                                    <span> {product?.desc_Code}</span>
                                    <br />
                                    <small className="text-muted">{product?.fitting_Code}</small>
                                  </div>

                                  {/* <div className="w-20">
                                    <span>Quantity</span>
                                    <br />
                                    <small className="text-muted">0</small>
                                  </div> */}

                                  <div className="w-20 d-flex align-items-center justify-content-center text-white rounded  px-3 py-1 shadow-sm"
                                    style={{
                                      minWidth: "60px", fontSize: "12px",
                                      // background: "#C3A4FC",
                                      background: "linear-gradient(135deg, #C3A4FC, #C3A4FC , #9A67F8)",
                                      border: "1px solid transparent",
                                      // borderImage: "linear-gradient(135deg, #9A67F8, #C3A4FC , #7B32FF) 1", // Gradient border
                                    }}>
                                    <span className="text-black font-bold">Qty:</span>
                                    <span className="ms-1 text-black font-bold">{product?.quantity}</span>
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

              {/* Selected product Table  */}
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
                              <th>Product Name</th>
                              <th>Fitting Code</th>
                              <th>Code</th>
                              <th>Quantity</th>
                              <th>UOM</th>
                              <th>Weight(kg)</th>
                              <th>Price Per Unit</th>
                              <th>Discount Per Unit</th>
                              <th>Taxable Amount</th>
                              <th>GST(%)</th>
                              <th>CGST</th>
                              <th>SGST</th>
                              <th>IGST</th>
                              {/* <th>Cess</th> */}
                              <th>Amount</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          {/* Table Body */}
                          <tbody>
                            {rows?.map((row, index) => (
                              <tr key={row.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(index)}
                                style={{ cursor: "grab", background: "#f8f9fa" }}>
                                {/* S.no */}
                                <td>{row.id + 1}</td>
                                {/* Product Name */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={row?.product_name}
                                    onClick={() =>
                                      setFocusedInputIndex((prev) => (prev === index ? null : index))
                                    }
                                    onChange={(e) =>
                                      handleChangeRow(index, "product_name", e.target.value)
                                    }
                                    className="form-control row-input"
                                    style={{
                                      width: focusedInputIndex === index ? "500px" : "300px",
                                      transition: "width 0.3s ease",
                                      cursor: "pointer",
                                    }}
                                  />
                                </td>
                                {/* Product Fitting Code */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Fitting Code"
                                    value={row?.fitting_Code} // Auto-fill product code
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "fitting_Code",
                                        e.target.value
                                      )
                                    }
                                    className="form-control row-input"
                                    style={{ width: "250px" }}
                                  />
                                </td>
                                {/* Product code */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Code"
                                    value={row?.product_code} // Auto-fill product code
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "product_code",
                                        e.target.value
                                      )
                                    }
                                    className="form-control row-input"
                                    style={{ width: "100px" }}
                                  />
                                </td>
                                {/* Quantity */}
                                <td>
                                  <input
                                    type="number"
                                    placeholder="Qty"
                                    value={row.quantity}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "quantity",
                                        e.target.value
                                      )
                                    }
                                    className="form-control row-input"
                                    style={{ width: "100px" }}
                                  />
                                </td>
                                {/* UOM */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="UOM"
                                    value={row?.uom} // Auto-fill product code
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "uom",
                                        e.target.value
                                      )
                                    }
                                    className="form-control row-input"
                                    style={{ width: "60px" }}
                                  />
                                </td>
                                {/* Weight */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="1 KG"
                                    value={row?.weight} // Auto-fill product code
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "weight",
                                        e.target.value
                                      )
                                    }
                                    className="form-control row-input"
                                    style={{ width: "60px" }}
                                  />
                                </td>
                                {/* Price */}
                                <td>
                                  <input
                                    type="number"
                                    placeholder="Price"
                                    value={row.price}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "price",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                  />
                                </td>
                                {/* Discount Per Unit */}
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
                                {/*Taxable Amount */}
                                <td>
                                  <input
                                    type="number"
                                    placeholder="Taxable Amount"
                                    value={row?.taxable_amount}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "taxable_amount",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                  />
                                </td>
                                {/*GST */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="GST"
                                    value={row?.gst}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "gst",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "70px" }}
                                  // disabled={formBillingData.state_name !== formShippingData.state_name} // Disable for inter-state
                                  />
                                </td>
                                {/* CGST */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="CGST"
                                    value={row?.cgst}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "cgst",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "70px" }}
                                    disabled={supplierDetail?.state !== baseAddressState
                                    } // Disable for inter-state
                                  />
                                </td>
                                {/* SGST */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="SGST"
                                    value={row?.sgst}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "sgst",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "70px" }}
                                    disabled={supplierDetail?.state !== baseAddressState} // Disable for inter-state
                                  />
                                </td>
                                {/* IGST */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="IGST"
                                    value={row?.igst}
                                    onChange={(e) =>
                                      handleChangeRow(
                                        index,
                                        "igst",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    style={{ width: "70px" }}
                                    disabled={supplierDetail?.state === baseAddressState} // Disable for intra-state
                                  />
                                </td>                               
                                {/* Total_amount */}
                                <td>
                                  {row?.total_amount
                                    ? (row?.total_amount).toFixed(2) + ` ₹`
                                    : `0.00 ₹`}
                                </td>
                                {/* Delete */}
                                <td>
                                  <button
                                    className="btn btn-danger mt-2"
                                    onClick={() =>
                                      handleDeleteTableRow(row?.id)
                                    }
                                  >
                                    Delete
                                  </button>
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

              {/* summary */}
              <div className="row justify-content-end mt-4">
                <div className="summary-section col-md-5">
                  <table className="table table-bordered ">
                    <h3 className="p-2 mx-1">Summary</h3>

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
                            style={{ height: "35px", fontSize: "15px" }}
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
