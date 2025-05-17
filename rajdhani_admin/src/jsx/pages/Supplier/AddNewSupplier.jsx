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
  getCityApi,
  getCountryApi,
  getStateApi,
} from "../../../services/apis/Product";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { addSupplier, getAllSupplierListApi } from "../../../services/apis/Supplier";
import "../../../assets/css/AddSupplierPurchaseOrder.css";
import { addSupplierPurchaseOrderApi, createPoItemApi } from "../../../services/apis/PurchaseOrder";
import { getCountryListApi, getStateListApi, getStateListTinApi } from "../../../services/apis/CommonApi";
import uplodIcon from "../../../assets/images/upload-icon.png";
import { createCustomerApi } from "../../../services/apis/CustomerApi";
import { set } from "lodash";

const options = [
  { value: "veg", label: "Veg" },
  { value: "non-veg", label: "Non Veg" },
];

const discountOptions = [
  { value: "percentage", label: "Percentage ( % ) " },
  { value: "inr", label: "INR " },
];

const AddNewSupplier = () => {

  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const [selectedCountryOption, setSelectedCountryOption] = useState();
  const [selectedStateOption, setSelectedStateOption] = useState(null);
  const [selectedCityOption, setSelectedCityOption] = useState(null);



  const [selectedBillingCountryOption, setSelectedBillingCountryOption] = useState();
  const [selectedBillingStateOption, setSelectedBillingStateOption] = useState(null);
  const [selectedBillingCityOption, setSelectedBillingCityOption] = useState(null);

  const [selectedShippingCountryOption, setSelectedShippingCountryOption] = useState();
  const [selectedShippingStateOption, setSelectedShippingStateOption] = useState(null);
  const [selectedShippingCityOption, setSelectedShippingCityOption] = useState(null);

  const [stateTIN, setStateTIN] = useState();
  // console.log("stateTIN",stateTIN)
  const [countriesList, setCountriesList] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();
  const [supplierDetail, setSupplierDetail] = useState({});
  const TodayDate = moment().format("YYYY-MM-DD");


  //Billing Form Details Fields
  const [formCustomerData, setCustomerFormData] = useState({});

  console.log("formCustomerData", formCustomerData);

  //All Form Data is here
  const [formData, setFormData] = useState({
    supplier_id: "",
    date: TodayDate,
    due_date: "",
    note: "",
  });

  //Billing Form Details Fields
  const [formBillingData, setBillingFormData] = useState({
    name: '',
    email: '',
    mobile_no1: '',
    mobile_no2: '',
    country: '',
    state_name: '',
    city: '',
    state_tin_code: '',
    address: '',
    gstin: '',
  });

  // console.log("Billing Form", formBillingData)

  //Shipping Form Details Fields
  const [formShippingData, setShippingFormData] = useState({
    name: '',
    email: '',
    mobile_no1: '',
    mobile_no2: '',
    country: '',
    state_name: '',
    city: '',
    state_tin_code: '',
    address: '',
    gstin: '',
  });
  // console.log("Shipping Form", formShippingData)

  // console.log(formBillingData.state_name)
  // console.log(formShippingData.state_name)
  // console.log(formBillingData.state_name === formShippingData.state_name)

  //Rows Fields
  const [rows, setRows] = useState([
    {
      id: 1,
    },
  ]);




  const resetForm = () => {
    setCustomerFormData({});
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
    // setSelectedSupplierOption(null);
    // setSelectedProductOption(null);
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
    if (!formShippingData.state_tin_code || !/^\d{1,2}$/.test(formShippingData.state_code)) {
      newErrors.state_tin_code = "Valid shipping state code is required.";
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



  const fetchSupplierAllList = async () => {
    setLoading(true);
    try {
      const res = await getAllSupplierListApi();
      const dropdownSupplierList = res?.data?.suppliers?.map((supplier) => ({
        value: supplier._id,
        label: supplier.name,
      }));
      // setSupplierOption(dropdownSupplierList);
      // setAllSupplier(res?.data?.suppliers);
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
      console.log("res dropdownProductList res", res)
      const dropdownProductList = res?.data?.products?.map((product) => ({
        value: product?.desc_Code,
        label: product?.desc_Code,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst

      }));
      console.log("dropdownProductList dropdownProductList dropdownProductList", dropdownProductList)
      // setProductOption(dropdownProductList);
    } catch (error) {
      console.error("Error fetching data:", error);
      Toaster.error("Failed to load data. Please try again.");
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
        state_tin_code: StateTinNumber
      })
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
        state_tin_code: StateTinNumber
      })
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
        code: country?.state_code
      }));
      //statesOption, setStatesOption
      // setStates(data)
      // setCountryOption(dropdownCountryList);
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
      const dropdownCountryList = countriesResponse?.data?.countries?.map((country) => ({
        value: country?.name,
        label: country?.name,
        id: country?.id
      }));

      setCountriesList(dropdownCountryList);
    } catch (error) {
      console.log(error.message);
    }
  };
  //Fetch state List
  const fetchStatesData = async (id) => {
    try {
      const stateData = await getStateApi(id);
      const dropdownStateList = stateData?.data?.states?.map((state) => ({
        value: state?.name,
        label: state?.name,
        id: state?.id,
        state_code: state?.state_code
      }));


      setStateList(dropdownStateList);

    } catch (error) {
      console.log(error.message);
    }
  };
  //Fetch Cities List
  const fetchCitiesData = async (id) => {
    try {
      const cityData = await getCityApi(id);
      const dropdownCityList = cityData?.data?.cities?.map((city) => ({
        value: city?.name,
        label: city?.name,
        id: city?.id
      }));
      setCityList(dropdownCityList);
    } catch (error) {
      console.log(error.message);
    }
  };



  useEffect(() => {
    fetchSupplierAllList();
    fetchProductAllList();
    fetchCountryList();
    fetchCountryData();
  }, []);

  useEffect(() => {

    if (selectedCountryOption?.value) {
      fetchStatesData(selectedCountryOption?.id)
    }
    if (selectedStateOption?.value) {
      fetchStatesListTIN(selectedStateOption?.state_code)
      fetchCitiesData(selectedStateOption?.id)
    }


  }, [selectedCountryOption, selectedStateOption])


  const handleCustomerDetailChange = (e) => {
    const { name, value } = e.target; // Destructure the input's name and value
    setCustomerFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the corresponding field
    }));
  };


  const [formDetailsData,setFormDetailsData] = useState();
  console.log("formdetails data is here",formDetailsData )

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the input's name and value
    setFormDetailsData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the corresponding field
    }));
  };




  //customer----------------------------------------------------------------------------------------

  const handleCountryChange = (option) => {
    setSelectedCountryOption(option);
    setFormDetailsData({
      ...formDetailsData,
      country: option?.value,
    })

  }
  const handleStateChange = (option) => {
    setSelectedStateOption(option);
    setFormDetailsData({
      ...formDetailsData,
      state: option?.value,
    })
  }

  const handleCityChange = (option) => {
    setSelectedCityOption(option);
    setFormDetailsData({
      ...formDetailsData,
      city: option?.value,
    })
  }

  const [isEdit, setIsEdit] = useState(false);


  // Handle the logo image change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
      setFormDetailsData({
        ...formCustomerData,
        image: file, // Update the image field with the selected file
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


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return;
    // }

    
      setLoading(true);
      try {
        const res = await addSupplier(formDetailsData);
        if (res.data?.success) {
          setLoading(false);
          // Toaster.success(res?.data?.message);
          Swal.fire({
            icon: "success",
            title: "Supplier",
            text: res.data?.message || "Add New Supplier successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm(); // Reset form after success
          navigate("/supplierlist");
        } else {
          setLoading(false);
          Toaster.error(res.data?.message || "Failed to create food item");
          console.error("Food creation error:", res);
        }
      } catch (error) {
        setLoading(false);
        Toaster.error(
          error.response?.data?.message ||
          "An error occurred while processing your request"
        );
      }
    
  };



  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle
        activeMenu={"Add New Supplier"}
        motherMenu={"Home"}
        motherMenuLink={"/dashboard"}
      />
      <div className="row">
        {/* SECTION 1ST */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Supplier Info</h4>
            </div>
            <div className="card-body">
              {/* Supplier Details */}

              <div className="mb-3">
                {/* <h4 className="card-title">Billing Detail</h4> */}
                {/* Supplier Name */}
                <div className="mb-3 row">
                  <div className="col-md-6 col-xl-6">
                    <label className="col-form-label">Supplier Name</label>
                    <input
                      name="supplier_name"
                      value={formDetailsData?.supplier_name}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: Abc Plastics"
                    />
                    {errors.supplier_name && (
                      <span className="text-danger fs-12">{errors.supplier_name}</span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  {/* first name */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">First Name</label>
                    <input
                      name="fname"
                      value={formDetailsData?.fname}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: John"
                    />
                    {errors.fname && (
                      <span className="text-danger fs-12">
                        {errors.fname}
                      </span>
                    )}
                  </div>

                  {/* last name */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Last Name</label>
                    <input
                      name="lname"
                      value={formDetailsData?.lname}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: Doe"
                    />

                    {errors.lname && (
                      <span className="text-danger fs-12">
                        {errors.lname}
                      </span>
                    )}
                  </div>

                  { /* email */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Email</label>
                    <input
                      name="email"
                      value={formDetailsData?.email}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC@gmail.com"
                    />

                    {errors.email && (
                      <span className="text-danger fs-12">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  { /* mobile number */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Mobile No.1</label>
                    <input
                      name="mobile_no1"
                      value={formDetailsData?.mobile_no1}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: +91 9876-555-555"
                    />

                    {errors.mobile_no1 && (
                      <span className="text-danger fs-12">
                        {errors.mobile_no1}
                      </span>
                    )}
                  </div>
                  { /* mobile number */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Mobile No.2</label>
                    <input
                      name="mobile_no2"
                      value={formDetailsData?.mobile_no2}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex:  +91 9876-555-555"
                    />

                    {errors.mobile_no2 && (
                      <span className="text-danger fs-12">
                        {errors.mobile_no2}
                      </span>
                    )}
                  </div>
                  { /* country */}
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">Country</label>
                    <Select
                      value={selectedCountryOption}
                      onChange={handleCountryChange}
                      defaultValue={setSelectedCountryOption}
                      options={countriesList}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.country && (
                      <span className="text-danger fs-12">
                        {errors.country}
                      </span>
                    )}
                  </div>
                  { /* state */}
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">State</label>
                    <Select
                      value={selectedStateOption}
                      onChange={handleStateChange}
                      defaultValue={selectedStateOption}
                      options={stateList}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.state && (
                      <span className="text-danger fs-12">
                        {errors.state}
                      </span>
                    )}
                  </div>
                  { /* city */}
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">City</label>
                    <Select
                      value={selectedCityOption}
                      onChange={handleCityChange}
                      defaultValue={selectedCityOption}
                      options={cityList}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.city && (
                      <span className="text-danger fs-12">
                        {errors.city}
                      </span>
                    )}
                  </div>



                </div>

                <div className="row mb-3">
                  { /* Pincode */}
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">Pincode</label>
                    <input
                      name="pin_code"
                      value={formDetailsData?.pin_code}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 313001"
                    />

                    {errors.pin_code && (
                      <span className="text-danger fs-12">
                        {errors.pin_code}
                      </span>
                    )}
                  </div>
                  <div className="col-xl-9">
                    <label className="col-sm-3 col-form-label">Address</label>
                    <input
                      name="address"
                      value={formDetailsData?.address}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: Address"
                    />

                    {errors.address && (
                      <span className="text-danger fs-12">
                        {errors.address}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">

                  <div className="col-sm-6 col-xl-6">
                    <label className="col-form-label">GST Number</label>
                    <input
                      name="gstNumber"
                      value={formDetailsData?.gstNumber}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 08ABCDE9999F1Z8"
                    />
                    {errors.gstNumber && (
                      <span className="text-danger fs-12">
                        {errors.gstNumber}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-6">
                    <label className="col-form-label">PAN Number</label>
                    <input
                      name="panNumber"
                      value={formDetailsData?.panNumber}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABCTY1234D"
                    />
                    {errors.panNumber && (
                      <span className="text-danger fs-12">
                        {errors.panNumber}
                      </span>
                    )}
                  </div>

                </div>

                <div className="mb-3 row">
                  <div className="col-sm-12">
                    <label className="col-sm-3 col-form-label">
                      Description
                    </label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="6"
                      id="comment"
                      placeholder="Ex: House#94  Road#8  Abc City"
                      value={formDetailsData?.description}
                      onChange={handleChange}
                    ></textarea>
                    {errors?.description && (
                      <span className="text-danger fs-12">
                        {errors?.description}
                      </span>
                    )}
                  </div>
                </div>

              </div>


            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Upload Supplier Image</h4>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <label className="col-form-label">Supplier Image</label>
                    <div className=' uploadImageContainer' >
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        //value={formData?.image}
                        onChange={handleLogoChange}
                        style={{ display: 'none' }}
                        id="logoUpload"
                      />
                      {logo ? (
                        <>
                          {
                            isEdit ?
                              <>
                                {/* Simple 'X' button as the delete icon */}
                                <div className="deleteIcon" onClick={handleDeleteLogo}> ⛌ </div>
                                <img className='img' src={`https://api.i2rtest.in/v1/images/image/${logo}`} alt="Logo" />
                              </>
                              :
                              <>
                                <div className='deleteIcon' onClick={handleDeleteLogo}> ⛌ </div>
                                <img className='img' src={logo} alt="Logo" />
                              </>
                          }
                        </>
                      ) : (
                        <label htmlFor="logoUpload" className="imgPlaceholder" >
                          <div className='flex flex-col cursor-pointer imgUploadIcon'>
                            <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                            <p>Upload Image</p>
                          </div>
                        </label>
                      )}
                    </div>
                    <p className='mt-2'>Image format - jpg png jpeg gif<br />Image Size - maximum size 2 MB<br />Image Ratio - 1:1</p>
                  </div>
                  {errors?.image && <span className="text-danger fs-12">{errors?.image}</span>}
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

export default AddNewSupplier;
